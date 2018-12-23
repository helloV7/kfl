// pages/order/orderComfirm.js
const sel_icon = '/resource/image/ic_circle_brown_selected@2x.png'
const unsel_icon = '/resource/image/ic_circle_gray_no_choose@2x.png'
import api from '../../utils/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sel_icon: sel_icon,
    unsel_icon: unsel_icon,
    productList:[],
    person_address:{},
    store_address:{},
    productTotalPrice:0,
    productTotalScore:0,
    freight:0,
    totalPrice:0,
    totalScore:0,
    message:"",
    useAddress:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let productList= JSON.parse(options.data)
    this.setData({
      productList: productList
    })
    this._getDefaultAddress()

    this._calcPrice()
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
  _getDefaultAddress(){
    api.request({
      url:"GET_DEFAULT_ADDRESS",
      method:"GET",
      callback:(b,json)=>{
        if(b){
          this.setData({
            store_address: json.data.store,
            person_address: json.data.defaultAddress
          })
        }
      }
    })
  },
  _calcPrice(){

    let goodsList=[]
    this.data.productList.forEach(item=>{
      let copy = JSON.parse(JSON.stringify(item))
      delete copy.goods
       goodsList.push(copy)
    })

    api.request({
      url:"CALC_ORDER_PRICE",
      method:"POST",
      showLoading:true,
      param:{
        goodsList: JSON.stringify(goodsList)
      },
      callback:(b,json)=>{
        if(b){
          let totalScore = Number.parseFloat(json.data.totalScore)
          let totalFee = Number.parseFloat(json.data.totalFee)
          let trackPrice = Number.parseFloat(json.data.trackPrice)
          this.setData({
            productTotalPrice: trackPrice,
            productTotalScore: totalScore,
            freight: totalFee,
            totalPrice: trackPrice + totalFee,
            totalScore: totalScore,
          })

        }
      }

    })
  },
  onMessageInput(e){
    this.setData({
      message:e.detail.value
    })
  },
  selAddress(){
    wx.navigateTo({
      url: '/pages/address/addressList?key=person_address',
    })
  },
  createOrder(){
    if (this.data.addressCheck == 0
      || this.data.person_address == null && this.data.store_address == null) {
      app.showToast("请选择收货地址")
      return
    }
    let addressId
    let sendStore
    let goodsList = []
    let trackType
    this.data.productList.forEach(item => {
      goodsList.push({
        buyNum: item.buyNum,
        goodsId: item.goods.id,
        shopcarId: item.shopcarId
      })
    })

    if (this.data.addressCheck == 1) {//美容院
      addressId = this.data.store_address.addressId
      sendStore = "1"
    } else {
      addressId = this.data.person_address.addressId
      sendStore = "0"
    }

    wx.showActionSheet({
      itemList: ["现付","到付"],
      success(res){
        switch (res.tapIndex){
          case 0:
            trackType="1"
            break;
            case 1:
            trackType = "0"
            break;
        }
        api.request({
          url: "CREATE_ORDER",
          method: "POST",
          param: {
            addressId: addressId,
            sendStore: sendStore,
            goodsList: JSON.stringify(goodsList),
            trackType: trackType
          },
          callback:(b,json)=>{
            if(b){

            }
          }
        })

      }
    })
    
  
 
    // addressId	string	是	地址id，如果是店铺则给店铺id
    // sendStore	string	是	是否寄到美容院，1代表是，0代表不是
    // goodsList	dict	否	商品列表，也可以是json字符串，有购物车id则给，没有则不给，内容为：[{ buyNum: xxx, goodsId: xxx, shopcarId: 1 }]
    // trackType	string	否	运费计算类型：1代表现付，0代表到付
 

  },
  addressCheck(e){
    let type = e.currentTarget.dataset.type

  }
})