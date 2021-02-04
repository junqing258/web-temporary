// import { Request } from 'express';
import '@/styles/global.less';
import '@/utils/i18n';
// import '@/utils/flexible';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import configStore from '@/store';
import Routes from '@/Routes';
import BasicLayout from '@/components/BasicLayout';

//导出渲染函数， 以采用nodejs编写http服务器代码调用

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function render(req: any): string {
  const frontComponents = renderToString(
    <Provider store={configStore({})}>
      <StaticRouter location={req.url} context={{}}>
        <BasicLayout>
          <Routes />
        </BasicLayout>
      </StaticRouter>
    </Provider>,
  );
  return frontComponents;
}
