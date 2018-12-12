// pages/address/editAddress.js
const sel_icon = "/resource/image/ic_circle_brown_selected@2x.png"
const unsel_icon = "/resource/image/ic_circle_gray_no_choose@2x.png"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sel_icon: sel_icon,
    unsel_icon: unsel_icon,
    region:[],
    province:null,
    city:null,
    area:null

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
  bindRegionChange: function (e) {
    this.data.province = e.detail.value[0]
    this.data.city = e.detail.value[1]
    this.data.area = e.detail.value[2]

    this.setData({
      region: e.detail.value
    })
  }
})