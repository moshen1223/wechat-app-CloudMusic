let app = getApp();
const ERROR_CODE = 200;
let sliderWidth = 96, pageCount = 1,lock = false;

Page({
  data:{
    tabs:['个性推荐','歌单','主播电台','排行榜'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    bannerList:[],
    recommendList:[],
    currentDate: new Date().getDate(),
    privatecontentList: [],
    recommendMv:[],
    djprogramList: [],
    songList: [],
  },

  onLoad:function(){
    this.getSystemInfo();
  },

  onReady:function(){
    this.fetchRecommendData();
  },
  // 上拉加载更多
  onReachBottom:function(){
    pageCount++;
    this.fetchSongList(pageCount);
  },
  // 获取系统信息
  getSystemInfo(){
    let that = this;
    wx.getSystemInfo({
        success: function(res) {
            that.setData({
                sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
        }
    });
  },
  // 获取个性推荐数据
  fetchRecommendData(){
    let that = this;
    // 个性推荐banner
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
    // 个性推荐歌单
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
    // 个性推荐独家放送
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
    // 个性推荐MV
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
    // 个性推荐电台
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
  // 获取歌单
  fetchSongList(num){
    let that = this;
    if(lock == true) return;
    wx.request({
      url: app.api.url+'/top/playlist',
      data: {
        'limit': 20*num,
        'order': 'hot'
      },
      method: 'GET',
      // header: {},
      success: function(res){
        res = res.data;
        if(res.code === ERROR_CODE){
          that.setData({
            songList : res.playlists
          })
        }
      },
      fail: function() {

      },
      complete: function() {
        lock = false;
      }
    });
  },
  // 主播电台
  fetchMVData(){
    let that = this;
  },
  // 排行榜
  fetchTopData(id){
    let that = this;
    wx.request({
      url: app.api.url+'/top/list',
      data: {
        'idx': id,
      },
      method: 'GET',
      // header: {},
      success: function(res){
        res = res.data;
        if(res.code === ERROR_CODE){
          that.setData({
            songList : res.playlists
          })
        }
      },
      fail: function() {

      },
      complete: function() {
      }
    });
  },
  // 分享
  onShareAppMessage: function() {
    return {
      title: '', // 分享标题
      desc: '', // 分享描述
      path: '' // 分享路径
    }
  },

  tabClick: function(e){
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
    switch (this.data.activeIndex) {
      case '0':
        this.fetchRecommendData();
        break;
      case '1':
        this.fetchSongList(pageCount);
        break;
      case '2':
        this.fetchMVData();
        break;
      default:
        return false;
    }
  }
})
