//index.js
//获取应用实例
const app = getApp()
let resourcePath = "/resource/image";
import api from '../../utils/api.js'
Page({
  data: {
    currentTab:0,
     iconHomeNormal : resourcePath + "/ic_main_tab_home_normal.png",
     iconHomePressed : resourcePath + "/ic_main_tab_home_pressed.png",
     iconScanQRCodeNormal : resourcePath + "/ic_main_tab_code_normal.png",
     iconScanQRcodePressed : resourcePath + "/ic_main_tab_code_pressed.png",
     iconShoppingNormal : resourcePath + "/ic_main_tab_shopping_normal.png",
     iconShoppingPressed : resourcePath + "/ic_main_tab_shopping_pressed.png",
     iconUserCenterNormal : resourcePath + "/ic_main_tab_user_center_normal.png",
     iconUserCenterPressed : resourcePath + "/ic_main_tab_user_center_pressed.png",
     iconMoreNormal : resourcePath + "/ic_main_tab_more_normal.png",
     iconMorePressed : resourcePath + "/ic_main_tab_more_pressed.png",
     windowHeight:0,
    refreshUserCenter:"1"
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          windowHeight:res.windowHeight
        })
      },
    })
  },
  onShow(){
    if (this.data.currentTab == 3) {
      this.setData({
        refreshUserCenter: "1"
      })
    }
  },
  onTabClick(e){
    var tabIndex = e.currentTarget.dataset.tabIndex;

    if(tabIndex==1){
      //二维码扫描
      this._scan()
      return;
    }

  
    if(this.data.currentTab==tabIndex){
      return;
    }
    if (tabIndex == 3) {
      this.setData({
        refreshUserCenter: "1"
      })
    }
    
    this.setData({
      currentTab:tabIndex
    })
  },
  _scan(){
    // 只允许从相机扫码       onlyFromCamera: true,

    wx.scanCode({
      success(res) {
        // console.log(res)
        _validateCode(res)
      }
    })
  },
  _validateCode(code){
    api.request({
      url:"VALIDATE_QRCODE",
      method:"GET",
      param:{
        code:code
      },
      callback:(b,json)=>{
        if(b){
          wx.navigateTo({
            url: '/pages/scan/scanResult?data='+JSON.stringify(json.data)+"&code="+code,
          })
        }
      }
    })
  }
})
