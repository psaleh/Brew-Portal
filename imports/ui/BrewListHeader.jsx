import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';

const BrewListHeader = (props) => {
  return (
    <div>
      <button className="button">Create Brew Session</button>
    </div>
  );
};

export default BrewListHeader;
