// pages/login/forgetPassword.js
let showPasswordImage = "/resource/image/ic_show.png"
let doNotShowPasswordImage = "/resource/image/ic_dont_show.png"
import md5 from "../../utils/js-md5.js"
import api from "../../utils/api.js"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPassword: false,
    showPasswordImage: doNotShowPasswordImage,
    phone: "",
    captcha: "",
    password:"",
    intervalCount: 0,
    canGetCaptcha:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
  , onPasswordVisiableReverseClick(e) {
    this.data.showPassword = !this.data.showPassword
    this.setData({
      showPassword: this.data.showPassword,
      showPasswordImage: this.data.showPassword ? showPasswordImage : doNotShowPasswordImage
    })
  },
  onPhoneInput(e){
    this.setData({
      phone:e.detail.value
    })
  },
  onPasswordInput(e){
    this.setData({
      password:e.detail.value
    })
  },
  onCaptchaInput(e){
    this.setData({
      captcha: e.detail.value
    })
  },
  getCaptcha(){
    if(this.data.phone<11){
      return
    }
    if(this.data.intervalCount!=0){
      return
    }
    if (this.data.canGetCaptcha){
      this.data.canGetCaptcha=false
    }
    this._getCaptcha()

  }
  ,_getCaptcha(){
    api.request({
      url:"GET_CAPTCHA",
      method:"POST",
      noToken:true,
      showLoading: true,
      param:{
        mobile: this.data.phone,
        event: "resetpwd"
      },
      callback:(b,json)=>{
        if(b){
          this.beginTimmer()
        }else{
          this.data.canGetCaptcha=true
        }
      }
    
    })
  },
  beginTimmer() {
    this.setData({ intervalCount: 60 })
    var intervalID = setInterval(() => {
      console.log(this.data.intervalCount)
      this.setData({
        intervalCount: --this.data.intervalCount
      })
      if (this.data.intervalCount <= 0) {
        clearInterval(intervalID)
        this.data.canGetCaptcha = true
      }

    }, 1000)
  },
  resetPwd(){
    if (this.data.phone.length < 11 || this.data.captcha.length == 0 || this.data.password.length < 6){
      return
    }
    api.request({
      url:"RESET_PWD",
      method:"POST",
      noToken:true,
      showLoading:true,
      param:{
        mobile	:this.data.phone,
        newpassword	: md5(this.data.password),
        captcha:this.data.captcha
      },
      callback:(b,json)=>{
        if(b){
          wx.navigateBack({
            delta: 1,
          })
          app.showToast(json.msg)

        }
      }
    })
  }
})