// pages/home/brandIntroduce.js
import api from '../../utils/api.js'
var app = getApp()
var WxParse = require('../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs: ["品牌故事", "品牌故事", "品牌故事", "品牌故事", "品牌故事", "品牌故事"],
    data:[],
    currentTab:0,
    richText:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.request({
      url:"BRAND_INTRODUCE",
      method:"GET",
      showLoading:true,
      callback:(b,json)=>{
        if(b){
          this.setData({
            data:json.data
          })
        
          this.parseRichText(this.data.data[0].content)

        }
      }
    })
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
  onTabClick(e){
    var index = e.detail.index
    this.setData({
      currentTab:index
    })


    this.parseRichText(this.data.data[index].content)
  },
  parseRichText(richText){
    // console.log(richText)
    // WxParse.wxParse('richText', 'html', richText, this, 0);

  }
})