// pages/userCenter/userCenter.js
import api from '../../utils/api.js'
var app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    refresh:{
      type:Boolean,
      value:true,
      observer: function (newVal, oldVal, changedPath){
        if(newVal){
          this.refresh()
          this.setData({
            refresh:false
          })
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
              userInfo: json.data
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
    }
   
  },
  attached(){
    this.refresh()
  },
  
})
