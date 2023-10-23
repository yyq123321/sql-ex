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
    {
      name: '主页',
      icon: 'home',
      path: '/homePage',
      component: './HomePage',
    },
    {
      path: '/admin',
      name: '管理员',
      icon: 'crown',
      access: 'canAdmin',
      routes: [
        {
          icon: 'table',
          name: '接口管理',
          path: '/admin/interface_info',
          component: './admin/InterfaceInfo',
        },
        {
          icon: 'table',
          name: '接口分析',
          path: '/admin/interface_analysis',
          component: './admin/InterfaceAnalysis',
        },
        {
          icon: 'table',
          name: '用户管理',
          path: '/admin/listUser',
          component: './admin/ListUser',
        },
      ],
    },
    {
      path: '/index',
      name: '接口',
      icon: 'smile',
      component: './Index',
    },
    {
      path: '/order/list',
      name: '我的订单',
      icon: 'ProfileOutlined',
      component: './order/OrderList',
    },
    {
      path: '/recharge',
      name: '充值',
      icon: 'PayCircleOutlined',
      component: './Recharge',
    },
    {
      path: '/interface_info/:id',
      name: '查看接口',
      icon: 'smile',
      component: './InterfaceInfo',
      hideInMenu: true,
    },
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          name: 'loginUseCode',
          icon: 'smile',
          path: '/user/loginUseCode',
          component: './user/LoginUseCode',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/order/pay/:id',
      icon: 'PayCircleOutlined',
      name: '订单支付',
      component: './order/PayOrder',
      hideInMenu: true,
    },
    {
      path: '/order/info/:id',
      icon: 'ProfileOutlined',
      name: '订单详情',
      component: './order/OrderInfo',
      hideInMenu: true,
    },
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
      target: 'http://localhost:8091',
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
