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

const withBonus = (props: any) => (Component: React.ComponentType) => {
  return () => {
    const [info, setInfo] = useState(props);
    useEffect(() => {
      setTimeout(() => {
        props.count += 1;
        setInfo({ ...props });
      }, 100);
    }, []);
    return <Component {...info} />;
  };
};

export default withBonus(fakeInfo)(Bonus);
