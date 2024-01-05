import {useParams} from 'umi';
import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Descriptions, message, Popconfirm, Spin, Tag, Tooltip} from 'antd';

import {orderPayTypeEnum, orderStatusEnum} from '@/enum/commonEnum';
import ProCard from '@ant-design/pro-card';
import wechat from '../../../../public/assets/WeChat.jpg';
import {getOrderByIdUsingGET, updateOrderUsingPOST} from "@/services/ant-design-pro/ordersController";
import {useModel} from "@@/plugin-model/useModel";

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

interface RouteParams {
  id: string;
}

export default () => {
  const [data, setData] = useState<API.OrdersVO>();
  const [loading, setLoading] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const params = useParams<RouteParams>();
  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    const res = await getOrderByIdUsingGET({id: Number(params.id)});
    if (res.data && res.code === 0) {
      setData(res.data);

      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Spin spinning={loading}>
      <Card
        title={'订单信息'}
        extra={
          <>
            {((data?.status === 0 || !data?.rider?.id) && initialState?.riderId) && (
              <Button type="primary" onClick={() => {
                updateOrderUsingPOST({
                  riderId: initialState?.riderId,
                  status: data?.status === 2 ? 2 : 1,
                  id: data?.id
                });
                message.success('骑手接单成功');
              }}>
                骑手接单
              </Button>
            )}

            {(data?.status < 2 && initialState?.businessId) && (
              <Button type="primary" onClick={() => {
                updateOrderUsingPOST({
                  status: 2,
                  id: data?.id
                });
                message.success('商家出餐成功');
              }}>
                商家出餐
              </Button>
            )}

            {(data?.status === 2 && data?.rider?.id && initialState?.riderId) && (
              <Button type="primary" onClick={() => {
                updateOrderUsingPOST({
                  status: 3,
                  id: data?.id
                });
                message.success('骑手取餐成功');
              }}>
                骑手取餐
              </Button>
            )}

            {(data?.status === 3 && initialState?.riderId) && (
              <Button type="primary" onClick={() => {
                updateOrderUsingPOST({
                  status: 4,
                  id: data?.id
                });
                message.success('骑手送达外卖成功');
              }}>
                骑手送达外卖
              </Button>
            )}
          </>
        }

      >
        <Descriptions>
          <Descriptions.Item key={'orderNum'} label={'订单号'}>
            {data?.orderNum}
          </Descriptions.Item>
          <Descriptions.Item key={'price'} label="订单金额 (元)">
            {data?.price}
          </Descriptions.Item>
          <Descriptions.Item key={'addPoints'} label="菜品">
            {data?.food?.name}
          </Descriptions.Item>
          <Descriptions.Item key={'status'} label="订单状态">
            {data && data.status === 0 ? (
              <Badge status="processing" text="商家已接单"/>
            ) : null}
            {data && data.status === 1 ? (
              <Badge status="processing" text="骑手已接单"/>
            ) : null}
            {data && data.status === 2 ? (
              <Badge status="processing" text="商家已出餐"/>
            ) : null}
            {data && data.status === 3 ? (
              <Badge status="processing" text="骑手已取餐"/>
            ) : null}
            {data && data.status === 4 ? (
              <Badge status="success" text="外卖已送达"/>
            ) : null}
          </Descriptions.Item>

          <Descriptions.Item key={'customerName'} label="顾客名">
            {data?.customer?.name}
          </Descriptions.Item>
          <Descriptions.Item key={'customerPhone'} label="顾客联系方式">
            {data?.customer?.phone}
          </Descriptions.Item>

          <Descriptions.Item key={'phone'} label="收货人电话">
            {data?.address?.phone}
          </Descriptions.Item>
          <Descriptions.Item key={'address'} label="收货地址">
            {data?.address?.detail}
          </Descriptions.Item>
          <Descriptions.Item key={'consignee'} label="收货人">
            {data?.address?.consignee}
          </Descriptions.Item>

          <Descriptions.Item key={'riderPhone'} label="骑手">
            {data?.rider ? data?.rider?.name: '暂无骑手'}
          </Descriptions.Item>
          <Descriptions.Item key={'riderPhone'} label="骑手电话">
            {data?.rider ? data?.rider?.phone : '暂无相关信息'}
          </Descriptions.Item>

          <Descriptions.Item key={'customerName'} label="商户">
            {data?.business?.name}
          </Descriptions.Item>
          <Descriptions.Item key={'customerName'} label="商户联系电话">
            {data?.business?.phone}
          </Descriptions.Item>

        </Descriptions>
      </Card>
    </Spin>
  );
};
