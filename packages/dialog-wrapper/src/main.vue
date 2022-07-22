<template>
  <el-dialog :class="['dialog-wrapper',size?'dialog-wrapper--'+size:'']" :title="title" :visible="true"
    :close-on-click-modal="false" @close="doCancel">
    <template slot="title" v-if="$slots.title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
    <slot v-if="$slots.footer" name="footer" slot="footer"></slot>
    <template v-else slot="footer">
      <el-button v-if="hasConfirm" size="mini" type="primary" @click="doSubmit">{{confirmText}}</el-button>
      <el-button v-if="hasCancel" size="mini" @click="doCancel">{{cancelText}}</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'SDialogWrapper',
  props: {
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'small'
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
    }
  },
  data() {
    return {};
  },
  methods: {
    doCancel() {
      this.$emit('cancel');
    },
    doSubmit() {
      this.$emit('confirm');
    }
  }
};
</script>
