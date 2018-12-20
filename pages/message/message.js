// pages/message/message.js
import api from '../../utils/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessage(true)
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
    this.getMessage(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMessage(false)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMessage(isRefresh){
    let param = {}
    if(isRefresh){
      param["page"]=1
    }else{
      param["page"]=this.data.page + 1
    }
    api.request({
      url:"MESSAGE_LIST",
      method:"GET",
      showLoading:true,
      param:param,
      callback:(b,json)=>{
        if(b){
          if(isRefresh){
            this.data.data = json.data
            wx.stopPullDownRefresh()
          }else{
            this.data.data = this.data.data.contact(json.data)
          }
          this.setData({
            data:this.data.data
          })
        }
      }
    })
  }
})