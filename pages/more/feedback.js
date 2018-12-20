// pages/more/feedback.js
import api from '../../utils/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:""
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

  },
  onContentInput(e){
    this.setData({
      content:e.detail.value
    })
  },
  onConfirmClick(){
    if (this.data.content.length<0)return

    api.request({
      url:"FEEDBACK_SUBMIE",
      method:"POST",
      showLoading:true,
      param:{content:this.data.content},
      callback:(b,json)=>{
        if(b){
          wx.navigateBack({
            
          })
          app.showToast(json.msg)
        }
      }

    })
  }
})