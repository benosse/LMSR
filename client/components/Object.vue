
<template>
  <a-box 
    @mouseenter="mouseEnterHandler()"
    @mouseleave="mouseLeaveHandler()"
    @click="mouseClickHandler()"
    :opacity="data.opacity"
    :color="data.color"
    :position="data.position" 
    visible="true"
  ></a-box>

</template>



<script>


//Vue
import Vue from "vue";
Vue.config.ignoredElements = [
  'a-scene',
  'a-entity',
  'a-camera',
  'a-box',
  'a-sky',
  'a-sphere',
  'a-cylinder',
  'a-plane'
];


//Aframe
import {Aframe} from "aframe"



export default {
  name: "Object",

  props:["data"],

  data() {
    
    return {

    }
  },

  mounted(){
  },

    meteor: {
    },

  components: {
  },

  methods: {
    
    mouseEnterHandler(event) {
      console.log("enter")
      this.data.hovering = true;
      this.data.opacity = 1;
    },

    mouseLeaveHandler(event) {
      console.log("leave")
      this.data.hovering = false;
      this.data.opacity = 0.5;
    },

    mouseClickHandler(event) {
      console.log("clic")
    },

  },

  watch: {
  },

  computed: {
  }

  
};

</script>

<style scoped>
</style>


