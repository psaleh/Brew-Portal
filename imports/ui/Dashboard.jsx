import React from 'react';

import PrivateHeader from './PrivateHeader';
import AddBrew from './AddBrew';
import BrewList from './BrewList';

export default () => {
  return (
    <div>
      <PrivateHeader title="Bomb Shelter Brewery Portal"/>
      <div className="page-content">
        <AddBrew />
        <BrewList />
      </div>
    </div>
  );
};
