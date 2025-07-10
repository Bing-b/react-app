import * as React from 'react';

export interface MetaProp {
  title: string;
  key: string;
  noAuth: boolean;
}
export interface RouteObject {
  children?: RouteObject[];
  element?: React.ReactNode;
  path?: string;
  meta?: Partial<MetaProp>;
}

/**
 * 获取路径对应的路由配置，没有则返回 null
 * @param path 路由完整路径
 * @param routes 路由数组
 * @returns 路由配置项
 */
export function matchRoute(path: string, routes: RouteObject[] = []): object {
  const pathArr = path.split('/');
  pathArr.shift();
  const curPath = pathArr.shift();
  for (let i = 0; i < routes.length; i++) {
    const item = routes[i];
    if ([curPath, `/${curPath}`].includes(item.path)) {
      if (!pathArr.length) {
        return item;
      }
      if (item.children) {
        const res = matchRoute(`/${pathArr.join('/')}`, item.children);
        if (res) {
          return res;
        }
      }
    }
  }
}
