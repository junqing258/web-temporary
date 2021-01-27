import SVG from 'react-inlinesvg';

import './index.less';

const Loading: React.FC = () => {
  return (
    <div className="bc_spinner--warp">
      <SVG src={require('@/assets/loading-spin.svg').default} />
    </div>
  );
};
export default Loading;
