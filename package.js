Package.describe({
  summary: 'Guard the functions you care about',
  version: '0.0.1',
  name: 'lef:guard'
})

Package.onUse(api => {
  api.use(['ecmascript'])
  api.mainModule('client.js', 'client')
  api.mainModule('server.js', 'server')
})

Npm.depends({
  react: '16.5.2',
  lodash: '4.17.10'
})
