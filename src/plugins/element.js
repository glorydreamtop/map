import Vue from 'vue'
import Element from 'element-ui'
import '@/assets/css/ele-variable.scss'
import dragableDialog from '@/components/dragableDialog'


Vue.use(Element)
Vue.component(dragableDialog.name, dragableDialog)