<template>
  <div className="container">

    <div id="masksUI">
      <button v-on:click="applyMask(0)">masque 1</button>
      <button v-on:click="applyMask(1)">masque 2</button>
    </div>

    <Frame v-for="id in openFrames" 
      v-bind:key="id" 
      v-bind:frameId="id" 
      v-bind:masks="masks"
      @deleted="frameDeleted"
      @shown="frameShown"
      @hidden="frameHidden"/>
  </div>
</template>

<script>


//vue components
import Vue from "vue";
import Frame from "./Frame.vue";

//collections
import { Frames } from "../../imports/collections/frames.js";

export default {
  name: "App",

  data() {
    return {
      openFrames : ["0"],
      masks: [false, false, false, false, false],

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
        this.masks[index] = !this.masks[index];
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

  #masksUI {
    position:fixed;
    bottom:0;
    width:100vw;
    height:100px;
  }

</style>