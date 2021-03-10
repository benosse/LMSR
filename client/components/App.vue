<template>
  <div id="container" className="container">

    <Scene/>

    <!--
    <div id="nav"></div>
      <h1>Bifurcation</h1>
        <h2>Le monde sinon rien</h2>
        <h2>Atlas des bifurcations</h2>
    <div id="canvas">
      <div id="masksUI">
        <button v-on:click="applyMask(0)">masque 1</button>
        <button v-on:click="applyMask(1)">masque 2</button>
        <button v-on:click="toggleEditMode()">edit</button>
      </div>

      <Frame v-for="id in openFrames" 
        v-bind:key="id" 
        v-bind:frameId="id" 
        v-bind:masks="masks"
        v-bind:editMode="editMode"
        @deleted="frameDeleted"
        @shown="frameShown"
        @hidden="frameHidden"/>
    </div>

  -->
  </div>

</template>

<script>


//vue components
import Vue from "vue";
import Frame from "./Frame.vue";
import Scene from "./Scene.vue";


//collections
import { Frames } from "../../imports/collections/frames.js";

export default {
  name: "App",

  data() {
    return {
      openFrames : ["0"],
      
      masks: [
        {value:false},
        {value:false},
      ],
      
      editMode:false,
    }
  },


  meteor: {
    //responsive frames collection
    allFrames() {
      return Frames.find({}, { sort: { createdAt: -1 } }).fetch()
    },

  },

  components: {
    Frame,
  },

    methods: {

      //handling masks
      applyMask(index) {
        this.masks[index].value = !this.masks[index].value;
      },

      toggleEditMode(){
        this.editMode = !this.editMode;
      },



      //handling frames
      frameShown(id, children){
        console.log("opening children: " , children);
        for (i in children) {
          let parentIndex = this.openFrames.indexOf(id);
          let childIndex = children[i].childId;

          //if already open
          if (this.openFrames.indexOf(childIndex) != -1)
            continue;

          console.log("splice at: ", parentIndex, " and ", children[i].childId)
          this.openFrames.splice(parentIndex+1, 0,children[i].childId)

        }
        console.log(this.openFrames)
      },


      frameHidden(id) {
        let frame = Frames.findOne(id);
        if (frame) {
          for(i in frame.children) {
            let index = this.openFrames.indexOf(frame.children[i].childId);
            if (index != -1) {
              //trigger frameHidden event recursivly on children
              this.frameHidden(frame.children[i].childId);
              //hide child
              this.openFrames.splice(index, 1);
            }
          }
        }
      },



      frameDeleted(id) {
        
        let index = this.openFrames.indexOf(id);
        console.log("deleting rame from view", index)
          if (index != -1)
            this.openFrames.splice(index, 1);
      }

    },
};
</script>


<style scoped>
  #nav {
    width:20%;
    height:100vh;
    position:fixed;
    left:0;
    top:0;
  }
  h1,h2 {
    font-family: 'Courier New', Courier, monospace;
  }
  #canvas {
    top:0;
    left:20%;
    position:fixed;
    width:80%;
    height:100vh;
    overflow:scroll;
  }
  #container {
    
  }

  #masksUI {
    background-color:white;
    padding-top : 20px;
    position:fixed;
    bottom:0;
    width:100vw;
    height:60px;
    z-index: 1000;
  }

</style>