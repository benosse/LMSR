
<template>
  <a-gltf-model 
    :cutout-component="cutoutComponent"
    @mouseenter="mouseEnterHandler()"
    @mouseleave="mouseLeaveHandler()"
    @click="mouseClickHandler()"
    :position="data.position" 
    :rotation="data.rotation"
    :src="data.src"
    :animation="animation"
    visible="true"
  ></a-gltf-model >

</template>


<script>


//Vue
import Vue from "vue";
Vue.config.ignoredElements = [
  'a-gltf-model',
];


//Aframe
import {Aframe} from "aframe"

//Aframes components
AFRAME.registerComponent('cutout-component', {

  schema: {
    color:{type:'color', default:'#ffffff'}
  },

  init: function() {

      //deux matériaux : un rempli et un cutout
      this.baseMaterial = new THREE.MeshLambertMaterial({
        color: this.data.color,
      });

      this.cutOutMaterial = new THREE.MeshBasicMaterial({
          colorWrite: false
      });

      //le model si l'objet est un gltf
      this.model = null;


      //évènements claviers
      this.el.addEventListener('mouseenter', (e) => {
        console.log("mouse enter", this);
        this.applyMaterial(this.cutOutMaterial);
      });

      this.el.addEventListener('mouseleave', (e) => {
        console.log("mouse leave", this);
        this.applyMaterial(this.baseMaterial);
      });    

      //chargement du gltf
      this.el.addEventListener('model-loaded', (e) => {
        console.log("modèle chargé")
        this.model = e.detail.model;
      });
    },


    applyMaterial:function(mat) {

      //si c'est une primitive
        let mesh = this.el.getObject3D('mesh');
        if (mesh)
            mesh.material = mat;

        // si c'est un gltf
        if (this.el.tagName == "A-GLTF-MODEL") {
          //s'il n'est pas chargé
          if (this.model == null)
            console.log("gltf pas chargé")
          //sinon applique la texture
          else {
            this.model.traverse(function(node) {
                if (node.isMesh) {
                    node.material = mat;
                }
            });
          }
        } 
    }, 
})


export default {
  name: "Cutout",

  props:["data"],

  data() {  
    return {
    }
  },

  mounted(){
  },

  meteor: {
  },

  components: {
  },

  methods: {

    mouseEnterHandler(event) {
      this.data.hovering = true;
      this.$emit("mouse-enter", this.data.imgSrc);
    },

    mouseLeaveHandler(event) {
      this.data.hovering = false;
      this.data.opacity = 0.5;
      this.$emit("mouse-leave");
    },
    
    mouseClickHandler(event) {
      this.$emit("mouse-clic");
    },

  },

  watch: {
  },

  computed: {
    animation(){
      return "property: position; from:"+this.data.position+"; to:"+this.data.animation+"; dur: 2000; easing: linear; loop: true; dir:alternate";
    },

    cutoutComponent(){
      return "color:"+this.data.color;
    },
  }

  
};

</script>

<style scoped>
</style>


