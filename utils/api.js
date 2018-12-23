const _domain = "http://119.23.66.37/kalianfu_backend/public/";
var isShowLoading  = false
const _urlList = {
  //微信登录
  WX_LOGIN : _domain + "api/user/third",
  //普通登录
  LOGIN: _domain + "api/user/login",
  //注册
  REGISTER: _domain + "api/user/register",
  //获取验证码
  GET_CAPTCHA:_domain + "api/sms/send",
  //校验验证码
  VALIDATE_CAPTCHA: _domain + "api/sms/check",
  //重置密码
  RESET_PWD: _domain + "api/user/resetpwd",
  //首页
  HOME_INDEX:_domain + "api/home/index",
  //尊享
  FREE_ENJOY:_domain + "do_free_score",
  //商品详情
  PRODUCT_DETAIL: _domain + "api/goods/detail",
  //购物车列表
  SHOPPING_CAR_LIST: _domain + "api/shop_car/index",
  //添加购物车
  SHOPPING_CAR_ADD: _domain + "api/shop_car/add",
  //删除购物车
  SHOPPING_CAR_DEL: _domain + "api/shop_car/delete",
  //更新购物车
  SHOPPING_CAR_UPDATE: _domain + "api/shop_car/update",
  //用户信息
  USER_CENTER: _domain +"api/user/index",
  //消息列表
  MESSAGE_LIST: _domain + "api/message/index",
  //未读消息数量
  UNREAD_MESSAGE_COUNT : _domain + "api/message/get_not_read_number",
  //礼品类型
  PERSENT_TYPE: _domain + "api/gift/category",
  //礼品列表
  PRESENT_PRODUCT_LIST: _domain + "api/gift/index",
  //活动详情
  ACTIVITY_DETAIL: _domain + "api/activition/detail",
  //校验二维码
  VALIDATE_QRCODE: _domain + "api/sweep/check",
  //扫描二维码提交
  SUBMIT_SCAN_RESULT: _domain + "api/sweep/exchange",
  //系统静态文本
  SYSTEM_SETTING_INFO: _domain + "api/index/text",
  //意见反馈提交
  FEEDBACK_SUBMIE: _domain + "api/opinion/add",
  //品牌介绍
  BRAND_INTRODUCE: _domain + "api/brand/index",
  //产品中心 分类
  PRODUCT_TYPE: _domain + "api/product/category",
  //产品列表 
  PRODUCT_LIST_OF_TYPE: _domain + "api/product/index",
  //应季主题
  SEASON_PRODUCT_LIST: _domain + 'api/season/index',
  //获取默认地址
  GET_DEFAULT_ADDRESS: _domain + "api/address/get_default",
  //添加 修改地址
  SAVE_ADDRESS: _domain +"api/address/handle",
  //删除地址
  DEL_ADDRESS: _domain +"api/address/delete",
  //设置默认地址
  SET_DEFAULT_ADDRESS: _domain + "api/address/setDefault",
  //
  CALC_ORDER_PRICE: _domain + "api/order/get_track_price_score",

  
}

const requestTaskList = {}



var _request = function ({url,method,noToken,showLoading,param,callback,header}){
  let _url = _urlList[url]
  let _method = method
  let _contentType = "application/x-www-form-urlencoded"
  if("POST_JSON"==method){
    _contentType = "application/json"
    _method = "POST"
  }
  // if (!isShowLoading && showLoading){ 
  if (showLoading) { 
    wx.showLoading({
      title: '请等待。。。',
    })
  }

  var _header = header==null?{}:header
  _header["content-type"]= _contentType
  
  if (!noToken){
    _header["token"]=wx.getStorageSync("userInfo").token;
  }

  let currentDate = new Date().getMilliseconds()
  var requestTask = wx.request({
    url: _url,
    data: param,
    header: _header,
    method: _method,
    dataType: 'json',
    responseType: 'text',
    success:  (res)=> {
      // console.log("url success",_url,res)
     },
    fail:  (res)=>{ 

      // console.log("url fail", _url, res)

    },
    complete:  (res)=> {
      if (showLoading) {
        wx.hideLoading()
      }
      if(res.statusCode==200){
        //code是3的时候是登陆失效，4的时候是要绑定手机号，1是正常，0是异常
        if(res.data.code==1){
          callback(true,res.data)
        }else{
          callback(false, res.data)
          showToast(res.data.msg)
        }
      }else{
        showToast("网络异常")
      }

      console.log("url complete", _url, res)

      // isShowLoading = false
     
      _pull(currentDate + url)
    },
  })
  _push(currentDate+url, requestTask)

}

function showToast(message) {
  // app.showToast(message)
  wx.showToast({
    title: message,
    icon:'none'
  })
}


var _push = (key,value)=>{
  requestTaskList[key]=value
}
var _pull = (key)=>{
  let task = requestTaskList[key]
  if (task!=null){
    task.abort()
  }
  delete requestTaskList[key]
}



module.exports = {
  request: _request,
}