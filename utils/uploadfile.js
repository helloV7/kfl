var CosAuth = require('./cos-auth.js');
import api from "./api.js"
var config={
  cosurl: api.urlList.GET_COS_SIGN,
  Bucket: 'appsoft-10028497',
  Region: 'ap-shanghai',
}


var uploadFile = function (uploadCallback) {
  // 请求用到的参数
  // var prefix = 'https://cos.' + config.Region + '.myqcloud.com/' + config.Bucket + '/'; // 这个是后缀式，签名也要指定 Pathname: '/' + config.Bucket + '/'
  var prefix = 'https://' + config.Bucket + '.cos.' + config.Region + '.myqcloud.com';


  // 对更多字符编码的 url encode 格式
  var camSafeUrlEncode = function (str) {
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A');
  };

  // 获取临时密钥
  var stsCache;
  var getCredentials = function (callback) {
    if (stsCache && Date.now() / 1000 + 30 < stsCache.expiredTime) {
      console.log("111")
      callback();
      return;
    }
    wx.request({
      method: 'GET',
      url: config.cosurl, // 服务端签名，参考 server 目录下的两个签名例子
      dataType: 'json',
      success: function (result) {
        var data = result.data.data;
        console.log(data)
        var credentials = data.credentials;
        if (credentials) {
          stsCache = data
        } else {
          wx.showModal({ title: '临时密钥获取失败', content: JSON.stringify(data), showCancel: false });
        }
        callback(stsCache && stsCache.credentials);
      },
      error: function (err) {
        wx.showModal({ title: '临时密钥获取失败', content: JSON.stringify(err), showCancel: false });
      }
    });
  };

  // 计算签名
  var getAuthorization = function (options, callback) {
    getCredentials(function (credentials) {
      callback({
        XCosSecurityToken: credentials.sessionToken,
        Authorization: CosAuth({
          SecretId: credentials.tmpSecretId,
          SecretKey: credentials.tmpSecretKey,
          Method: options.Method,
          Pathname: options.Pathname,
        })
      });
    });
  };

  // 上传文件
  var uploadFile = function (filePath) {
    console.log(filePath)
    var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
    getAuthorization({ Method: 'POST', Pathname: '/' }, function (AuthData) {
      var requestTask = wx.uploadFile({
        url: prefix,
        name: 'file',
        filePath: filePath,
        formData: {
          'key': Key,
          'success_action_status': 200,
          'Signature': AuthData.Authorization,
          'x-cos-security-token': AuthData.XCosSecurityToken,
          'Content-Type': '',
        },
        success: function (res) {
          var url = prefix + camSafeUrlEncode(Key).replace(/%2F/g, '/');
          console.log(res)
          if (uploadCallback != null) {
            uploadCallback(res.statusCode === 200, url)
          }

          if (res.statusCode === 200) {
           
            // wx.showModal({ title: '上传成功', content: url, showCancel: false });
          } else {
            // wx.showModal({ title: '上传失败', content: JSON.stringify(res), showCancel: false });
          }
          console.log(res.statusCode);
          console.log(url);
        },
        fail: function (res) {
          // wx.showModal({ title: '上传失败', content: JSON.stringify(res), showCancel: false });
          uploadCallback(false,null)
        }
      });
      requestTask.onProgressUpdate(function (res) {
        console.log('正在进度:', res);
      });
    });
  };

  // 选择文件
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original'], // 可以指定是原图还是压缩图，这里默认用原图
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      uploadFile(res.tempFiles[0].path);
    }
  })
};

module.exports = uploadFile;