// react hook
import { Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainRoutes } from '../routes/index';

const Aside = () => {
  const navigate = useNavigate();

  // 菜单
  const [routes] = useState<any[]>(mainRoutes);

  // 打开与选中
  const defaultOpenKeys = (sessionStorage.getItem('openKeys') || '/')?.split(
    ',',
  );
  const defaultSelectKeys = sessionStorage.getItem('selectKeys') || '/';

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
    sessionStorage.setItem('selectKeys', selectKeys);
    sessionStorage.setItem('openKeys', openKeys);
  };

  return (
    <>
      <Menu
        mode="inline"
        theme="dark"
        style={{ background: '#1e1e1e' }}
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={selectKeys}
        items={
          routes.filter((i) => !i.hidden).find((i) => i.path === '/').children
        }
        onClick={menuHandler}
      ></Menu>
    </>
  );
};

export default Aside;
