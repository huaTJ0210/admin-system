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
    // 次代理仅针对本地开发服务（npm run serve）
    proxy: {
      /* http://eduboss.lagounews.com/boss/doc.html#/home */
      '/boss': {
        target: 'http://eduboss.lagounews.com',
        changeOrigin: true // 把请求头中的 host 配置为 target
      },
      '/front': {
        /* http://eduboss.lagounews.com/front/doc.html#/home */
        target: 'http://eduboss.lagounews.com',
        changeOrigin: true
      }
    }
  }
})
