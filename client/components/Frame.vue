<template>
    <div class="frame" >
        <div class="content" v-bind:style="dynamicStyle">
            <button v-if="isOpen" v-on:click="close">fermer</button>
            <button v-else v-on:click="open">ouvrir</button>

            <button v-on:click="createFrame">ajouter </button>

            <button v-on:click="deleteFrame">supprimer </button>
        </div>

        <div class="children" v-if="isOpen">
            <Frame v-for="frame in childrenFrames" v-bind:key="frame._id" v-bind:frame="frame"/>
        </div>
  </div>
</template>

<script>

//collections
import { Frames } from "../../imports/collections/frames.js";

//vue
import Frame from "./Frame.vue";

export default {
    name: "Frame",

    props: ["frame"],
    
    data() {
        return {
            isOpen:false,
            dynamicStyle: {
                'background-color': 'rgb(' + this.frame.color.r+ ',' + this.frame.color.g+ ',' + this.frame.color.b+')',
            }
        };
    },

    meteor: {
        //responsive frames collection
        childrenFrames() {
            return Frames.find({parent:this.frame._id}, { sort: { createdAt: -1 } }).fetch()
        },

    },



    methods:{
        open:function() {
            this.isOpen = true;
        },

        close:function() {
            this.isOpen = false;
        },

        createFrame() {
            Meteor.call("frames.insert", this.frame._id, this.frame.color);
            this.isOpen = true;
        },

        deleteFrame() {
            Meteor.call("frames.remove", this.frame._id);
        },
  }

};
</script>

<style scoped>
    .frame {
        width:fit-content;
    }

    .content {
        width:400px;
        height:400px;
        float:left;
        margin:10px;
    }
    .children {
        display:inline-block;
        float:left
    }

    .buttonDelete {
        width: 30px;
        height: 30px;
    }

</style>