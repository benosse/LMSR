
<template>
  <a-box 
    @mouseenter="mouseEnterHandler()"
    @mouseleave="mouseLeaveHandler()"
    @click="mouseClickHandler()"
    :opacity="data.opacity"
    :color="data.color"
    :position="data.position" 
    :animation="animation"
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
      this.data.hovering = true;
      this.data.opacity = 1;
      $emit("mouse-enter", this.data.imgSrc);
    },

    mouseLeaveHandler(event) {
      this.data.hovering = false;
      this.data.opacity = 0.5;
      $emit("mouse-leave");
    },

    mouseClickHandler(event) {
      console.log("clic")
    },

  },

  watch: {
  },

  computed: {
    animation(){
      return "property: position; from:"+this.data.position+"; to:"+this.data.animation+"; dur: 2000; easing: linear; loop: true; dir:alternate";
    }
  }

  
};

</script>

<style scoped>
</style>


