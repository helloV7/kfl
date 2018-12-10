// pages/product/productDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:0,
    count:0,
    showModal:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    
  }
})