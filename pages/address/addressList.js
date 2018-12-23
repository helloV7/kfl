// pages/address/addressList.js
import api from '../../utils/api.js'
var app = getApp()


let frontPageParamKey
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    frontPageParamKey = options.key
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
  _getAddressList(){
    api.request({
      url:"ADDRESS_LIST",
      method:"GET",
      showLoading:true,
      callback:(b,json)=>{
        if(b){
          let data =json.data
          if(data==null){
            data=[]
          }
          this.setData({
            data: data
          })
          wx.stopPullDownRefresh()
        }
      }
    })
  },
  navToManager(){
    wx.setStorage({
      key: 'addressList',
      data: JSON.stringify(this.data.data),
    })

    wx.navigateTo({
      url: '/pages/address/addressListManagement',
    })
  },
  itemClick(){

  }
})