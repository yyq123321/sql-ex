import React, { useState } from 'react';
import {Modal, Form, Input, InputNumber, message} from 'antd';
import {useModel} from "@@/plugin-model/useModel";

const NewFoodForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const { initialState, setInitialState } = useModel('@@initialState');

  const onFinish = (values) => {
    onCreate(values);
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title="新增菜品"
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onFinish(values);
          })
          .catch((errorInfo) => {
            console.log('Validation failed:', errorInfo);
          });
      }}
    >
      <Form form={form} layout="vertical" name="newFoodForm">
        <Form.Item
          name="name"
          label="菜品名称"
          rules={[{ required: true, message: '请输入菜品名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="菜品类别(肉类填1 素菜填2)"
          rules={[{ required: true, message: '请输入菜品类别' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="price"
          label="价格"
          rules={[{ required: true, message: '请输入价格' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name="photo" label="图片链接">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewFoodForm;
