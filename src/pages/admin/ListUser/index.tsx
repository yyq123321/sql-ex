import type { FC } from 'react';
import React, { useState } from 'react';
import { Avatar, Badge, Button, Card, Input, List, message, Popconfirm, Radio } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import moment from 'moment';
import styles from './style.less';
import { changeStatus, listUserByPageUsingGET } from '@/services/ant-design-pro/userController';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

const ListContent = ({
  data: { userName, userAvatar, createTime, phone, status },
}: {
  data: API.UserVO;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>用户名</span>
      <p>{userName}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>电话</span>
      <p>{phone}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>创建时间</span>
      <p>{moment(createTime).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <Badge status={status == 0 ? 'success' : 'error'} text={status == 0 ? '正常' : '封禁'} />
    </div>
  </div>
);

export const UserList: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [totalNum, setTotalNum] = useState(0);
  const [listData, setListData] = useState<API.UserVO[]>([]);
  const [reload, setReload] = useState(true);

  const { loading } = useRequest(
    () => {
      const result = listUserByPageUsingGET({ current: currentPage, pageSize: pageSize });
      return result;
    },
    {
      onSuccess: (result) => {
        setTotalNum(result?.total || 0);
        setListData(result?.records || []);
      },
    },
  );

  function changePage(_page: number, _pageSize: number) {
    listUserByPageUsingGET({ current: _page, pageSize: _pageSize }).then((result) => {
      setListData(result.records);
      setTotalNum(result.total);
    });
    // setListData(result.courseVOList);
    setCurrentPage(_page);
    setPageSize(_pageSize);
  }

  const confirmBlock = (userId: number) => async (e: React.MouseEvent<HTMLElement>) => {
    const res = await changeStatus({ status: 1, userId: userId });
    if (res) {
      message.success('封禁成功');
      changePage(1, pageSize);
    } else {
      message.error('系统错误');
    }
  };

  const confirmUnBlock = (userId: number) => async (e: React.MouseEvent<HTMLElement>) => {
    const res = await changeStatus({ status: 0, userId: userId });
    if (res) {
      message.success('解封成功');
      changePage(1, pageSize);
    } else {
      message.error('系统错误');
    }
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success('取消操作');
  };

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 人`;
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

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部用户</RadioButton>
        <RadioButton value="progress">正常用户</RadioButton>
        <RadioButton value="waiting">封禁用户</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="用户列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={listData}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    item.status === 0 ? (
                      <Popconfirm
                        title="封禁用户"
                        description="确认封禁用户?"
                        onConfirm={confirmBlock(item.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger>封禁</Button>
                      </Popconfirm>
                    ) : (
                      <Popconfirm
                        title="解封用户"
                        description="确认解封用户?"
                        onConfirm={confirmUnBlock(item.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="primary">解封</Button>
                      </Popconfirm>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.userAvatar} shape="square" size="large" />}
                    // title={<a href={item.href}>{item.userName}</a>}
                    title={<a>{item.userName}</a>}
                    description={item.phone}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>
    </div>
  );
};

export default UserList;
