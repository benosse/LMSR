import { Meteor } from 'meteor/meteor';

import '../imports/collections/tasks.js';
import '../imports/collections/frames.js';

Meteor.startup(() => {
  console.log("server démarré")
});