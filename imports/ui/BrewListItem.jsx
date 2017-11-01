import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export const BrewListItem = (props) => {
  //const className = props.brew.selected ? 'item item--selected' : 'item';

  return (
    <div onClick={() => {
      props.Session.set('selectedBrewId', props.brew._id);
    }}>
      <h5> { props.brew.brewName || 'Untitled note' }</h5>
      <p>{ moment(props.brew.brewDate).format('DD/MM/YYYY') }</p>
    </div>
  );
};

propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session };
}, BrewListItem);