import { ActionType, PageContainer } from '@ant-design/pro-components';
import { useRef, useState } from 'react';

import { Card, List, message, Popconfirm, Radio, Input, Avatar, Divider } from 'antd';
import {
  cancelOrderUsingPOST,
  listPageOrderUsingGET,
} from '@/services/ant-design-pro/orderController';
import { useRequest } from 'umi';
import styles from './style.less';
import ListContent from '@/pages/order/Columns/Columns';
import { Link } from '@umijs/preset-dumi/lib/theme';

export default () => {
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.OrderVO>();
  const [data, setData] = useState<API.OrderVO[]>([]);
  const [pageSize, setPageSize] = useState<number>(8);
  const [totalNum, setTotalNum] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { loading } = useRequest(
    () => {
      const result = listPageOrderUsingGET({ current: currentPage, pageSize: pageSize });
      return result;
    },
    {
      onSuccess: (result) => {
        setTotalNum(result?.total || 0);
        setData(result?.records || []);
      },
    },
  );

  const RadioButton = Radio.Button;
  const RadioGroup = Radio.Group;
  const { Search } = Input;

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部订单</RadioButton>
        <RadioButton value="progress">未支付订单</RadioButton>
        <RadioButton value="waiting">已完成订单</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  function changePage(_page: number, _pageSize: number) {
    listPageOrderUsingGET({ current: _page, pageSize: _pageSize }).then((result) => {
      setData(result.data.records || []);
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

  /**
   *  Delete node
   * @zh-CN 正在取消订单
   *
   * @param record
   */
  const handleClosed = async (record: API.OrderVO) => {
    const hide = message.loading('正在取消订单');
    if (!record) return true;
    try {
      const res = await cancelOrderUsingPOST({
        orderSn: record.orderNumber,
      });
      hide();
      if (res.data) {
        message.success('取消订单成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error: any) {
      hide();
      message.error('取消订单失败', error.message);
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 正在取消订单
   *
   * @param record
   */
  const handleDelete = async (record: API.OrderVO) => {
    const hide = message.loading('正在删除订单');
    if (!record) return true;
    try {
      const res = await cancelOrderUsingPOST({
        orderSn: record.orderNumber,
      });
      hide();
      if (res.data) {
        message.success('删除订单成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error: any) {
      hide();
      message.error('删除订单失败', error.message);
      return false;
    }
  };

  const toPay = (record: API.OrderVO) => {
    // if (record.payType === 1) {
    //   if (!record.codeUrl) {
    //     message.error("订单获取失败")
    //     return
    //   }
    //   // 判断是否为手机设备
    //   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    //   if (isMobile) {
    //     window.location.href = record.codeUrl
    //   } else {
    //     message.loading("正在前往收银台,请稍后.....", 0.6)
    //     setTimeout(() => {
    //       history.push(`/order/pay/${record.productId}?codeUrl=${record?.codeUrl?.trim()}&payType=${record?.payType?.trim()}`)
    //     }, 800)
    //   }
    // } else {
    message.loading('正在前往收银台,请稍后....');
    setTimeout(() => {
      if (!record.formData) {
        message.error('订单获取失败');
        return;
      }
      document.write(record.formData);
    }, 2000);
    // }
  };
  const deleteConfirm = async () => {
    await handleDelete(currentRow as API.OrderVO);
  };
  const closedConfirm = async () => {
    await handleClosed(currentRow as API.OrderVO);
  };

  return (
    <PageContainer>
      <div className={styles.standardList}>
        <Card
          className={styles.listCard}
          bordered={false}
          title="学生列表"
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
                  <Link to={`/order/info/${record.orderNumber}`}>
                    <a key="SUCCESS">查看</a>
                  </Link>,
                  record?.status !== 0 && (
                    <Popconfirm
                      key={'Delete'}
                      title="请确认是否删除该订单!"
                      onConfirm={deleteConfirm}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a
                        key="SUCCESS"
                        style={{ color: 'red' }}
                        onClick={async () => {
                          setCurrentRow(record);
                        }}
                      >
                        删除
                      </a>
                    </Popconfirm>
                  ),
                  record.status === 0 && (
                    <>
                      <a
                        key="Pay"
                        onClick={() => {
                          toPay(record);
                        }}
                      >
                        付款
                      </a>
                      <Divider type="vertical" />
                      <Popconfirm
                        key={'Closed'}
                        title="请确认是否取消该订单!"
                        onConfirm={closedConfirm}
                        okText="Yes"
                        cancelText="No"
                      >
                        <a
                          key="Closed"
                          style={{ color: 'rgba(150,151,153,0.76)' }}
                          onClick={async () => {
                            setCurrentRow(record);
                          }}
                        >
                          取消
                        </a>
                      </Popconfirm>
                    </>
                  ),
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
