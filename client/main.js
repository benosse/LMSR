import { Meteor } from 'meteor/meteor';
import Vue from 'vue';



//css
import './assets/style.css';

//tracker pour utilisée les données récatives de meteor dans vue
import VueMeteorTracker from 'vue-meteor-tracker';
Vue.use(VueMeteorTracker);


Vue.config.ignoredElements = [
  'a-scene',
  'a-entity',
  'a-camera',
  'a-box',
  'a-sky',
  'a-sphere',
  'a-cylinder',
  'a-plane',
  'a-gltf-model',
  'a-assets',
  'a-asset-item',
  'a-cone',
];


 
import App from './components/App.vue';
Meteor.startup(() => {

  new Vue({
    el: '#app',
    ...App,
  });

});

