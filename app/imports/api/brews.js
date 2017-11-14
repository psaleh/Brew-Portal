import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Brews = new Mongo.Collection('brews');

if (Meteor.isServer) {
    Meteor.publish('brews', function () {
      return Brews.find({ userId: this.userId });
    });
  }

Meteor.methods({
    'brews.insert'(brewName, brewStyle, targetFg, targetTemp) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

     new SimpleSchema({
            brewName: {
                type: String,
                label: 'Beer Name',
                min: 1
            },
            brewStyle: {
                type: String,
                label: 'Beer Style',
                min: 1
            },
            targetFg: {
                type: Number,
                label: 'Target Final Gravity',
                min: 1
            },
            targetTemp: {
                type: Number,
                label: 'Target Fermentation Temperature',
                min: 1
            }
        }).validate({ brewName, brewStyle, targetFg, targetTemp });

        const brewObject = Brews.insert({
           brewName,
           brewDate: new Date().getTime(),
           brewStyle,
           targetFg,
           targetTemp,
           userId: this.userId
        });
    }
});

