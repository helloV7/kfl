// pages/order/orderComfirm.js
const sel_icon = '/resource/image/ic_circle_brown_selected@2x.png'
const unsel_icon = '/resource/image/ic_circle_gray_no_choose@2x.png'
import api from '../../utils/api.js'
var app = getApp()
let orderNO
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
    useAddress:1
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
          var useAddress = 1
          if(json.data.store==null){
            useAddress = 2
          }

          this.setData({
            store_address: json.data.store,
            person_address: json.data.defaultAddress,
            useAddress: useAddress
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
            productTotalPrice: totalFee,
            productTotalScore: totalScore,
            freight: trackPrice,
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
    let remarks

    remarks = this.data.message
  
    this.data.productList.forEach(item => {
      goodsList.push({
        buyNum: item.buyNum,
        goodsId: item.goods.id,
        shopcarId: item.shopcarId
      })
    })

    if (this.data.useAddress == 1) {//美容院
      addressId = this.data.store_address.addressId
      sendStore = "1"
    } else {
      addressId = this.data.person_address.addressId
      sendStore = "0"
    }

    wx.showActionSheet({
      itemList: ["运费现付","运费到付"],
      success:(res)=>{
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
            trackType: trackType,
            remarks:remarks
            },
          callback:(b,json)=>{
            if(b){
              orderNO = json.data.orderNo
              this._getPaySign(json.data.orderNo)
              // if (trackType=="1"){
              //   //现付
              // }else{
              //   //到付
              //   app.showToast(json.msg)
              //   wx.navigateBack({
              //     delta: 1,
              //   })
              // }
              
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
    this.setData({
      useAddress:type
    })
  },
  _getPaySign(orderNO) {
   api.request({
      url:"WECHAT_PAY",
      method:"POST",
      param:{
        type	:"1",
        orderNo: orderNO
      },
      showLoading:true,
      callback:(b,json)=>{
        //{"code":1,"msg":"请求成功","time":"1545718256","data":{"payType":"1","onlinePayId":"a3e701aa19ccd3aac1e7f31297df97b2","payData":{"appId":"wxa958c1084ff59b84","timeStamp":"1545718257","nonceStr":"a2dEJVwGb6gAEgSe","package":"prepay_id=wx2514105728937408ed4fe4f02455564672","signType":"MD5","paySign":"03ACCB816D4A8450F84EBE1C283B4A6A"}}}
        if(b){
          this.wechatPay(json.data.payData.timeStamp, json.data.payData.nonceStr, json.data.payData.package, json.data.payData.signType, json.data.payData.paySign)
        }
      }
    })
  },
  wechatPay(timeStamp,nonceStr,_package,signType,paySign){
    wx.requestPayment({
      timeStamp:timeStamp,
      nonceStr:nonceStr,
      "package": _package,
      signType:signType,
      paySign:paySign,
      success:(res)=>{
        wx.redirectTo({
          url: '/pages/order/PayResult?orderNo=' + orderNO,
        })
      },
      fail:(res)=>{
        app.showToast("支付失败")
      }

    })
  },
})