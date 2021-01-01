import { createApp } from 'vue'
// import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import store from './store'
import './assets/global.css'
// import ElementPlus from 'element-plus'

import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import treeTable from 'vue-table-with-tree-grid'
import * as echarts from 'echarts'

// import {
//     ElForm,
//     ElFormItem,
//     ElInput,
//     ElButton,
//     ElContainer,
//     ElHeader,
//     ElAside,
//     ElMain,
//     ElMenu,
//     ElSubmenu,
//     ElMenuItemGroup,
//     ElMenuItem,
//     ElBreadcrumb,
//     ElBreadcrumbItem,
//     ElCard,
//     ElRow,
//     ElCol,
//     ElTable,
//     ElTableColumn,
//     ElSwitch,
//     ElTooltip,
//     ElPagination

// } from 'element-plus';

// locale.use(lang)

const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.use(ElementPlus, { locale })

// .use(ElForm).use(ElFormItem).use(ElInput).use(ElButton).use(ElContainer).use(ElCol).use(ElTable)
//     .use(ElHeader).use(ElAside).use(ElMain).use(ElMenu).use(ElSubmenu).use(ElMenuItemGroup)
//     .use(ElMenuItem).use(ElBreadcrumb).use(ElBreadcrumbItem).use(ElCard).use(ElRow).use(ElTableColumn)
//     .use(ElSwitch).use(ElTooltip).use(ElPagination)
.use(store).use(router).use(treeTable).mount('#app')