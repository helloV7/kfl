// pages/login/register.js

let showPasswordImage = "/resource/image/ic_show.png"
let doNotShowPasswordImage = "/resource/image/ic_dont_show.png"
import api from '../../utils/api.js'
import md5 from '../../utils/js-md5.js'
let wechatCode
var app = getApp()
var nickname;
var avatar;
var userInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPassword: false,
    showPasswordImage: doNotShowPasswordImage,
    displayType:'1',//1普通用户  2美容师,
    phone:"",
    captcha:"",
    password:"",
    code:"",
    intervalCount:0,
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
  }
  ,toLoginClick(){
    wx.navigateBack({
      delta: 1,
    })
  }
  ,onDisplayTypeClick(e){
    if(e.currentTarget.dataset.type!=this.data.displayType){
      this.data.displayType = e.currentTarget.dataset.type;
    }

    this.setData({
      displayType: this.data.displayType
    });
  },
  onPhoneInput(e){
    this.setData({
      phone: e.detail.value
    })
  },
  onCaptchaInput(e){
    this.setData({
      captcha: e.detail.value
    })
  },
  onPasswordInput(e){
    this.setData({
      password: e.detail.value
    })
  },
  onCodeInput(e){
    this.setData({
      code: e.detail.value
    })
  }, 
  getCaptcha(){
    if(this.data.phone.length<11){
      app.showToast("请输入11位手机号")
      return 
    }
    if(this.data.intervalCount!=0){
      return
    }
   this._getCaptcha()
  }
  ,register(e){
    avatar = e.detail.userInfo.avatarUrl
    nickname = e.detail.userInfo.nickName
    wx.login({
      success: (res) => {
        wechatCode = res.code

        console.log("wechatCode",wechatCode)
        this.doRegister()
      }
    })
    // if(true){
    // // this.toLoginClick()
    // wx.navigateTo({
    //   url: '/pages/login/userInformation?isRegister=true&fill=false&userType=1',
    // })
    // return
    //   wx.hideToast()
    //   wx.hideLoading()
    //   app.showToast("注册成功，请登录！")

    // return 
    // }
  

   
    
  },
  doRegister(){
   
    if (this.data.phone.length == 0 || this.data.phone.length < 11) {
      app.showToast("请输入手机号")
      return
    }
    if (this.data.captcha.length == 0) {
      app.showToast("请输入验证码")
      return
    }
    if (this.data.password.length == 0) {
      app.showToast("请输入密码")
      return
    }
    if (this.data.password.length < 6) {
      app.showToast("请输入6位以上密码")
      return
    }
    if (this.data.displayType == '2' && this.data.code.length == 0) {
      app.showToast("请输入审核码")
      return
    }
    this._register().then(r => {
      if (r) {

        //注册成功(
        // this.toLoginClick()
        wx.redirectTo({
          url: '/pages/login/userInformation?isRegister=true&fill=false&userType=' + this.data.displayType + '&token=' + userInfo.token + "&phone=" + this.data.phone,
        })

      } else {
        //注册失败
      }
    })
  }
  ,_register(){

    var param = {}
    param['mobile']= this.data.phone
    param['password'] = md5(this.data.password)
    param['captcha'] = this.data.captcha
    param['registerType'] = this.data.displayType
    param['nickname'] = nickname
    param['avatar'] = avatar
    param['openid'] = wechatCode
    if (this.data.displayType=='2')
      param['code'] = this.data.code


    var r = new Promise((resolve,reject)=>{
      api.request({
        url:"REGISTER",
        method:"POST",
        noToken:true,
        showLoading:true,
        param:param,
        callback:(b,json)=>{
          if(b){
            // app.showToast(json.msg)
            userInfo = json.data.userinfo
            // wx.setStorageSync("userInfo", json.data.userinfo)
          }
          resolve(b)
        }
      })
    })
    return r
  },
  _getCaptcha(){
    if (this.data.canGetCaptcha){
      this.data.canGetCaptcha = false
    }
    api.request(
      {
        url:"GET_CAPTCHA",
        method:"POST",
        noToken:true,
        param:{
          mobile:this.data.phone,
          event:"register"
        },
        callback:(b,json)=>{
          if(b){
            this.beginTimmer()
          }else{
            this.data.canGetCaptcha = true
          }
        }
      }
    )
  },
  // _validateCaptcha(){
  //   var r = new Promise((resolve,reject)=>{
  //     api.request(
  //       {
  //         url: "VALIDATE_CAPTCHA",
  //         method: "POST",
  //         noToken: true,
  //         param: {
  //           mobile: this.data.phone,
  //           event: "register",
  //           captcha: this.data.captcha
  //         },
  //         callback:(b,json)=>{
  //             resolve(b)
  //         }

  //       }
  //     )
  //   })
  //  return r
  // },
  beginTimmer(){
    this.setData({intervalCount : 60})
    var intervalID = setInterval(()=>{
      console.log(this.data.intervalCount)
      this.setData({
        intervalCount: --this.data.intervalCount
      })
      if(this.data.intervalCount<=0){
        clearInterval(intervalID)
        this.data.canGetCaptcha = true
      }

    },1000)
  },
  navToProtocol(){
    wx.navigateTo({
      url: '/pages/login/ritchText?url=SYSTEM_SETTING_INFO&title=用户协议&key=userDeal' ,
    })
  },
  navToCode(){
    wx.navigateTo({
      url: '/pages/login/ritchText?url=SYSTEM_SETTING_INFO&title=关于审核码&key=codeTip',
    })
  }
})