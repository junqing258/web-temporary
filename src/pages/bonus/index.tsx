import Spinner from '@/components/Spinner';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.less';

const Bonus: React.FC = () => {
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
    </div>
  );
};

export default Bonus;
