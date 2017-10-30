import React from 'react';

import PrivateHeader from './PrivateHeader';
import AddBrew from './AddBrew';

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <AddBrew />
      </div>
    </div>
  );
};
