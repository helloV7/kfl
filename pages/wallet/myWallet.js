// pages/wallet/myWallet.js
import api from '../../utils/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    page:1,
    balance:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({
          balance:res.data.balance
          })
      },
    })

    this._getDetailList(true)
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
    this._getDetailList(true)

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
  _getDetailList(isRefresh){
    let page = isRefresh?1:(this.data.page+1)

    api.request({
      url:"WALLET_DETAIL",
      method:"GET",
      showLoading:true,
      param:{
        page,page
      },
      callback:(b,json)=>{
        if(b){
          let data =[]
          if(isRefresh){
            data = json.data
            wx.stopPullDownRefresh()
          }else{
            data = this.data.data.concat(json.data)

          }
          this.setData({
            data: data,
            page:page
          })
        }
      }
    })
  },
  loadMore(){
    this._getDetailList(false)

  },
  navToIntroduce() {
    wx.navigateTo({
      url: '/pages/wallet/introduce',
    })
  }
})