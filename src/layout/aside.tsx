// react hook
import { Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routerItem } from '../routes/index';

const Aside = () => {
  const navigate = useNavigate();

  // 菜单
  const [routes] = useState<any[]>(routerItem);

  // 打开与选中
  const defaultOpenKeys = (localStorage.getItem('openKeys') || '')?.split(',');
  const defaultSelectKeys = localStorage.getItem('selectKeys') || '';
  const [selectKeys, setSelectKeys] = useState<string[]>([defaultSelectKeys]);
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  // 点击菜单
  const menuHandler = (e: any) => {
    let path = '/' + e.keyPath.reverse().join('/');
    path = path.replace('//', '/');
    navigate(path);

    // 缓存打开和选中的Keys
    const selectKeys = e.key;
    e.keyPath.pop();
    const openKeys = e.keyPath.join(',');
    setSelectKeys(selectKeys);
    setOpenKeys(openKeys);
    localStorage.setItem('selectKeys', selectKeys);
    localStorage.setItem('openKeys', openKeys);
  };

  return (
    <>
      <Menu
        mode="inline"
        theme="dark"
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={selectKeys}
        items={routes}
        onClick={menuHandler}
      ></Menu>
    </>
  );
};

export default Aside;
