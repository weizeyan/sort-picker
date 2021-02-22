## sort-picker
对列表进行字母排序和模糊检索。使用场景包含通讯录查找、城市选择等。
## 安装
```
npm install sort-picker --save;
```

## 使用
```
import Vue from 'vue';
import 'sort-picker/dist/sort-picker.css';
import SortPicker from 'sort-picker';
Vue.use(SortPicker);
```

```
<template>
    <div>
        <div>
          <a href="#" @click.prevent="open = true;">{{item ? item.name : '选择'}}</a>
        </div>
        <sort-picker v-if="open" :source="source" @change="change"></sort-picker>
    </div>	
</template>
<script>
export default {
 
  data(){
    return {
      
      source: [
        {
            id: '1',
            name: '张三'
        },
        {
            id: '2',
            name: '李四'
        }
      ],
      item: null,
      open: false
    }
  },
	
  methods: {
    change(item){
      console.log('item', item);
      this.open = false;
      this.item = item;
    }
  }
};
</script>

```

# Api参考

#### 属性
|  属性名 |数据类型   |描述   |默认值   |
| ------------ | ------------ | ------------ | ------------ |
|source   |  Array  |   数据源 |  []  |


#### 事件
|  事件名 | 描述   |  参数|
| ------------ | ------------ | ------------ |
|change   | 项目选择后回调  | e:Object 当前所选项目  |

