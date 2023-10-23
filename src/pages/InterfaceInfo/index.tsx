import React, { CSSProperties, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Form,
  Input,
  message,
  Spin,
  Table,
  Tabs,
  Tag,
} from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { useParams } from 'react-router';
import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoUsingPOST,
} from '@/services/ant-design-pro/interfaceInfoController';
import {
  BugOutlined,
  CodeOutlined,
  FileExclamationOutlined,
  FileTextOutlined,
  RollbackOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { history } from '@@/core/history';
import ApiTab from './components/ApiTab';
import ToolsTab from './components/ToolsTab';
import Column from 'antd/lib/table/Column';
import CodeHighlighting from '@/components/CodeHighlighting';
import {
  axiosExample,
  convertResponseParams,
  javaExample,
  returnExample,
} from '@/pages/InterfaceInfo/components/CodeTemplate';
import { useModel } from '@@/plugin-model/useModel';
import { errorCode } from '@/enum/ErrorCodeEnum';
import './index.less';
import { InterfaceRequestMethodEnum } from '@/enum/commonEnum';

const Welcome: React.FC = () => {
  const { search, pathname } = window.location;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [activeTabKey, setActiveTabKey] = useState<
    'tools' | 'api' | 'errorCode' | 'sampleCode' | string
  >('api');
  const [invokeRes, setInvokeRes] = useState<any>();
  const [resultLoading, setResultLoading] = useState<boolean>(false);
  const [requestParams, setRequestParams] = useState<[]>();
  const [temporaryParams, setTemporaryParams] = useState<any>();
  const [responseParams, setResponseParams] = useState<[]>();
  const [result, setResult] = useState<string>();
  const [requestExampleActiveTabKey, setRequestExampleActiveTabKey] = useState<string>('javadoc');
  const [javaCode, setJavaCode] = useState<any>();
  const [axiosCode, setAxiosCode] = useState<any>();
  const [returnCode, setReturnCode] = useState<any>(returnExample);

  const params = useParams();
  const { initialState } = useModel('@@initialState');
  const { loginUser } = initialState || {};

  const loadedData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      // @ts-ignore
      const res = await getInterfaceInfoByIdUsingGET({ id: params.id });
      if (res.data && res.code === 0) {
        setData(res.data || {});
        // setTotalInvokes(res.data.totalInvokes || 0)
        const requestParam = res.data.requestParams;
        const responseParam = res.data.responseParams;
        try {
          setRequestParams(requestParam ? JSON.parse(requestParam) : []);
          setResponseParams(responseParam ? JSON.parse(responseParam) : []);

          const dataObj = JSON.parse(res.data.paramExample); // 解析内层的JSON字符串

          const finalResult = {
            code: 100,
            data: dataObj,
            message: 'ok',
          };
          const finalJson = JSON.stringify(finalResult, null, 4); // 转换为格式化的JSON字符串
          setReturnCode(finalJson);
        } catch (e: any) {
          setRequestParams([]);
          setResponseParams([]);
        }
        const response = res.data.responseParams
          ? JSON.parse(res.data.responseParams)
          : ([] as API.RequestParamsField);
        const convertedParams = convertResponseParams(response);
        setAxiosCode(axiosExample(res.data?.url, res.data?.method?.toLowerCase()));
        setJavaCode(javaExample(res.data?.url, res.data?.method?.toUpperCase()));
        setReturnCode(convertedParams);
      }
      setLoading(false);
    } catch (e: any) {
      message.error(e.message);
    }
  };
  useEffect(() => {
    loadedData();
  }, []);

  const onSearch = async (values: any) => {
    setResultLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: data?.id,
        ...values,
      });
      if (res.code === 0) {
        // setTotalInvokes(Number(totalInvokes) + 1)
      }
      const dataObj = JSON.parse(res.data); // 解析内层的JSON字符串

      const finalResult = {
        code: res.code,
        data: dataObj,
        message: res.message,
      };

      const finalJson = JSON.stringify(finalResult, null, 4); // 转换为格式化的JSON字符串

      setResult(finalJson);
      setResultLoading(false);
      message.success('调用成功');
    } catch (error: any) {
      message.error('请求失败' + error.message);
    }
  };

  const requestExampleTabChange = (key: string) => {
    setRequestExampleActiveTabKey(key);
  };

  const responseExampleTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const responseExampleTabList = [
    {
      key: 'api',
      tab: (
        <span>
          <FileTextOutlined />
          API文档
        </span>
      ),
    },
    {
      key: 'tools',
      tab: (
        <span>
          <BugOutlined />
          在线调试工具
        </span>
      ),
    },
    {
      key: 'errorCode',
      tab: (
        <span>
          <FileExclamationOutlined />
          错误码参照
        </span>
      ),
    },
    {
      key: 'sampleCode',
      tab: (
        <span>
          <CodeOutlined />
          示例代码
        </span>
      ),
    },
  ];

  const responseExampleContentList: Record<string, React.ReactNode> = {
    api: (
      <ApiTab
        sampleCode={() => setActiveTabKey('sampleCode')}
        errorCodeTab={() => setActiveTabKey('errorCode')}
        requestParams={requestParams}
        responseParams={responseParams}
        returnCode={returnCode}
      />
    ),
    tools: (
      <ToolsTab
        form={form}
        data={data}
        temporaryParams={temporaryParams}
        onSearch={onSearch}
        requestExampleActiveTabKey={requestExampleActiveTabKey}
        paramsTableChange={(e: any) => {
          setTemporaryParams(e);
        }}
        result={result}
        resultLoading={resultLoading}
      />
    ),
    errorCode: (
      <>
        <p className="highlightLine">错误码：</p>
        <Table dataSource={errorCode} pagination={false} style={{ maxWidth: 800 }} size={'small'}>
          <Column title="参数名称" dataIndex="name" key="name" />
          <Column title="错误码" dataIndex="code" key="code" />
          <Column title="描述" dataIndex="des" key="des" />
        </Table>
      </>
    ),
    sampleCode: (
      <>
        <Tabs
          defaultActiveKey="javadoc"
          centered
          onChange={requestExampleTabChange}
          items={[
            {
              key: 'javadoc',
              label: 'java',
              children: <CodeHighlighting codeString={javaCode} language={'java'} />,
            },
            {
              key: 'javascript',
              label: 'axios',
              children: (
                <CodeHighlighting codeString={axiosCode} language={requestExampleActiveTabKey} />
              ),
            },
          ]}
        />
      </>
    ),
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const handleBuy = () => {
    history.push(`/recharge`);
  };

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: params.id,
        ...values,
      });
      setInvokeRes(res.data);
      setInvokeLoading(false);
      message.success('请求成功');
      return true;
    } catch (error: any) {
      message.error('请求失败' + error.message);
      return false;
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const styles: { [key: string]: CSSProperties } = {
    textEllipsis: {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 3,
      maxHeight: '3em',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };

  return (
    <PageContainer
      title="API开放平台接口文档"
      header={{
        extra: [
          <Button type="primary" icon={<RollbackOutlined />} onClick={handleGoBack} key="3">
            返回上一级
          </Button>,
          <Button type="primary" icon={<ShopOutlined />} onClick={handleBuy} key="1">
            充值
          </Button>,
        ],
      }}
    >
      <Card>
        {data ? (
          <Descriptions title={data?.name}>
            <Descriptions.Item label="接口状态">{data.status ? '正常' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="计费规则">{data?.price + '元/条'}</Descriptions.Item>
            <Descriptions.Item key={'request'} label="请求方式">
              {' '}
              <Tag color={InterfaceRequestMethodEnum[data?.method ?? 'default']}>
                {data?.method}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="请求参数">
              {data.requestParams == null ? '无' : data.requestParams}
            </Descriptions.Item>
            <Descriptions.Item label="请求地址">
              <div style={styles.textEllipsis}>{data.url}</div>
            </Descriptions.Item>
            <Descriptions.Item label="请求头">
              {data.requestHeader == null ? '无' : data.requestHeader}
            </Descriptions.Item>
            <Descriptions.Item label="请求示例">{data.paramExample}</Descriptions.Item>
            <Descriptions.Item label="相应头">
              {data.responseHeader == null ? '无' : data.responseHeader}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Divider />
      <Card
        style={{ width: '100%' }}
        tabList={responseExampleTabList}
        activeTabKey={activeTabKey}
        onTabChange={responseExampleTabChange}
      >
        {responseExampleContentList[activeTabKey]}
      </Card>
    </PageContainer>
  );
};
export default Welcome;
