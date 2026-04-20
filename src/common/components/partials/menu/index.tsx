import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
  FolderOpenOutlined,
  TeamOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useTranslation } from '../../../../../node_modules/react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type { UserRole } from '../../../store/slices/configSlice';

type MenuItemConfig = {
  key: string;
  icon: React.ReactNode;
  labelKey: string;
  roles?: UserRole[];
};

const MENU_ITEMS: {
  top: MenuItemConfig[];
  bottom: MenuItemConfig[];
} = {
  top: [
    {
      key: '/',
      icon: <FolderOpenOutlined />,
      labelKey: 'dashboard',
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      labelKey: 'sidebar.users',
      // roles: ['ADMIN'],
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      labelKey: 'sidebar.settings',
      // roles: ['USER'],
    }
  ],
  bottom: [
    // {
    //   key: '/settings',
    //   icon: <SettingOutlined />,
    //   labelKey: 'sidebar.settings',
    //   roles: ['ADMIN'],
    // }
  ],
};

const filterMenuItemsByRole = (items: MenuItemConfig[], userRole: UserRole | null, t: (key: string) => string) => {
  return items
    .filter((item) => {
      // Əgər roles yoxdursa, hər kəs üçün görünür
      if (!item.roles) return true;
      // Əgər roles varsa, yalnız o role-lar üçün görünür
      return userRole && item.roles.includes(userRole);
    })
    .map((item) => ({
      key: item.key,
      icon: item.icon,
      label: t(item.labelKey),
    }));
};

const getTopMenuItems = (t: (key: string) => string, userRole: UserRole | null) => {
  return filterMenuItemsByRole(MENU_ITEMS.top, userRole, t);
};

const getBottomMenuItems = (t: (key: string) => string, userRole: UserRole | null) => {
  return filterMenuItemsByRole(MENU_ITEMS.bottom, userRole, t);
};

const MenuLists: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const userRole = useSelector((state: RootState) => state.config.userRole);

  const getSelectedKey = (): string => {
    const { pathname } = location;

    if (pathname.startsWith('/dashboard') || pathname === '/') {
      return '/';
    }

    const segments = pathname.split('/').filter(Boolean);
    if (!segments.length) return '/';

    return `/${segments[0]}`;
  };

  const selectedKey = getSelectedKey();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 100px)',
        justifyContent: 'space-between',
      }}>
      <Menu
        mode="inline"
        style={{ background: 'transparent', border: 'none' }}
        className="sidebar-menu"
        items={getTopMenuItems(t, userRole)}
        selectedKeys={[selectedKey]}
        onClick={({ key }) => navigate(key)}
      />
      <Menu
        mode="inline"
        style={{ background: 'transparent', border: 'none' }}
        className="sidebar-menu"
        items={getBottomMenuItems(t, userRole)}
        selectedKeys={[selectedKey]}
        onClick={({ key }) => navigate(key)}
      />
    </div>
  );
};

export default MenuLists;
