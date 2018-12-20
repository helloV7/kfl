//app.js
 import api from '/utils/api.js'
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null
  },
  showToast(message){
    if(message!=null && message!='')
    wx.showToast({
      title: message,
      icon:'none'
    })
  }
  
})