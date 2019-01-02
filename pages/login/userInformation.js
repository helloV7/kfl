// pages/login/userInformation.js
import api from '../../utils/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      name:"",
      nickname:"",
      mobile:"",
      // province:"",
      city:"",
      // district:"",
      email:"",
      wechat:"",
      bankName:"",
      bankNo:"",
    }
    ,region:[]
    ,fill: false
    ,userType:"1"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.fill=="true"){
      wx.getStorage({
        key: 'userInfo',
        success: res => {
          if(res.data==null){
            return
          }
          Object.keys(this.data.form).forEach(key=>{
            this.data.form[key] = res.data[key]
          })

          let region = []
          if (this.data.form.city!=null)
            region = this.data.form.city.split("/")
          this.setData({
            form: this.data.form,
            fill:options.fill,
            userType: options.userType,
            region:region
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
  ,
  bindRegionChange: function (e) {
    // this.data.form.province = e.detail.value[0]
    // this.data.form.city = e.detail.value[1]
    // this.data.form.district = e.detail.value[2]

    this.setData({
      region: e.detail.value
    })
  },
  onFinishClick(){
    if (this.data.form.name.length==0){
      return
    }
    if (this.data.form.nickname.length == 0) {
      return
    }
    if (this.data.form.email.length == 0) {
      return
    }
    if (this.data.form.mobile.length == 0 && this.data.fill) {
      return
    }
    if (this.data.region.length == 0) {
      return
    }

    if (userType == "2"){
      if (this.data.form.wechat.length == 0) {
        return
      }
      if (this.data.form.bankName.length == 0) {
        return
      }
      if (this.data.form.bankNo.length == 0) {
        return
      }
    }
  
    // let param = JSON.parse(JSON.stringify(this.data.form))
    this.data.form.city = this.data.region[0] + "/" + this.data.region[1] + "/" + this.data.region[2]
    delete this.data.form.mobile
    api.request({
      url:"FINISH_USER_INFO",
      method:"POST",
      showLoading:true,
      param: this.data.form,
      callback:(b,json)=>{
        if(b){
          wx.navigateBack({
            
          })
          app.showToast(json.msg)

        }
      }
    })
  },
  bindInput(e){
    let key = e.currentTarget.dataset.key
    this.setData({
      ["form."+key]:e.detail.value
    })
  }
})