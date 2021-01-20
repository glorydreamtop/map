import Vue from 'vue'
import Element from 'element-ui'
import '@/assets/css/ele-variable.scss'
import dragableDialog from '@/components/rewrite-eleUI/dialog'
import pagination from '@/components/rewrite-eleUI/pagination'
import textArea from '@/components/rewrite-eleUI/textArea'
import more from "@/components/rewrite-eleUI/more"

Vue.use(Element)
Vue.component(dragableDialog.name, dragableDialog);
Vue.component(textArea.name, textArea);
Vue.component(pagination.name,pagination);
Vue.component(more.name,more);