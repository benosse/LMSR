
<template>
  <a-gltf-model 
    @mouseenter="mouseEnterHandler()"
    @mouseleave="mouseLeaveHandler()"
    @click="mouseClickHandler()"
    :position="data.position" 
    :rotation="data.rotation"
    :src="data.src"
    :animation="animation"
    visible="true"
    mask
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
      this.data.hovering = true;
      this.data.opacity = 1;
      this.$emit("mouse-enter", this.data.imgSrc);
    },

    mouseLeaveHandler(event) {
      this.data.hovering = false;
      this.data.opacity = 0.5;
      this.$emit("mouse-leave");
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


