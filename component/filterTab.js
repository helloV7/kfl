// component/filterTab.js
import api from '../utils/api.js'
var app = getApp()
const icon_normal = "/resource/image/ic_sorting@2x.png";
const icon_desc = "/resource/image/ic_sorting_arrow_down@2x.png";
const icon_asc = "/resource/image/ic_sorting_arrow_upward@2x.png";

const icon_collapse = "/resource/image/ic_arrow_down_gray@2x.png"
const icon_expand = "/resource/image/ic_arrow_upward@2x.png"
class Filter{
  constructor(){
    this.currentType=0;
    this.image=icon_normal;
  }

}
let oldFilter= {
  "size": new Filter(),
    "score": new Filter(),
      "filter": new Filter()
}
let oldFilterList = ""
let sourceFilterList = ""
let sourceFilter = {
  "size": new Filter(),
    "score": new Filter(),
      "filter": new Filter()
}
let oldScoreL= ""
let oldPriceL = ""
let oldScoreH = ""
let oldPriceH =  ""
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
    icon_collapse: icon_collapse,
    icon_expand: icon_expand,
    filter:{
      "size":new Filter(),
      "score":new Filter(),
      "filter":new Filter()
    },
    filterList:[],
    scoreLower:"",
    scoreHigher:"",
    priceLower:"",
    priceHigher:"",
   
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
      this.confirm()

    },
    _nothing(){

    },
    _showModal(){
      this.setData({
        showModal: true,
        filter:oldFilter,
        filterList:oldFilterList,
        scoreLower:oldScoreL,
        scoreHigher:oldScoreH,
        priceLower:oldPriceL,
        priceHigher:oldPriceH
      })
     
    },
    _hideModal(){
      this.setData({
        showModal: false
      })
      this._saveState()
    },
   _getFilterData() {
      api.request({
        url: "SEARCH_FILTER_ITEM",
        methos: "GET",
        showLoading: true,
        callback: (b, json) => {
          if(b){
            let sourceStr = JSON.stringify(json.data)
            oldFilterList = JSON.parse(sourceStr)
            sourceFilterList = JSON.parse(sourceStr)
              this.setData({
                filterList:json.data,
              })
          }
        }
      })
    },
    onShowAllClick(e){
      let index = e.currentTarget.dataset.index
      let key = `filterList[${index}].expand`
      let expand = !(this.data.filterList[index].expand)
      this.setData({
        [key]: expand
      })
    },
    vitemClick(e){
      console.log(e)
      let index = e.currentTarget.dataset.index
      let pindex = e.currentTarget.dataset.pindex
      let sel = !(this.data.filterList[pindex].itemValue[index].sel) 
      let key = `filterList[${pindex}].itemValue[${index}].sel`
      this.setData({
        [key]:sel
      })
    },
    bindInput(e){
      let key = e.currentTarget.dataset.key
      this.setData({
        [key]:e.detail.value
      })
    },
    //重置
    resetAll(e){
      // oldFilter = sourceFilter
      // oldFilterList = sourceFilterList
      this.setData({
        filter: JSON.parse(JSON.stringify(sourceFilter)),
        filterList: JSON.parse(JSON.stringify(sourceFilterList)),
        scoreHigher:"",
        scoreLower:"",
        priceHigher:"",
        priceLower:""
      })
      console.log(this.data.filterList)

    },
    confirm(e){      
      // scoreSort	string	否	积分排序：1代表从高到低，2代表从低到高
      // capacitySort	string	否	容量排序：1代表从高到低，2代表从低到高
      // screenData	string	否	items格式：[{ itemId: [1, 2, 3], searchId: 1 }]
      let scoreSort = this.data.filter.score.currentType
      let capacitySort = this.data.filter.size.currentType
      let screenData = {}

      let items=[]
      if(this.data.filterList!=null && this.data.filterList.length!=0)
      this.data.filterList.forEach(item =>{
        let itemId=[]
        item.itemValue.forEach(value => {
            if(value.sel){
              itemId.push(value.itemId)
            }
        })
        if (itemId.length!=0){
          items.push({
            itemId: itemId,
            searchId:item.searchId
          })
        }
      })
      this.data.priceLower = this.data.priceLower || 0
      this.data.priceHigher = this.data.priceHigher || 0
      this.data.scoreLower = this.data.scoreLower || 0
      this.data.scoreHigher = this.data.scoreHigher || 0

      // priceArea: 1 - 2, scoreArea: 1 - 2,
      let priceArea = `${this.data.priceLower}-${this.data.priceHigher}`
      let scoreArea = `${this.data.scoreLower}-${this.data.scoreHigher}`
      // screenData.push({
      //   items: items,
      //   priceArea: priceArea,
      //   scoreArea: scoreArea,
      // })
      screenData.items = items   
      screenData.priceArea = priceArea
      screenData.scoreArea = scoreArea


      this._hideModal()
      this.triggerEvent("confirm", { scoreSort: scoreSort, capacitySort: capacitySort, screenData: screenData},{})
    },
    _saveState(){
      oldFilter = this.data.filter
      oldFilterList = this.data.filterList
      oldPriceL = this.data.priceLower
      oldPriceH = this.data.priceHigher
      oldScoreL = this.data.scoreLower
      oldScoreH = this.data.scoreHigher 

    }
    
  },
  attached:function(){
    this._getFilterData()
 
  }
})
