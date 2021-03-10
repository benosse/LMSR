import { Mongo } from 'meteor/mongo';

export const Objects = new Mongo.Collection('objects');

Meteor.methods({

    'objects.insert'(object) {
        Objects.insert({
            position:object.position,
            rotation:object.rotation,
            color:object.color,      
        })
    }
});