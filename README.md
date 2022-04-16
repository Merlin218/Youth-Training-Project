# 青训营项目

线上地址：[测试账号：admin 123456](https://data2chart.all1024.com)

项目后端：👉[zhonghangAlex/Data2Chart: Data2Chart Project (github.com)](https://github.com/zhonghangAlex/Data2Chart)👈

### 技术栈

- [pnpm](https://www.pnpm.cn/)
- axios
- [pinia](https://pinia.vuejs.org/introduction.html)
- [vue-router](https://next.router.vuejs.org/zh/introduction.html)
- eslint
- prettier
- husky
- commitlint
- [ant design vue](https://2x.antdv.com/docs/vue/introduce-cn/)
- [sass](https://sass.bootcss.com/documentation) / [less](https://less.bootcss.com/#%E6%A6%82%E8%A7%88)

### 开发指南

```bash
// 安装pnpm
npm install -g pnpm

// 安装全部依赖
pnpm install

// 安装某个依赖
pnpm install xxx  -D/-S

// 运行
pnpm dev

// 打包
pnpm build

```

- 基于`unplugin-vue-components`实现组件自动导入，同时 vite 提供了原生的按需加载

  ```vue
  <template>
  	// 组件无需导入直接使用
  	<HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  	<a-button type="primary"> Primary </a-button>
  </template>
  ```

- 大家开发时，每人新建自己的分支进行开发，后续合并
- commit 提交规范：`type(scope): desc`，注意`:`后有一个空格

  type 列表：

  - feat：新功能
  - update：更新某功能
  - fix：修补某功能的 bug
  - refactor：重构某个功能
  - optimize: 优化构建工具或运行时性能
  - style：仅样式改动
  - docs：仅文档新增/改动
  - chore：构建过程或辅助工具的变动

### 结构树

```bash
├── src
│   ├── App.vue  // 根组件
│   ├── api  // 请求api
│   │   ├── axios  // axios配置
│   │   │   ├── cancel.ts  // 取消请求配置
│   │   │   └── index.ts  // 实例配置
│   │   ├── index.ts  // 统一导出api模块
│   │   └── modules  // api模块
│   │       └── common.ts
│   ├── assets  // 静态资源
│   │   ├── logo.png
│   │   └── styles  // 样式资源
│   │       └── main.scss
│   ├── components  // 子组件
│   │   └── HelloWorld.vue
│   ├── configs  // 项目配置
│   │   └── index.ts
│   ├── env.d.ts
│   ├── main.ts // 入口文件
│   ├── pages  // 页面组件
│   ├── router  // 路由
│   │   └── index.ts
│   ├── store  // 状态管理
│   │   └── user.ts
│   ├── types  // 类型文件
│   │   └── common.d.ts
│   └── utils  // 工具类
└── vite.config.ts  // vite配置
```
