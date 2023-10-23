import { GithubOutlined, WechatOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import { Tooltip } from 'antd';
import wechat from '@/../public/assets/WeChat.jpg';

const Footer: React.FC = () => {
  const defaultMessage = '作者:YYQ';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      // @ts-ignore
      copyright={
        <>
          {`${currentYear} ${defaultMessage}`} |{' '}
          <a target={'_blank'} href={'https://beian.miit.gov.cn/'} rel="noreferrer">
            <img
              src="https://img.qimuu.icu/typory/%E5%A4%87%E6%A1%88%E5%9B%BE%E6%A0%87.png"
              alt={'闽ICP备2023017339号-1'}
            />{' '}
            闽ICP备2023017339号-1
          </a>
        </>
      }
      links={[
        {
          key: 'github',
          title: (
            <Tooltip title="查看本站技术及源码，欢迎star及贡献代码">
              <GithubOutlined /> Github
            </Tooltip>
          ),
          href: 'https://github.com/yyq123321',
          blankTarget: true,
        },
        {
          key: 'contact',
          title: (
            <Tooltip title={<img src={wechat} alt="微信 code_nav" width="120" />}>
              <WechatOutlined /> 联系作者
            </Tooltip>
          ),
          href: '@/../public/assets/WeChat.jpg',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
