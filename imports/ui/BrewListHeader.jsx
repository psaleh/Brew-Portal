import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';


const BrewListHeader = (props) => {
  return (
    <div>
      <h2>Select a Brew</h2>
    </div>
  );
};

export default BrewListHeader;

