import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { Link } from '@umijs/preset-dumi/lib/theme';
import styles from './index.less';
import {getLoginUserUsingGET2, loginUsingPOST2} from "@/services/ant-design-pro/ridersController";

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form] = ProForm.useForm();
  const [mobile, setMobile] = useState<string>('');
  // const { dispatch } = props;
  useEffect(() => {
    // console.log(initialState.token); // 打印最新的 token 值
    // 进行其他操作
  }, [initialState]);

  const fetchUserInfo = async () => {
    const userInfo = await getLoginUserUsingGET2();
    if (userInfo) {
      // const msgNum = await queryUserMsgNum(userInfo.data.id);
      await setInitialState({
        ...initialState,
        currentUser: userInfo.data,
        businessId: undefined,
        customerId: undefined,
        riderId: userInfo.data.id,
        // unReadMsg: msgNum.data,
      });
    }
  };
  const handleSubmit = async (values: API.CustomerLoginRequest) => {
    try {
      // 登录
      const msg = await loginUsingPOST2({
        ...values,
      });
      if (msg.data) {
        console.log(msg);
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        // await setToken(msg.data);
        await fetchUserInfo();
        // message.success(initialState.currentUser.access + "1");
        // await getLoginStudentUsingGET();
        /** 此方法会跳转到 redirect 参数所在的位 置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push('/riderIndex' || redirect);
        // window.location.href = '/';
        return;
      }
    } catch (error) {
      // const defaultLoginFailureMessage = '登录失败，请重试！';
      // message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
          <div className={styles.content}>
            <LoginForm
              logo={<img alt="logo" src="/logo.ico" />}
              title="外卖demo"
              subTitle="骑手登录"
              onFinish={async (values) => {
                await handleSubmit(values as API.RiderLoginRequest);
              }}
              form={form}
            >
              <Tabs activeKey={type} onChange={setType}>
                <Tabs.TabPane key="account" tab={'账号密码登录'} />
              </Tabs>
              {/*<div style={{display: 'flex', justifyContent: 'flex-end'}}>*/}
              {/*  <Link to="/user/loginUseCode">手机验证码登录</Link>*/}
              {/*</div>*/}
              {type === 'account' && (
                <>
                  <ProFormText
                    name="phone"
                    fieldProps={{
                      size: 'large',
                      prefix: <UserOutlined className={styles.prefixIcon} />,
                    }}
                    placeholder={'手机号: '}
                    rules={[
                      {
                        required: true,
                        message: '手机号是必填项！',
                      },
                    ]}
                  />
                  <ProFormText.Password
                    name="password"
                    fieldProps={{
                      size: 'large',
                      prefix: <LockOutlined className={styles.prefixIcon} />,
                    }}
                    placeholder={'密码: '}
                    rules={[
                      {
                        required: true,
                        message: '密码是必填项！',
                      },
                    ]}
                  />
                  <br />
                  <Link to="/business/login">商户登录</Link>
                  <br/>
                  <Link to="/customer/login">顾客登录</Link>
                  <a
                    style={{
                      float: 'right',
                      marginBottom: 10,
                    }}
                  >
                    忘记密码 ?
                  </a>
                </>
              )}
              <div
                style={{
                  marginBottom: 24,
                }}
              />
            </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
