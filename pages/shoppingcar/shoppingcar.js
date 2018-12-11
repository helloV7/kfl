// pages/shoppingcar/shoppingcar.js
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
    productList:[
      mockData, mockData,mockData
    ],
    isSelAll:false
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
  onSelClick(e){
    let index = e.currentTarget.dataset.index
    let sel = !this.data.productList[index].sel
    let keyName = "productList[" + index + "].sel"
    this.setData({
      [keyName]: sel
    })
  },
  onItemTouchStart(e){
    let index = e.currentTarget.dataset.index;
    oldX = e.changedTouches[0].pageX;
    oldY = e.changedTouches[0].pageY;
    this.data.productList.forEach((v,i)=>{
      if (v.touchMove && index != i){
        v.touchMove = false;
        return ;
      }
    })

    this.setData({
      productList: this.data.productList
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
    console.log(e)
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
    console.log(distance, delBtnWidth)
   

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
      productList:this.data.productList
    })
  }
})