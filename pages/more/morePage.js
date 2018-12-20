// pages/more/morePage.js
import api from '../../utils/api.js'
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showDialDialog:false,
    showLogoutDialog:false,
    phone:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDialDialog(){
        this.setData({
          showDialDialog:true
        })
    },
    hideDialDialog(){
      this.setData({
        showDialDialog: false
      })
    },
    showLogoutDialog(){
      this.setData({
        showLogoutDialog: true
      })
    },
    hideLogoutDialog(){
      this.setData({
        showLogoutDialog: false
      })
    },
    onLogoutConfirm(){
      this.hideLogoutDialog()
      wx.clearStorage()
      wx.redirectTo({
        url: '/pages/login/login',
      })

    },
    onDialConfirm(){
      wx.makePhoneCall({
        phoneNumber: this.data.phone 
      })
      this.hideDialDialog()
    },
    toFeedback(){
      wx.navigateTo({
        url: '/pages/more/feedback',
      })
    },
    toQACenter(){
      wx.navigateTo({
        url: '/pages/more/qaCenter',
      })
    }

  },
  attached(){
    api.request({
      url:"SYSTEM_SETTING_INFO",
      method:"GET",
      param:{
        name:"systemMobile"
      },
      callback:(b,json)=>{
        if(b){
          this.setData({
            phone : json.data
          })
        }
      }
    })
  }
})
