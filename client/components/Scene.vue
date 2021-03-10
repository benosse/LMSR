<template>
    <div id="container" className="container">
        <h1>Une scene avec AFrame</h1>

        <a-scene>
            <a-entity id="cameraWrapper" position="0 2 10" rotation="0 0 0" >
                <a-camera near="0.1" user-height="0" id="camera" listener></a-camera>
            </a-entity>

            <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
            <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
            <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
            <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
            <a-sky color="#ECECEC"></a-sky>
        </a-scene>

    </div>

</template>

<script>


//npm packages
import Vue from "vue";
import Aframe from "aframe";

//AFrame components
AFRAME.registerComponent('listener', {
  tick: function () {
    console.log(this.el.getAttribute('position'));
  }
});



export default {
  name: "Scene",

  data() {
    return {
    }
  },


  meteor: {
  },

  components: {
  },

    methods: {
    },
};
</script>


<style scoped>

</style>