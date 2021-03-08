import { Mongo } from 'meteor/mongo';

export const Frames = new Mongo.Collection('frames');

Meteor.methods({

    'frames.insert'(parentId, parentColor) {

        //create new
        let newColor = {r:parentColor.r - 50, g:parentColor.g -50 , b:parentColor.b -50}
        //random tags from 0 to 4
        let tags = [];
        for (let i=0; i<3;i++)
            tags.push(Math.floor(Math.random()*5))

        let newFrame = {
            color:newColor,
            createdAt: new Date(),
            children:[],
            parentId:parentId,
            tags:tags
        }
        let newFrameId = Frames.insert(newFrame);

        //update parent children list
        Frames.update(parentId, { $push: { children:{childId:newFrameId } } });

        console.log("frame added with tags " + tags);
    },

    'frames.remove'(id) {
        console.log("removing frame "+ id);
        let frame = Frames.findOne(id);
        console.log("deleting from parent" , frame);
        //remove from parents
        Frames.update(frame.parentId, {$pull: {children:{childId:id}}})
        Frames.remove(id)
    },

    'frames.addChild'(frameId, childId) {
        Frames.update(frameId, { $push: { children:{childId:childId} } });
    },

    'frames.removeAll'() {
        Frames.remove({});
    }

});