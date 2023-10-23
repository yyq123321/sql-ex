import React, { useEffect, useState } from 'react';
import { Typography, List, Skeleton, Spin, Badge, Image, Card, message } from 'antd';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Link } from 'umi';
import {
  listInterfaceInfoByPageUsingGET,
  listInterfaceInfoBySearchTextPageUsingGET,
} from '@/services/ant-design-pro/interfaceInfoController';
import { history } from 'umi';
import Search from 'antd/es/input/Search';

const Welcome: React.FC = () => {
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  function changePage(_page: number, _pageSize: number) {
    loadData(_page, _pageSize);
    setCurrent(_page);
    setPageSize(_pageSize);
  }

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 个接口`;
  }

  const paginationProps = {
    onChange: changePage,
    showSizeChanger: true,
    showQuickJumper: true,
    currentPage: current,
    pageSize: pageSize,
    total: total,
    showTotal: showTotal,
    pageSizeOptions: [8, 16, 24, 36],
  };

  const loadData = async (current = 1, pageSize = 10) => {
    try {
      const res = await listInterfaceInfoByPageUsingGET({
        current,
        pageSize,
        status: 1,
      });
      setList(res?.data?.records || []);
      setTotal(res?.data?.total || 0);
    } catch (error: any) {}
  };
  useEffect(() => {
    loadData();
  }, []);

  const onSearch = async () => {
    const res = await listInterfaceInfoBySearchTextPageUsingGET({
      current: 1,
      searchText: searchText,
    });
    if (res.data) {
      setList(res?.data?.records || []);
      setTotal(res?.data?.total || 0);
    }
  };

  return (
    <PageContainer title="YYQ-API接口">
      <Card hoverable>
        <ProCard layout="center">
          <Search
            showCount
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            allowClear
            size={'large'}
            maxLength={50}
            enterButton="搜索"
            placeholder={'没找到接口？快搜索一下吧'}
            onSearch={onSearch}
            style={{ maxWidth: 600, height: 60 }}
          />
        </ProCard>
      </Card>
      <br />
      <br />
      <Spin spinning={loading}>
        <List
          pagination={paginationProps}
          grid={{
            gutter: 20,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 4,
            xl: 5,
            xxl: 6,
          }}
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item>
              <ProCard key={index} bordered hoverable direction="column" style={{ height: 270 }}>
                <ProCard
                  layout="center"
                  onClick={() => {
                    history.push(`/interface_info/${item.id}`);
                  }}
                >
                  <Badge count={item.totalNum || 0} overflowCount={999999999} color="#eb4d4b">
                    <Image
                      style={{ width: 80, borderRadius: 8, marginLeft: 10 }}
                      src={item?.avatarUrl ?? 'https://img.qimuu.icu/typory/logo.gif'}
                      fallback={'https://img.qimuu.icu/typory/logo.gif'}
                      alt={item.name}
                      preview={false}
                    />
                  </Badge>
                </ProCard>
                <ProCard
                  onClick={() => {
                    history.push(`/interface_info/${item.id}`);
                  }}
                  layout="center"
                  style={{ marginTop: -10, fontSize: 16 }}
                >
                  {item.name}
                </ProCard>
                <ProCard
                  onClick={() => {
                    history.push(`/interface_info/${item.id}`);
                  }}
                  layout="center"
                  style={{ marginTop: -18, fontSize: 14 }}
                >
                  {!item.description
                    ? '暂无接口描述'
                    : item.description.length > 15
                    ? item.description.slice(0, 15) + '...'
                    : item.description}
                </ProCard>
              </ProCard>
            </List.Item>
          )}
        />
      </Spin>
    </PageContainer>
  );
};
export default Welcome;
