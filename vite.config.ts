import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import styleImport from 'vite-plugin-style-import';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			resolvers: [
				AntDesignVueResolver(), // ant-design-vue
			],
			dts: 'src/components.d.ts',
		}),
		styleImport({
			libs: [
				{
					libraryName: 'ant-design-vue',
					esModule: true,
					resolveStyle: name => {
						return `ant-design-vue/es/${name}/style/index`;
					},
				},
			],
		}),
	],
	server: {
		proxy: {
			'/api': {
				target: 'https://shibe.online/api',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
	resolve: {
		// 配置路径别名
		alias: {
			'@': path.resolve(__dirname, './src'),
			comps: path.resolve(__dirname, './src/components'),
			pages: path.resolve(__dirname, './src/pages'),
			utils: path.resolve(__dirname, './src/utils'),
			configs: path.resolve(__dirname, './src/configs'),
			store: path.resolve(__dirname, './src/store'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "@/assets/styles/main.scss";',
			},
			less: {
				javascriptEnabled: true,
			},
		},
	},
});
