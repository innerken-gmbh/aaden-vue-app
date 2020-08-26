import i18n from '../i18n'
export default {
  list: [
    {
      id: 0,
      name: i18n.t('打印失败')
    }, {
      id: 1,
      name: i18n.t('打印成功')
    }, {
      id: 2,
      name: i18n.t('验证错误')
    }, {
      id: 3,
      name: i18n.t('单子格式不合规范')
    }, {
      id: 4,
      name: i18n.t('正在打印')
    }, {
      id: 5,
      name: i18n.t('网络错误')
    }, {
      id: 6,
      name: i18n.t('等待商米打印机打印')
    }
  ],
  getList: function () {
    return this.list
  }
}
