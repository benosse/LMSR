<template>
    <div class="frame" >
        <div class="mask" v-bind:style="dynamicMaskStyle"></div>

        <div class="content" v-bind:style="dynamicStyle">
            {{masks}}
            <div class="toggleHide" v-if="isOpen" v-on:click="hide"></div>
            <div class="toggleShow" v-else-if="hasChildren" v-on:click="show"></div>

            <button v-on:click="createFrame">ajouter </button>

            <button class="buttonDelete" v-on:click="deleteFrame">X</button>
        </div>
  </div>
</template>

<script>

//collections
import { Frames } from "../../imports/collections/frames.js";


export default {
    name: "Frame",

    props: ["frameId", "masks"],
    
    data() {
        return {
            isOpen:false, 
        };
    },

    watch: {
        masks: {
            deep:true,
            handler() {
                console.log("masks changed")
            }
        }


    },

    computed: {
        dynamicStyle: function () {
            if (!this.frameData)
                return {}
            else {
                return {
                    'background-color': 'rgb(' + this.frameData.color.r+ ',' + this.frameData.color.g+ ',' + this.frameData.color.b+')',
                }
            }
        },

        hasChildren: function() {
            if (!this.frameData)
                return false;

            return this.frameData.children.length > 0;
        },

        dynamicMaskStyle: function() {
            console.log("uuuuu")
             if (!this.frameData)
                return {'visibility':'hidden'}

            let m = false;
            for (i in this.frameData.tags) {
                if(this.masks[this.frameData.tags[i]]) {
                    m=true;
                    break;
                }    
            }
            if (m) {
                return {}
            }
            else
                return {'visibility':'hidden'}
        }
            
    },

    meteor: {
        //responsive frames collection
        frameData() {
            return Frames.findOne({_id:this.frameId});
        },

    },


    methods:{
        show:function() {
            this.isOpen = true;
            this.$emit('shown', this.frameId, this.frameData.children)
        },

        hide:function() {
            this.isOpen = false;
            this.$emit('hidden', this.frameData)
        },

        createFrame() {
            Meteor.call("frames.insert", this.frameId, this.frameData.color, (error, result) => { this.show(); }); 
        },

        deleteFrame() {
            //delete in DB
            Meteor.call("frames.remove", this.frameId);

            //also delete from app viex
            this.$emit('deleted', this.frameId);
        },
  }

};
</script>

<style scoped>

    .mask {
        position:absolute;
        width:400px;
        height:400px;
        background-color: rgba(255,0,0,0.5);
        margin:0;
    }

    .frame {
        width:400px;
        height:400px;
        display:inline-block;
    }

    .content {
        margin:2%;
        width:96%;
        height:96%;
    }

    .buttonDelete {
        width: 30px;
        height: 30px;
    }

    .toggleHide, .toggleShow {
        float:right;
        width : 50px;
        height:100%;
    }

    .toggleShow {
        background-color: rgba(0,255,0,0.2);
    }
    .toggleShow:hover {
        background-color: rgba(0,255,0,0.5);
    }

    .toggleHide {
        background-color: rgba(255, 0,0,0.2);
    }
    .toggleHide:hover {
        background-color: rgba(255, 0,0,0.5);
    }

</style>