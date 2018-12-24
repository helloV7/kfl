// pages/order/orderList.js
let typeText
import api from '../../utils/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tabs:["全部","代付款","待发货","待收获","已完成"],
     currentTab:0,
     page:1,
     data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    typeText = options.type
    let type
    switch (typeText){
      case "all":
        type = 0
        break;
      case "unpay":
        type = 1
        break;
      case "unsend":
        type = 2
        break;
      case "unreceive":
        type = 3
        break
      case "finish":
        type = 4
        break;
    }

    this.setData({
      currentTab: type
    })

    this._getOrderList(true)
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
  onTabClick(e){
    let index = e.detail.index
    this.setData({
      currentTab:index
    })
    this._getOrderList(true)
  },
  _getOrderList(isRefresh){
    let page = isRefresh?1:(this.data.page+1)
    // orderStatus	integer	是	订单状态，0代表全部，1代表待付款，2代表待发货，3代表待收货，4代表已完成
    // page	integer	是	页码，从1开始
    // count	integer	否	显示数量，默认20个
    api.request({
      url:"ORDER_LIST",
      method:"GET",
      showLoading:true,
      param:{
        orderStatus:this.data.currentTab,
        page:page
      },
      callback:(b,json)=>{
        if(b){
          let productCount
          let totalPrice
          let totalScore
          let freight
          json.data.forEach(item =>{
            let goods = item.goods_list
            productCount = 0
            goods.forEach(good=>{
              productCount += good.buyNum
            })
            item.productCount = productCount
            item.totalPrice = Number.parseFloat(item.payFee) + Number.parseFloat(item.trackPrice)
          })

          let data =[]
          if (isRefresh){
            wx.stopPullDownRefresh()
            data = json.data
          }else{
            data = this.data.data.concat(json.data)
          }
          this.setData({
            data:data
          })
        }
      }
    })
  },
  navToDetail(e){
    let index = e.currentTarget.dataset.index
    let orderNo = this.data.data[index].orderNo
    wx.navigateTo({
      url: '/pages/order/orderDetail?orderNo=' + orderNo,
    })
  }
})