let app = getApp();
const ERROR_CODE = 200;
Page({
  data:{
    bannerList:[],
    recommendList:[],
    currentDate: new Date().getDate(),
    privatecontentList: [],
    recommendMv:[],
    djprogramList: [],
  },
  onLoad:function(){
    var that = this;
    wx.request({
      url: app.api.url+'/banner',
      data: {},
      method: 'GET',
      // header: {},
      success: function(res){
        res = res.data;
        if(res.code === ERROR_CODE){
          that.setData({
            bannerList : res.banners
          })
        }
      },
      fail: function() {

      },
      complete: function() {
      }
    });
  },
  onReady:function(){
    var that = this;
    wx.request({
      url: app.api.url+'/personalized',
      method: 'GET',
      success: function(res){
        res = res.data;
        if(res.code === ERROR_CODE){
          that.setData({
            recommendList: res.result
          })
        }
      },
      fail: function(){

      },
      complete: function(){

      }
    });
    wx.request({
      url: app.api.url+'/personalized/privatecontent',
      method: 'GET',
      success: function(res){
        res = res.data;
        if(res.code === ERROR_CODE){
          that.setData({
            privatecontentList: res.result
          })
        }
      },
      fail: function(){

      },
      complete: function(){

      }
    });
    wx.request({
      url: app.api.url+'/personalized/privatecontent',
      method: 'GET',
      success: function(res){
        res = res.data;
        if(res.code === ERROR_CODE){
          that.setData({
            privatecontentList: res.result
          })
        }
      },
      fail: function(){

      },
      complete: function(){

      }
    });
    wx.request({
      url: app.api.url+'/personalized/mv',
      method: 'GET',
      success: function(res){
        res = res.data;
        if(res.code === ERROR_CODE){
          that.setData({
            recommendMv: res.result
          })
        }
      },
      fail: function(){

      },
      complete: function(){

      }
    });
    wx.request({
      url: app.api.url+'/personalized/djprogram',
      method: 'GET',
      success: function(res){
        res = res.data;
        if(res.code === ERROR_CODE){
          that.setData({
            djprogramList: res.result
          })
        }
      },
      fail: function(){

      },
      complete: function(){

      }
    });
  },
  onShareAppMessage: function() {
    return {
      title: '', // 分享标题
      desc: '', // 分享描述
      path: '' // 分享路径
    }
  },

})
