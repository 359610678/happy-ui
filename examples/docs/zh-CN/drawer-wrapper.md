## DrawerWrapper drawer-wrapper

:::demo
```html
<el-button @click='handleClick'>点击打开</el-button>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      handleClick() {
        console.log('sss', this);
        new this.$dialog({
          render(h){
            return <s-drawer-wrapper size='large' title='drawer' onConfirm={this.handleConfirm} onCancel={this.handleCancel}>
            hello DrawerWrapper
            </s-drawer-wrapper>
          },
          methods: {
            handleConfirm() {
              console.log(1);
              this.$emit('hide')
            },
            handleCancel() {
              console.log(2);
              this.$emit('hide')
            }
          }
        }).show()
      }
    }
  };
</script>
```

:::

### Attributes
| 参数  |说明                                     |类型     |可选值         |默认值     |
|-------|----------------------------------------|--------|--------------|----------|
|title  |drawer 的标题，也可通过具名slot（见下表）传入 | string | -             | - |
|size  |drawer 的大小                             | string | small、medium、large | small |
|confirmText  | 确定按钮文案 | string | - | 确定 |
|cancelText  | 取消按钮文案 | string | - | 取消 |
|hasCancel  | 是否需要取消按钮 | boolean | - | true|
|hasConfirm  | 是否需要确定按钮 | boolean | - | true|

### Slot 
| name | 说明 |
|------|-------|
|-|drawer 的内容 |
| header | drawer 头部 |
| action | drawer 按钮操作区域内容 |

### Events
| 事件名称  | 说明  | 回调参数  |
|----------|------|----------|
|confirm | drawer 确定的回调  | - |
|cancel |drawer   关闭的回调  |-|
