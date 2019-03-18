// pages/login/login.js

let showPasswordImage = "/resource/image/ic_show.png"
let doNotShowPasswordImage = "/resource/image/ic_dont_show.png"
import api from '../../utils/api.js'
import md5 from '../../utils/js-md5.js'
var app = getApp()
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


    var pages = getCurrentPages()
    if(pages.length==1){
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        },
      })
    }
 
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
    // wx.setStorageSync("showRegisterSucText",true)

    var showRegisterSucT = wx.getStorageSync("showRegisterSucText")

    
    console.log("showRegisterSucT",showRegisterSucT)
    if (showRegisterSucT){
      console.log("login show")

      wx.hideToast()
      wx.hideLoading()
      app.showToast("注册成功，请登录！")
      wx.setStorageSync("showRegisterSucText", false)
    }

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

  wx.login({
    success:(res)=>{
      api.request({
        url: "LOGIN",
        method: "POST",
        noToken: true,
        param: {
          mobile: this.data.phone,
          password: md5(this.data.password),
          wechatCode:res.code
        },
        callback: (b,json) => {
          if(b){
            wx.setStorageSync("userInfo", json.data.userinfo)

            var pages = getCurrentPages()
            if (pages[pages.length - 2] != null &&  pages[pages.length-2].route=="pages/index/index"){
              
              wx.navigateBack({
              })
              pages[pages.length - 2].setData({
                refreshHome: "1" ,
                refreshUserCenter: "1",
                refreshPresent: "1",
                bindPhone: (json.data.bindMobile || false)
              })
             

            }else{
              wx.redirectTo({
                url: '/pages/index/index?bindPhone=true',
              })
            }

          
          }
             
           }
      })
    },
    faile:(res)=>{
      app.showToast("网络错误")
    }
  })
  

    console.log("login click")
  },
  wxChatLogin(e){

    wx.login({
      success:(res)=>{
        res.code
        api.request({
          url:'WX_LOGIN',
          method:"POST",
          noToken:true,
          param:{
            wechatCode:res.code,
            avatar: e.detail.userInfo.avatarUrl,
            nickname: e.detail.userInfo.nickName
          },
          callback: (isSuccess, json)=>{
            
            wx.setStorageSync("userInfo", json.data.userinfo)

            var pages = getCurrentPages()

            
            if (pages[pages.length - 2]!=null && pages[pages.length - 2].route == "pages/index/index") {
              console.log(1)
              let page = pages[pages.length - 2]
              console.log(page)

              page.setData({
                refreshHome: "1",
                refreshUserCenter: "1",
                refreshPresent: "1",
                bindPhone: (json.data.bindMobile || false)
              })

              // .setData({
              //   refreshHome: "1",
              //   refreshUserCenter: "1",
              //   refreshPresent: "1"
              // })
              wx.navigateBack({
              })

            }else{
              console.log(2)

              wx.redirectTo({
                url: '/pages/index/index?bindPhone='+json.data.bindMobile || false,
              })
            }
            // avatar
            // :
            // "https://wx.qlogo.cn/mmopen/vi_32/Nhr2By0AKpuau9focTzib5xfq3jPE93ccBb2hI6jWxKWGxKZqib8tV9Ttib6ks64KXuTytBqHP9hNLkVlbGToRMsg/132"
            // balance
            // :
            // "0.00"
            // createtime
            // :
            // 1545270970
            // expires_in
            // :
            // 2592000
            // expiretime
            // :
            // 1547862970
            // id
            // :
            // 34
            // mobile
            // :
            // ""
            // nickname
            // :
            // "hello_v7"
            // score
            // :
            // 0
            // token
            // :
            // "fc326b86-d0c2-4808-a4a0-37cc8df0af0e"
            // userType
            // :
            // "1"
            // user_id
            // :
            // 34        
          }
        })
      }
    })
    
  },
  onNavToRegister(e){
    wx.navigateTo({
      url: '/pages/login/register',
    })
  }
})