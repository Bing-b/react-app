import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import reactIcon from '../../assets/images/logo_square.png';
import './index.scss';

const styles = {
  login: {
    background: `linear-gradient(blue, pink)`,
    width: '100vw',
    height: '100vh',
  },
};

interface Props {
  title: string;
}

interface LoginData {
  username: string;
  password: string;
  remember: string;
}

const Index: FunctionComponent<Props> = ({ title }) => {
  title = title || 'React';
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: LoginData) => {
    messageApi.open({
      type: 'loading',
      content: '正在登录...',
      duration: 0,
    });

    setTimeout(() => {
      messageApi.destroy();

      if (values.username === 'admin' && values.password === '123') {
        localStorage.setItem('token', 'token0000');
        messageApi.open({
          type: 'success',
          content: '登录成功!',
          duration: 1,
          onClose() {
            navigate('/layout/home', { replace: true });
          },
        });
      } else {
        return messageApi.open({
          type: 'error',
          content: '账号或密码错误！',
        });
      }

      if (values.username !== 'admin') {
        return messageApi.open({
          type: 'error',
          content: '登录失败！',
        });
      }
    }, 500);
  };

  return (
    <div className="login_container" style={styles.login}>
      {contextHolder}
      <div className="title_big">
        <img src={reactIcon} style={{ width: '50px' }} />
        登录{' '}
      </div>
      <div className="login_panel">
        <Form
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === 'admin') {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('用户名不存在!'));
                },
              }),
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 24 }}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>记住密码</Checkbox>
            {/* <Button type="link" htmlType="button" style={{ float: "right" }}>
                            忘记密码？
                        </Button> */}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" block>
              {' '}
              登录{' '}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Index;
