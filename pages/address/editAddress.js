// pages/address/editAddress.js
const sel_icon = "/resource/image/ic_circle_brown_selected@2x.png"
const unsel_icon = "/resource/image/ic_circle_gray_no_choose@2x.png"
import api from '../../utils/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sel_icon: sel_icon,
    unsel_icon: unsel_icon,
    region:[],
    address:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.data!=null && options.data.length!=0){
      let address = JSON.parse(options.data)
      this.data.region[0] = address.province
      this.data.region[1] = address.city
      this.data.region[2] = address.district

      this.setData({
        address: address,
        region: this.data.region
      })
    }

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
    this.data.address.province = e.detail.value[0]
    this.data.address.city = e.detail.value[1]
    this.data.address.district = e.detail.value[2]

    this.setData({
      region: e.detail.value
    })
  },
  _getLocation(){
    api.request({
      url:"",
      method:"",
      showLoading:true,
      param:{},
      callback:(b,json)=>{

      }
    })
  },
  _bindInput(e){
    console.log(e)
    let key = e.currentTarget.dataset.key
    key = "address." + key 
    this.setData({
      [key]:e.detail.value
    })
  },
  _save(){
    // addressId	string	否	地址id
    // contactMobile	string	否	联系人电话
    // contactPerson	string	否	联系人
    // province	string	否	省份
    // city	string	否	市
    // district	string	否	区
    // address	string	否	详细地址

    let param = this.data.address

    api.request({
      url:"SAVE_ADDRESS",
      method:"POST",
      showLoading:true,
      param: param,
      callback:(b,json)=>{
        if(b){
          app.showToast(json.msg)
          wx.navigateBack({
            
          })
        }
      }
    })
  },checked(e){
    this.data.address.isdefault=this.data.address.isdefault=="1"?"0":"1"
    this.setData({
      address:this.data.address
    })
  }
})