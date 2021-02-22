
<style lang="scss">
  @import '~@/css/sort-picker.scss';
</style>
<template>
  <div class="sort-picker">
    <div class="search-bar">
      <input type="text" placeholder="名称/拼音" @input="input" class="inp" @focus="inputFocus" v-model.trim="key">
      <a class="cancel" href="#" v-if="searchBarIsOpen" @click.prevent="closeSearchBar">取消</a>
    </div>
    <div class="search-result" v-if="searchBarIsOpen">
      <div class="search-result-mask" v-if="!key"></div>
      <div class="search-result-list" v-else>
        <ul v-if="searchResult.length">
          <li v-for="item in searchResult" @click="pick(item)" :key="item.id">{{item.name}}</li>
        </ul>
        <div v-else class="search-result-empty">未查询到内容</div>
      </div>
    </div>
    <div class="group-list" ref="groupList">
      <div :data-letter="group.letter" class="group" v-for="group in letterGroups" :key="group.letter">
        <div class="letter">{{group.letter}}</div>
        <ul>
          <li :class="{active: ids.indexOf(item.id) != -1}" v-for="item in group.list" :key="item.id" @click="pick(item)">{{item.name}}</li>
        </ul> 
      </div>
    </div>
    <div class="letter-bar">
      <div class="letter" @click="scrollTo(group.letter)" v-for="group in letterGroups" :key="group.letter">{{group.letter}}</div>
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
        val: '',
        list: this.source.map((item) => {
         return {
           ...item,
           qp: pinyin.getFullChars(item.name),
           jp: pinyin.getCamelChars(item.name),
           letter: pinyin.getFullChars(item.name).slice(0, 1)
         }
        }),
        key: '',
        searchBarIsOpen: false,
        searchResult: []

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
       * 选择
      */
			async pick(item){
        let id = item.id;
        this.val = id + '';
        await this.$nextTick();
        this.$emit('change', item);
      },
      /**
       * 定位到字母区域
      */
      scrollTo(letter){
        let groupContainer = this.$refs.groupList.querySelector("[data-letter='"+ letter +"']");
        let offsetTop = groupContainer.offsetTop;
        this.$refs.groupList.scrollTop = offsetTop;
      },
      /**
       * 模糊检索
        中文名模糊匹配
        全拼模糊匹配(开头)
        首字母模糊匹配(开头)
      */
      input(e){
        console.log('input', this.key);
        let key = this.key;
        if(!key){
          return;
        }
        let isFullLetter = /^\w+$/.test(key);
        let namePattern = new RegExp(key);
        let qp = pinyin.getFullChars(key);
        let qpPattern = new RegExp('^' + key, 'i');
        let jp = pinyin.getCamelChars(key);
        let jpPattern = new RegExp('^' + key, 'i');
        let list = this.list.filter((item) => {
          //return isFullLetter ? qp.toLowerCase() == item.qp.toLowerCase()  || jp.toLowerCase() == item.jp.toLowerCase() : namePattern.test(item.name);
          return isFullLetter ? qpPattern.test(item.qp) || jpPattern.test(item.jp) : namePattern.test(item.name);
        });
        this.searchResult = list;
        console.log('list', list.map((item) => {return item.name}));
      },
      inputFocus(){
        this.openSearchBar();
      },
      openSearchBar(){
        this.searchBarIsOpen = true;
      },
      closeSearchBar(){
        this.searchBarIsOpen = false;
      }
		},
		beforeDestroy(){
			
		}
	}
</script>
