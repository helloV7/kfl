// pages/login/userInformation.js
import api from '../../utils/api.js'
var uploadFile = require('../../utils/uploadfile.js')
var COS = require('../../utils/cos-wx-sdk-v5.js')


var app = getApp()
let token
var cos 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      name:"",
      nickname:"",
      mobile:"",
      // province:"",
      city:"",
      // district:"",
      email:"",
      wechat:"",
      bankName:"",
      bankNo:"",
    },
    avatar:"",
    filePath:"",
    phone:"",
    region:[]
    ,fill: false
    ,userType:"1",
    code:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    token = options.token
  
    if(options.fill=="true"){
      wx.getStorage({
        key: 'userInfo',
        success: res => {
          if(res.data==null){
            return
          }
          Object.keys(this.data.form).forEach(key=>{
            this.data.form[key] = res.data[key]
            this.data.code = res.data["storeCode"]
          })

          let region = []
          if (this.data.form.city!=null)
            region = this.data.form.city.split("/")

          this.data.avatar = res.data.avatar
          this.setData({
            code:this.data.code,
            form: this.data.form,
            fill:options.fill,
            userType: options.userType,
            region:region,
            avatar:this.data.avatar
          })
        },
      })
    }else{
      let phone = options.phone
      this.data.form.mobile = phone
      this.setData({
        form:this.data.form
      })
    }

 

    cos = new COS({
      // ForcePathStyle: true, // 如果使用了很多存储桶，可以通过打开后缀式，减少配置白名单域名数量，请求时会用地域域名
      getAuthorization: function (options, callback) {
        var authorization = COS.getAuthorization({
          SecretId: 'AKIDA9yaRYQlwCKSamL6AS2QerwPScmZRFBA',
          SecretKey: 'DyFpUGaYluFafvNbaTtk48LOhtruzO2Y',
          Method: options.Method,
          Pathname: options.Pathname,
          Query: options.Query,
          Headers: options.Headers,
          Expires: 1800,
        });
        callback({
          Authorization: authorization,
          // XCosSecurityToken: credentials.sessionToken, // 如果使用临时密钥，需要传 XCosSecurityToken
        });
        // 异步获取签名
        // wx.request({
        //   url: api.urlList.GET_COS_SIGN,
        //   data: {
        //     Method: options.Method,
        //     Key: options.Key
        //   },
        //   dataType: 'json',
        //   success: function (result) {
        //     console.log(result)
        //     var data = result.data.data;
        //     var credentials = data.credentials;
        //     callback({
        //       TmpSecretId: credentials.tmpSecretId,
        //       TmpSecretKey: credentials.tmpSecretKey,
        //       XCosSecurityToken: credentials.sessionToken,
        //       ExpiredTime: data.expiredTime,
        //     });
        //   }
        // });
      }
    });
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
  ,
  bindRegionChange: function (e) {
    // this.data.form.province = e.detail.value[0]
    // this.data.form.city = e.detail.value[1]
    // this.data.form.district = e.detail.value[2]

    this.setData({
      region: e.detail.value
    })
  },
  onFinishClick(){
    if (this.data.form.name.length==0){
      app.showToast("请输入姓名")
      return
    }
    if (this.data.form.nickname.length == 0) {
      app.showToast("请输入昵称")

      return
    }
    if (this.data.form.email.length == 0) {
      app.showToast("请输入邮箱")
      return
    }
    // if (this.data.form.mobile.length == 0 && this.data.fill) {
    //   return
    // }
    if (this.data.region.length == 0) {
      app.showToast("请选择所属地")
      return
    }

    if (this.data.userType == "2"){
      if (this.data.form.wechat.length == 0) {
        app.showToast("请输入微信号")

        return
      }
      if (this.data.form.bankName.length == 0) {
        app.showToast("请输入开户行名称")

        return
      }
      if (this.data.form.bankNo.length == 0) {
        app.showToast("请输入卡号")

        return
      }
    }
  
    // let param = JSON.parse(JSON.stringify(this.data.form))
    this.data.form.city = this.data.region[0] + "/" + this.data.region[1] + "/" + this.data.region[2]
    delete this.data.form.mobile

  


   this.uploadImage().then(b=>{
     if(b){
       this.submitForm()
     }
   })



 
  },
  bindInput(e){
    let key = e.currentTarget.dataset.key
    this.setData({
      ["form."+key]:e.detail.value
    })
  },
  selImage(){
    // uploadFile()
  
    wx.chooseImage({
      count: 1,
      sizeType: [ 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=>{
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setData({
          avatar: tempFilePaths,
          filePath: tempFilePaths
        })
     
       ;       
      }
    })
  },
  submitForm(){
    return new Promise((resolve, reject) => {
      var header = {}
      if (token != null && token != "") {
        header.token = token
      }
      api.request({
        url: "FINISH_USER_INFO",
        method: "POST",
        showLoading: true,
        header: header,
        param: this.data.form,
        callback: (b, json) => {
          if (b) {
            wx.navigateBack({

            })
            app.showToast(json.msg)

          }
        }
      })
      
    })
  },
  uploadImage(){
    return new Promise((resolve, reject) => {

      var filePath = this.data.filePath
      console.log(filePath)
      if(filePath==""){
        resolve(true)
      }
      filePath = filePath[0]

      var filename = filePath.substr(filePath.lastIndexOf('/') + 1);

      cos.postObject({
        Bucket: 'appsoft-10028497',
        Region: 'ap-shanghai',
        Key: "avatar/"+filename,
        FilePath: filePath,
        onProgress:  (info)=> {
          console.log(JSON.stringify(info));
        }
      },  (err, data) =>{
        console.log(data)
        if (data != null && data.statusCode == 200) {
          this.data.form.avatar = "https://" + data.Location
          resolve(true)
        } else {
          app.showToast("上传失败")
          resolve(false)
        }
        wx.hideLoading()
        console.log(err, data);
      })
    });
  }
})