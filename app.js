// app.js
App({
  onLaunch() {
    this.identityId = 0;
  },
  globalData: {
    baseUrl: 'https://sport.bingcoke.com/sport/',
    user:{},
    systemInfo:{},
    identifyConfirm:0,
    currentSemester:''
  },
})