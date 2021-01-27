import { NavLink } from 'react-router-dom';
import { useBodyResponsive } from '@/components/useBodyResponsive';
// import { useInterval } from 'react-use';
import React from 'react';
// import Language from '../Language';
import { useTranslation } from 'react-i18next';
// import 'style-loader!css-loader!react-lazy-load-image-component/src/effects/blur.css';

import './index.less';

const Basic: React.FC = (props: any) => {
  useBodyResponsive();
  const { t } = useTranslation(['translation']);

  return (
    <div className="basic__wrap desktop-wrap">
      {/* <Language /> */}
      <header className="basic__header">
        <nav className="basic__nav">
          <NavLink className="basic__tab" to="/apply" exact>
            {t('nav.apply')}
          </NavLink>
          &nbsp;
          <NavLink className="basic__tab" to="/bonus" exact>
            {t('nav.bonus')}
          </NavLink>
        </nav>
      </header>
      <main className="basic__body">{props.children}</main>
      <footer>
        <div className="basic__title">
          <h1 className="text">© 2018-2028 my-site Inc.</h1>
        </div>
      </footer>
    </div>
  );
};

export default Basic;
