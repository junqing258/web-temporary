import Spinner from '@/components/Spinner';
import classNames from 'classnames';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.less';

const fakeInfo = { count: 0 };

export const Bonus: React.FC = (props: any = fakeInfo) => {
  const { count } = props;
  const { t } = useTranslation(['pages/apply']);

  return (
    <div className={classNames('container-fluid', styles.warp)}>
      <h1>{t('pages/apply:bonus')}</h1>
      <p>count: {count}</p>
    </div>
  );
};

const withBonus = (initState: any) => (Component: React.ComponentType) => (props: any) => {
  const [info, setInfo] = useState(initState);
  useEffect(() => {
    setTimeout(() => {
      initState.count += 1;
      setInfo({ ...initState });
    }, 500);
  }, []);
  return <Component {...info} />;
};

export default withBonus(fakeInfo)(memo(Bonus));
