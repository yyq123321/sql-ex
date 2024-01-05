import { ActionType, PageContainer } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';

import {Card, List, Radio, Input, Avatar, Divider, message, Button} from 'antd';
import {useParams, useRequest} from 'umi';
import styles from './style.less';
import { Link } from '@umijs/preset-dumi/lib/theme';
import ListContent from './FoodColumns';
import {addFoodsUsingPOST, listFoodsUsingGET} from "@/services/ant-design-pro/foodsController";
import NewFoodForm from "@/pages/business/Business/components/AddFood";
import {useModel} from "@@/plugin-model/useModel";

interface RouteParams {
  id: string;
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.FoodsVO>();
  const [data, setData] = useState<API.FoodsVO[]>([]);
  const [pageSize, setPageSize] = useState<number>(8);
  const [totalNum, setTotalNum] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const params = useParams<RouteParams>();
  const { initialState, setInitialState } = useModel('@@initialState');

  const { loading } = useRequest(
    () => {
      const result = listFoodsUsingGET({ businessId: Number(params.id), current: currentPage, pageSize: pageSize });

      return result;
    },
    {
      onSuccess: (result) => {
        setTotalNum(result?.total || 0);
        setData(result?.list || []);
      },
    },
  );

  const RadioButton = Radio.Button;
  const RadioGroup = Radio.Group;

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部菜品</RadioButton>
      </RadioGroup>
    </div>
  );

  function changePage(_page: number, _pageSize: number) {
    listFoodsUsingGET({ businessId: Number(params.id), current: _page, pageSize: _pageSize }).then((result) => {
      setData(result.data.list || []);
      setTotalNum(result.data.total || 0);
    });
    // setListData(result.courseVOList);
    setCurrentPage(_page);
    setPageSize(_pageSize);
  }

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 项`;
  }

  const paginationProps = {
    onChange: changePage,
    showSizeChanger: true,
    showQuickJumper: true,
    currentPage: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
    pageSizeOptions: [8, 16, 24, 36],
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleCreate = (values) => {
    addFoodsUsingPOST({
      name: values.name,
      category: values.category,
      businessId: initialState?.businessId,
      price: values.price,
      photo: values.photo
    })
      .then((response) => {
        // 处理成功提交数据后的逻辑
        console.log('新增菜品成功:', response);
        setModalVisible(false); // 关闭 Modal
        // 可以根据实际情况执行其他操作，例如重新加载数据等
      })
      .catch((error) => {
        // 处理提交失败的情况
        console.error('新增菜品失败:', error);
        // 根据实际情况处理失败情况，例如显示错误信息等
      });
  };


  return (
    <PageContainer>
      <div className={styles.standardList}>
        {Number(params.id) === initialState?.businessId && (
          <Card
            extra={
              <div>
                <Button type="primary" onClick={() => setModalVisible(true)}>
                  新增菜品
                </Button>
                <NewFoodForm
                  visible={modalVisible}
                  onCreate={handleCreate}
                  onCancel={() => setModalVisible(false)}
                />
              </div>
            }
          >
          </Card>
        )}

        <Card
          className={styles.listCard}
          bordered={false}
          title="所有菜品"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
        >
          <List
            size="large"
            rowKey="id"
            loading={loading}
            pagination={paginationProps}
            dataSource={data}
            renderItem={(record) => (
              <List.Item
                actions={[
                  <Link to={`/food/info/${record.id}`}>
                    <a key="SUCCESS">查看</a>
                  </Link>,
                ]}
              >
                <ListContent data={record} />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </PageContainer>
  );
};
