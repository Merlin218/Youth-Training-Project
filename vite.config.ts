/*
 * @Author: Merlin218
 * @Date: 2022-01-30 17:06:39
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-10 01:11:28
 * @Description: 请填写简介
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import styleImport from 'vite-plugin-style-import';
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// import Components from 'unplugin-vue-components/vite';
import configs from './src/configs';

// https://vitejs.dev/config/
export default defineConfig({
	// base: '/data-to-chart/',
	plugins: [
		vue(),
		// Components({
		// 	dirs: ['src/**/*'],
		// 	resolvers: [
		// 		AntDesignVueResolver(), // ant-design-vue
		// 	],
		// 	dts: 'src/components.d.ts',
		// }),
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
				target: configs.proxyUrl,
				changeOrigin: true,
				rewrite: path => {
					return path.replace(/^\/api/, '');
				},
			},
		},
	},
	resolve: {
		// 配置路径别名
		alias: {
			'@': path.resolve(__dirname, './src'),
			api: path.resolve(__dirname, './src/api'),
			comps: path.resolve(__dirname, './src/components'),
			pages: path.resolve(__dirname, './src/pages'),
			utils: path.resolve(__dirname, './src/utils'),
			configs: path.resolve(__dirname, './src/configs'),
			store: path.resolve(__dirname, './src/store'),
			types: path.resolve(__dirname, './src/types'),
		},
		extensions: ['.js', '.json', '.ts'], // 使用路径别名时想要省略的后缀名，可以自己 增减
	},
	build: {
		terserOptions: {
			compress: {
				//生产环境时移除console
				drop_console: true,
				drop_debugger: true,
			},
		},
		// 取消计算文件大小，加快打包速度
		brotliSize: false,
		// sourcemap: true,
		// assetsDir: 'static/img',
		rollupOptions: {
			output: {
				chunkFileNames: 'js/[name]-[hash].js',
				entryFileNames: 'js/[name]-[hash].js',
				assetFileNames: '[ext]/[name]-[hash].[ext]',
			},
			// 配置CDN
		},
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
});
