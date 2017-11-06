import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from '../imports/routes/routes';
import { setBrewCollection } from '../imports/api/brewlog';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const selectedBrewId = Session.get('selectedBrewId');
  console.log('brewid', selectedBrewId);
  if (selectedBrewId){
    setBrewCollection(selectedBrewId);
  }
});

Meteor.startup(() => {
  Session.set('selectedBrewId', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
});
