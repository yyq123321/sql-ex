import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { getLoginUserUsingGET } from '@/services/ant-design-pro/userController';
import { RequestConfig } from '@@/plugin-request/request';
import { RightContent } from './components/RightContent';
import NoFoundPage from '@/pages/404';

export const request: RequestConfig = {
  prefix: 'yyq-api.yyq-personal-code.cn:8091', // 指定API后端服务器地址
  credentials: 'include', // 允许跨域携带cookie
  // prefix: 'http://192.168.61.222:8081',
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.code === 0,
        errorMessage: resData.message,
      };
    },
  },
};

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const loginCodePath = '/user/loginUseCode';
const registerPath = '/user/register';
const adminPath = '/admin/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserVO;
  token?: string;
  unReadMsg?: number;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.UserVO | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await getLoginUserUsingGET();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (
    history.location.pathname !== loginPath &&
    history.location.pathname !== loginCodePath &&
    history.location.pathname !== registerPath &&
    history.location.pathname !== adminPath
  ) {
    const currentUser = fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    onPageChange: () => {
      const { location } = history;
      // if (!whiteList.includes(location.pathname)) {
      //   getInitialState();
      // }
      // 如果没有登录，重定向到 login
      if (
        !initialState?.currentUser &&
        !/^\/\w+\/?$/.test(location.pathname) &&
        location.pathname !== '/homePage'
      ) {
        history.push(loginPath);
      }
    },
    // 自定义 403 页面
    unAccessible: <NoFoundPage />,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading/>;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};
