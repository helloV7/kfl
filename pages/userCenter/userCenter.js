// pages/userCenter/userCenter.js
import api from '../../utils/api.js'
var app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    refresh:{
      type:String,
      value:"1",
      observer: function (newVal, oldVal, changedPath){
        if(newVal=="1"){
          this.refresh()
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo:{},
    unreadCount:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    refresh() {
      this._getUserInfo()
      this._getUnReadMessageCount()
    },
    _getUserInfo() {
      api.request({
        url: "USER_CENTER",
        method: "GET",
        callback: (b, json) => {
          if (b) {
            this.setData({
              userInfo: json.data,
              refresh: "0"
            
            })
            wx.setStorage({
              key: 'userInfo',
              data: json.data
            })
          }
        }
      })
    },
    onMessageClick(e){
      wx.navigateTo({
        url: '/pages/message/message',
      })
    },
    _getUnReadMessageCount(){
      api.request({
        url:"UNREAD_MESSAGE_COUNT",
        method:"GET",
        callback:(b,json)=>{
          if(b){
             this.setData({
               unreadCount:json.data
               })
          }
        }
      })
    },
    navToApplay() {
      if (this.data.userInfo.userType == "1"){
        wx.navigateTo({
          url: '/pages/userCenter/applyForBeautician?jump=true',
        })
      }
    },
    navToUserInfo(){
    
      wx.navigateTo({
        url: '/pages/login/userInformation?fill=true&userType=' + this.data.userInfo.userType,
      })
    },
    navToMyWallet(){
      wx.navigateTo({
        url: '/pages/wallet/myWallet',
      })
    },
    navToMyScore(){
      wx.navigateTo({
        url: '/pages/score/myScore',
      })
    },
    navToResetCode(){
      wx.navigateTo({
        url: '/pages/userCenter/applyForBeautician',
      })
    },
    navToOrderList(e){
      let type = e.currentTarget.dataset.type

      wx.navigateTo({
        url: '/pages/order/orderList?type='+ type,
      })
    },
    navToAddressList(e){
      wx.navigateTo({
        url: '/pages/address/addressListManagement',
      })
    },
    navToRank(){
      wx.navigateTo({
        url: '/pages/userCenter/rank',
      })
    }


   
  },
  attached(){
    this.refresh()
  }

})
