import { UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Dropdown, Layout, MenuProps, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Aside from './aside';

const MyLayout: FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a href="/login">退出登录</a>,
    },
  ];

  return (
    <Layout className="h-full">
      <Header className="flex items-center justify-between">
        <div className="h-6 w-20 rounded-sm bg-slate-500" />

        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </Header>
      <div className="h-full px-10 pb-10">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className="h-full"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <Aside />
          </Sider>
          <Content className="h-full bg-[#141414]">
            <Outlet />
          </Content>
        </Layout>
      </div>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MyLayout;
