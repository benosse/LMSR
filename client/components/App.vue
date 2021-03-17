<template>
  <div id="container" className="container">

    <SceneTest />

  </div>

</template>

<script>

//css
import "../assets/style.css";

//vue components
import Vue from "vue";
import Scene from "./Scene.vue";
import SceneTest from "./SceneTest.vue";


export default {
  name: "App",

  components: {
    Scene,
    SceneTest,
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