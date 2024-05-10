const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  pluginOptions: {
     electronBuilder: {
      customFileProtocol: './'
     }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@assets', '@/assets')
  }
})
