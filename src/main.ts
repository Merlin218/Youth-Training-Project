import { createApp } from 'vue';
import { createPinia } from 'pinia';
import * as G2PlotVue from '@opd/g2plot-vue';
import App from './App.vue';
import router from './router';

const app = createApp(App).use(router).use(createPinia());

// 导入G2Plot所有图表组件
Object.values(G2PlotVue).forEach(module => {
	app.use(module);
});

app.mount('#app');
