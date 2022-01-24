import Vue from 'vue';
import App from './App.vue';
import VueMask from 'v-mask';
import Notifications from 'vue-notification';
import VModal from 'vue-js-modal';

Vue.config.productionTip = false;
Vue.use(VueMask);
Vue.use(Notifications);
Vue.use(VModal);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
