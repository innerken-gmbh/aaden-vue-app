module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.aaden.app',
        productName: 'Aaden Desktop',
        copyright: 'Copyright InnerKen GmbH 2019-2024', // 版权信息
        linux: {
          target: 'snap'
        },
        win: {
          target: 'nsis',
          publish: ['github']
        },
        snap: {
          autoStart: true,
          grade: 'stable',
          publish: [
            {
              provider: 'snapStore',
              repo: 'aaden',
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
