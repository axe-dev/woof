import { App } from 'vue'
import { createI18n } from 'vue-i18n'
// import i18n resources
import en from '../../locales/en.json'
import zhCN from '../../locales/zh-CN.json'

export default (app: App) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
      en,
      'zh-CN': zhCN,
    },
  })

  app.use(i18n)
}
