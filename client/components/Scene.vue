
<template>

    <div>
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
          <a-camera listener @player-moved="onPlayerMoved" look-controls-enabled="true" wasd-controls-enabled="true" teleporter ref="cam" id="cam"></a-camera>
        </a-entity>


        <a-sphere v-for="p in players" v-bind:key="p._id"
          :position="p.position" 
          radius="0.2" 
          color="#000">
        </a-sphere>

      </a-scene>



      <div class="nav">
        <div class="container">
          <p v-for="p in players" v-bind:key="p._id">
          {{p.position}}

        </p>

          <h1 >Le monde sinon rien</h1>

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
    this.el.emit("player-moved", {pos:this.el.getAttribute('position'), rot:this.el.getAttribute('rotation')}, false);
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

 
  data() {
    
    return {

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
        id:null,
        position:null,
        rotation:null,
      },

      //other players
      players:{},




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
    //handle socket responses
    this.$options.sockets.onmessage = this.onWSMessage;
    
  },

  meteor: {
  },

  components: {
  },

  methods: {

    onWSMessage(message) {
      let parsed = JSON.parse(message.data);

      if (parsed.type) {
        switch(parsed.type) {
          case "setId" :
            this.player.id = parsed.id;
            console.log("connecté via websocket avec l'id ", this.player.id)
            break;

          case "updatePos" :
            //create new player
            if (this.players[parsed.id] == null) {
               //this.members[newMember.name] = newMember;
              this.$set(this.players, parsed.id, {
                position : parsed.position,
                rotation : parsed.position,
              });
              console.log("ajout du joueur", parsed.id)
            }
            
            this.players[parsed.id] = {
                position : parsed.position,
                rotation : parsed.position,
              }
            break;
          
          case "removePlayer":
            delete this.players[parsed.id];
            console.log("suppression du joueur", parsed.id)
            break;
        }
      }
    },

    teleport(pov) {
      this.$refs.cam.components["teleporter"].teleportTo(pov);  
    },

    
    onPlayerMoved(e) {

      let newPos = e.detail.pos;
      let newRot = e.detail.rot;

      //premier appel pas besoin de distance
      if (this.player.position == null ) {  
        this.updatePlayerPos(newPos, newRot);
      }
        
      else {

        //!! distance with no square root
        var a = this.player.position.x - newPos.x;
        var b = this.player.position.y - newPos.y;
        var c = this.player.position.z - newPos.z;
        let distance = (a*a + b*b + c*c);

        if (distance > 0.1) 
          this.updatePlayerPos(newPos, newRot);
      }
    },


    updatePlayerPos(newPos, newRot) {
      this.player.position = {x:newPos.x, y:newPos.y, z:newPos.z}; 
      this.player.rotation = {x:newRot.x, y:newRot.y, z:newRot.z}; 

      //send coords
      this.sendPlayerData();
    },


    sendPlayerData() {
      let message = {
        position:this.player.position,
        rotation:this.player.position.x
      }
      this.$socket.sendObj(message)
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


