<template>
	<div>
    <sort-picker :source="source" v-model="ids"></sort-picker>
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
      ids: '',
      source: citys.map((city) => {
        let data = city.split(/\|/);
        return {
          name: data[0],
          id: data[3]
        };
      })
    }
  },
	mounted(){
		
	}
};
</script>
