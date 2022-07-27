## ListView list-view
用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。
### 基础表格 
基础的表格展示用法。

:::demo 当`el-table`元素中注入`data`对象数组后，在`el-table-column`中用`prop`属性来对应对象中的键名即可填入数据，用`label`属性来定义表格的列名。可使用`width`属性来定义列宽。
```html
  <template>
    <s-list-view :pageSizes="[1,2,3,4,10]" :pageSize="2" :selectable="true" :data="tableData" :indexable="true" :configurable="true"
    configureRememberKey="项目+user+key">
      <template slot="actions" slot-scope="{selected}">
        <el-button size="mini" type="success" :disabled="selected.length===0">操作按钮</el-button>
        <el-button size="mini" type="danger">操作按钮</el-button>
      </template>
      <template slot="icons" slot-scope="{selected}">
        <i class='S_danger'>标识</i>
      </template>
      <el-table-column v-if="true" v-show="true" prop="date" label="日期" width="180" />
      <el-table-column :configSelected="false" prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
    </s-list-view>
  </template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {date:'2016-05-01',name:'张三',address:'深圳市福田区'},
          {date:'2016-05-02',name:'张三',address:'深圳市福田区'},
          {date:'2016-05-03',name:'张三',address:'深圳市福田区'},
          {date:'2016-05-04',name:'张三',address:'深圳市福田区'}
        ]
      }
    }
  }
</script>
```
:::
### Attributes
|     参数       |         说明        |   类型    |    可选值    |   默认值    |
|---------------|---------------------|-----------|-------------|------------|
|fixed          |分页固定底部           | boolean   | -           | false       |
|indexable      |是否显示索引           | boolean   | -           | false       |
|selectable     |是否可选              | boolean   | -           | false       |
|pageable       |是否显示分页           | boolean   | -           | true       |
|smallPage      |简洁分页              | boolean   | -           | true       |
|pageSize       |每页显示条数           | number   | -           | 10       |
|pageSizes      |分页固定底部           | boolean   | -           | false       |
|configurable   |是否可配置column，添加prop的table-column才会生效，configSelected用来设置默认选中| boolean   | -           | false       |
|configureRememberKey |搭配configurable功能使用，具有记忆功能，需要区分唯一性，ex:(项目+user+key) | string   | -           | null       |
|total          |数据总条数             | number   | -           | 0       |
|data           |显示的数据            | Array     | -           | []       |
|emptyText      |空占位文案            | string   | -             | 暂无数据       |
|rowKey         |行id  配合reserve-selection使用    | string   | -           | -       |
|reserveSelection  |跨页选中           | boolean   | -           | true       |
|checkSelectable   |checkbox是否可选   |  function   | -           | -       |
|defaultExpandAll  |是否默认展开全部           | boolean   | -           | false       |
|border          |是否带边框线           | boolean   | -           | false       |

### Slot
|     name    |         说明            |
|-------------|-------------------------|
|-            |el-table-column的内容    |
|icons        |右侧标识区域内容，slot-scope={selected}能获取到选中项目  |
|actions      |批量操作按钮区域内容，slot-scope={selected}能获取到选中项目  |

### Methods
|   方法    |    说明      |    参数    |
|-----------|-------------|-----------|
|search     | 触发刷新  |-|
|reset      |触发重置 |-|
|showLoading|显示loading|-|
|hideLoading|隐藏loading|-|
|getTable   | 获取table |-|

### Events
|   事件名    |    说明      |    参数    |
|-----------|-------------|-----------|
|load       |search、reset、切换分页、切换每页显示条数 | {page，pageSize，sorts} |


