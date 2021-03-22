import React from 'react';

import './Spinner.less';

const Spinner: React.FC = () => {
  return (
    <div className="loader-warper">
      <div className="loader">Loading...</div>
    </div>
  );
};

export default Spinner;
