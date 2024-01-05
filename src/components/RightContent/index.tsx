import 'umi';
import { Button, Space } from 'antd';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

export const RightContent = () => {
  const className = styles.right;
  return (
    <Space className={className}>

    </Space>
  );
};
