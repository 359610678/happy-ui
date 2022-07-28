## Filter filter

### 基础用法
:::demo
```html
<div>{{ date | date }}</div>
<div>{{ date | time }}</div>
<div>{{ date | minutes }}</div>
<div>{{ date | date-fmt('yyyy/MM/dd HH/mm/ss') }}</div>
<div>{{ data | empty }}</div>
<div>{{ 12323214412 | long }}</div>
<div>{{ 0.2442 | percent }}</div>
<script>
  export default {
    data() {
      return {
        date: new Date(),
        data: null
      }
    }
  }
</script>

