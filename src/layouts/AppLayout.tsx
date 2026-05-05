import React from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';
import type { RootState } from '@/common/store';
import ErrorPage from '@/common/components/partials/error';
import SiderBar from '@/layouts/Sider';
import LayoutContentHeader from '@/layouts/Header';
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '@/common/utils/constant/config';

const { Content } = Layout;

const AppLayout: React.FC = () => {
  const collapsed = useSelector((state: RootState) => state.config.sidebarCollapsed);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ErrorBoundary fallbackRender={({ error }) => <ErrorPage error={error} resetErrorBoundary={() => void {}} />}>
      <Layout style={{ minHeight: '100vh', background: 'var(--color--shell)' }}>
        <SiderBar collapsed={collapsed} />
        <Layout
          style={{
            marginLeft: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
          }}>
          <LayoutContentHeader />
          <Content
            style={{
              // margin: '8px',
              padding: 24,
              minHeight: 'calc(100vh - 64px)',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowY: 'auto',
              marginTop: 64,
            }}>
            <ErrorBoundary fallbackRender={({ error }) => <ErrorPage error={error} resetErrorBoundary={() => void {}} />}>
              <Outlet />
            </ErrorBoundary>
          </Content>
        </Layout>
      </Layout>
    </ErrorBoundary>
  );
};

export default AppLayout;
