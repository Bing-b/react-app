import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Aside from './aside';

const MyLayout: FC = () => {
  return (
    <Layout>
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
        <div className="font-jy py-3 text-center text-[24px] leading-10 text-white">
          ZEEKER
        </div>
        <Aside />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px' }}></Header>
        <Content
          style={{
            margin: '16px 16px 0',
            padding: 16,
            height: 'calc(100vh - 64px - 69px - 16px)',
            borderRadius: '8px',
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
