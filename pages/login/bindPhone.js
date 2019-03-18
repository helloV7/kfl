// pages/login/bindPhone.js
import api from "../../utils/api.js"
var app = getApp()
var force = false

var intervalID

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    captcha:"",
    intervalCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    force = options.force || false
    
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
    if (intervalID){
      clearInterval(intervalID)
    }
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
  onDoneClick(){
    if(this.data.captcha.length==0 || this.data.phone.length!=11){
      return
    }
    var url
    if(force){
      url = "BIND_PHONE"
    }else{
      url = "CHANGED_PHONE"
    }
    // mobile	string	是	手机号
    // captcha	string	是	验证码
    api.request({
      url: url,
      method:"POST",
      showLoading:true,
      param:{
        mobile:this.data.phone,
        captcha:this.data.captcha
      },
      callback:(b,json)=>{
        if(b){
          wx.navigateBack({
            delta: 1,
          })
        }
        app.showToast(json.msg)
      }
    })

  },
  onCaptchaInput(e){
    this.setData({
      captcha:e.detail.value
    })
  },
  onPhoneInput(e){
    this.setData({
      phone:e.detail.value
    })
  },
  getCaptcha() {
    if (this.data.phone < 11) {
      return
    }
    if (this.data.intervalCount != 0) {
      return
    }
    this._getCaptcha()

  }
  , _getCaptcha() {
    api.request({
      url: "GET_CAPTCHA",
      method: "POST",
      noToken: true,
      showLoading: true,
      param: {
        mobile: this.data.phone,
        event: "changemobile"
      },
      callback: (b, json) => {
        if (b) {
          this.beginTimmer()
        }
      }

    })
  },
  beginTimmer() {
    this.setData({ intervalCount: 60 })
    intervalID = setInterval(() => {
      console.log(this.data.intervalCount)
      this.setData({
        intervalCount: --this.data.intervalCount
      })
      if (this.data.intervalCount == 0) {
        clearInterval(intervalID)
      }

    }, 1000)
  },
})