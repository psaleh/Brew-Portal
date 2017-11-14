import React from 'react';

import PrivateHeader from './PrivateHeader';
import BrewList from './BrewList';
import BrewView from './BrewView';

export default () => {
  return (
    <div>
      <PrivateHeader title="Bomb Shelter Brewery Portal"/>
      <div className="page-content">
        
        <BrewList />
        <BrewView />
      </div>
    </div>
  );
};
