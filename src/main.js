import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/css/bootstrap.min.css';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;

Axios.interceptors.request
  .use(
    (config) => {
      const authorisationHeader = `Bearer ${store.getters['usersStore/Token']}`;
      const { headers } = config;
      headers.Authorization = authorisationHeader;
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

const init = () => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
};

document.addEventListener('deviceready', () => {
  init();
});

const isCordovaApp = (typeof window.cordova !== 'undefined');
if (!isCordovaApp) {
  document.dispatchEvent(new CustomEvent('deviceready', {}));
}
