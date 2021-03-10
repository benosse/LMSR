import { Meteor } from 'meteor/meteor';

import '../imports/collections/tasks.js';
import { Frames } from "../imports/collections/frames.js";
import {Objects} from "../imports/collections/objects.js";

Meteor.startup(() => {
  

    //insert objects
    if (Objects.findOne({_id:"0"}) == null) {
        Objects.insert({
            _id:"0",
            position:"-1 0.5 -3",
            rotation: "0 45 0",
            color: "#4CC3D9",
        });
    }


    if (Objects.findOne({_id:"1"}) == null) {
        Objects.insert({
            _id:"1",
            position:"0 1.25 -5",
            rotation: "0 0 0",
            color: "##EF2D5E",
        });
    }

    if (Objects.findOne({_id:"2"}) == null) {
        Objects.insert({
            _id:"2",
            position:"1 0.75 -3",
            rotation: "0 0 0",
            color: "#7BC8A4",
        });
    }


});