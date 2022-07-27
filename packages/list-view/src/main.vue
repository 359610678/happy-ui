<template>
  <div :class="{'is-fixed':fixed}" class="s-list">
    <div v-if="selectable || $slots.actions || $slots.icons || configurable"
      :class="{'has-action':(selectable || $slots.actions)}" class="s-list__toolbar">
      <el-alert v-if="selectable" :closable="false" class="s-list__selected" type="info">
        <span>已选中</span>
        <span class="s-list__num">{{internalSelected.length}}</span>
        <span>行</span>
        <span class="s-list__cancel" @click="doCancel()">取消选中</span>
      </el-alert>
      <div class="s-list__actions">
        <slot name="actions" :selected="internalSelected"></slot>
      </div>
      <div class="s-list__icons">
        <slot name="icons" :selected="internalSelected"></slot>
        <el-popover placement="bottom" width="80" trigger="click">
          <el-checkbox :indeterminate="isColumnIndeterminate" v-model="checkAllColumn" @change="doColumnCheckAllChange">
            全选显示
          </el-checkbox>
          <el-checkbox-group v-model="selectedColumnList" @change="doColumnChange">
            <el-checkbox v-for="(item, $index) in columnPropsList" :key="$index" :label="item.prop"
              style="display:block;">
              {{item.label}}
            </el-checkbox>
          </el-checkbox-group>
          <i v-if="configurable" class="el-icon-setting configurable-btn" slot="reference"></i>
        </el-popover>
      </div>
    </div>

    <el-table ref="table" v-loading="loading" element-loading-text="加载中" size="medium" :span-method="spanMethod"
      :stripe="stripe" :data="data" :row-key="rowKey" :emptyText="emptyText" :treeProps="treeProps"
      :default-sort="internalDefaultSort" @selection-change="doSelectionChange" @sort-change="doSortChange"
      @expand-change="doExpandChange" :default-expand-all="defaultExpandAll" :border="border">
      <el-table-column v-if="selectable" align="center" type="selection" :selectable="checkSelectable"
        :reserve-selection="reserveSelection"></el-table-column>
      <el-table-column v-if="indexable" type="index" label="序号" :index="formatIndex"></el-table-column>
      <slot></slot>
    </el-table>

    <el-pagination v-if="pageable && !smallPage" class="s-list__pagination" background
      layout="sizes, total, prev, pager, next" :current-page.sync="internalPage" :page-sizes="pageSizes"
      :page-size="queryParam.pageSize" :total="total" @size-change="doSizeChange" @current-change="doPageChange">
    </el-pagination>
  </div>
</template>

<script>
import CommonUtil from 'element-ui/src/utils/CommonUtil.js';
import LocalStorageUtil from 'element-ui/src/utils/LocalStorageUtil.js';
export default {
  name: 'SListView',
  props: {
    treeProps: { // 树形配置
      type: Object,
      default() { return { hasChildren: 'hasChildren', children: 'children' }; }
    },
    fixed: { type: Boolean, default: false }, // 固定分页
    smallPage: { type: Boolean, default: false }, // 小分页
    pageSize: { type: Number, default: 10 }, // 每页显示个数
    pageSizes: { type: Array, default: () => [10, 30, 50, 100] }, // 分页size选择项
    stripe: { type: Boolean, default: false }, // 斑马纹
    indexable: { type: Boolean, default: false }, // 是否可添加索引
    selectable: { type: Boolean, default: false }, // 是否显示勾选框
    pageable: { type: Boolean, default: true }, // 是否显示分页
    configurable: { type: Boolean, default: false }, // 是否可配置column
    configureRememberKey: { type: String, default: null }, // 配置column的key
    total: { type: Number, default: 0 }, // 表格数据总数
    data: { type: Array, default: () => [] }, // 表格数据
    emptyText: { type: String, default: '暂无数据' },
    defaultSort: null, // 默认排序
    rowKey: [String, Function], // 行ID 配合reserve- selection使用
    reserveSelection: { type: Boolean, default: true }, // 跨页选中
    checkSelectable: { type: Function, default: (row, index) => { return true; } }, // checkbox是否可勾选
    spanMethod: { type: Function, default: () => { } }, // 合并行或列的计算方法
    defaultExpandAll: { type: Boolean, default: false }, // 默认展开所有行
    border: { type: Boolean, default: false } // 是否带纵向边框线
  },
  data() {
    return {
      loading: false,
      internalPage: 1,
      internalSelected: [], //  选中的对象数组
      internalDefaultSort: {},
      queryParam: {
        page: 0,
        pageSize: 0,
        filters: [],
        sorters: []
      },
      columnPropsList: [],
      selectedColumnList: [],
      isColumnIndeterminate: true,
      checkAllColumn: false
    };
  },
  mounted() {
    let columnSlotContent = this.$slots.default || [];
    if (this.configurable && columnSlotContent) {
      this.columnPropsList = columnSlotContent.filter(item =>
        item.componentOptions && item.componentOptions.tag === 'el-table-column' && item.componentOptions.propsData.prop
      ).map(item => item.componentOptions.propsData);
      this.selectedColumnList = this.columnPropsList.filter(item => item.configSelected !== false).map(item => item.prop);
      if (this.configureRememberKey) {
        let selected = LocalStorageUtil.getItem(this.configureRememberKey);
        if (selected) {
          this.selectedColumnList = selected;
        }
      }
      this.checkAllColumn = this.selectedColumnList.length === this.columnPropsList.length;
      this.isColumnIndeterminate = this.selectedColumnList.length > 0 && this.selectedColumnList.length < this.columnPropsList.length;
      this.$refs.table.store.states.rowColumns = this.$refs.table.store.states._columns.slice();
      this.updateColumns();
    }

    if (this.defaultSort) {
      this.internalDefaultSort = {
        prop: this.defaultSort.property,
        order: this.defaultSort.direction === 'ASC' ? 'ascending' : 'descending'
      };
      this.queryParam.sorters = [this.defaultSort];
    }
    this.queryParam.pageSize = this.pageSize;
    this.queryParam.page = this.internalPage;
  },
  methods: {
    getTable() {
      return this.$refs.table;
    },
    // 格式化索引
    formatIndex(index) {
      return (this.internalPage - 1) * this.queryParam.pageSize + index + 1;
    },
    updateColumns() {
      this.$refs.table.store.states._columns = this.$refs.table.store.states.rowColumns.filter(
        c => !c.property || this.selectedColumnList.find(i => i === c.property)
      );
      this.$refs.table.store.updateColumns();
      this.$refs.table.store.scheduleLayout();
    },
    doSelectionChange(arr) {
      this.internalSelected = arr;
      this.$emit('selected', this.internalSelected);
    },
    doColumnChange(val) {
      let checkedCount = val.length;
      this.checkAllColumn = checkedCount === this.columnPropsList.length;
      this.isColumnIndeterminate = checkedCount > 0 && checkedCount < this.columnPropsList.length;
      if (this.configureRememberKey) {
        LocalStorageUtil.setItem(this.configureRememberKey, this.selectedColumnList);
      }
      this.updateColumns();
    },
    doColumnCheckAllChange(val) {
      this.selectedColumnList = val ? this.columnPropsList.map(item => item.prop) : [];
      this.isColumnIndeterminate = false;
      if (this.configureRememberKey) {
        LocalStorageUtil.setItem(this.configureRememberKey, this.selectedColumnList);
      }
      this.updateColumns();
    },
    // 表格排序
    doSortChange({ column, prop, order }) {
      order === 'ascending' ? order = 'ASC' : order = 'DESC';
      var sorts = [];
      column && prop && order && sorts.push({ property: prop, direction: order });
      this.internalPage = 1;
      this.queryParam.page = this.internalPage;
      this.queryParam.sorters = sorts;
      this.$emit('load', CommonUtil.copy(this.queryParam));
    },
    // 取消选中
    doCancel() {
      this.$refs.table.clearSelection();
    },
    // 分页回调
    doPageChange(page) {
      this.internalPage = page;
      this.queryParam.page = this.internalPage;
      this.$emit('load', CommonUtil.copy(this.queryParam));
    },
    // 改变每页显示条数
    doSizeChange(pageSize) {
      this.queryParam.pageSize = pageSize;
      this.$emit('load', CommonUtil.copy(this.queryParam));
    },
    // 展开extend
    doExpandChange(data, expadnedList) {
      this.$emit('expandChange', data, expadnedList);
    },
    // 搜索(对外可调用的方法)
    search() {
      if (this.$refs.table) {
        this.$refs.table.clearSelection(); // 解决编辑已购选数据后，internalSelected不改变的问题
      }
      this.$emit('load', CommonUtil.copy(this.queryParam));
    },
    // 重置（对外开调用）
    reset() {
      if (this.$refs.table) {
        this.$refs.table.clearSelection(); // 解决编辑已购选数据后，internalSelected不改变的问题
      }
      this.internalPage = 1;
      this.queryParam.page = this.internalPage;
      this.$emit('load', CommonUtil.copy(this.queryParam));
    },
    // 显示loadi （对外可调用）
    showLoading() {
      this.loading = true;
    },
    // 隐藏loadi （对外可调用）
    hideLoading() {
      this.loading = false;
    }
  }
};
</script>
