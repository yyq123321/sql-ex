import React from 'react';
import { Divider, Image } from 'antd';
import styles from '@/pages/HomePage/components/StudentComment.less';
import { FireTwoTone } from '@ant-design/icons/lib/icons';

const PageTail: React.FC = () => {
  return (
    <>
      <Divider className={styles.DividerStyle} style={{ marginTop: '40px' }} orientation="left">
        <FireTwoTone twoToneColor="#52c41a" />
        <p>声明</p>
      </Divider>
      <div style={{ fontSize: '30px', fontFamily: '微软雅黑', textAlign: 'center' }}>
        这里是可定制化的API接口调用平台
      </div>
    </>
  );
};
export default PageTail;
