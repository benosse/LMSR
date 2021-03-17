
<template>

    <div>
      <a-scene :style="sceneStyle"
      class ="scene ascene" 
      cursor="rayOrigin: mouse" 
      embedded >

        
        <Cutout :data="bibli" @mouse-enter="changeBackgroundImage" @mouse-leave="resetBackgroundImage" @mouse-clic="hide3D"/>

        <Cutout :data="mur" @mouse-enter="changeBackgroundImage" @mouse-leave="resetBackgroundImage" @mouse-clic="hide3D"/>




        <a-sky color="#e5e5e5"></a-sky>

        <a-box mask position="0 0 0" scale="5 5 5"> </a-box>

        <a-gltf-model src="/terrain.glb"  ></a-gltf-model>
        


        <a-entity light="type: ambient; color: #CCC; intensity:0.8;"></a-entity>
        <a-entity light="type: directional; color: #EEE; intensity: 0.75; " position="1 1 0"></a-entity>


        <a-box v-if="start" color="#FFC65D" my-shader="camera:#cam; src:/images/alexis2.jpg" position="30 10 -3" scale="20 20 20"></a-box>
        <a-box v-if="start" color="#FFC65D" my-shader="camera:#cam; src:/images/alexis2.jpg" position="30 30 20" scale="8 8 8"></a-box>
        
        <a-box v-if="start" color="#FFC65D" my-shader="camera:#cam; src:/images/normo.png" position="30 0 20" scale="8 8 8"></a-box>
   
        <a-entity ref="camRig" id="camRig" >
          <a-camera look-controls-enabled="true" wasd-controls-enabled="true"  ref="cam" id="cam"></a-camera>
          <!--a-camera no-click-look-controls  ref="cam" id="cam"></a-camera -->
        </a-entity>
    

   
      </a-scene>

        <div class="nav" >
            <button @click="function(){start = !start}">Afficher cube</button>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <span v-if="!isShowing3D" @click="show3D" id="buttonShow3D">Retour à la 3D</span>
        </div>


        <div class="background" >
            <img :src="imageSrc">
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

AFRAME.registerComponent('mask', {

    init: function() {

        //deux matériaux : un rempli et un cutout
        this.baseMaterial = new THREE.MeshBasicMaterial({
          color: 0xFFFFFF,
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


class ProjectedMaterial extends THREE.ShaderMaterial {
  constructor({ camera, texture, color = 0xffffff, ...options } = {}) {
    if (!texture || !texture.isTexture) {
      throw new Error('Invalid texture passed to the ProjectedMaterial')
    }

    if (!camera || !camera.isCamera) {
      throw new Error('Invalid camera passed to the ProjectedMaterial')
    }

    // make sure the camera matrices are updated
    camera.updateProjectionMatrix()
    camera.updateMatrixWorld()
    camera.updateWorldMatrix()

    // get the matrices from the camera so they're fixed in camera's original position
    const viewMatrixCamera = camera.matrixWorldInverse.clone()
    const projectionMatrixCamera = camera.projectionMatrix.clone()
    const modelMatrixCamera = camera.matrixWorld.clone()

    const projPosition = camera.position.clone()

    console.log("shader",texture)

    super({
      ...options,
      uniforms: {
        color: { value: new THREE.Color(color) },
        map: { type:'t', value:texture },
        
        viewMatrixCamera: { type: 'm4', value: viewMatrixCamera },
        projectionMatrixCamera: { type: 'm4', value: projectionMatrixCamera },
        modelMatrixCamera: { type: 'mat4', value: modelMatrixCamera },
        // we will set this later when we will have positioned the object
        savedModelMatrix: { type: 'mat4', value: new THREE.Matrix4() },
        projPosition: { type: 'v3', value: projPosition },
      },

      vertexShader: `
          uniform mat4 viewMatrixCamera;
          uniform mat4 projectionMatrixCamera;
          uniform mat4 modelMatrixCamera;

          varying vec4 vWorldPosition;
          varying vec3 vNormal;
          varying vec4 vTexCoords;


          void main() {
            vNormal = mat3(modelMatrix) * normal;
            vWorldPosition = modelMatrix * vec4(position, 1.0);
            vTexCoords = projectionMatrixCamera * viewMatrixCamera * vWorldPosition;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,

      fragmentShader: `
        uniform vec3 color;
        uniform sampler2D map;
        uniform vec3 projPosition;

        varying vec3 vNormal;
        varying vec4 vWorldPosition;
        varying vec4 vTexCoords;
        
        void main() {
          vec2 uv = (vTexCoords.xy / vTexCoords.w) * 0.5 + 0.5;

          vec4 outColor = texture(map, uv);

          // this makes sure we don't render the texture also on the back of the object
          vec3 projectorDirection = normalize(projPosition - vWorldPosition.xyz);
          float dotProduct = dot(vNormal, projectorDirection);
          

          gl_FragColor = outColor;
        }
      `,

    })

    this.isProjectedMaterial = true
  }
}



AFRAME.registerComponent('my-shader', {
    schema: {
        camera: {
            type:'selector'
        },

        src: {
            type:'string'
        }
    },

    init:function() {
        
        let camera = this.data.camera.object3D.children[0];
        let src = this.data.src;


        let t = new THREE.TextureLoader().load( 
            src,
            ( t ) => {
                console.log(t)
                this.el.getObject3D('mesh').material = new ProjectedMaterial({camera, texture:t, color: '#37E140',});
                /*
                this.el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({
                                        color: 0xFF8844,
                                        map: t,
                                        });
                                        */
                                        
		    } 
        );


    }
});

/*
AFRAME.registerShader('offset-repeat', {
        schema: {
            // the texture source (probably a video)
            src: {type: 'map'},
            // texture parameters
            offset: {type: 'vec2', default: {x: 0, y: 0}},
            repeat: {type: 'vec2', default: {x: 1, y: 1}}
        },

        uniforms: {
            // the texture value (once the texture source is loaded, update)
            map: { type: 't', value: null },
            // texture parameters
            offset: {type: 'vec2', value: {x: 0, y: 0}},
            repeat: {type: 'vec2', value: {x: 1, y: 1}}
        },

        init: function(data) {
            this.material = new THREE.MeshBasicMaterial({color: 0xFF8844});
            
            this.material = new THREE.ShaderMaterial({

                uniforms: this.uniforms,

                vertexShader: this.vertexShader,

                fragmentShader: this.fragmentShader

            });
            
        },



        update: function (data) {
            AFRAME.utils.material.updateMap(this, data);
            this.uniforms.map.value = this.material.map;
            this.uniforms.offset.value = data.offset;
            this.uniforms.repeat.value = data.repeat;
        },



        vertexShader: [
          'varying vec2 vUV;',
          'void main(void) {',
          '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
          '  vUV = uv;',
          '}'
        ].join('\n'),

        fragmentShader: [
          'uniform sampler2D map;',
          'uniform vec2 offset;',
          'uniform vec2 repeat;',
          'varying vec2 vUV;',
          'void main() {',
          '  gl_FragColor = texture2D(map, vec2(vUV.x / repeat.x + offset.x, vUV.y / repeat.y + offset.y));',
          '}'
        ].join('\n')
    });

  */

//shader
/*
AFRAME.registerShader('offset-repeat', {
        schema: {
            // the texture source (probably a video)
            src: {type: 'map', is: 'uniform'},
            // texture parameters
            offset: {type: 'vec2', default: {x: 0, y: 0}, is: 'uniform'},
            repeat: {type: 'vec2', default: {x: 1, y: 1}, is: 'uniform'}
        },

        init: function(data) {
            data = AFRAME.utils.extend({}, data);
            this.material = new THREE.MeshBasicMaterial({color: 0xFF8844});
        },

        vertexShader: [
          'varying vec2 vUV;',
          'void main(void) {',
          '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
          '  vUV = uv;',
          '}'
        ].join('\n'),

        fragmentShader: [
          'uniform sampler2D map;',
          'uniform vec2 offset;',
          'uniform vec2 repeat;',
          'varying vec2 vUV;',
          'void main() {',
          '  gl_FragColor = texture2D(map, vec2(vUV.x / repeat.x + offset.x, vUV.y / repeat.y + offset.y));',
          '}'
        ].join('\n')
    });

*/




//Vue
import Object from "./Object.vue";
import Model from "./Model.vue";


export default {
  name: "SceneTest",

  components: {
    Object,
    Model,
  },

 
  data() {
    
    return {
      //bouton projection
      start:false,

      //montrer/cacher la 3D
      isShowing3D:true,

      //background image
      imageSrc:"",
      defaultImageSrc:"",

      bibli: {
          hovering:false,
          position:"0 0 0",
          rotation:"0 0 0",
          src:"/bibli.glb",
          imgSrc:"/images/mur.png",
          animation:"0 1 0",
          color:"#0000ff"
      },

      mur: {
      hovering:false,
      position:"0 0 0",
      animation:"0 0 0",
      rotation:"0 0 0",
      src:"/mur.glb",
      imgSrc:"/images/alexis.jpg",
      color:"#00ff00"
      },

    }
  },

  mounted(){

  },

  meteor: {
  },

  components: {
  },

  methods: {
    changeBackgroundImage(src) {
      this.imageSrc = src;
    },

    resetBackgroundImage() {
      this.imageSrc = this.defaultImgsrc;
    },

    hide3D() {
      this.isShowing3D = false;
    },

    show3D(){
      this.isShowing3D = true;
    },
  },

  watch: {
  },

  computed: {
    sceneStyle(){
      console.log("computing", this.isShowing3D)
      if (this.isShowing3D)
        return ""
      else
        return "display:none;"
    }
  }

  
};

</script>

<style scoped>
  .teleporter a{
    margin-left:25px;
    font-size:18px;
  }
</style>


