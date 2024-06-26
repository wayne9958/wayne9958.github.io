import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

loadFonts()

createApp(App).use(ElementPlus).use(store).use(store)
  .use(router)
  .use(vuetify)
  .mount('#app')
