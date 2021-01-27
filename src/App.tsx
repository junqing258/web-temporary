// import 'resize-observer-polyfill';
import '@/styles/global.less';
import '@/utils/i18n';
import '@/utils/flexible';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configStore from '@/store';
import Routes from '@/Routes';
import Spinner from '@/components/Spinner';

const BasicLayout = React.lazy(() => import('@/components/BasicLayout'));

export default function App(): React.ReactElement<void> {
  return (
    <Provider store={configStore({})}>
      <BrowserRouter /* basename={window.baseUrl || ''} */>
        <React.Suspense fallback={<Spinner />}>
          <BasicLayout>
            <Routes />
          </BasicLayout>
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  );
}
