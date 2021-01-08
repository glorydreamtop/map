import Vue from 'vue'
import Element from 'element-ui'
import '@/assets/css/ele-variable.scss'
import dragableDialog from '@/components/rewrite-eleUI/dialog'
import pagination from '@/components/rewrite-eleUI/pagination'
import textArea from '@/components/rewrite-eleUI/textArea'

Vue.use(Element)
Vue.component(dragableDialog.name, dragableDialog);
Vue.component(textArea.name, textArea);
Vue.component(pagination.name,pagination);