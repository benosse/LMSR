<template>
  <div className="container">
    <Frame v-bind:key="0" v-bind:frame="{_id:10, color:{r:200,g:200,b:255}}"/>


  </div>
</template>

<script>


//vue components
import Vue from "vue";
import Frame from "./Frame.vue";

//collections
import { Frames } from "../../imports/collections/frames.js";

export default {
  data() {
    return {
    };
  },


  meteor: {
    //responsive frames collection
    visibleFrames() {
      return Frames.find({}, { sort: { createdAt: -1 } }).fetch()
    },

  },

  components: {
    Frame,
  },


  data() {
    return {};
  },


    methods: {
    },
};
</script>


<style scoped>


</style>