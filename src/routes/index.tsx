import { Navigate, useRoutes } from 'react-router-dom';

import Layout from '../layout/index';
import Login from '../pages/login/index';
import User from '../pages/user/index';

//公共
import { lazy } from 'react';
import lazyLoad from './lazyLoad';

export const mainRoutes = [
  {
    path: '/',
    key: '/',
    label: 'root',
    hidden: true,
    element: <Navigate to="/home/welcome" />,
  },
  {
    path: '/login',
    key: 'login',
    label: '登录',
    hidden: true,
    element: <Login />,
    meta: {
      noAuth: true, //不需要token检验
    },
  },
  {
    path: '/home',
    key: 'home',
    label: 'Dashborad',
    element: <Layout />,
    children: [
      {
        path: 'welcome',
        key: 'welcome',
        label: '首页',
        element: lazyLoad(lazy(() => import('../pages/home'))), //这里是延迟加载
      },
    ],
  },
  {
    path: '/user',
    key: 'user',
    label: '用户',
    element: <Layout />,
    children: [
      {
        path: 'usercenter',
        key: 'usercenter',
        label: '个人中心',
        element: <User />,
      },
    ],
  },
];

function GetRoutes() {
  return useRoutes(mainRoutes);
}

export default GetRoutes;
