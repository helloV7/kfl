// pages/home/home.js
import api from '../../utils/api.js'
var app = getApp()
const testBannerImage = "https://thumbimage.tantupix.com/o_1bsmghu4buqj1re91mva1p7uqlu9.jpg-topimg?_="

const topGridList = [
  {
    url:"/pages/home/brandIntroduce",
    name:"品牌介绍",
    image:"/resource/image/ic_circle_home_brand_introduction@2x.png",
  },
  {
    url: "/pages/home/productCenter2",
    name: "产品中心",
    image: "/resource/image/ic_circle_home_product_center@2x.png",
  },
  {
    url: "/pages/home/seasonTheme",
    name: "应季主推",
    image: "/resource/image/ic_circle_home_seasonal_main_push@2x.png",
  },
  {
    url: "/pages/login/login",
    name: "注册登录",
    image: "/resource/image/ic_circle_home_register_login@2x.png",
  },
  {
    url: "/pages/home/promotionActivity",
    name: "会员福利",
    image: "/resource/image/ic_circle_home_membership_benefits@2x.png",
  },
  {
    url: "/pages/home/officialWebsite",
    name: "手机官网",
    image: "/resource/image/ic_circle_home_web@2x.png",
  }
]
Component({
  properties: {
    refresh: {
      type: String,
      value: "1",
      observer: function (newVal, oldVal, changedPath) {
        if (newVal == "1") {
          this.refresh()
        }
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    topGridList: topGridList,
    productList: [],
    isShowFloatBtn:true,
    floatBtnData:null,
    showScoreDialog:false,
    floatBtnScore:"0",
    flatBtnImage:null
  },
  methods:{
    _onTopGridItemClick(e){
      var url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: url,
      })
    } ,
    onScoreDialogHide(e){
      
    },
    onCloseFloatBtnClick(e) {
      this.setData({
        isShowFloatBtn: false,
      })
    },
    onItemClick(e) {
      let id = e.currentTarget.dataset.id

      wx.navigateTo({
        url: '/pages/activity/activityDetail?id=' + id,
      })
    },
    onBannerClick(e) {
      let index = e.currentTarget.dataset.index

      let banner = this.data.banner[index]

      switch (banner.slideType) {
        case "1":
          wx.navigateTo({
            url: '/pages/home/webview?src=' + banner.extra,
          })
          break;
        case "2":
          wx.navigateTo({
            url: '/pages/product/productDetail?id=' + banner.extra,
          })
          break;
      }
    },
    onFloatBtnClick() {
      let userInfo = wx.getStorageSync("userInfo")
      if(userInfo==null){
        return
      }
      if (userInfo.mobile.length == 0) {
        wx.navigateTo({
          url: '/pages/login/bindPhone',
        })
        app.showToast("请先绑定手机号")
        return
      }
      if(userInfo.isfix!="1"){
        wx.navigateTo({
          url: '/pages/login/userInformation?fill=true&userType='+userInfo.userType,
        })
        app.showToast("请完善资料")
       
        return 
      }
  
      api.request({
        url: "FREE_ENJOY",
        method: "POST",
        showLoading: true,
        param: {
          id: this.data.floatBtnData.id
        },
        callback: (b, res) => {
          if (b) {
            this.setData({
              isShowFloatBtn: false,
              showScoreDialog:true,
              floatBtnScore:res.data.score
            })

            app.showToast(res.msg)
          }
        }
      })
    },
    refresh(){
      api.request({
        url: "HOME_INDEX",
        method: "GET",
        callback: (b, json) => {
          if (b) {
            let showFBtn = false
            if (json.data.freeScore) {
              showFBtn = true
            }

            this.setData({
              banner: json.data.slide,
              productList: json.data.activition,
              floatBtnData: json.data.freeScore,
              isShowFloatBtn: showFBtn,
            })
          }
          this.setData({
            refresh: "0"
          })
        }
      })
    }
  },
  attached:function(){
    this.refresh()
  },

 


})