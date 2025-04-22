import { UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Dropdown, Layout, MenuProps, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useBreadcrumb } from '../hooks/useBreadcrumb';
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
  const breadcrumbs = useBreadcrumb();
  return (
    <Layout className="h-full">
      <Header className="flex items-center justify-between">
        <div className="h-6 w-20 rounded-sm bg-slate-500" />

        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </Header>
      <div className="h-[calc(100%-133px)] overflow-hidden px-10 pb-10">
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={breadcrumbs.map((i) => ({ title: i.title, href: i.path }))}
        ></Breadcrumb>
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
