import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { history } from 'umi';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import Settings from '../../../config/defaultSettings';
import { useModel } from '@@/plugin-model/useModel';
import { valueLength } from '@/pages/order/PayOrder';
import { userLogoutUsingPOST } from '@/services/ant-design-pro/userController';
import { stringify } from '@ant-design/pro-components';
import { Avatar, Menu } from 'antd';
import styles from './index.less';
export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return (
    <p className="anticon">
      {valueLength(currentUser?.userName) ? currentUser?.userName : '无名氏'}
    </p>
  );
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await userLogoutUsingPOST();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      if (initialState?.settings.navTheme === 'light') {
        setInitialState({ currentUser: {}, settings: { ...Settings, navTheme: 'light' } });
      } else {
        setInitialState({ currentUser: {}, settings: { ...Settings, navTheme: 'realDark' } });
      }
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s: any) => ({ ...s, loginUser: undefined }));
        });
        loginOut();
        return;
      }
      if (key === 'center') {
        history.push(`/account/${key}`);
        return;
      }
      if (key === 'login') {
        history.push(`/user/login`);
        return;
      }
    },
    [setInitialState],
  );

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return currentUser ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={
            currentUser.userAvatar ||
            'https://ts1.cn.mm.bing.net/th/id/R-C.1bd4619895b23e93c14ead740b9524ec?rik=IoGxECWc4wUyLA&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20181216%2f5ac69ccd7a5747c3896f3f6d08eebb88.jpeg&ehk=%2bRuckXoyVFZA0NqvaFYN4N83C9u%2bvU5PsizwK1It2Eg%3d&risl=&pid=ImgRaw&r=0'
          }
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{currentUser.userName}</span>
      </span>
    </HeaderDropdown>
  ) : (
    <HeaderDropdown
      overlay={
        <Menu.Item key="login">
          <LogoutOutlined />
          登录
        </Menu.Item>
      }
    >
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={
            'https://ts1.cn.mm.bing.net/th/id/R-C.1bd4619895b23e93c14ead740b9524ec?rik=IoGxECWc4wUyLA&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20181216%2f5ac69ccd7a5747c3896f3f6d08eebb88.jpeg&ehk=%2bRuckXoyVFZA0NqvaFYN4N83C9u%2bvU5PsizwK1It2Eg%3d&risl=&pid=ImgRaw&r=0'
          }
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>游客</span>
      </span>
    </HeaderDropdown>
  );
};
