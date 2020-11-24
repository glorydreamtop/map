import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import './plugins/element.js'
//下面这个css必须引入 否则样式会出现问题
import 'cesium/Source/Widgets/widgets.css';



Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
