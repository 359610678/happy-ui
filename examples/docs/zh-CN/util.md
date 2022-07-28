## Util util
项目中常用方法
### 基础用法
```javascript
import { CommonUtil, DeteUtil, NumberUtil, LocalStorageUtil, SessionStorageUtil } from "happys-ui";

CommonUtil.copy({name:'xxxx',age:19}); // copy对象

CommonUtil.uuid(); // 前端生成uuid

CommonUtil.downloadFile('url'); // 下载资源文件

CommonUtil.downloadFile('url','_self'); // 下载资源文件，切换打开模式

CommonUtil.downloadFile({download: '文件名', href: 'url', target: '_self'}); // 下载资源文件，自定义参数

CommonUtil.downloadFile(response, 'xxx.jpg'); // 下载blob

DeteUtil.format('date') // 格式化日期

DeteUtil.format('date', 'yyyy-MM-dd hh:mm:ss') // 格式化日期,默认格式

DeteUtil.format('date', 'hh:mm:ss') // 格式化日期，指定格式

NumberUtil.format('value') // 格式化数字

NumberUtil.format('value', '0.00') // 格式化数字，指定格式

LocalStorageUtil.getItem('key', 'namespace', '可选默认值')

LocalStorageUtil.setItem('key', 'value', 'namespace')

LocalStorageUtil.clearItem('key', 'namespace')

SessionStorageUtil.getItem('key')

SessionStorageUtil.setItem('key', 'value')

SessionStorageUtil.clearItem('key')

```


