import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export const BrewListItem = (props) => {
  //const className = props.brew.selected ? 'item item--selected' : 'item';

  return (
    <div onClick={() => {
      props.Session.set('selectedBrewId', props.brew._id);
    }} className={props.brew.selected ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>
      <h5>{props.brew.brewName}</h5>
      <p>{props.brew.brewStyle}</p>
      <p>Brewed on: { moment(props.brew.brewDate).format('DD/MM/YYYY') }</p>
    </div>
  );
};

propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default withTracker(() => {
  return { Session };
})(BrewListItem);
