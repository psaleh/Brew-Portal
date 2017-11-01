import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';

import { Brews } from '../api/brews';
import BrewListHeader from './BrewListHeader';
import BrewListEmptyItem from './BrewListEmptyItem';
import BrewListItem from './BrewListItem';

export const BrewList = (props) => {
  return (
    <div>
      <BrewListHeader/>
      { props.brews.length === 0 ? <BrewListEmptyItem/> : undefined }
      {props.brews.map((brew) => {
        return <BrewListItem key={brew._id} brew={brew}/>;
      })}
    </div>
  );
};

propTypes = {
  brews: PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedBrewId = Session.get('selectedBrewId');

  Meteor.subscribe('brews');

  return {
    brews: Brews.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map((brew) => {
      return {
        ...brew,
        selected: brew._id === selectedBrewId
      };
    })
  };
}, BrewList);
