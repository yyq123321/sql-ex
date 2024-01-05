import { useModel } from 'umi';
import { Card, Typography } from 'antd';
import React, { useState } from 'react';
import GetGiftModal from '@/components/Gift/GetGift';

const { Text, Title } = Typography;
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: any;
  index: number;
  desc: any;
  href: string;
}> = ({ title, index, desc }) => {
  // const {useToken} = theme;
  // const {token} = useToken();
  return (
    <div
      style={{
        // backgroundColor: token.colorBgContainer,
        // boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        // color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            // color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          // color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <br />
    </div>
  );
};

const Welcome: React.FC = () => {
  // const {token} = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<API.UserVO>();

  return (
    <>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://cdn.pixabay.com/animation/2023/07/13/14/26/14-26-15-867_512.gif')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              // color: token.colorTextHeading,
            }}
          >
            <Title level={3}> 欢迎使用 外卖系统</Title>
          </div>
          <div
            style={{
              fontSize: '14px',
              // color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '100%',
            }}
          >
            <Text strong>
              <Title level={4}>
                外卖demo--数据库实验
              </Title>
            </Text>
          </div>
        </div>
        <GetGiftModal data={data} onCancel={() => setOpen(false)} open={open} />
      </Card>
    </>
  );
};

export default Welcome;
