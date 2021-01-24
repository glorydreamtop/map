import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './plugins/element.js'
import { eventBus, sendMessage } from '@/utils/eventBus'

Vue.prototype.$eventBus = eventBus;
Vue.prototype.$sendMessage = sendMessage;

Vue.config.productionTip = false
new Vue({
    store,
    render: h => h(App)
}).$mount('#app')