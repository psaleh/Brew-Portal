import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
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
    <div className="list-group m-2">
      {props.brews.map((brew) => {
        return <BrewListItem key={brew._id} brew={brew}/>;
      })}
      { props.brews.length === 0 ? <BrewListEmptyItem/> : undefined }
    </div>
    </div>
  );
};

propTypes = {
  brews: PropTypes.array.isRequired
};

export default withTracker(() => {
  const selectedBrewId = Session.get('selectedBrewId');

  Meteor.subscribe('brews');

  return {
    brews: Brews.find({}, {
      sort: {
        brewDate: -1
      }
    }).fetch().map((brew) => {
      return {
        ...brew,
        selected: brew._id === selectedBrewId
      };
    })
  };
})(BrewList);
