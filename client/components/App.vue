<template>
  <div id="container" className="container">

    <Scene />

  </div>

</template>

<script>

//css
import "../assets/style.css";

//vue components
import Vue from "vue";
import Scene from "./Scene.vue";



export default {
  name: "App",

  components: {
    Scene
  },

  data() {
    return {
    }
  },

  mounted() {
  },


  meteor: {
  },

  methods: {
  },
};
</script>


<style scoped>

</style>