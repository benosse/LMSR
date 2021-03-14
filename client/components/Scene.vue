
<template>

    <div>
    
      <div class ="scene gate"
        v-if="!active"
        @click="enterScene()"
      >
        <h1>ENTRER</h1>
      </div>

      <a-scene class ="scene ascene" cursor="rayOrigin: mouse" embedded >
        
        <a-sky color="#e5e5e5"></a-sky>
        <a-gltf-model src="/terrain.glb"  ></a-gltf-model>

        <Model :data="bibli" />
        <Model :data="poteaux" />
        <Model :data="jardin" />
        <Model :data="mur" />
        <Model :data="etudiants" />

        <a-entity light="type: ambient; color: #CCC; intensity:0.8;"></a-entity>
        <a-entity light="type: directional; color: #EEE; intensity: 0.75; " position="1 1 0"></a-entity>
        

        <a-entity ref="camRig" id="camRig" >
          <a-camera listener @update-pos="updatePos" look-controls-enabled="true" wasd-controls-enabled="true" teleporter ref="cam" id="cam"></a-camera>
        </a-entity>


        <a-sphere v-for="p in players" v-bind:key="p._id"
          :position="p.position" 
          radius="0.2" 
          color="#000">
        </a-sphere>

      </a-scene>



      <div class="nav">
        <div class="container">
          <h1>Le monde sinon rien</h1>

          <div class="teleporter">
            <a href="" @click.prevent="teleport(pov1)">Point de vue 1</a>
            <a href="" @click.prevent="teleport(pov2)">Point de vue 2</a>
          </div>

          <div v-if="jardin.hovering">
            <h2>Le jardin </h2>
            <p></p>
          </div>

          <div v-if="mur.hovering">
            <h2>Le mur </h2>
            <p></p>
          </div>

          <div v-if="bibli.hovering">
            <h2>La bibli </h2>
            <p></p>
          </div>

          <div v-if="poteaux.hovering">
            <h2>Les poteaux </h2>
            <p></p>
          </div>

          <div v-if="etudiants.hovering">
            <h2>Les etudiants </h2>
            <p></p>
          </div>
          

          
          
        </div>
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
  'a-plane',
  'a-gltf-model',
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
import Model from "./Model.vue";


export default {
  name: "Scene",

  components: {
    Object,
    Model,
  },

  props:["active", "id"],

  data() {
    
    return {

      //player latest pos
      pos:null,

      //tour
      tourVisible:false,


      //cam pov
      pov1: {
        position:{x:0, y:1.7, z:0},
        rotation:{x:0, y:20, z:0},      
      },

      pov2: {
        position:{x:0, y:0, z:40},
        rotation:{x:-90, y:00, z:0},
      },

      //player
      player :{
        position:"0 1 3",
        rotation:"-15 0 0",
      },




      //objects
      bibli: {
        hovering:false,
        position:"0 0 0",
        rotation:"0 0 0",
        src:"/bibli.glb",
      },

      poteaux: {
        hovering:false,
        position:"0 0 0",
        rotation:"0 0 0",
        src:"/poteaux.glb",
      },

      jardin: {
        hovering:false,
        position:"0 0 0",
        rotation:"0 0 0",
        src:"/jardin.glb",
      },

      mur: {
        hovering:false,
        position:"0 0 0",
        rotation:"0 0 0",
        src:"/mur.glb",
      },

      etudiants: {
        hovering:false,
        position:"0 0 0",
        rotation:"0 0 0",
        src:"/diplomes.glb",
      },
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
  .teleporter a{
    margin-left:25px;
    font-size:18px;
  }


</style>


