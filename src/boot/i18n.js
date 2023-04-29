import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'


// Create I18n instance
export const i18n = createI18n({
  locale: 'en-US',
  globalInjection: true,
  legacy: false,
  messages
})
export default ({ app }) => {
  

  // Tell app to use the I18n instance
  app.use(i18n)
}