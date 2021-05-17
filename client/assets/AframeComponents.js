import AFRAME from "aframe";
import POSTPROCESSING from "postprocessing"


require('aframe-orbit-controls');
require('aframe-billboard-component');
require('aframe-fit-texture-component');
require('aframe-extras');
require('aframe-gltf-part-component');


const {
	EffectComposer,
	EffectPass,
	NoiseEffect,
	DepthOfFieldEffect,
	DepthEffect,
	BlendFunction,
	RenderPass,
  	SepiaEffect,
	SMAAEffect,
	SMAAImageLoader,
	VignetteEffect,
} = POSTPROCESSING;

const THREE = AFRAME.THREE;


AFRAME.registerSystem('postprocessing', {
	schema: {},  

	composer: null,
	originalRenderMethod: null,

	minY: 200,
	maxY: 250,

	maxBokeh:10,
	minBokeh:0,

	camPos: new THREE.Vector3(),

	randomFactor : Math.random(),

	init() {	
		console.log("init postprocessing system");
		this.isReady = false;
	},

	initCustomRenderer(){
		console.log("init custom renderer of postprocessing system");
		this.isReady = true;

		const sceneEl = this.sceneEl;
		const scene = sceneEl.object3D;
		const renderer = sceneEl.renderer;
		const render = renderer.render;
		const camera = sceneEl.camera;

		const clock = new AFRAME.THREE.Clock();
		const composer = new EffectComposer(renderer);

		this.composer = composer;
		this.composer.setSize( window.innerWidth, window.innerHeight );

 		window.addEventListener("resize", ()=>{
			 console.log("resize renderer")
			 renderer.setSize(window.innerWidth, window.innerHeight);
			this.composer.setSize(window.innerWidth, window.innerHeight);
		});

		this.originalRenderMethod = render;


		this.depthOfFieldEffect = new DepthOfFieldEffect(camera, {
			focusDistance: 5,
			// focalLength: 0.048,
			focalLength: 0.048,
			bokehScale: 2.0,
			height: 480
		});

		const depthEffect = new DepthEffect({
			blendFunction: BlendFunction.SKIP
		});

		const vignetteEffect = new VignetteEffect({
			eskil: false,
			offset: 0.35,
			darkness: 0.5
		});

		const renderPass = new RenderPass(scene, camera);
		const effectPass = new EffectPass(
			camera,
			this.depthOfFieldEffect ,
			depthEffect,
			vignetteEffect,
		);

		composer.addPass(renderPass);
		composer.addPass(effectPass);

		// Hijack the render method.
		let calledByComposer = false;

		renderer.render = function() {

			if(calledByComposer) {

				render.apply(renderer, arguments);

			} else {

				calledByComposer = true;
				composer.render(clock.getDelta());
				calledByComposer = false;
			}
		};
	},

	tick: function (t, dt) {
		if (this.isReady) {

			//get new cam pos
			this.sceneEl.camera.getWorldPosition(this.camPos)

			let minY = this.minY
			let maxY = this.maxY
			let camY = this.camPos.y;

			let maxBokeh = this.maxBokeh;
			let minBokeh = this.minBokeh;


			//clamp values
			if (camY > maxY)
				camY = maxY;
			if (camY < minY)
				camY = minY;
			
				
			//remap values
			let bokeh = THREE.MathUtils.mapLinear(camY, minY, maxY, minBokeh, maxBokeh);
			
			//add randomness
			const newRandomFactor = Math.random();
			this.randomFactor = THREE.MathUtils.lerp(this.randomFactor, newRandomFactor, 0.3);

			//apply random factor
			bokeh *= this.randomFactor;

			this.depthOfFieldEffect.bokehScale = bokeh;

		}	
	},


	remove() {
		this.composer.renderer.render = this.originalRenderMethod;
		this.composer.dispose();
	}

});






/*********************************************************** 
BOKEH
************************************************************/

// AFRAME.registerComponent('effects', {

// 	init: function () {	
// 		const sceneEl = this.el.sceneEl;

// 		if (!sceneEl.hasLoaded) {
// 			sceneEl.addEventListener('render-target-loaded', function(){console.log("loaded now")});
// 		return;
// 		}

// 		const scene = sceneEl.object3D;
// 		const renderer = sceneEl.renderer;
// 		const camera = sceneEl.camera;

// 		renderer.autoClear = false;
// 		renderer.clearColor = new THREE.Color(0, 0, 0);
// 		renderer.clearAlpha = 0;

// 		const composer = new EffectComposer(renderer);
// 		composer.setSize( window.innerWidth, window.innerHeight );
// 		document.addEventListener("resize", ()=>{this.onResize()});

// 		const pass1 = new RenderPass(scene, camera);
// 		const pass2 = new BokehPass( scene, camera, {
// 			focus: 20,
// 			aperture: 1.2 * 0.00001,
// 			maxblur:0.1,
// 		} );

// 		// pass2.clearColor = new THREE.Color(0, 0, 0);
// 		// pass2.clearAlpha = 0;
// 		// pass2.renderToScreen;


// 		composer.addPass(pass1);
// 		composer.addPass(pass2);

// 		this.composer = composer;
// 		this.t = 0;
// 		this.dt = 0;

// 		this.bind();
// 	},

// 	onResize: function(){
// 		this.composer.setSize( window.innerWidth, window.innerHeight );
// 	},


// 	tick: function (t, dt) {
// 		this.t = t;
// 		this.dt = dt;
// 	},

// 	/**
// 	 * Binds the EffectComposer to the A-Frame render loop.
// 	 * (This is the hacky bit.)
// 	 */
// 	bind: function () {
// 		const renderer = this.el.sceneEl.renderer;
// 		const render = renderer.render;
// 		const system = this;
// 		let isDigest = false;

// 		renderer.render = function () {
// 		if (isDigest) {
// 			render.apply(this, arguments);
// 			// renderer.autoClear = false;

// 		} else {
// 			isDigest = true;
// 			system.composer.render(system.dt);

// 			isDigest = false;
// 		}
// 		};
// 	}
// });

  

// AFRAME.registerComponent('bokeh',{

// 	schema:{
// 		cam:{type:'selector'},
//     },

	
// 	init : function(){
// 		console.log("init bokeh");
// 		this.postprocessing = {};
// 		this.initPostprocessing();
// 	},

// 	initPostprocessing:function() {

// 		const camera = this.data.cam;
// 		const renderer = this.el.renderer;

// 		const renderPass = new RenderPass( scene, camera );
// 		const bokehPass = new BokehPass( scene, camera, {
// 			focus: 1.0,
// 			aperture: 0.025,
// 			maxblur: 0.01,

// 			// width: width,
// 			// height: height
// 			width: 1000,
// 			height: 1000,
// 		} );

// 		const composer = new EffectComposer( renderer );

// 		composer.addPass( renderPass );
// 		composer.addPass( bokehPass );

// 		this.postprocessing.composer = composer;
// 		this.postprocessing.bokeh = bokehPass;
// 	}

// });



/*********************************************************** 
MOVE CAM WITH LERP
************************************************************/
//tourne la camera via son component look control
//todo : transformer la rotation et la translation en mode LOCAL (ou détacher puis réattacher la cam)
AFRAME.registerComponent('lerp-cam',{


	init : function(){
		this.delay=1;
		this.clock = null;
		this.isTranslating = false;
		this.isRotating = false;
		this.pos = null;
		this.rot = null;
	},

	lerp:function(props, callback){
		this.callback = callback;
		//start clock
		this.clock = new THREE.Clock();
		//save props
		this.pos = props.position;
		this.rot = props.quaternion;
		//save base pos
		this.basePos = this.el.object3D.position.clone();
		this.baseRot = this.el.children[0].object3D.quaternion.clone();
		console.log(this.baseRot)

		//disable look-controls
		this.el.children[0].components['look-controls'].data.enabled = false;
		//start lerp
		this.isTranslating= true;
		
	},

	tick: function () {
		 if (this.isTranslating) {
			
			let delta = this.clock.getElapsedTime()/this.delay;
			if (delta >= 1) {
				//stop translation
				this.isTranslating = false;
				//start rotation
				this.isRotating = true;
				//start new clock
				this.clock.start();
			}
			else {
				this.el.object3D.position.lerpVectors(this.basePos, this.pos, delta);
			}
		}
		
		else if (this.isRotating) {

			let delta = this.clock.getElapsedTime()/this.delay;
			if (delta >= 1) {
				//stop rotation
				this.isRotating = false;
				//put look-controls back 
				this.el.children[0].components['look-controls'].data.enabled = true;
				//send callback
				this.callback();
			}

			THREE.Quaternion.slerp(this.baseRot, this.rot, this.el.children[0].object3D.quaternion, delta);
		}
				
	},

});


/*****************************************************************
 RAYCAST TELEPORTER
 *****************************************************************/
//teleporte sur le mesh quand on clique dessus
//change la position LOCALE de la camera (donc on conserve l'orientation et la position dans la scène de la zone!)
//todo : est-ce qu'on a vraiment besoin de la zone??
AFRAME.registerComponent('raycast-teleporter', {
    schema:{
		camera:{type:'selector'},
		zone:{type:'selector'}
    },


    //keep mousedown pos to prevent teleport on drag
    onMouseDown(e){
        if (e.detail.intersection != null) {
            //save target point in local coordinates
            this.lastMouseDown = e.detail.intersection.point;
            this.worldToLocal.copy( this.el.object3D.matrixWorld ).invert();
            this.lastMouseDown.applyMatrix4(this.worldToLocal);
        }
    },

    //teleport on mouse up
    onMouseUp(e) {
        //look for camera	
        const camera = this.data.camera;
		const zone = this.data.zone;

        if (e.detail.intersection == null || this.lastMouseDown == null || camera==null) 
            return;

        else {
            
            //target in absolute coordinates
            let target = e.detail.intersection.point;

			//todo: ici récupérer la zone via l'intersection detail et non via les props

            //convert target to zone local coordinates
            this.worldToLocal.copy( zone.object3D.matrixWorld ).invert();
            target.applyMatrix4(this.worldToLocal);

            //change camera local position
            let distance = this.lastMouseDown.distanceTo(target);
            if (distance < this.minDragDistance) 
                camera.object3D.position.copy(target); 

			
			//todo : cancel bubble??
			//e.cancelBubble = true;
        }
    },

    init: function () {

        this.lastMouseDown = null;
        this.minDragDistance = 2;
        this.worldToLocal = new THREE.Matrix4();

        //bind this to listeners
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);

		//add listeners
		this.el.addEventListener('mousedown', this.onMouseDown)
        this.el.addEventListener('mouseup', this.onMouseUp)
    },

    //bind and unbind events if the component is enabled/disabled
    update:function() {
    },
	
	remove(){
		this.el.removeEventListener('mousedown', this.onMouseDown)
        this.el.removeEventListener('mouseup', this.onMouseUp)
	}
	
});

/*****************************************************************
 TELEPORTER
 *****************************************************************/
//active la camera de la zone quand on clique n'importe où dessus
//todo : ajouter point de téléportation avec orientation
AFRAME.registerComponent('teleporter', {

    schema: {
    },

    //keep mousedown pos to prevent teleport on drag
    onMouseDown(e){
        if (e.detail.intersection != null) {
            //save target point in local coordinates
            this.lastMouseDown = e.detail.intersection.point;
            this.worldToLocal.copy( this.el.object3D.matrixWorld ).invert();
            this.lastMouseDown.applyMatrix4(this.worldToLocal);
        }
    },

    //teleport on mouse up
    onMouseUp(e) {
        if (e.detail.intersection != null && this.lastMouseDown != null) {

            let target = e.detail.intersection.point;
            this.worldToLocal.copy( this.el.object3D.matrixWorld ).invert();
            target.applyMatrix4(this.worldToLocal);

            let distance = this.lastMouseDown.distanceTo(target);

            if (distance < this.minDragDistance) 
                this.el.emit('teleport-in-zone');
        }       
    },

    init() {
        //keep track of last mouse down event to prevent teleporting when dragging
        this.lastMouseDown = null;
        this.minDragDistance = 2;
		this.worldToLocal = new THREE.Matrix4();

        //bind this to listeners
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);

		//add events
		this.el.addEventListener('mousedown', this.onMouseDown)
        this.el.addEventListener('mouseup', this.onMouseUp)
    },

    //bind and unbind events if the component is enabled/disabled
    update:function() {
    },
	
	remove(){
		this.el.removeEventListener('mousedown', this.onMouseDown)
        this.el.removeEventListener('mouseup', this.onMouseUp)
	},
	
});

/*****************************************************************
 BILLBOARD
 le composant fait face à al cam renseignée
 *****************************************************************/
/*
AFRAME.registerComponent("billboard", {

	schema: {
		camera:{type:'selector'}
	},

	init: function() {
		this.target = new THREE.Vector3();
	},

	tick: function() {

		const object3D = this.el.object3D;
		const camera = this.data.camera.children[0];
		
		if (camera) {

			this.target.setFromMatrixPosition(camera.object3D.matrixWorld);      
			object3D.lookAt(this.target);		
		}
	}
  });

*/
  



/*****************************************************************
GLTF LAMBERT MATERIAL
applique un materiau three lambert avec la couleur donnée à tout le mesh
 *****************************************************************/
AFRAME.registerComponent('gltf-lambert-material', {
	schema: {
	  	color:{'type':'color', default:'white'}
	},
  
	init: function () {
		if (this.data.color != "white") {
			this.material = new AFRAME.THREE.MeshLambertMaterial({color:this.data.color})
			this.applyMaterial();
			this.el.addEventListener('object3dset', this.applyMaterial.bind(this));
		}
		else {
		}
		
	},
  
	applyMaterial: function () {
	  const mesh = this.el.getObject3D('mesh');
	  const mat = this.material;
  
	  if (!mesh) return;
	  mesh.traverse(function (node) {
		  node.material = mat;
		  node.material.needsUpdate = true;
	  });
	}
  });



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
		  
		  this.camera = this.data.camera.object3D.children[0];
		  this.src = this.data.src;
  
		  //charge l'image et applique la texture
		  let t = new THREE.TextureLoader().load( 
			  this.src,
			  ( t ) => {
				//sauvegarde la texture
				this.texture = t;
				//crée le shader
				this.changeTexture();                         
			  });
  
		  //mouse events
		  this.el.addEventListener('mouseenter', (e) => {
			console.log("mouse enter", this);
			this.changeTexture();
		  });
	  },

	  tick(t, dt) {
		this.changeTexture();
	  },

	  //TODO ne pas recharger mais update le shader
	  changeTexture:function() {
		//TODO: meilleurs checks
		if (this.texture == null)
		  return;
  
		this.el.getObject3D('mesh').material = new ProjectedMaterial({camera:this.camera, texture:this.texture, color: '#37E140'});
	  }
  });