
<template>
  <a-gltf-model 
    @mouseenter="mouseEnterHandler()"
    @mouseleave="mouseLeaveHandler()"
    @click="mouseClickHandler()"
    :position="data.position" 
    :rotation="data.rotation"
    :src="data.src"
    visible="true"
  ></a-gltf-model >

</template>



<script>


//Vue
import Vue from "vue";
Vue.config.ignoredElements = [
  'a-gltf-model',
];


//Aframe
import {Aframe} from "aframe"



export default {
  name: "Model",

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
    animation(){
      return "property: position; from:"+this.data.position+"; to:"+this.data.animation+"; dur: 2000; easing: linear; loop: true; dir:alternate";
    }
  }

  
};

</script>

<style scoped>
</style>


