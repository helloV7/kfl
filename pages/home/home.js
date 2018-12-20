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
    url: "",
    name: "产品中心",
    image: "/resource/image/ic_circle_home_product_center@2x.png",
  },
  {
    url: "",
    name: "应季主题",
    image: "/resource/image/ic_circle_home_seasonal_main_push@2x.png",
  },
  {
    url: "/pages/login/login",
    name: "注册登录",
    image: "/resource/image/ic_circle_home_register_login@2x.png",
  },
  {
    url: "",
    name: "会员福利",
    image: "/resource/image/ic_circle_home_membership_benefits@2x.png",
  },
  {
    url: "",
    name: "手机官网",
    image: "/resource/image/ic_circle_home_web@2x.png",
  }
]
Component({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    topGridList: topGridList,
    productList: [],
    isShowFloatBtn:true,
    floatBtnData:null
  },
  methods:{
    _onTopGridItemClick(e){
      var url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: url,
      })
    } ,
    onCloseFloatBtnClick(e) {
      this.setData({
        isShowFloatBtn: false
      })
    },
    onItemClick(e) {
      let id = e.currentTarget.dataset.id

      wx.navigateTo({
        url: '/pages/product/productDetail?id=' + id,
      })
    },
    onBannerClick(e) {
      let index = e.currentTarget.dataset.index

      let banner = this.data.banner[index]

      switch (banner.slideType) {
        case "1":

          break;
        case "2":
          wx.navigateTo({
            url: '/pages/product/productDetail?id=' + banner.extra,
          })
          break;
      }
    },
    onFloatBtnClick() {
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
              isShowFloatBtn: false
            })
            app.showToast(res.msg)
          }
        }
      })
    }
  },
  attached:function(){
    api.request({
      url: "HOME_INDEX",
      method:"GET",
      callback:(b,json)=>{
        if(b){
          this.setData({
            banner:json.data.slide,
            productList:json.data.activition,
            floatBtnData: json.data.freeScore
          })
        }
      }
    })
  },
 


})