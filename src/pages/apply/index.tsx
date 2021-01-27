import { withBoundary } from '@/components/ErrorBoundary';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.less';

const Apply: React.FC = () => {
  const { t } = useTranslation('pages/apply');

  useEffect(() => {
    throw new Error('some error');
  }, []);

  return (
    <div className={classNames('container-fluid', styles.warp)}>
      <h1>{t('pages/apply:apply')}</h1>
    </div>
  );
};

export default withBoundary({})(Apply);
