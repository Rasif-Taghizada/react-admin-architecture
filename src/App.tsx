import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { store } from './common/store';
import { router } from './routers';
import Spinner from './common/components/partials/spinner';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Spinner/>}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
};

export default App;
