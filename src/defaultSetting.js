module.exports = {
  proxyUrl: 'http://localhost:8086',
  // proxyUrl: 'http://beta.vendetech.com/api',
  base: '/dist',
  title: '工时',
  development: {
    baseUrl: 'http://localhost:8000'
  },
  production: {
    baseUrl: 'http://app.vendetech.com',
  },
}



