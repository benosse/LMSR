<template>
  <div id="container" className="container">

    <Scene 
      :active="this.player.active"
      :id="this.player.id"
      @enter-scene="setPlayerActive()"
    />

  </div>

</template>

<script>

//css
import "../assets/style.css";

//vue components
import Vue from "vue";
import Scene from "./Scene.vue";


//collections
import {Players} from "../../imports/collections/players.js";


export default {
  name: "App",

  components: {
    Scene
  },

  data() {
    return {
      player: {
        active:false,
        id:"",
      }
    }
  },

  mounted() {
    //remove player from server on unload
    window.onbeforeunload = this.disconnectPlayer

    //create session in DB
    Meteor.call('players.insert',(error, result) =>{
      console.log("player created with id: ", result)

      this.player.id = result;
      this.player.active = false;
    });
  },


  meteor: {
  },

  

    methods: {

      disconnectPlayer(){
        Meteor.call('players.remove', this.player.id);
      },

      setPlayerActive(){ 
        this.player.active = true;
      },
    },
};
</script>


<style scoped>

</style>