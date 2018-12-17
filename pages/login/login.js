// pages/login/login.js

let showPasswordImage = "/resource/image/ic_show.png"
let doNotShowPasswordImage = "/resource/image/ic_dont_show.png"
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPassword:false,
    showPasswordImage:doNotShowPasswordImage,
    phone:"",
    password:""
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
  ,toRegisterClick(){
    wx.navigateTo({
      url: '/pages/login/register',
  
    })
  }
  ,toForgetPasswordClick(){
    wx.navigateTo({
      url: '/pages/login/forgetPassword',

    })
  }
  ,onPasswordVisiableReverseClick(e){
    this.data.showPassword = !this.data.showPassword
    this.setData({
      showPassword:this.data.showPassword,
      showPasswordImage: this.data.showPassword ? showPasswordImage:doNotShowPasswordImage
    })  
  },
  onPhoneInput(e){
    this.setData({
      phone: e.detail.value
    })
  },
  onPasswordInput(e){
    this.setData({
      password: e.detail.value
    })
  },
  //登陆
  onLoginClick(e){
    if (this.data.password.length == 0 || this.data.phone.length == 0){
      return
    }

    api.request("LOGIN","POST",false,true,{
      mobile:this.data.phone,
      password:this.data.password
    },(res)=>{
      console.log("callback",res)
    })

    console.log("login click")
  },
  onNavToRegister(e){
    wx.navigateTo({
      url: '/pages/login/register',
    })
  }
})