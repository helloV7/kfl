// pages/userCenter/rank.js
import api from '../../utils/api.js'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    area:[],
    currentTab:0,
    currentArea:"",
    dataAll:[],
    dataSub:[],
    selfRank:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getAreaList()
    this._getRank()
    this._getSelfRank()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  _getAreaList(){
    api.request({
      url:"RANK_AREA_LIST",
      method:"GET",
      showLoading:true,
      callback:(b,json)=>{
        if(b){
          this.setData({
            area:json.data
          })
        }
      }
    })
  },
  _getRank(){
    let area = this.data.currentArea || ""
    api.request({
      url:"RANK_LIST",
      method:"GET",
      showLoading:true,
      param:{
        area: area
      },
      callback:(b,json)=>{
        if(b){
         
          if(area==""){
            this.setData({
              dataAll:json.data
            })
          }else{
            this.setData({
              dataSub:json.data
            })
          }
          this.setData({
            data: JSON.parse(JSON.stringify(json.data))
          })
        }
      }
    })
  },
  onAreaChanged(e) {
    let index = e.detail.value
    this.setData({
      currentArea:this.data.area[index]
    })
    this._getRank()
    this._getSelfRank()
  },
  onTabClick(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      currentTab:index
    })
    if(index==0){
      this.setData({
        data:JSON.parse(JSON.stringify(this.data.dataAll))
      })
    }else{
      this.setData({
        data: JSON.parse(JSON.stringify(this.data.dataSub))
      })
    }
    
  },
  _getSelfRank(){
    let area = this.data.currentArea || ""
    api.request({
      url:"GET_SELF_RANK",
      method:"GET",
      param:{
        area: area
      },
      callback:(b,json)=>{
        if(b){
          this.setData({
            selfRank:json.data.myRank
          })
        }
      }
    })
  }
})