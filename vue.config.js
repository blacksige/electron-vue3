const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: './',
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@assets', '@/assets')
  },
  devServer: {
    port: 9090,
    proxy: {
      '/nodeapp': {
        target: 'http://10.100.0.68:3000',
        pathRewrite: { '^/nodeapp/': '/' },
      }
    }
  }
})
