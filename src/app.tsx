import type {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {SettingDrawer} from '@ant-design/pro-layout';
import {PageLoading} from '@ant-design/pro-layout';
import type {RunTimeLayoutConfig} from 'umi';
import {history} from 'umi';
import defaultSettings from '../config/defaultSettings';
import {RequestConfig} from '@@/plugin-request/request';
import {RightContent} from './components/RightContent';
import NoFoundPage from '@/pages/404';
import Footer from "@/components/Footer";
import {getLoginUserUsingGET} from "@/services/ant-design-pro/businessesController";

export const request: RequestConfig = {
  credentials: 'include', // 允许跨域携带cookie
  // prefix: 'http://localhost:8081',
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
const loginPath = '/customer/login';
const loginCodePath = '/user/loginUseCode';
const registerPath = '/user/register';
const adminPath = '/admin/login';
const homePagePath = '/';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading/>,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserVO;
  businessId?: number;
  customerId?: number;
  riderId?: number;
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
    history.location.pathname !== adminPath &&
    history.location.pathname !== homePagePath
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
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    rightContentRender: () => <RightContent/>,
    footerRender: () => <>
      <Footer/>
    </>,
    onPageChange: () => {
      const {location} = history;
      // if (!whiteList.includes(location.pathname)) {
      //   getInitialState();
      // }
      // 如果没有登录，重定向到 login
      // if (
      //   !initialState?.currentUser &&
      //   !/^\/\w+\/?$/.test(location.pathname) &&
      //   location.pathname !== '/' &&
      //   location.pathname !== registerPath
      // ) {
      //   history.push(loginPath);
      // }
    },
    // 自定义 403 页面
    unAccessible: <NoFoundPage/>,
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
