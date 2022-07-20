## DialogWrapper dialog-wrapper

:::demo
```html
<el-button @click='visible = true'>点击打开</el-button>

<s-dialog-wrapper size='large' v-if='visible' :title='title' @confirm='handleConfirm' @cancel='handleCancel'>
  hello
  <div slot='footer'>
    <el-button @click='handleConfirm'>点击确认</el-button>
    <el-button @click='handleCancel'>点击关闭</el-button>
  </div>
</s-dialog-wrapper>
<script>
  export default {
    data() {
      return {
        visible: false,
        title: '标题'
      };
    },
    methods: {
      handleConfirm() {
        console.log(1);
        this.visible = false
      },
      handleCancel() {
        console.log(2);
        this.visible = false
      }
    }
  }
</script>
```

:::

### Attributes
| 参数  |说明                                     |类型     |可选值         |默认值     |
|-------|----------------------------------------|--------|--------------|----------|
|title  |Dialog 的标题，也可通过具名slot（见下表）传入 | string | -             | - |
|size  |Dialog 的大小                             | string | small、medium、large | small |
|confirmText  | 确定按钮文案 | string | - | 确定 |
|cancelText  | 取消按钮文案 | string | - | 取消 |
|hasCancel  | 是否需要取消按钮 | boolean | - | true|
|hasConfirm  | 是否需要确定按钮 | boolean | - | true|

### Slot 
| name | 说明 |
|------|-------|
|-|Dialog的内容 |
| footer | Dialog 按钮操作区域的内容 |

### Events
| 事件名称  | 说明  | 回调参数  |
|----------|------|----------|
|confirm | Dialog 确定的回调  | - |
|cancel |Dialog   关闭的回调  |-|
