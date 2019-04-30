import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Ionic from '@ionic/vue';

Vue.use(Ionic);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
