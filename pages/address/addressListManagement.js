// pages/address/addressListManagement.js
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
    showDialog:false,
    data:[],
    delAddressIndex:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getStorage({
    //   key: 'addressList',
    //   success: function(res) {
    //     console.log(res)
    //   },
    // })
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
    this._getAddressList()

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
  onItemDelClick(e){
    let index = e.currentTarget.dataset.index

    this.data.delAddressIndex = index
      this.setData({
        showDialog:true
      })
  },
  onDelComfirm(e){
    console.log(1)
    api.request({
      url:"DEL_ADDRESS",
      method:"POST",
      showLoading:true,
      param:{
        addressId:this.data.data[this.data.delAddressIndex].addressId
      },
      callback:(b,json)=>{
        if(b){
          this.data.data.splice(this.data.delAddressIndex,1)
        }

        this.setData({
          showDialog: false,
          data:this.data.data
        })
      }
    })
   
  },
  onDelCancel(e){
    this.setData({
      showDialog:false
    })
  } ,
   _getAddressList() {
    api.request({
      url: "ADDRESS_LIST",
      method: "GET",
      showLoading: true,
      callback: (b, json) => {
        if (b) {
          let data = json.data
          if (data == null) {
            data = []
          }
          this.setData({
            data: data
          })
          wx.stopPullDownRefresh()
        }
      }
    })
  },
  navToNewAddress(){
    wx.navigateTo({
      url: '/pages/address/editAddress',
    })
  },
  navToEditAddress(e){
    let index = e.currentTarget.dataset.index
    let address = this.data.data[index]
    wx.navigateTo({
      url: '/pages/address/editAddress?data='+JSON.stringify(address),
    })
  },
  setToDefault(e){
    let index = e.currentTarget.dataset.index
    let item = this.data.data[index]
    api.request({
      url:"SET_DEFAULT_ADDRESS",
      method:"POST",
      showLoading:true,
      param:{
        addressId: item.addressId
      },
      callback:(b,json)=>{
        if(b){
          this.data.data.forEach((item ,i)=>{
            if(index==i){
              item.isdefault = "1"
            }else{
              item.isdefault = "0"
            }
          })
          this.setData({
            data: this.data.data
          })
        }
      }
    })
  },
  _delAddress(e){
    let index = e.currentTarget.dataset.index

  }
})