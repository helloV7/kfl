// pages/shoppingcar/shoppingcar.js
import api from '../../utils/api.js'
var app = getApp()
let mockData = {
  sel:false
}
const sel_icon = '/resource/image/ic_circle_brown_selected@2x.png'
const unsel_icon = '/resource/image/ic_circle_gray_no_choose@2x.png'

let oldX;
let oldY;
let delBtnWidth;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sel_icon: sel_icon,
    unsel_icon: unsel_icon,
    productList:[],
    isSelAll:false,
    page:1,
    totalPrice:0,
    totalScore:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function(res) {
        delBtnWidth = 170/750 * res.windowWidth;
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
    this._getShoppingCarList(true)

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
    this._getShoppingCarList(true)
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
  //单选
  onSelClick(e){
    let index = e.currentTarget.dataset.index
    var item = this.data.productList[index]
    let sel = !item.sel
    let keyName = "productList[" + index + "].sel"

    var totalPrice 
    var totalScore 
    var singlePrice = this.accMul(Number.parseFloat(item.goods.price) , Number.parseInt(item.buyNum))
    var singleScore = this.accMul(Number.parseFloat(item.goods.score) , Number.parseInt(item.buyNum))
    if (sel){
      totalScore  = this.accAdd(this.data.totalScore , singleScore)
      totalPrice = this.accAdd(this.data.totalPrice , singlePrice)
    }else{
      totalScore = this.subtr(this.data.totalScore , singleScore)
      totalPrice = this.subtr(this.data.totalPrice , singlePrice)
    }


    this.setData({
      [keyName]: sel,
      totalPrice: totalPrice,
      totalScore: totalScore
    })

  },
  onItemTouchStart(e){
    let index = e.currentTarget.dataset.index;
    oldX = e.changedTouches[0].pageX;
    oldY = e.changedTouches[0].pageY;
    this.data.productList.forEach((v,i)=>{
      if (v.touchMove && index != i){
        v.touchMove = false;
        let key = "productList[" + i + "]"+".touchMove"
        this.setData({
          [key]: false
        })
      }
    })
  },
  onItemTouchMove(e) {
    let index = e.currentTarget.dataset.index;
    let start = { X: oldX, Y: oldY }
    let end = { X: e.changedTouches[0].pageX, Y: e.changedTouches[0].pageY }
    if (this._getAbsAngle(start, end)>30){
        return;
    }
    let currentItem = this.data.productList[index];
    let distance = this._getMoveDistance(start,end)
    if(distance>0){//往右
      currentItem.touchMove = false;
     
    } else if (distance < 0){//往左
      currentItem.touchMove = true;
    }else{
      return ;
    }
    
    let key = "productList[" + index +"]"
    this.data.productList[index].distance = distance;
    this.setData({
      [key]: this.data.productList[index]
    })

  },
  onItemTouchEnd(e) {
    let index = e.currentTarget.dataset.index;
    let start = { X: oldX, Y: oldY }
    let end = { X: e.changedTouches[0].pageX, Y: e.changedTouches[0].pageY }
    if (this._getAbsAngle(start, end) > 30) {
      return;
    }
    let currentItem = this.data.productList[index];

    let distance = this._getMoveDistance(start, end)

    if(Math.abs(distance)<delBtnWidth){
      if (distance >= 0) {//往右
          distance = 0
      } else {//往左
          distance = delBtnWidth * -1
        
      }
    }
   

    let key = "productList[" + index + "].distance"
    this.setData({
      [key]: distance
    })
  },
  _getAbsAngle(start,end){
    let _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return Math.abs(360 * Math.atan(_Y / _X) / (2 * Math.PI));
  },
  _getMoveDistance(start,end){
    return end.X - start.X;
  },
  //全选
  onSelAllClick(e){
    this.data.isSelAll = !this.data.isSelAll
    this.data.productList.forEach((v,i)=>{
      v.sel=this.data.isSelAll
    })
    this.setData({
      productList:this.data.productList,
      isSelAll:this.data.isSelAll
    })
    this._calcTotalPriceAndScore()
  },
  _getShoppingCarList(isRefresh){
    let page = isRefresh?1:++this.data.page
    api.request({
      url:"SHOPPING_CAR_LIST",
      method:"GET",
      param:{
        page:page
      },
      showLoading:true,
      callback:(b,json)=>{
        if(b){
          var productList = [] 
          if(isRefresh){
            wx.stopPullDownRefresh()
          }else{
            productList = this.data.productList
          }
          productList=productList.concat(json.data)
        

          this.setData({
            productList: productList
          })
          this._calcTotalPriceAndScore()
        }
      }
    })
  },
  _calcTotalPriceAndScore() {
    var totalPrice=0
    var totalScore=0
    this.data.productList.forEach(item =>{
      if(item.sel){
        totalPrice += this.accMul(Number.parseFloat(item.goods.price) ,Number.parseInt(item.buyNum))
        totalScore += this.accMul(Number.parseFloat(item.goods.score) ,Number.parseInt(item.buyNum))
      }
    })

    this.setData({
      totalScore: totalScore,
      totalPrice: totalPrice
    })
  }
  ,
  itemDel(e){
    var index = e.currentTarget.dataset.index
   
    api.request({
      url:"SHOPPING_CAR_DEL",
      method:"POST",
      showLoading:true,
      param:{
        shopcarId: this.data.productList[index].shopcarId
      },
      callback:(b,json)=>{
        if(b){
          this.data.productList.splice(index,1)
          this.setData({
            productList: this.data.productList
          })
          this._calcTotalPriceAndScore();

        }
      }
    })

  },
  toOrder(){
    if(this.data.productList.length==0){
      return
    }
    var selProduct=[]

    this.data.productList.forEach(item =>{
      if(item.sel){
        selProduct=selProduct.concat(item)
      }
    })
    if(selProduct.length==0){
       return 
    }

    wx.navigateTo({
      url: '/pages/order/orderConfirm?data=' + JSON.stringify(selProduct),
    })
  },
  itemCountUpdate(e){
    console.log(e)
    let newCount = e.detail.count
    let index = e.currentTarget.dataset.index
    this.data.productList[index].buyNum = newCount
    if(newCount==0){
      this.data.productList.splice(index,1)
    }
    this.setData({
      productList: this.data.productList
    })
    this._calcTotalPriceAndScore()
  },
  loadmore(){
    this._getShoppingCarList(false)
  },
  accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },
  //加法  
  accAdd(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  },
  //减法  
  subtr(arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);

  },
  toDetail(e){
    let index = e.currentTarget.dataset.index
    let item  = this.data.productList[index]
    wx.navigateTo({
      url: '/pages/product/productDetail?id=' + item.goods.id,
    })
  }

})