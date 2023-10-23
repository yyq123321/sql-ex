import React, { useEffect, useState } from 'react';
import { Button, Card, message, Spin, Tooltip } from 'antd';
import ProCard, { CheckCard } from '@ant-design/pro-card';
import { history, useModel } from 'umi';
import wechat from '../../../public/assets/WeChat.jpg';
import Settings from '../../../config/defaultSettings';
import { getLoginUserUsingGET } from '@/services/ant-design-pro/userController';
import { listProductInfoByPageUsingGET } from '@/services/ant-design-pro/productInfoController';

const PayOrder: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<API.ProductInfo[]>();
  const { initialState, setInitialState } = useModel('@@initialState');
  // const {loginUser} = initialState?.currentUser || {}
  const [total, setTotal] = useState<any>('0.00');
  const [productId, setProductId] = useState<any>('');

  useEffect(() => {
    if (total === '0.00') {
      setProductId('');
    }
  }, [total]);

  const loadData = async () => {
    const userdata = await getLoginUserUsingGET();
    if (userdata.data && userdata.code === 0) {
      if (initialState?.settings.navTheme === 'light') {
        setInitialState({
          currentUser: userdata.data,
          settings: { ...Settings, navTheme: 'light' },
        });
      } else {
        setInitialState({
          currentUser: userdata.data,
          settings: { ...Settings, navTheme: 'realDark' },
        });
      }
    }
    setLoading(true);
    const res = await listProductInfoByPageUsingGET({});
    if (res.data && res.code === 0) {
      setProduct(res.data.records || []);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Spin spinning={loading}>
        <Card style={{ minWidth: 360 }}>
          <ProCard
            type={'inner'}
            headerBordered
            bordered
            tooltip={'用于平台接口调用'}
            title={<strong>我的钱包</strong>}
          >
            <strong>只因币 : </strong>
            <span style={{ color: 'red', fontSize: 18 }}>{initialState?.currentUser?.balance}</span>
          </ProCard>
          <br />
          <Card type={'inner'} title={<strong>只因币充值 💰️</strong>}>
            <ProCard wrap>
              <CheckCard.Group
                onChange={(checkedValue) => {
                  if (!checkedValue) {
                    setTotal('0.00');
                    return;
                  }
                  setTotal(checkedValue);
                }}
              >
                {product &&
                  product.map((item) => (
                    <CheckCard
                      avatar="https://ts1.cn.mm.bing.net/th/id/R-C.c6f4962a4304d521ddde168524a0ae52?rik=JNIy4peaVVPn8Q&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2020%2f02-18%2f73642%2fwater_73642_698_698_.png&ehk=x3%2ftWjEIXq5lybt1JWMQO9P4paTqFxgGXsKJe%2br981U%3d&risl=&pid=ImgRaw&r=0"
                      key={item.id}
                      onClick={() => {
                        setTotal(item.total);
                        setProductId(item.id);
                      }}
                      description={item.description}
                      extra={
                        <>
                          <h3
                            // @ts-ignore
                            style={{
                              color: 'red',
                              fontSize: item.productType === 'RECHARGEACTIVITY' ? 16 : 18,
                              fontWeight: 'bold',
                            }}
                          >
                            ￥{item.productType === 'RECHARGEACTIVITY' ? '体验 ' : null}
                            {/*// @ts-ignore*/}
                            {item?.total / 100}
                          </h3>
                        </>
                      }
                      // @ts-ignore
                      style={{ width: 300, height: 150 }}
                      title={<strong>💰 {item.addCoins} 只因币</strong>}
                      value={item.total}
                    />
                  ))}
              </CheckCard.Group>
            </ProCard>
            <br />
            <ProCard style={{ marginTop: -20 }} layout={'center'}>
              <span>
                本商品为虚拟内容,用于平台接口调用,购买后不支持
                <strong style={{ color: 'red' }}>退换</strong>
                ，如付款成功后10分钟后未到账，请联系站长微信：
                <Tooltip
                  placement="bottom"
                  title={<img src={wechat} alt="微信 code_nav" width="120" />}
                >
                  <a>yyq021021</a>
                </Tooltip>
              </span>
            </ProCard>
          </Card>
          <br />
          <ProCard bordered headerBordered>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              <div style={{ marginRight: '12px', fontWeight: 'bold', fontSize: 18 }}>实付</div>
              <div style={{ marginRight: '20px', fontWeight: 'bold', fontSize: 18, color: 'red' }}>
                ￥ {total / 100} 元
              </div>
              <Button
                style={{ width: 100, padding: 5 }}
                onClick={() => {
                  if (!productId) {
                    message.error('请先选择虚拟货币规格哦');
                    return;
                  }
                  message.loading('正在前往收银台,请稍后.....', 0.6);
                  setTimeout(() => {
                    history.push(`/order/pay/${productId}`);
                  }, 800);
                }}
                size={'large'}
                type={'primary'}
              >
                立即购买
              </Button>
            </div>
          </ProCard>
        </Card>
      </Spin>
    </>
  );
};

export default PayOrder;
