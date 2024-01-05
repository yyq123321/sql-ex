import {useParams} from 'umi';
import React, {useEffect, useState} from 'react';
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Radio,
  Select,
  Spin,
  Tag,
  Tooltip
} from 'antd';

import {useModel} from "@@/plugin-model/useModel";
import {getFoodsByIdUsingGET} from "@/services/ant-design-pro/foodsController";
import {addAddressUsingPOST, listAddressUsingGET} from "@/services/ant-design-pro/addressController";
import { createOrderUsingPOST } from '@/services/ant-design-pro/ordersController';

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
  const [data, setData] = useState<API.FoodsVO>();
  const [loading, setLoading] = useState<boolean>(true);
  const { initialState, setInitialState } = useModel('@@initialState');

  const [modalVisible, setModalVisible] = useState(false);
  const [addressList, setAddressList] = useState<API.Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [pageSize, setPageSize] = useState<number>(8);
  const [totalNum, setTotalNum] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 在组件内部定义一个状态来控制添加地址模态框的显示
  const [addAddressVisible, setAddAddressVisible] = useState(false);
  const [form] = Form.useForm();

  // 假设这是一个添加地址的表单，表单中有相关字段的状态和对应的修改函数
  const [newAddress, setNewAddress] = useState({
    consignee: '',
    sex: null,
    phone: '',
    detail: '',
  });

// 处理确认添加地址的操作
  const handleAddAddressOk = () => {
    form.submit();
  };

  // 处理表单提交事件
  const handleFormSubmit = async (values: any) => {
    // 将表单的值存储到状态中
    setNewAddress(values);
    // 发送请求添加新地址
    addAddressUsingPOST({
      consignee: values.consignee,
      sex: values.sex,
      phone: values.phone,
      detail: values.detail,
      customerId: initialState?.customerId
    }) // 假设有一个函数用于向服务器添加新地址
      .then((response) => {
        // 处理添加地址成功的情况，可能需要更新地址列表等操作
        message.success("添加成功");
        // 关闭添加地址的模态框
        setAddAddressVisible(false);
        // 清空新地址的表单状态，以便下次添加
        setNewAddress({
          consignee: '',
          sex: null,
          phone: '',
          detail: '',
        });
      })
      .catch((error) => {
        // 处理添加地址失败的情况，可能会显示错误信息等操作
        message.error("添加失败")
      });
  };

  // 处理取消添加地址的操作
  const handleAddAddressCancel = () => {
    // 关闭添加地址的模态框
    setAddAddressVisible(false);
    // 清空新地址的表单状态，以便下次添加
    setNewAddress({
      consignee: '',
      sex: null,
      phone: '',
      detail: '',
    });
  };



// 处理点击“添加地址”按钮时的事件
  const handleAddAddress = () => {
    setAddAddressVisible(true); // 设置状态以显示添加地址的模态框
  };

  const params = useParams<RouteParams>();
  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    const res = await getFoodsByIdUsingGET({id: Number(params.id)});

    const addres = await listAddressUsingGET({ current: currentPage, pageSize: pageSize, customerId: initialState?.customerId });
    if(addres.data) {
      setAddressList(addres.data.list || []);
      setTotalNum(addres.data.total || 0);
    }

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

  const handleOrderButtonClick = () => {
    setModalVisible(true);
  };

  const handleAddressSelect = (value) => {
    setSelectedAddressId(value);
  };

  const handleCreateOrder = async () => {
    if (selectedAddressId) {
      // 在此处调用创建订单的函数
      const response = await createOrderUsingPOST({
        addressId: selectedAddressId, // 使用用户选择的地址 ID
        businessId: data?.businessId,
        customerId: initialState?.customerId,
        foodId: data?.id,
        price: data?.price,
        remark: '备注',
      });

      // 处理订单创建后的逻辑
      console.log('Order Created:', response); // 打印订单创建的响应信息
    } else {
      console.log('请选择地址后再创建订单');
    }
    setModalVisible(false);
  };

  function changePage(_page: number, _pageSize: number) {
    listAddressUsingGET({ current: _page, pageSize: _pageSize, customerId: initialState?.customerId }).then((result) => {
      setAddressList(result.data.list || []);
      setTotalNum(result.data.total || 0);
    });
    // setListData(result.courseVOList);
    setCurrentPage(_page);
    setPageSize(_pageSize);
  }


  return (
    <Spin spinning={loading}>
      <Card
        title={'菜品信息'}
        extra={
          <>
            {(initialState?.customerId) && (
              <Button type="primary" onClick={handleOrderButtonClick}>
                下单
              </Button>
            )}
          </>
        }
      >
        <Descriptions>
          <Descriptions.Item key={'id'} label={'菜品id'}>
            {data?.id}
          </Descriptions.Item>
          <Descriptions.Item key={'price'} label="菜品金额 (元)">
            {data?.price}
          </Descriptions.Item>
          <Descriptions.Item key={'name'} label="菜品名">
            {data?.name}
          </Descriptions.Item>

          <Descriptions.Item key={'businessId'} label="商家id">
            {data?.businessId}
          </Descriptions.Item>
          <Descriptions.Item key={'photo'} label="菜品图">
            {data?.photo && <img src={data?.photo} alt="菜品图" style={{
              maxWidth: '200px',
              maxHeight: '150px',
              /* 如果需要固定宽高比，可以只设置其中一个值，另一个值设置为 'auto' */
              /* 例如，固定宽度为200px，高度自适应：maxWidth: '200px', height: 'auto' */
            }}/>}
          </Descriptions.Item>

          <Descriptions.Item
            key={'category'}
            label="菜品类别"
          >
            {data?.category}
          </Descriptions.Item>

        </Descriptions>
      </Card>

      <Modal
        title="选择地址"
        visible={!loading && modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalNum}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={['8', '16', '24', '36']}
            showTotal={(total, range) => `${range[0]}-${range[1]} 共 ${total} 项`}
            onChange={changePage}
          />
        }
      >
        <Menu>
          {Array.isArray(addressList) &&
            addressList.map((address) => (
              <Menu.Item key={address.id} onClick={() => handleAddressSelect(address.id)}>
                收货人:{address.consignee}{address.sex == 1 ? "先生" : "女士"} - 收货地址:{address.detail} 联系电话:{address.phone}
              </Menu.Item>
            ))}
        </Menu>
        <Button onClick={handleAddAddress} type="primary">添加地址</Button>

        {/* 确认订单的弹窗 */}
        {/* ... */}

        {/* 新的 Modal */}
        <Modal
          title="添加地址"
          visible={addAddressVisible}
          onOk={handleAddAddressOk}
          onCancel={handleAddAddressCancel}
        >
          {/* 在这里添加表单用于输入地址信息 */}
          <Form form={form} onFinish={handleFormSubmit}>
            <Form.Item
              label="收货人"
              name="consignee"
              rules={[{ required: true, message: '请输入收货人姓名' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="性别"
              name="sex"
              rules={[{ required: true, message: '请选择性别' }]}
            >
              <Radio.Group>
                <Radio value={1}>先生</Radio>
                <Radio value={2}>女士</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="联系电话"
              name="phone"
              rules={[{ required: true, message: '请输入联系电话' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="收货地址详情"
              name="detail"
              rules={[{ required: true, message: '请输入收货地址详情' }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>

        <Popconfirm
          title="确认创建订单吗？"
          onConfirm={handleCreateOrder}
          okText="确认"
          cancelText="取消"
        >
          <Button type="primary">确认订单</Button>
        </Popconfirm>
      </Modal>

    </Spin>
  );
};
