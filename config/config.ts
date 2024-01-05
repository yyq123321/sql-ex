// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {path: '/', name: '欢迎', icon: 'smile', component: './Welcome', hideInMenu: true},

    {
      path: '/customer',
      layout: false,
      routes: [
        {
          path: '/customer/login',
          layout: false,
          name: 'login',
          component: './customer/Login',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/riders',
      layout: false,
      routes: [
        {
          path: '/riders/login',
          layout: false,
          name: 'login',
          component: './riders/Login',
        },
        {
          component: '404',
        },
      ],
    },
    // {
    //   path: '/business',
    //   routes: [
    //
    //   ],
    // },
    {
      path: '/business/login',
      layout: false,
      name: 'login',
      component: './business/Login',
    },
    {
      path: '/showSQL',
      icon: 'ProfileOutlined',
      name: '复杂SQL可视化(后面几个页面是业务流程)',
      component: './ShowSQL',
    },
    {
      path: '/business/bizList',
      icon: 'ProfileOutlined',
      name: '商户列表',
      component: './business/BizList',
    },
    {
      path: '/business/info/:id',
      name: '商户详情',
      component: './business/Business',
      hideInMenu: true
    },
    {
      path: '/food/info/:id',
      name: '菜品详情',
      component: './food/FoodInfo',
      hideInMenu: true
    },
    {
      path: '/order/BizOrder',
      icon: 'ProfileOutlined',
      name: '商户订单',
      component: './order/BizOrder',
    },
    {
      path: '/order/CusOrder',
      icon: 'ProfileOutlined',
      name: '顾客订单',
      component: './order/CusOrder',
    },
    {
      path: '/order/RiderOrder',
      icon: 'ProfileOutlined',
      name: '骑手订单',
      component: './order/RiderOrder',
    },
    {
      path: '/order/NoRiderOrder',
      icon: 'ProfileOutlined',
      name: '没有骑手接单的订单',
      component: './order/NoRiderOrder',
    },
    {
      path: '/order/info/:id',
      icon: 'ProfileOutlined',
      name: '订单详情',
      component: './order/OrderInfo',
      hideInMenu: true,
    },
    {

    }
  ],
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    '/api/': {
      target: 'http://localhost:8081',
      changeOrigin: true,
    },
  },
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: true,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    '@ant-design/charts': 'charts',
  },
  scripts: [
    'https://unpkg.com/react@17/umd/react.production.min.js',
    'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
    'https://unpkg.com/@ant-design/charts@1.0.5/dist/charts.min.js',
    //使用 组织架构图、流程图、资金流向图、缩进树图 才需要使用
    'https://unpkg.com/@ant-design/charts@1.0.5/dist/charts_g6.min.js',
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
