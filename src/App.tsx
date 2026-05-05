import React, { Suspense, useLayoutEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme as antTheme } from 'antd';

import { store, type RootState } from '@/common/store';
import { router } from '@/routers';
import Spinner from '@/common/components/partials/spinner';

const ThemedApp: React.FC = () => {
  const themeMode = useSelector((s: RootState) => s.config.themeMode);
  const isDark = themeMode === 'dark';

  useLayoutEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDark]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          borderRadius: 8,
          colorPrimary: isDark ? '#60a5fa' : '#2563eb',
          colorLink: isDark ? '#60a5fa' : '#2563eb',
          colorInfo: isDark ? '#60a5fa' : '#2563eb',
        },
      }}>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </ConfigProvider>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
};

export default App;
