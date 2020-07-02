module.exports = {
  // proxyUrl: 'http://192.168.2.59:8086',
  proxyUrl: 'http://beta.vendetech.com/tsms/api',

  // portalUrl: 'http://192.168.2.59:8087',
  portalUrl: 'http://beta.vendetech.com/api',

  base: '/dist',
  title: '工时',
  development: {
    baseUrl: 'http://localhost:8000'
  },
  production: {
    baseUrl: 'http://app.vendetech.com',
  },
}



