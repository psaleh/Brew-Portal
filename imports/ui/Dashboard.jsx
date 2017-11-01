import React from 'react';

import PrivateHeader from './PrivateHeader';
import AddBrew from './AddBrew';
import BrewList from './BrewList';

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <AddBrew />
        <BrewList />
      </div>
    </div>
  );
};
