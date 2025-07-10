import { DiscordOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Breadcrumb,
  Button,
  Divider,
  Dropdown,
  Layout,
  MenuProps,
  Space,
  theme,
} from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useBreadcrumb } from '../hooks/useBreadcrumb';
import Aside from './aside';

const contentStyle: React.CSSProperties = {
  backgroundColor: '#313131',
  borderRadius: '4px',
};

const menuStyle: React.CSSProperties = {
  boxShadow: 'none',
};

const MyLayout: FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a href="/login">退出登录</a>,
      icon: (
        <Icon
          icon="material-symbols-light:login-outline-rounded"
          width="20"
          height="20"
        />
      ),
    },
  ];
  const breadcrumbs = useBreadcrumb();
  return (
    <Layout className="h-full">
      <Header className="flex items-center justify-between">
        <div className="font-jy flex items-center gap-2 text-[20px]">
          <DiscordOutlined style={{ fontSize: '30px' }} />
          React Testing
        </div>

        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </Header>
      <div className="h-[calc(100%-104px)] overflow-hidden px-10">
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={breadcrumbs.map((i) => ({ title: i.title, href: i.path }))}
        ></Breadcrumb>
        <Layout
          className="h-[calc(100%-54px)] overflow-hidden rounded-lg"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{ background: '#1e1e1e', padding: '10px' }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              //console.log(collapsed, type);
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
          height: '40px',
          padding: '10px',
        }}
      >
        React box ©{new Date().getFullYear()} Created by Super Bing
      </Footer>
    </Layout>
  );
};

export default MyLayout;
