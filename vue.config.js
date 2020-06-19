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
        publish: 'always',
        snap: {
          autoStart: true,
          grade: 'devel',
          publish: [
            {
              provider: 'snapStore',
              channels: 'beta'
            }
          ]
        }
      }
    },
    i18n: {
      locale: 'zh',
      fallbackLocale: 'de',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
