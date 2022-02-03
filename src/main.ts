import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'default-passive-events';

createApp(App).use(router).use(createPinia()).use(VXETable).mount('#app');
