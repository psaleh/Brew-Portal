import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const BrewData = new Mongo.Collection('brewdata'); 

if (Meteor.isServer) {
  Meteor.publish('brewdata', function (selectedBrewId) {
    return BrewData.find({ brewId: selectedBrewId });
  });
}




