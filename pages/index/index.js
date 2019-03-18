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
    refreshUserCenter:"1",
    refreshPresent:"1",
    refreshHome:"1",
    forceBind:true
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight:res.windowHeight
        })
      },
    })
    this.data.bindPhone = options.bindPhone || true

    console.log("load")
  },
  onShow(){

    console.log("bindPhone",this.data.bindPhone)
    if (!this.data.bindPhone){
      this.data.bindPhone = true
      wx.navigateTo({
        url: '/pages/login/bindPhone?force=true',
      })
   }
    // if (this.data.currentTab == 3) {
    if (this.data.refreshPresent=="1"){
      this.setData({
        refreshPresent:"1"
      })
    }
    if (this.data.refreshHome=="1"){
      this.setData({
        refreshHome:"1"
      })
    }



      this.setData({
        refreshUserCenter: "1"
      }) 
    // }
    if (this.data.currentTab == 2) {
      this.setData({
        refreshPresent: "1"
      })
    }
  console.log("show")
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
    }else
    if (tabIndex == 2){
      this.setData({
        refreshPresent:"1"
      })
    }
    
    this.setData({
      currentTab:tabIndex
    })
  },
  _scan(){

    // var mock = {
    //   goodsName:"222",
    //   score:222,
    //   balance:333
    // }
    // wx.navigateTo({
    //   url: '/pages/scan/scanResult?data=' + JSON.stringify(mock) + "&code=500"  ,
    // })
    let userInfo = wx.getStorageSync("userInfo")
    if(userInfo==null){
      wx.redirectTo({
        url: '/pages/login/login',
      })
      app.showToast("请先登录")
      return
    }
    if (userInfo.mobile.length == 0) {
      wx.navigateTo({
        url: '/pages/login/bindPhone',
      })
      app.showToast("请先绑定手机号")
      return
    }
    // if (userInfo.isfix!="1") {
    //   wx.navigateTo({
    //     url: '/pages/login/userInformation?fill=true&userType='+userInfo.userType,
    //   })
    //   app.showToast("请先完善个人信息")
    //   return
    // }
 

    // this._validateCode(10086)
    // 只允许从相机扫码       onlyFromCamera: true,

    wx.scanCode({
      success:(res)=>{
        // console.log(res)
        if(res!=null){
          this._validateCode(res.result)
        }else{
          app.showToast("无法识别")
        }
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
