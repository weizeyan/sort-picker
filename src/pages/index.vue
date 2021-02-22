<template>
	<div>
    <div>
      <a href="#" @click.prevent="open = true;">{{item ? item.name : '选择'}}</a>
    </div>
    <sort-picker v-if="open" :source="source" @change="change"></sort-picker>
	</div>	
</template>
<script>
import SortPicker from '@/components/sort-picker';

export default {
  components: {
		
		SortPicker
		
  },
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
	mounted(){
		
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
