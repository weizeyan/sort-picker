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
import citys from '@/citys.json';
export default {
  components: {
		
		SortPicker
		
  },
  data(){
    return {
      
      source: citys.map((city) => {
        let data = city.split(/\|/);
        return {
          name: data[0],
          id: data[3]
        };
      }),
      item: null,
      open: true
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
