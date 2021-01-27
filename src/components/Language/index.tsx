import { supportedLngs } from '@/utils/i18n';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import { useTranslation } from 'react-i18next';

import './index.less';
import '@reach/menu-button/styles.css';

const Language: React.FC = () => {
  const { i18n } = useTranslation();
  // const menu = useMenuState({ animated: 250 });

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ position: 'absolute', right: 20, top: 20, zIndex: 9 }}>
      <Menu>
        <MenuButton>
          {i18n.language} <span aria-hidden>▾</span>
        </MenuButton>
        <MenuList className="slide-down">
          {supportedLngs.map((v) => (
            <MenuItem onSelect={() => changeLanguage(v)} key={v}>
              {v}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default Language;
