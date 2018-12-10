// pages/home/home.js

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
const productList = [testBannerImage, testBannerImage, testBannerImage, testBannerImage, testBannerImage];
Component({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImages: [testBannerImage, testBannerImage],
    topGridList: topGridList,
    productList: productList,
    isShowFloatBtn:true
  },
  methods:{
    _onBannerClick(e){
      console.log("banner click",e);
    },
    _onTopGridItemClick(e){
      var url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: url,
      })
    }
  }

})