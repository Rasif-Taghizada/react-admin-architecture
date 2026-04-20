import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Flex, Input, Layout } from 'antd';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '../common/utils/constant/config';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../common/store';
import { logout } from '../common/store/slices/authSlices';
import { toggleSidebarCollapsed, clearUserRole } from '../common/store/slices/configSlice';
import { useTranslation } from '../../node_modules/react-i18next';
import { useSearchParams, useLocation } from 'react-router-dom';
import { logoutService } from '../common/libs/services/authService';
import { useDebounce } from '../common/utils/hooks/useDebounce';

const { Header } = Layout;

const LayoutContentHeader: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const collapsed = useSelector((state: RootState) => state.config.sidebarCollapsed);
  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  // Search state
  const searchFromUrl = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(searchFromUrl);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  // Update URL when debounced search value changes
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    if (debouncedSearchValue !== currentSearch) {
      const newParams = new URLSearchParams(searchParams);
      if (debouncedSearchValue) {
        newParams.set('search', debouncedSearchValue);
      } else {
        newParams.delete('search');
      }
      // Reset to page 1 when search changes
      newParams.set('PageNumber', '1');
      setSearchParams(newParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  // Sync input value with URL when pathname changes (e.g., navigation)
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    if (urlSearch !== searchValue) {
      setSearchValue(urlSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleToggleCollapse = () => {
    dispatch(toggleSidebarCollapsed());
  };

  const handleLogout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      dispatch(logout());
      dispatch(clearUserRole());
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Header
      style={{
        position: 'fixed',
        top: 0,
        left: sidebarWidth,
        width: `calc(100% - ${sidebarWidth}px)`,
        zIndex: 100,
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#f3f0ee',
      }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={handleToggleCollapse}
        style={{ fontSize: 16, width: 64, height: 64 }}
      />

      <Flex gap={20} align="center" justify="center">
        <Input 
          placeholder={t('header.search_anything')} 
          className="header_search"
          value={searchValue}
          onChange={handleSearchChange}
        />

        <Dropdown
          menu={{
            items: [
              {
                label: <a onClick={handleLogout}>{t('header.logout')}</a>,
                key: 'logout',
              },
            ],
          }}
          trigger={['click']}>
          <Button type="text" icon={<LogoutOutlined />} style={{ fontSize: 16, width: 64, height: 64 }} />
        </Dropdown>
      </Flex>
    </Header>
  );
};

export default LayoutContentHeader;
