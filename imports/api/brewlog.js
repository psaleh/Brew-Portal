import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const setBrewCollection = (selectedBrewId) => {
  export const Brewlog = new Mongo.Collection('sR3m2SwfZtASQcfNc');  
  const brewData = Brewlog.find({}).fetch();
  console.log('dbout', brewData);
};


