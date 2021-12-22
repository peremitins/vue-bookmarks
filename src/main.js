// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Notifications from 'vue-notification';
import Vuelidate from 'vuelidate';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import App from './App';
import router from './router';
import store from './store';
import './style/main.css';

Vue.use(Notifications);
Vue.use(Vuelidate);
Vue.component('v-select', vSelect);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
