import { PlusOutlined } from '@ant-design/icons';
import 'umi';
import { Button, Space } from 'antd';
import { AvatarDropdown } from '@/components/RightContent/AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';
export const Release = () => {
  return (
    <Button shape="round" key="1">
      <PlusOutlined /> 发布接口{' '}
    </Button>
  );
};
export const RightContent = () => {
  const className = styles.right;
  return (
    <Space className={className}>
      <span
        className="anticon"
        style={{ fontSize: 14, fontWeight: 'bold' }}
        onClick={() => {
          window.open('https://github.com/yyq123321', '_blank');
        }}
      >
        📘 开发者文档
      </span>
      <AvatarDropdown />
    </Space>
  );
};
