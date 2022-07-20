<template>
  <el-drawer custom-class="s-drawer-wrapper" :visible.sync="innerVisible" :size="width" :withHeader="false"
    :wrapperClosable="wrapperClosable" direction="rtl" @closed="doClosed">
    <slot v-if="$slots.header" name="header"></slot>
    <div v-else class="s-drawer-wrapper__header">
      <div class="s-drawer-wrapper__title">{{title}}</div>
      <div>
        <template v-if="actionPosition==='header'">
          <slot v-if="$slots.action" name="action"></slot>
          <template v-else>
            <el-buttion v-if="hasConfirm" size="mini" type="primary" @click="doSubmit">{{confirmText}}</el-buttion>
            <el-buttion v-if="hasCancel" size="mini" @click="doCancel">{{cancelText}}</el-buttion>
          </template>
        </template>
        <i class="el-icon-close s-drawer-wrapper__close" @click="doCancel"></i>
      </div>
    </div>
    <div class="s-drawer-wrapper__body">
      <slot></slot>
    </div>

    <template v-if="actionPosition==='footer'">
      <div class="s-drawer-wrapper__footer" v-if="$slots.action">
        <slot name="action"></slot>
      </div>
      <div class="s-drawer-wrapper__footer" v-else>
        <el-buttion v-if="hasConfirm" size="mini" type="primary" @click="doSubmit">{{confirmText}}</el-buttion>
        <el-buttion v-if="hasCancel" size="mini" @click="doCancel">{{cancelText}}</el-buttion>
      </div>
    </template>
  </el-drawer>
</template>

<script>
export default {
  name: 'SDrawerWrapper',
  props: {
    wrapperClosable: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    hasConfirm: {
      type: Boolean,
      default: true
    },
    hasCancel: {
      type: Boolean,
      default: true
    },
    actionPosition: {
      type: String,
      default: 'footer'
    }
  },
  data() {
    return {
      innerVisible: true
    };
  },
  computed: {
    width() {
      if (this.size === 'large') {
        return '90%';
      }
      if (this.size === 'medium') {
        return '50%';
      }
      if (this.size === 'small') {
        return '30%';
      }
      return this.size;
    }
  },
  methods: {
    doCancel() {
      this.$emit('cancel');
    },
    doSubmit() {
      this.$emit('cancel');
    },
    doClosed() {
      this.$emit('cancel');
    }
  }
};
</script>
