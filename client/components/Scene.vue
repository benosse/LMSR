
<template>

    <div>
    
      <div class ="scene gate"
        v-if="!active"
        @click="enterScene()"
      >
        <h1>ENTRER</h1>
      </div>

      <a-scene class ="scene ascene"
        cursor="rayOrigin: mouse" 
        embedded 
      >
        
        <a-sky color="#e5e5e5"></a-sky>


        <a-entity ref="camRig" id="camRig"
          @update-pos="updatePos"
          listener 
        >
          <a-camera look-controls-enabled="true" wasd-controls-enabled="true" teleporter ref="cam" id="cam">
          </a-camera>

        </a-entity>

        <Object :data="cube1"/>
        <Object :data="cube2"/>
        <Object :data="cube3"/>
        <a-plane position="0 10 0" rotation="-90 0 0" width="6" height="6" color="#7BC8A4"></a-plane>
        <a-plane position="0 -1 0" rotation="-90 0 0" width="30" height="30" color="#7BC8A4" material="side:double"></a-plane>

        <a-sphere v-for="p in players" v-bind:key="p._id"
          :position="p.position" 
          radius="0.5" 
          color="#000">
        </a-sphere>


      </a-scene>



      <div class="nav">
        <div class="container">
          <h1>Le monde sinon rien</h1>
          <h2 :style="backgroundStyle(cube1)">Cube numéro 1</h2>
          <p v-if="cube1.hovering" >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h2 :style="backgroundStyle(cube2)">Cube numéro 2</h2>
          <p v-if="cube2.hovering">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h2 :style="backgroundStyle(cube3)">Cube numéro 3</h2>
          <p v-if="cube3.hovering">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <div class="teleporter">
        <span @click="teleport(pov1)">Point de vue 1</span>
        <span @click="teleport(pov2)">Point de vue 2</span>
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
    this.el.emit("update-pos", {pos:this.el.getAttribute('position'), rot:this.el.getAttribute('rotation')}, false);
  }
});

AFRAME.registerComponent('teleporter', {
  teleportTo: function (pov) {
    this.el.object3D.position.copy(pov.position);
    

    this.el.components["look-controls"].setupMouseControls()
    this.el.components["look-controls"].setupMagicWindowControls();

    //reset cam
    this.el.components["look-controls"].yawObject.rotation.y=0;
    this.el.components["look-controls"].pitchObject.rotation.x=0;

    //TODO
    //pour un changement de dimension, faire tourner le rig (comme actuellement)
    //pour un simple changement d'orientation, faire tourner la camera

    //rotate rig
    document.getElementById("camRig").setAttribute("rotation", pov.rotation.x + " " + pov.rotation.y + " " + pov.rotation.z + " ")

   // this.el.object3D.rotation.copy(new THREE.Euler(0, 0, 0));
  }
});

//Vue
import Object from "./Object.vue";



export default {
  name: "Scene",

  components: {
    Object,
  },

  props:["active", "id"],

  data() {
    
    return {

      //player latest pos
      pos:null,


      //cam pov
      pov1: {
        position:{x:1.5, y:0, z:10},
        rotation:{x:0, y:20, z:0},      
      },

      pov2: {
        position:{x:0, y:10, z:30},
        rotation:{x:-90, y:00, z:0},
      },

      //player
      player :{
        position:"0 1 3",
        rotation:"-15 0 0",
      },

      //objects
      cube1: {
        text:"Ceci est une sphère",
        hovering:false,
        position:"2 2 2",
        color:"#EF2D5E",
        opacity:0.5,
      },

      cube2: {
        hovering:false,
        position:"10 4 2",
        color:"#ABCDEF",
        opacity:0.5,
      },

      cube3: {
        hovering:false,
        position:"5 0 5",
        color:"#FFE44C",
        opacity:0.5,
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

    backgroundStyle(data) {
      if (data.hovering)
        return {'background-color':data.color}
      else
        return {'background-color':"white"}
    },

    teleport(pov) {
      this.$refs.cam.components["teleporter"].teleportTo(pov);  
    },

    updatePos(e) {

      if (this.active) {
        let newPos = e.detail.pos;
        let newRot = e.detail.rot;

        //update player pos data
       // this.player.position = newPos.x + " " + newPos.y + " " + newPos.z; 
        //this.player.rotation = newRot.x + " " + newRot.y + " " + newRot.z; 

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

    },


    enterScene() {
      this.$emit("enter-scene");
    },

  },

  watch: {
  },

  computed: {
    
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

  .gate h1 {
    text-align: center;
    margin-top: 300px;
  }

  .gate {
    z-index:1000;
    background-color: rgba(100, 100, 100, 0.9);
  }

  .teleporter {
    z-index:9999;
    position:fixed;
    top:0;
    left:0;
  }

  .teleporter span {
    font-size:30px;
    margin:15px;
  }
  .teleporter span:hover {
    color:blue;
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


