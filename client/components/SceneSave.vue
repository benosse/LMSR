<!--
<template>

    <div>
    
      <div id="gate"
        v-if="!active"
        @click="enterScene()"

      >
        <h1>ENTRER</h1>
      </div>

      <h1 v-if="sphereData.visible" id="sphereTitle">{{sphereData.text}}</h1>


      <a-scene class ="ascene"
        cursor="rayOrigin: mouse" 
        embedded 
      >
        
        <a-sky color="#e5e5e5"></a-sky>


        <a-entity 
          @update-pos="updatePos"
          camera look-controls wasd-controls listener position="0 1 3" rotation="-15 0 0">
        </a-entity>


        <a-box 
        id="test"
          @mouseenter="mouseEnterHandler()"
          @mouseleave="mouseLeaveHandler()"
          @click="mouseClickHandler()"
          v-bind:color="color" 
          opacity="0.75" 
          visible="true"
        ></a-box>

        <a-sphere 
          position="5 5 5" 
          radius="1.25" 
          color="#EF2D5E"
          @mouseenter="mouseEnterSphereHandler()"
          @mouseleave="mouseLeaveSphereHandler()"
          >
        </a-sphere>


        <a-sphere v-for="player in players" v-bind:key="player._id"
          :position="player.position" 
          radius="1.25" 
          color="#EF2D5E">
        </a-sphere>
      </a-scene>

      
      <div  id="extra"
        :style="backgroundStyle"
      >
        <button @click="setBoxColor('red')">Red</button>
        <button @click="setBoxColor('blue')">Blue</button>
        <button @click="setBoxColor('green')">Green</button>

         <button @click="playSound()">play</button>

        <button v-if="this.visible" @click="setVisibility()">cacher</button>
        <button v-else @click="setVisibility()">montrer</button>

        <h1 v-if="this.hoveringCube" >Ceci est un cube</h1>
        <p v-if="this.hoveringCube">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>


  


    </div>

</template>



<script>

//collections
import {Players} from "../../imports/collections/players.js";

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

AFRAME.registerComponent('listener', {
  tick: function () {
    this.el.emit("update-pos", {pos:this.el.getAttribute('position')}, false);
  }
});


/*
CE QU'IL FAUT AVOIR

const mediaElement = new Audio( "https://icecast.radiofrance.fr/francemusiqueeasyclassique-midfi.mp3" );
mediaElement.play();

audio.srcObject = stream;

audio.setMediaElementSource( mediaElement );



*/



export default {
  name: "Scene",

  props:["active", "id"],

  data() {
    
    return {

      //player latest pos
      pos:null,
      //cube
      color:"green",
      visible:true,
      hoveringCube:false,

      //sphere
      sphereData: {
        text:"Ceci est une sphère",
        visible: false,
        }
    }
  },

  mounted(){
  },

    meteor: {
      $subscribe: {
        players: []
      },

      players() {
        return Players.find({ _id: { $ne: this.id } });
      }
  },

  components: {
  },

  methods: {

    updatePos(e) {
      
      if (this.active) {
        let newPos = e.detail.pos;

        //check if new
        if (this.pos == null) {
          this.pos = {x:0, y:0, z:0}
          this.pos.x = newPos.x; 
          this.pos.y = newPos.y; 
          this.pos.z = newPos.z; 
          
          //and send to server
          Meteor.call('players.updatePos', this.id, e.detail.pos)
        }

        else {
          //!! distance with no square root
          var a = this.pos.x - newPos.x;
          var b = this.pos.y - newPos.y;
          var c = this.pos.z - newPos.z;
          let distance = (a*a + b*b + c*c);

        
          if (distance > 0.1)
            console.log("deplacment")
            //save pos
            this.pos.x = newPos.x; 
            this.pos.y = newPos.y; 
            this.pos.z = newPos.z; 

            //and send to server
          Meteor.call('players.updatePos', this.id, newPos)
          }
      }

      
        

        


      //send pos to server
      //Meteor.call('players.updatePos', this.id, e.detail.pos)
    },


    enterScene() {
      this.$emit("enter-scene");
    },

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

    //sphere
    mouseEnterSphereHandler(event) {
      console.log("enter")
      this.sphereData.visible = true;
    },

    mouseLeaveSphereHandler(event) {
      console.log("leave")
      this.sphereData.visible = false;
    },

  },

  watch: {
    visible: function(){
       document.querySelector('a-box').setAttribute('visible', this.visible)
    }
  },

  computed: {
    backgroundStyle: function() {
      if (this.hoveringCube)
        return {'background-color':this.color}
      else
        return {'background-color':"white"}
    },


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

  #gate h1 {
    text-align: center;
    margin-top: 300px;
  }

  #gate {
    width : 50vw;
    height:100vh;
    z-index:1000;
    position:absolute;
    top:0;
    left:0;
    background-color: rgba(100, 100, 100, 0.9);
  }

  #sphereTitle {
    z-index:1000;
    position:fixed;
    top:50vh;
    left:25vw;
    text-align:center;
    font-size:100px;
  }

</style>


