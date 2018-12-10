// pages/login/register.js

let showPasswordImage = "/resource/image/ic_show.png"
let doNotShowPasswordImage = "/resource/image/ic_dont_show.png"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPassword: false,
    showPasswordImage: doNotShowPasswordImage,
    displayType:1,//1普通用户  2美容师
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

  }
  , onPasswordVisiableReverseClick(e) {
    this.data.showPassword = !this.data.showPassword
    this.setData({
      showPassword: this.data.showPassword,
      showPasswordImage: this.data.showPassword ? showPasswordImage : doNotShowPasswordImage
    })
  }
  ,toLoginClick(){
    wx.navigateBack({
      delta: 1,
    })
  }
  ,onDisplayTypeClick(e){
    if(e.currentTarget.dataset.type!=this.data.displayType){
      this.data.displayType = e.currentTarget.dataset.type;
    }

    this.setData({
      displayType: this.data.displayType
    });
  }
})