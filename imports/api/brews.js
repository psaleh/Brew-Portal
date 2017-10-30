import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Brews = new Mongo.Collection('brews');

Meteor.methods({
    'brews.insert'(brewName, brewStyle, targetFg, targetTemp) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

     const mySchema = new SimpleSchema({
            brewName: {
                type: String,
                label: 'Beer Name'
            },
            brewStyle: {
                type: String,
                label: 'Beer Style'
            },
            targetFg: {
                type: Number,
                label: 'Target Final Gravity'
            },
            targetTemp: {
                type: Number,
                label: 'Target Fermentation Temperature'
            }
        });
        mySchema.clean({ targetFg, targetTemp });
        mySchema.validate({ brewName, brewStyle, targetFg, targetTemp });

        const brewObject = Brews.insert({
           brewName,
           brewDate: new Date().getTime(),
           brewStyle,
           targetFg,
           targetTemp
        });
    }
});

