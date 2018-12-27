// pages/afterSales/afterSales.js
import api from '../../utils/api.js'
var app = getApp()
let orderNo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    orderNo = options.orderNo
    this._getData()
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
  _getData(){
    wx.getStorage({
      key: 'orderDetail',
      success: (res)=>{
        this.setData({
          data:res.data
        })
      },
    })
  },
  sendApply(){
    if (this.data.data.returnReason.length==0){
      app.showToast("请填写原因")
      return 
    }
    //orderNo	string	是	订单号
    // returnReason	string	是	申请理由
    api.request({
      url:"APPLY_REFUND",
      method:"POST",
      param:{
        orderNo:this.data.data.orderNo,
        returnReason: this.data.data.returnReason
      },
      showLoading:true,
      callback:(b,json)=>{
        if(b){
          wx.navigateBack({
            
          })
          app.showToast(json.msg)
        }
      }
    })
  },
  reasonInput(e){
    let key = "data.returnReason"
    this.setData({
      [key]:e.detail.value
    })
  }
})