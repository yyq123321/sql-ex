import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Drawer, message, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { SortOrder } from 'antd/lib/table/interface';
import UpdateModal from './components/UpdateModal';
import CreateModal from './components/CreateModal';
import {
  addInterfaceInfoUsingPOST,
  deleteInterfaceInfoUsingPOST,
  listInterfaceInfoByPageUsingGET,
  offlineInterfaceInfoUsingPOST,
  publishInterfaceInfoUsingPOST,
  updateInterfaceInfoUsingPOST,
} from '@/services/ant-design-pro/interfaceInfoController';

const TableList: React.FC = () => {
  const renderCopyableContent = (text: string) => {
    return <div style={{ whiteSpace: 'pre-wrap' }}>{text}</div>;
  };

  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  const styles = {
    textEllipsis: {
      display: '-webkit-box',
      WebkitLineClamp: '3',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '400px',
    },
  };

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPOST({
        ...fields,
      });
      hide();
      message.success('创建成功');
      handleModalVisible(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfo) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateInterfaceInfoUsingPOST({
        id: currentRow.id,
        ...fields,
      });
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   * 发布接口
   *
   * @param record
   */
  const handlePublish = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      await publishInterfaceInfoUsingPOST({
        id: record.id,
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   * 下线接口
   *
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      await offlineInterfaceInfoUsingPOST({
        id: record.id,
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPOST({
        id: record.id,
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此处为必填项',
          },
        ],
      },
      render: (text) => (
        <div style={styles.textEllipsis} className="copyable">
          {text}
        </div>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      render: (text) => (
        <div style={styles.textEllipsis} className="copyable">
          {text}
        </div>
      ),
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此处为必填项',
          },
        ],
      },
    },
    {
      title: '请求参数(若无请填[])',
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此处为必填项',
          },
        ],
      },
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'jsonCode',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此处为必填项',
          },
        ],
      },
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'jsonCode',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此处为必填项',
          },
        ],
      },
    },
    {
      title: '请求示例',
      dataIndex: 'paramExample',
      valueType: 'jsonCode',
    },
    {
      title: '接口url',
      dataIndex: 'url',
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此处为必填项',
          },
        ],
      },
      render: (text) => (
        <div style={styles.textEllipsis} className="copyable">
          {text}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '价格',
      dataIndex: 'price',
      valueType: 'text',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="config"
          type="primary" // 设置按钮类型为主要类型
          style={{ backgroundColor: 'yellow', borderColor: 'yellow', color: 'black' }}
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          修改
        </Button>,

        record.status === 0 ? (
          <Button
            key="config"
            type="primary" // 设置按钮类型为主要类型
            style={{ backgroundColor: 'lightblue', borderColor: 'lightblue', color: 'black' }}
            onClick={() => {
              handlePublish(record);
            }}
          >
            发布
          </Button>
        ) : (
          <Button
            key="config"
            type="primary" // 设置按钮类型为主要类型
            style={{ backgroundColor: 'red', borderColor: 'red', color: 'black' }}
            danger
            onClick={() => {
              handleOffline(record);
            }}
          >
            下线
          </Button>
        ),

        <Button
          key="config"
          type="primary" // 设置按钮类型为主要类型
          danger
          onClick={() => {
            handleRemove(record);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer className={'table-container'}>
      <Card>
        <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
          <ProTable<API.RuleListItem, API.PageParams>
            headerTitle={'接口信息'}
            actionRef={actionRef}
            rowKey="key"
            search={{
              labelWidth: 120,
            }}
            pagination={{
              pageSize: 10, // 每页显示的数据量
            }}
            toolBarRender={() => [
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  handleModalVisible(true);
                }}
              >
                <PlusOutlined /> 新建
              </Button>,
            ]}
            request={async (
              params,
              sort: Record<string, SortOrder>,
              filter: Record<string, React.ReactText[] | null>,
            ) => {
              const res: any = await listInterfaceInfoByPageUsingGET({
                ...params,
              });
              if (res?.data) {
                return {
                  data: res?.data.records || [],
                  success: true,
                  total: res?.data.total || 0,
                };
              } else {
                return {
                  data: [],
                  success: false,
                  total: 0,
                };
              }
            }}
            columns={columns}
            rowSelection={{
              onChange: (_, selectedRows) => {
                setSelectedRows(selectedRows);
              },
            }}
          />
          {selectedRowsState?.length > 0 && (
            <FooterToolbar
              extra={
                <div>
                  已选择{' '}
                  <a
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {selectedRowsState.length}
                  </a>{' '}
                  项 &nbsp;&nbsp;
                  <span>
                    服务调用次数总计{' '}
                    {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
                  </span>
                </div>
              }
            >
              <Button
                onClick={async () => {
                  await handleRemove(selectedRowsState);
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                }}
              >
                批量删除
              </Button>
              <Button type="primary">批量审批</Button>
            </FooterToolbar>
          )}
          <UpdateModal
            columns={columns}
            onSubmit={async (value) => {
              const success = await handleUpdate(value);
              if (success) {
                handleUpdateModalVisible(false);
                setCurrentRow(undefined);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={() => {
              handleUpdateModalVisible(false);
              if (!showDetail) {
                setCurrentRow(undefined);
              }
            }}
            visible={updateModalVisible}
            values={currentRow || {}}
          />

          <Drawer
            width={600}
            visible={showDetail}
            onClose={() => {
              setCurrentRow(undefined);
              setShowDetail(false);
            }}
            closable={false}
          >
            {currentRow?.name && (
              <ProDescriptions<API.RuleListItem>
                column={2}
                title={currentRow?.name}
                request={async () => ({
                  data: currentRow || {},
                })}
                params={{
                  id: currentRow?.name,
                }}
                columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
              />
            )}
          </Drawer>
          <CreateModal
            columns={columns}
            onCancel={() => {
              handleModalVisible(false);
            }}
            onSubmit={(values) => {
              handleAdd(values);
            }}
            visible={createModalVisible}
          />
        </div>
      </Card>
    </PageContainer>
  );
};

export default TableList;
