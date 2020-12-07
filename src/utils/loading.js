import Vue from 'vue';
import service from 'element-ui/packages/loading/src/index'
Vue.directive('v-loading', {
    bind: function (el, binding, vnode) {
        const textExr = el.getAttribute('element-loading-text')|| '加载中';
        const spinnerExr = el.getAttribute('element-loading-spinner')|| 'el-loading-spinner';
        service({ target: el, lock: true, text: textExr , spinner: spinnerExr })
    }
})