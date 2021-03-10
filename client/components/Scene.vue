
<template>

    <div>
      <a-scene  a-scene cursor="rayOrigin: mouse" embedded class="ascene">
        <a-sky color="#000"></a-sky>
        <a-entity camera look-controls wasd-controls position="0 1 3" rotation="-15 0 0">
  
        </a-entity>
        <a-box 
          @mouseenter="mouseEnterHandler()"
          @mouseleave="mouseLeaveHandler()"
          @click="mouseClickHandler()"
          v-bind:color="color" 
          opacity="0.75" 
          visible="true">
        </a-box>
    </a-scene>

      <div  id="extra"
        v-if="this.hoveringCube" 
        :style="backgroundStyle"
      >
        <h1>Ceci est un cube</h1>
      </div>


  <button @click="setBoxColor('red')">Red</button>
  <button @click="setBoxColor('blue')">Blue</button>
  <button @click="setBoxColor('green')">Green</button>

  <button v-if="this.visible" @click="setVisibility()">cacher</button>
  <button v-else @click="setVisibility()">montrer</button>


    </div>

</template>



<script>

//npm packages
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

import Aframe from "aframe";




export default {
  name: "Scene",

  data() {
    
    return {
      color:"green",
      visible:true,
      hoveringCube:false,
    }
  },

  mounted(){
  },

  meteor: {
  },

  components: {
  },

  methods: {

    setVisibility() {
      this.visible = !this.visible;
    },

    setBoxColor(newColor){
      this.color = newColor;
    },

    mouseEnterHandler(event) {
      console.log("enter")
      this.hoveringCube = true;
    },

    mouseLeaveHandler(event) {
      console.log("leave")
      this.hoveringCube = false;
    },

    mouseClickHandler(event) {
      console.log("clic")
    },
  },

  watch: {
    visible: function(){
       document.querySelector('a-box').setAttribute('visible', this.visible)
    }
  },

  computed: {
    backgroundStyle() {
      return {
        'background-color':this.color,
      }
    }
  }
};

</script>

<style scoped>
  #extra {
    position:fixed;
    top:0;
    right:0;
    width:50vw;
    height:100vh;
  }
</style>


