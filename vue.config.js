const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        // 将@import "~@/styles/variables.scss";自动注入到单文件的css中
        // 共享全局样式变量
        additionalData: '@import "~@/styles/variables.scss";'
      }
    }
  },
  // 在当前api服务器不支持cors时，需要使用到代理服务器
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true // 把请求头中的 host 配置为 target
      },
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true
      }
    }
  }
})
