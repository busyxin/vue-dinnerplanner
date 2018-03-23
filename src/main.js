import Vue from 'vue'
import App from './App'
import AtComponents from 'at-ui'
import 'at-ui-style'
import router from './router'

Vue.use(AtComponents)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
