import { ActionType, PageContainer } from '@ant-design/pro-components';
import { useRef, useState } from 'react';

import { Card, List, Radio, Input, Avatar, Divider } from 'antd';
import { useRequest } from 'umi';
import styles from './style.less';
import ListContent from '@/pages/order/Columns/Columns';
import { Link } from '@umijs/preset-dumi/lib/theme';
import {useModel} from "@@/plugin-model/useModel";
import {listNoRiderOrderUsingGET} from "@/services/ant-design-pro/ordersController";

export default () => {
  const [currentRow, setCurrentRow] = useState<API.OrdersVO>();
  const [data, setData] = useState<API.OrdersVO[]>([]);
  const [pageSize, setPageSize] = useState<number>(8);
  const [totalNum, setTotalNum] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { initialState, setInitialState } = useModel('@@initialState');

  const { loading } = useRequest(
    () => {
      const result = listNoRiderOrderUsingGET({ current: currentPage, pageSize: pageSize });
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
        <RadioButton value="all">全部订单</RadioButton>
      </RadioGroup>
    </div>
  );

  function changePage(_page: number, _pageSize: number) {
    listNoRiderOrderUsingGET({ current: _page, pageSize: _pageSize }).then((result) => {
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

  return (
    <PageContainer>
      <div className={styles.standardList}>
        <Card
          className={styles.listCard}
          bordered={false}
          title="我的订单"
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
                  <Link to={`/order/info/${record.id}`}>
                    <a key="SUCCESS">查看</a>
                  </Link>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src="https://ts1.cn.mm.bing.net/th/id/R-C.78d3aa56c0ecd59fe3e8f1258a6399bc?rik=RZE7AfrtajHtug&riu=http%3a%2f%2fpic.baike.soso.com%2fp%2f20130827%2f20130827143603-1038931873.jpg&ehk=%2bMV8yDcbyuKpO46VENI6BhCg%2fGyowR%2bWDIhivhoL79s%3d&risl=&pid=ImgRaw&r=0"
                      shape="square"
                      size="large"
                    />
                  }
                />
                <ListContent data={record} />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </PageContainer>
  );
};
