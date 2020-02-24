const port = 8080
// dev port
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
  outputDir: 'admin_study_ui',
  assetsDir: 'assets',
  lintOnSave: process.env.NODE_ENV === 'development',
  filenameHashing: false,
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: null
    // 配置代理 （以接口 https://www.easy-mock.com/mock/5ce2a7854c85c12abefbae0b/api 说明）
    // proxy: {
    //   '/api': {
    //     target: process.env.VUE_APP_URL,
    //     changeOrigin: true, // 是否改变域名
    //     ws: true
    //     // pathRewrite: {
    //     //   // 路径重写
    //     //   "/api": "" // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
    //     // }
    //   }
    // }
  }
}
