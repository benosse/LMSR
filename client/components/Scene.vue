
<template>

    <div>
    
      <div id="gate"
        v-if="!active"
        @click="enterScene()"

      >
        <h1>ENTRER</h1>
      </div>

      <a-scene class ="ascene"
        cursor="rayOrigin: mouse" 
        embedded 
      >
        <a-sky color="#000"></a-sky>
        <a-entity 
          @update-pos="updatePos"
          camera look-controls wasd-controls listener position="0 1 3" rotation="-15 0 0"></a-entity>
        <a-box 
          @mouseenter="mouseEnterHandler()"
          @mouseleave="mouseLeaveHandler()"
          @click="mouseClickHandler()"
          v-bind:color="color" 
          opacity="0.75" 
          visible="true"
        ></a-box>


        <a-sphere v-for="player in players" v-bind:key="player._id"
          :position="player.position" 
          radius="1.25" 
          color="#EF2D5E">
        </a-sphere>
      </a-scene>

      
      <div  id="extra"
        :style="backgroundStyle"
      >
        <p v-for="player in players" v-bind:key="player._id" >{{player.position}}</p>

        <button @click="setBoxColor('red')">Red</button>
        <button @click="setBoxColor('blue')">Blue</button>
        <button @click="setBoxColor('green')">Green</button>

        <button v-if="this.visible" @click="setVisibility()">cacher</button>
        <button v-else @click="setVisibility()">montrer</button>
        <h1 v-if="this.hoveringCube" >Ceci est un cube</h1>
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



export default {
  name: "Scene",

  props:["active", "id"],

  data() {
    
    return {
      //player latest pos
      pos:null,
      color:"green",
      visible:true,
      hoveringCube:false,
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
</style>


