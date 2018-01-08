import React from 'react';

import PrivateHeader from './PrivateHeader';
import BrewList from './BrewList';
import BrewView from './BrewView';

export default () => {
  return (
    <div className="container-fluid">
      <PrivateHeader title="Bomb Shelter Brewery Portal"/>
      <div className="row">
        <div className="col-sm-2">
          <BrewList />
        </div>
        <div className="col-sm-10">
          <BrewView />
        </div>
      </div>
    </div>
  );
};
