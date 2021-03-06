// pages/product/productDetail.js
import api from '../../utils/api.js'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:0,
    count:0,
    showModal:false,
    currentSwipe:0,
    id:0,
    data:{},
    richText:"",
    justShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    let justShow = options.justShow||false
    wx.getSystemInfo({
      success: (res)=>{
          this.setData({
            windowHeight:res.windowHeight
          })
      },
    })
    this.getProductInfo()
    this.setData({
      justShow:justShow
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
  add(){
    ++this.data.count;
    this.setData({
      count:this.data.count
    })
  },
  sub(){
    if(this.data.count>0){
      --this.data.count;
    }else{
      return;
    }
    this.setData({
      count: this.data.count
    })
  }
  ,showModal(){
    this.setData({
      showModal:true
    })
  }
  ,hideModal(){
    this.setData({
      showModal: false
    })
  }
  ,nothing(){
    
  },
  getProductInfo(){
    api.request({
      url:"PRODUCT_DETAIL",
      method:"GET",
      showLoading:true,
      param:{
        goodsId:this.data.id
      },
      callback:(b,json)=>{
        if(b){
          this.setData({
            data: json.data
          })
        }
      
      }
    })
  },
  onSwipeChange(e){
    this.setData({
      currentSwipe:e.detail.current
    })
  },
  addToShoppingCar(){

    api.request({
      url:"SHOPPING_CAR_ADD",
      method:"POST",
      showLoading:true,
      param:{
        goodsId:this.data.id,
        buyNum:this.data.count,
      },
      callback:(b,json)=>{
        if(b){
          this.hideModal()
          this.setData({
            count:0
          })
          app.showToast(json.msg)
        }
      }
    })
  },
  redictToHome(){

    // wx.redirectTo({
    //   url: '/pages/index/index',
    // })

    var pages = getCurrentPages()
    for (let i = pages.length - 1; i >=0 ;i--){
      if (pages[i].route == "pages/index/index"){
        wx.navigateBack({
          delta :(pages.length - i -1 )
        })
      }
    }
   
  },
  openShoppingCar(){
    wx.navigateTo({
      url: '/pages/shoppingcar/shoppingcar',
    })
  },
  
})