import { Mongo } from 'meteor/mongo';

export const Frames = new Mongo.Collection('frames');

Meteor.methods({

    'frames.insert'(parentId, parentColor) {

        let newColor = {r:parentColor.r - 30, g:parentColor.g -30 , b:parentColor.b}
        Frames.insert({
            parent:parentId,
            color:newColor,
            createdAt: new Date(),
        });
    },

    'frames.remove'(id) {
        console.log("removing frame "+ id);

        Frames.remove(id)
    },

    'frames.addChild'(frameId, childId) {
        Frames.update(frameId, { $push: { children:{childId:childId} } });
    }



    /*
    'tasks.insert'(text) {

        check(text, String);

 

        // Make sure the user is logged in before inserting a task

        if (!this.userId) {

            throw new Meteor.Error('not-authorized');

        }

 

        Tasks.insert({

            text,

            createdAt: new Date(),

            owner: this.userId,

            username: Meteor.users.findOne(this.userId).username,

        });

    },

    'tasks.remove'(taskId) {

        check(taskId, String);

 

        Tasks.remove(taskId);

    },

    'tasks.setChecked'(taskId, setChecked) {

        check(taskId, String);

        check(setChecked, Boolean);

 

        Tasks.update(taskId, { $set: { checked: setChecked } });

    },
    */

});