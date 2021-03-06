// pages/activity/activityDetail.js
import api from '../../utils/api.js'
var app = getApp()
var WxParse = require('../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    data:{},
    richText:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id

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
    this.getActivityDetail()

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
  getActivityDetail(){
    api.request({
      url:"ACTIVITY_DETAIL",
      method:"GET",
      showLoading:true,
      param:{
        activitionId:this.data.id
      },
      callback:(b,json)=>{
        if(b){
          // WxParse.wxParse('richText', 'html', json.data.content, this, 0);

          this.setData({
            data:json.data
          })
        }
      }
    })
  },
  onItemClick(e){
    var item = e.detail
    wx.navigateTo({
      url: '/pages/product/productDetail?id='+item.goodsId,
    })
  }
})