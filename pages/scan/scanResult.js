// pages/scan/scanResult.js
import api from '../../utils/api.js'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    userType:0,
    code:"",
    storeCode:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.code = options.code

    this.setData({
      data: JSON.parse(options.data)
    })
    wx.getStorage({
      key: 'userInfo',
      success: (res)=>{
        console.log(res)
        this.setData({ 
          userType:res.data.userType
          })
      },
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
  submit(){

    var param = {}
    param["code"] = this.data.code
    if(this.data.storeCode.length!=0){
      param["storeCode"] = this.data.storeCode
    }

    api.request({
      url:"SUBMIT_SCAN_RESULT",
      method:"POST",
      showLoading:true,
      param: param,
      callback:(b,json)=>{
        if(b){
          wx.navigateBack({
            
          })
          app.showToast(json.msg)
        }
      }
    })
  },
  toLogin(){
    wx.reLaunch({
      url: '/pages/login/login',
    })

  }
})