import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { mainRoutes } from '../routes/index';
import { matchRoute } from '../utils/util';

const AutoRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');

  //1、获取当前路径对应的路由配置
  const route = matchRoute(pathname, mainRoutes);
  //2、如果noAuth为true，则直接跳过校验
  if (route && route.meta && route.meta.noAuth) {
    return props.children;
  }
  // 3、需要校验, 且如果不存在token，则进入登录页
  if (!token) return <Navigate to="/login" />;
  // 4、存在token，则进入主页
  return props.children;
};

export default AutoRouter;
