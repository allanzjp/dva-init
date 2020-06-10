module.exports = {
  proxyUrl: '/aaa',
  iconFontUrl: '//at.alicdn.com/t/font_1528473_crnzaxqh8sf.js',
  title: '工时',
  development: {
    baseUrl: 'http://localhost:8080',
    // baseUrl: 'http://192.168.101.133:8080'
  },
  production: {
    baseUrl: 'http://app.vendetech.com:8680/tsapi',
    // baseUrl: 'http://139.9.234.102:8680/tsapi',
  },

  
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#FD4500', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: false, // sticky siderbar
  menu: {
    disableLocal: false,
  },
  pwa: false
}



