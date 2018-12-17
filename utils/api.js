
const _domain = "http://119.23.66.37/kalianfu_backend/public/";

const _urlList = {
  //微信登录
  WX_LOGIN : _domain + "api/user/third",
  //
  LOGIN: _domain + "api/user/login",
  //
  REGISTER: _domain + "api/user/register",
}

const requestTaskList = {}



var _request = function ({url,method,needToken,showLoading,param,callback}){
  let _url = _urlList[url]
  console.log(url, _urlList)

  let _method = method
  let _contentType = "application/x-www-form-urlencoded"
  if("POST_JSON"==method){
    _contentType = "application/json"
    _method = "POST"
  }
  wx.showLoading({
    title: '请等待。。。',
  })

  let currentDate = new Date().getMilliseconds()
  var requestTask = wx.request({
    url: _url,
    data: param,
    header: {
      "content-type":_contentType
    },
    method: _method,
    dataType: 'json',
    responseType: 'text',
    success:  (res)=> {
      console.log("url success",_url,res)
     },
    fail:  (res)=>{ 

      console.log("url fail", _url, res)

    },
    complete:  (res)=> {
      console.log("url complete", _url, res)

      wx.hideLoading()

      _pull(currentDate + url)
    },
  })
  _pull(currentDate+url, requestTask)

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