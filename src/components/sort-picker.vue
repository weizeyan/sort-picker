
<style lang="scss">
  @import '~@/css/sort-picker.scss';
</style>
<template>
  <div class="sort-picker">
    <div class="group-list">
      <div :data-letter="group.letter" class="group" v-for="group in letterGroups" :key="group.letter">
        <div class="letter">{{group.letter}}</div>
        <ul>
          <li :class="{active: ids.indexOf(item.id) != -1}" v-for="item in group.list" :key="item.id" @click="pick(item)">{{item.name}}</li>
        </ul> 
      </div>
    </div>
    <div class="letter-bar">
      <div class="letter" v-for="group in letterGroups" :key="group.letter">{{group.letter}}</div>
    </div>
  </div>
</template>
<script>
  import pinyin from 'js-pinyin';
	export default {
		name: 'sort-picker',
		computed: {
		},
		props: {
      //v-model value属性
      value: {
        type: [String, Number]
      },
      //数据源
      source: {
        type: [Array],
        default(){
          return[]
        }
      }
		},
		data(){
			return {
        val: this.value + '',
        list: this.source.map((item) => {
         return {
           ...item,
           qp: pinyin.getFullChars(item.name),
           jp: pinyin.getCamelChars(item.name),
           letter: pinyin.getFullChars(item.name).slice(0, 1)
         }
        })
			}
		},
     
		watch: {
      /**
       * 监听value更改,update val
      */
			value(v){
        console.log('watch value', v);
        this.val = v + '';
      },
      /**
       * 监听val更改,发送input事件
      */
      val(v){
        console.log('watch val', v);
        this.$emit('input', v);
      }
		},
    computed: {
      /**
       * 所选项列表
      */
      ids(){
        return this.val ? this.val.split(',') : [];
      },
      /**
       * 列表按字母分组
      */
      letterGroups(){
        let obj = {};
        this.list.forEach((item) => {
          let key = item.letter;
          if(typeof(obj[key]) == 'undefined'){
            obj[key] = [];
          }
          obj[key].push(item);
        });
        let groups = [];
        for(let key in obj){
          groups.push({
            letter: key,
            list: obj[key]
          });
        }
        let letters = groups.map((group) => {
          return group.letter;
        }).sort();
        console.log('letters', letters);
        return letters.map((letter) => {
          return groups.find((group) => {
            return group.letter == letter;
          });
        });
      }
    },
		mounted(){
			
		},
		methods: {
      /**
       * 选择、取消选择
      */
			pick(item){
        let id = item.id;
        let ids = this.val ? this.val.split(',') : [];
        if(ids.indexOf(id) === -1){
          ids.push(id);
          this.val = ids.join(',');
          return;
        }
        ids = ids.filter((_id) => {
          return _id !== id;
        });
        this.val = ids.join(',');
      }
		},
		beforeDestroy(){
			
		}
	}
</script>
