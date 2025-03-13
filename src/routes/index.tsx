import { Navigate, useRoutes } from 'react-router-dom';

import Layout from '../layout/index';
import Login from '../pages/login/index';
import User from '../pages/user';

//公共
import { lazy } from 'react';
import lazyLoad from './lazyLoad';

export const routerItem: Array<object> = [
  {
    path: '/',
    key: '/',
    label: '首页',
    hidden: true,
    element: <Navigate to="/layout/home" />,
  },
  {
    path: '/login',
    key: 'login',
    label: '登录',
    element: <Login />,
    meta: {
      noAuth: true, //不需要token检验
    },
  },
  {
    path: '/layout',
    key: 'layout',
    label: '控制台',
    element: <Layout />,
    children: [
      {
        path: 'home',
        key: 'home',
        label: '首页',
        element: lazyLoad(lazy(() => import('../pages/home'))), //这里是延迟加载
      },
      {
        path: 'user',
        key: 'user',
        label: '用户页',
        element: <User />,
      },
    ],
  },
];

function GetRoutes() {
  return useRoutes(routerItem);
}

export default GetRoutes;
