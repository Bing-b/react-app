import { Navigate, useRoutes } from 'react-router-dom';

import Layout from '@/layout/index';
import DeepSeek from '@/pages/deepseek/index';
import Login from '@/pages/login/index';

//公共
import { lazy } from 'react';
import lazyLoad from './lazyLoad';

export const mainRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        key: '/',
        label: '概览',
        element: lazyLoad(lazy(() => import('@/pages/home'))), //这里是延迟加载
      },
      {
        path: 'Deepseek',
        key: 'Deepseek',
        label: 'Deepseek',
        element: <DeepSeek />,
      },
    ],
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
];

function GetRoutes() {
  return useRoutes(mainRoutes);
}

export default GetRoutes;
