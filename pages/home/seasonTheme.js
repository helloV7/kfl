// pages/home/seasonTheme.js 应季主题
import api from '../../utils/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:0,
    page:1,
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    wx.getSystemInfo({
      success: (res)=>{
        this.setData({
          windowHeight:res.windowHeight
        })
      },
    })


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
    this._getProductList(true)

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
    this._getProductList(true)
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
  loadmore(){
    this._getProductList(false)
  },
  _getProductList(isRefresh){
    let page =isRefresh?1:(this.data.page+1)
     
    api.request({
      url:"SEASON_PRODUCT_LIST",
      method:"GET",
      showLoading:true,
      param:{
        page: page
      },
      callback:(b,json)=>{
        if(b){
          let data = []
          if(!isRefresh){
            data = this.data.data
          }else{
            wx.stopPullDownRefresh()
          }
          
          data=data.concat(json.data)
          this.setData({
            data:data,
            page:page
          })
        }
      }

    })
  },
  itemClick(e){

    var userInfo = wx.getStorageSync("userInfo")
    
    if ("2" == userInfo.userType) {
      // app.showToast("只有普通用户可以进入")
      return
    }
    

    let id = e.detail.goodsId
    wx.navigateTo({
      url: '/pages/product/productDetail?id='+id,
    })
  }

})