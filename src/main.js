import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './plugins/element.js'
import { eventBus, sendMessage } from '@/utils/eventBus'
import {c2t} from '@/utils/code2text'

Vue.prototype.$eventBus = eventBus;
Vue.prototype.$sendMessage = sendMessage;
Vue.filter('c2t',c2t);
Vue.config.productionTip = false
new Vue({
    store,
    render: h => h(App)
}).$mount('#app')