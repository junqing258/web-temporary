import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import useComponentSize from '@rehooks/component-size';
import Modal from '@/components/Modal';
import { useMobile } from '@/components/responsive';
import './index.less';
import { useTranslation, Trans } from 'react-i18next';
import Door from './Door';
import Floor from './Floor';

const Home: React.FC = () => {
  const { t } = useTranslation(['translation']);
  const [visible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const size = useComponentSize(domRef);
  const isMobile = useMobile();

  return (
    <div className="container-fluid">
      <Door />
      <Floor />
      <div className="row" ref={domRef}>
        <div className="col-xs-12 col-md-6" style={{ height: size.width * 0.1 + 'px', background: 'green' }}>
          width: {size.width}
        </div>
        <div className="col-xs-12 col-md-6" style={{ height: `${size.width * 0.1}px`, background: 'yellow' }}>
          height: {size.height}
        </div>
      </div>
      <input type="text" />
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <h3 className="act__title">{t('translation:title')}</h3>
          <section>
            <p>1. 活动规则 活动规则 活动规则活动</p>
            <p>2. {t('common.index.rule', { no: '' })}</p>
            <p>3. {t('common.index.rule', { no: 1 })}</p>
            <p>4. {t('common.index.rule', { no: 2 })}</p>
            <p>5. {t('common.index.rule', { no: 3 })}</p>
            <p>
              6. <Trans i18nKey="common.index.rule" values={{ no: 6 }}></Trans>
            </p>
          </section>
        </div>
        <div className="col-xs-12 col-md-6">
          <h3 className="act__title">{t('translation:home.rank')}</h3>
          <ol>
            <li>xxx xxxxx xxxxxxx xxxxx</li>
            <li>xxx xxxxx xxxxxxx xxxxx</li>
            <li>xxx xxxxx xxxxxxx xxxxx</li>
            <li>xxx xxxxx xxxxxxx xxxxx</li>
            <li>xxx xxxxx xxxxxxx xxxxx</li>
            <li>xxx xxxxx xxxxxxx xxxxx</li>
            <li>xxx xxxxx xxxxxxx xxxxx</li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-6 col-md-4">.col-6 .col-md-4</div>
        <div className="col-xs-6 col-md-4">.col-6 .col-md-4</div>
        <div className="col-xs-6 col-md-4">.col-6 .col-md-4</div>
      </div>
      <br />
      <br />
      <div>
        <button onClick={() => setVisible(true)}>open</button>
      </div>

      <Modal
        className={classNames('home__modal-wrap', { 'home__modal-wrap--m mobile': isMobile })}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <div className="modal-body">
          <h1 style={{ textAlign: 'center' }}>11111</h1>
        </div>
      </Modal>
    </div>
  );
};
export default Home;
