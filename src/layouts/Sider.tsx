import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import type { SiderBarProps } from '@/common/types';
import MenuLists from '@/common/components/partials/menu';
import wordmark from '@/assets/images/brand-wordmark.svg';
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '@/common/utils/constant/config';
import { LogoSmall } from '@/assets/icons';

const { Sider } = Layout;

const SiderBar: React.FC<SiderBarProps> = ({ collapsed }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={SIDEBAR_WIDTH}
      collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
      style={{
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        zIndex: 99,
        background: 'var(--color--shell)',
        transition: 'all 0.3s ease',
      }}>
      <div
        className="demo-logo-vertical"
        style={{
          height: 32,
          margin: '12px 4px',
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}>
        <Link to="/">
          {collapsed ? (
            <LogoSmall />
          ) : (
            <img src={wordmark} alt="" width={160} height={36} style={{ display: 'block' }} />
          )}
        </Link>
      </div>
      <MenuLists />
    </Sider>
  );
};

export default SiderBar;
