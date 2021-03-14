import { Meteor } from 'meteor/meteor';
import Vue from 'vue';

//css
import './assets/style.css';

import VueMeteorTracker from 'vue-meteor-tracker';
Vue.use(VueMeteorTracker);


import VueNativeSock from 'vue-native-websocket'
Vue.use(VueNativeSock, 'ws://localhost:8080', {
  format: 'json',
  reconnection: true,
  reconnectionAttempts: 5000,
  reconnectionDelay: 300
})

 
import App from './components/App.vue';

Meteor.startup(() => {

  new Vue({
    el: '#app',
    ...App,
  });

});

