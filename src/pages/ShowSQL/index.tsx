import { PageContainer } from '@ant-design/pro-components';
import { useState } from 'react';

import { Card, List, Radio, Input, Avatar, Divider } from 'antd';
import { useRequest } from 'umi';
import styles from './style.less';
import {listBusinessFoodOrderUsingGET} from "@/services/ant-design-pro/businessesController";
import ListContent from "@/pages/ShowSQL/Columns";
import FoodListContent from "@/pages/ShowSQL/Columns2";
import OrderListContent from "@/pages/ShowSQL/Columns3";
import {listFoodOrderUsingGET} from "@/services/ant-design-pro/foodsController";
import {listOrderSummaryUsingGET} from "@/services/ant-design-pro/ordersController";

export default () => {

  const [businessFoodOrderList, setBusinessFoodOrderList] = useState<API.BusinessFoodOrderDTO[]>([]);
  const [foodOrderSummaryList, setFoodOrderSummaryList] = useState<API.FoodOrderSummaryDTO[]>([]);
  const [orderSummaryList, setOrderSummaryList] = useState<API.OrderSummaryDTO[]>([]);

  const { loading } = useRequest(
    () => {
      const businessOrder = listBusinessFoodOrderUsingGET();
      return businessOrder;
    },
    {
      onSuccess: (result, ) => {
        setBusinessFoodOrderList(result || []);
      },
    },
  );

  useRequest(
    () => {
      const foodOrderUsingGET = listFoodOrderUsingGET();
      return foodOrderUsingGET;
    },
    {
      onSuccess: (result, ) => {
        setFoodOrderSummaryList(result || []);
      },
    },
  );

  useRequest(
    () => {
      const orderSummaryUsingGET = listOrderSummaryUsingGET();
      return orderSummaryUsingGET;
    },
    {
      onSuccess: (result, ) => {
        setOrderSummaryList(result || []);
      },
    },
  );

  const RadioButton = Radio.Button;
  const RadioGroup = Radio.Group;

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部商家</RadioButton>
      </RadioGroup>
    </div>
  );

  return (
    <PageContainer>
      <div className={styles.standardList}>
        <Card
          className={styles.listCard}
          bordered={false}
          title="businessFoodOrder"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
        >
          <List
            size="large"
            loading={loading}
            rowKey={"businessId"}
            dataSource={businessFoodOrderList}
            renderItem={(record) => (
              <List.Item>
                <ListContent data={record} />
              </List.Item>
            )}
          />
        </Card>
        <Card
          className={styles.listCard}
          bordered={false}
          title="foodOrderSummary"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
        >
          <List
            size="large"
            loading={loading}
            rowKey={"foodName"}
            dataSource={foodOrderSummaryList}
            renderItem={(record) => (
              <List.Item>
                <FoodListContent data={record} />
              </List.Item>
            )}
          />
        </Card>
        <Card
          className={styles.listCard}
          bordered={false}
          title="orderSummary"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
        >
          <List
            size="large"
            loading={loading}
            rowKey={"foodName"}
            dataSource={orderSummaryList}
            renderItem={(record) => (
              <List.Item>
                <OrderListContent data={record} />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </PageContainer>
  );
};
