module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.aaden.app.vue',
        productName: 'Aaden-Vue',
        copyright: 'Copyright © 2019', // 版权信息
        linux: {
          target: 'snap'
        },
        win: {
          target: 'nsis'
        },
        publish: 'always',
        snap: {
          autoStart: true,
          grade: 'stable',
          publish: [
            {
              provider: 'snapStore',
              channels: 'stable'
            }
          ]
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
