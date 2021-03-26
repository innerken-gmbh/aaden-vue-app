module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.aaden.app.vue',
        productName: 'Aaden-Vue',
        copyright: 'Copyright InnerKen GmbH 2019', // 版权信息
        win: {
          target: 'nsis'
        }
      },
      nodeIntegration: true
    },
    i18n: {
      locale: 'zh',
      fallbackLocale: 'de',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  publicPath: './',
  transpileDependencies: [
    'vuetify'
  ]
}
