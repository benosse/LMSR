import { Meteor } from 'meteor/meteor';
import Vue from 'vue';

//css
import './assets/style.css';

import VueMeteorTracker from 'vue-meteor-tracker';
Vue.use(VueMeteorTracker);
 
import App from './components/App.vue';

Meteor.startup(() => {

  new Vue({
    el: '#app',
    ...App,
  });

});

