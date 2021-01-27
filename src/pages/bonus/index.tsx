import Spinner from '@/components/Spinner';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.less';

const fakeInfo = { count: 0 };

export const Bonus: React.FC = (props: any = fakeInfo) => {
  const { count } = props;
  const { t } = useTranslation(['pages/apply']);
  const [data, setData] = useState<any>();

  useEffect(() => {
    setTimeout(() => {
      setData({ title: t('pages/apply:bonus') });
    }, 1000);
  }, [t]);

  if (!data) return <Spinner />;

  return (
    <div className={classNames('container-fluid', styles.warp)}>
      <h1>{data.title}</h1>
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
    }, 100);
  }, []);
  return <Component {...info} />;
};

export default withBonus(fakeInfo)(Bonus);
