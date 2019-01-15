// pages/userCenter/applyForBeautician.js
let autoToUserInfo = false
import api from '../../utils/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:"",
    showError:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    autoToUserInfo = options.jump
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
  onCodeInput(e){
    this.setData({
      showError:false,
      code:e.detail.value
    })
  },
  validateCode(e){
    if(this.data.code.length==0){
      return
    }
    api.request({
      url:"VALIDATE_CODE",
      method:"POST",
      showLoading:true,
      param:{
        code:this.data.code
      },
      callback:(b,json)=>{
        if(b){
          if (autoToUserInfo){
            wx.navigateBack({

            })
            wx.navigateTo({
              url: '/pages/login/userInformation?fill=true&userType=2',
            })
          }else{
            wx.navigateBack({

            })
          }
         
        }else{
          this.setData({
            showError:true
          })
          if(json.code==4){
            wx.navigateTo({
              url: '/pages/login/bindPhone',
            })
          }
        }
      }

    })
  }
})