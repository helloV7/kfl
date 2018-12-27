// pages/order/orderDetail.js
import api from '../../utils/api.js'
var app = getApp()
let orderNo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[],
    orderType:0, // 生成订单  1代付款 2待发货 3待收货 4已完成
    data:"",
    showCancelOrderDialog:false,
    showConfirmReceiveOrderDialog:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    orderNo = options.orderNo
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
    this._getData()

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
    api.request({
      url:"ORDER_DETAIL",
      method:"GET",
      showLoading:true,
      param:{
        orderNo:orderNo
      },
      callback:(b,json)=>{
        if(b){
          let productPrice = Number.parseFloat(json.data.payFee) - Number.parseFloat(json.data.trackPrice)
          json.data.productPrice = productPrice
          this.setData({
            data:json.data
          })
        }
      }
    })
  },
  cancelBtnClick(e){
    this.setData({
      showCancelOrderDialog:true
    })
  },
  cancelConfirmClick(e){
    this._cancelOrder()
  },
  cancelCancelClick(e){
    this.setData({
      showCancelOrderDialog:false
    })
  },
  _cancelOrder(){
    api.request({
      url:"ORDER_CANCEL",
      method:"POST",
      param:{
        orderNo:this.data.data.orderNo
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
  repay(){
    this._getPaySign()
  },
  _getPaySign(){
    api.request({
      url:"WECHAT_PAY",
      method:"POST",
      param:{
        type	:"1",
        orderNo:this.data.data.orderNo
      },
      showLoading:true,
      callback:(b,json)=>{
        //{"code":1,"msg":"请求成功","time":"1545718256","data":{"payType":"1","onlinePayId":"a3e701aa19ccd3aac1e7f31297df97b2","payData":{"appId":"wxa958c1084ff59b84","timeStamp":"1545718257","nonceStr":"a2dEJVwGb6gAEgSe","package":"prepay_id=wx2514105728937408ed4fe4f02455564672","signType":"MD5","paySign":"03ACCB816D4A8450F84EBE1C283B4A6A"}}}
        if(b){
          this.wechatPay(json.data.payData.timeStamp, json.data.payData.nonceStr, json.data.payData.package, json.data.payData.signType, json.data.payData.paySign)
        }
      }
    })
  },
  wechatPay(timeStamp,nonceStr,_package,signType,paySign){
    wx.requestPayment({
      timeStamp:timeStamp,
      nonceStr:nonceStr,
      "package": _package,
      signType:signType,
      paySign:paySign,
      success:(res)=>{
        wx.redirectTo({
          url: '/pages/order/PayResult',
        })
      },
      fail:(res)=>{
        app.showToast("支付失败")
      }

    })
  },
  confirmReceive(){
    this.setData({
      showConfirmReceiveOrderDialog:true
    })
  },
  confirmReceiveCancelClick(){
    this.setData({
      showConfirmReceiveOrderDialog:false
    })
  },
  confirmReceiveConfirmClick(){
    api.request({
      url:"ORDER_RECEIVE_CONFIRM",
      method:"POST",
      showLoading:true,
      param:{
        orderNo: this.data.data.orderNo
      },
      callback:(b,json)=>{
        if(b){
          wx.navigateBack({
            
          })
          app.showToast(json.msg)
        }
      }
    })
  }, 
  navToAFSale(){

    wx.setStorage({
      key: 'orderDetail',
      data: this.data.data,
    })

    wx.navigateTo({
      url: '/pages/afterSales/afterSales?orderNo='+this.data.data.orderNo,
    })
  }
  
})