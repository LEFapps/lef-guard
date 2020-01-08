Package.describe({
  summary: 'Guard the functions you care about',
  version: '0.1.5',
  name: 'lef:guard'
})

Package.onUse(api => {
  api.use(['ecmascript', 'lef:utils'])
  api.mainModule('client.js', 'client')
  api.mainModule('server.js', 'server')
  api.export('Rules', 'server')
})
