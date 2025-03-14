import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import reactIcon from '../../assets/images/logo_square.png';
import './index.scss';

interface LoginData {
  username: string;
  password: string;
  remember: string;
}

const Index: FC = () => {
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
            navigate('/home/welcome', { replace: true });
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
    <div className="relative h-full w-full bg-black">
      {contextHolder}
      <div className="absolute left-3 top-3 flex items-center gap-2">
        <img src={reactIcon} className="w-10" />{' '}
        <span className="font-jy text-[20px] font-bold text-white">ZEEKER</span>
      </div>
      <div className="absolute bottom-0 right-0 top-0 w-[400px] bg-[#14161a] px-[100px] py-[200px]">
        <h2 className="text-[24px]">欢迎回来 👋</h2>
        <p className="text-sm text-white/60">请输入您的账户信息！</p>

        <Form
          className="mt-8"
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
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 24 }}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>记住密码</Checkbox>
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
