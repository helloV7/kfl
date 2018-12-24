// component/filterTab.js
const icon_normal = "/resource/image/ic_sorting@2x.png";
const icon_desc = "/resource/image/ic_sorting_arrow_down@2x.png";
const icon_asc = "/resource/image/ic_sorting_arrow_upward@2x.png";
import api from '../utils/api.js'
var app = getApp()
class Filter{
  constructor(){
    this.currentType=0;
    this.image=icon_normal;
  }

}
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    filter:{
      "size":new Filter(),
      "score":new Filter(),
      "filter":new Filter()
    },
    filterList:[
      {
        name:'系列',
        list:[
          {
            name:'鱼子水漾修复'
          },
          {
            name: '鱼子水漾修复'
          }, {
            name: '鱼子水漾修复'
          },
          {
            name: '鱼子水漾修复'
          }, {
            name: '鱼子水漾修复'
          }, {
            name: '鱼子水漾修复'
          }, {
            name: '鱼子水漾修复'
          }
        ]
      }
    ],
    showModal:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _getImage(filter){
      if(filter==1){
        return icon_desc;
      }else if(filter==2){
        return icon_asc;
      }else{
        return icon_normal;

      }
    },
    _itemClick(e){

      let currentName = e.currentTarget.dataset.name;
      console.log(currentName+"click");
      for(let filterName in this.data.filter){
        let filter = this.data.filter[filterName];
        if (filterName == currentName){
        
          filter.currentType = filter.currentType == 2 ? 0 : ++filter.currentType;
        }else{
          filter.currentType = 0;
        }
        filter.image = this._getImage(filter.currentType)

      }
     
      this.setData({
        filter: this.data.filter
      })
    },
    _nothing(){

    },
    _showModal(){
      this.setData({
        showModal: true
      })
     
    },
    _hideModal(){
      this.setData({
        showModal: false
      })
    },
   _getFilterData() {
      api.request({
        url: "SEARCH_FILTER_ITEM",
        methos: "GET",
        showLoading: true,
        callback: (b, json) => {
          if(b){

          }
        }
      })
    }
    
  },
  attached:function(){
    this._getFilterData()
 
  }
})
