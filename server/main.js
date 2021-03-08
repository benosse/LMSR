import { Meteor } from 'meteor/meteor';

import '../imports/collections/tasks.js';
import { Frames } from "../imports/collections/frames.js";

Meteor.startup(() => {
  
    //insert one frame
    if (Frames.findOne({_id:"0"}) == null) {
        console.log("id 0 non trouvé")
        let color = {r:200, g:200, b:200};
        Frames.insert({
            color:color,
            _id:"0",
            createdAt: new Date(),
        });
    }
    else {
        console.log("id 0 trouvé")
    }
 
});