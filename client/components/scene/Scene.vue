
<template>
	<div id="sceneHolder" 
	:class="{hidden:!isVisible, visible:isVisible, loading:isLoading}"
	>
		<a-scene 	
		renderer="sortObjects:true;"
		device-orientation-permission-ui="enabled: false"
		loading-screen="enabled:false;"
		vr-mode-ui="enabled: false"	
		id="scene"
		ref="scene"
		@loaded="onSceneLoaded"
		@renderstart="onRenderStart"
		cursor="rayOrigin: mouse" 
		raycaster="objects: .raycastable"
		embedded 
		>



			<!--*****************************************************************
			ASSETS 
			******************************************************************-->
			<a-assets timeout="10000" @loaded="onAssetsLoaded">
				<!--etat-->
				<img id="asset_nuage1" src="/models/textures/nuage_rond.png">
				<img id="asset_nuage2" src="/models/textures/nuage.png">

				<a-asset-item id="asset_frag1" src="/models/Frag1.gltf"></a-asset-item>
				<a-asset-item id="asset_frag2" src="/models/Frag2.gltf"></a-asset-item>
				<a-asset-item id="asset_frag3" src="/models/Frag3.gltf"></a-asset-item>
				<a-asset-item id="asset_frag4" src="/models/Frag4.gltf"></a-asset-item>
				<a-asset-item id="asset_frag5" src="/models/Frag5.gltf"></a-asset-item>
				<a-asset-item id="asset_frag6" src="/models/Frag6.gltf"></a-asset-item>
				<a-asset-item id="asset_frag7" src="/models/Frag7.gltf"></a-asset-item>
				<a-asset-item id="asset_frag8" src="/models/Frag8.gltf"></a-asset-item>
				<a-asset-item id="asset_frag9" src="/models/Frag9.gltf"></a-asset-item>

				<a-asset-item id="asset_frag_images" src="/models/Fragment_Img.gltf"></a-asset-item>

				<a-asset-item id="asset_frag_etudiant3" src="/models/etat/etudiant3.gltf"></a-asset-item>
				<a-asset-item id="asset_frag_etudiant2" src="/models/etat/etudiant2.gltf"></a-asset-item>
				<a-asset-item id="asset_frag_etudiant1" src="/models/etat/etudiant1.gltf"></a-asset-item>
				<a-asset-item id="asset_frag_ak1" src="/models/etat/ak1.gltf"></a-asset-item>
				<a-asset-item id="asset_frag_ak2" src="/models/etat/ak2.gltf"></a-asset-item>
				<a-asset-item id="asset_frag_afp1" src="/models/etat/afp1.gltf"></a-asset-item>
				<a-asset-item id="asset_frag_afp2" src="/models/etat/afp2.gltf"></a-asset-item>

				<!-- litterature -->
				<!-- TODO : bake lights pour la zone (si possible) -->
				<a-asset-item id="asset_litterature" src="/models/Litterature.gltf"></a-asset-item>
				<a-asset-item id="asset_cartels_litterature" src="/models/CartelsLitterature.gltf"></a-asset-item>
				

				<!--objets-->
				<a-asset-item id="asset_enquete" src="/models/Enquete.gltf"></a-asset-item>
				<a-asset-item id="asset_territoire" src="/models/Territoire.gltf"></a-asset-item>
				<a-asset-item id="asset_sensibilite" src="/models/Sensibilite.gltf"></a-asset-item>
				<a-asset-item id="asset_polyphonie" src="/models/Polyphonie.gltf"></a-asset-item>
				<a-asset-item id="asset_diplomatie" src="/models/Diplomatie.gltf"></a-asset-item>

				<!--jardin-->
				<a-asset-item id="asset_terre" src="/models/Pole-Terre.gltf"></a-asset-item>

		
			</a-assets>


			<!--*****************************************************************
			LUMIERES
			******************************************************************-->
			<a-entity light="type: ambient; color: #DDD"></a-entity>
			<a-entity light="type: directional; color: #FFF; intensity: 0.4" position="0 1 0"></a-entity> 

			<!--*****************************************************************
			CAMERA
			******************************************************************-->
			<a-entity ref="cam" id="cam" camera="fov:35;" listener :orbit-controls="orbitControlAttributes"></a-entity>


			<!--*****************************************************************
			FLUX STATIQUES
			******************************************************************-->		
			<a-entity>
				<!-- STATIC1 -->
				<!-- orage L+R? -->
				<a-box
					visible="true"				
					stream="audioID:static1; listener:#cam; canal:0; " 
					controls ="volume:4; refDistance:10; distModel:inverse; rolloffFac:1; 
					cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#7209aa ; posColorOut:#32a852 " 
					position="500 -15 0" 
					rotation="0 -90 0" 
					color="#f2f200" 			
				></a-box>

				<!-- rain1 -->
				<a-box
					visible="true"
					stream="audioID:static1; listener:#cam; canal:1; " 
					controls ="volume:4; refDistance:10; distModel:inverse; rolloffFac:1; 
					cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#4d4ddb ; posColorOut:#000075 " 
					position="-500 50 0" 
					rotation="0 90 0" 
					color="#f2f200" 
					
				></a-box>

				<!-- rain2 -->
				<a-box
					visible="true"
					stream="audioID:static1; listener:#cam; canal:2; " 
					controls ="volume:4; refDistance:30; distModel:inverse; rolloffFac:2; 
					cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#fcba03 ; posColorOut:#f78888 " 
					position="0 -50 500" 
					rotation="0 -180 0" 
					color="#f2f200" 
					
				></a-box>
				<!-- windR -->
				<a-box
					visible="true"
					stream="audioID:static1; listener:#cam; canal:3; " 
					controls ="volume:4; refDistance:30; distModel:inverse; rolloffFac:2; 
					cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#03fcdf ; posColorOut:#005c51 " 
					position="0 25 -500" 
					rotation="0 0 0" 
					color="#f2f200" 
					
				></a-box>
				<!-- WindL -->
				<a-box
					visible="true"
					stream="audioID:static1; listener:#cam; canal:4; " 
					controls ="volume:4; refDistance:30; distModel:inverse; rolloffFac:0.5; 
					cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#5005ff ; posColorOut:#230075 " 
					position="0 -100 -500" 
					rotation="0 0 0" 
					color="#f2f200" 
					
				></a-box>
				<a-box
					visible= "false"
					stream="audioID:static1; listener:#cam; canal:4; " 
					controls ="volume:4; refDistance:30; distModel:inverse; rolloffFac:0.5; 
					cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#5005ff ; posColorOut:#230075 " 
					position="0 100 500" 
					rotation="0 180 0" 
					color="#f2f200" 
					
				></a-box>

				<!-- STATIC2 -->
				<a-box
					visible= "false"
					stream="audioID:static2; listener:#cam; canal:0; " 
					controls ="volume:4; refDistance:30; distModel:exponential; rolloffFac:1.5; 
					cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#ffb300 ; posColorOut:#f7a6a6 " 
					position="50 -80 0" 
					rotation="0 0 0" 
					color="#f2f200" 
					
				></a-box>
				<a-box
					visible= "false"
					stream="audioID:static2; listener:#cam; canal:1; " 
					controls ="volume:4; refDistance:30; distModel:exponential; rolloffFac:1.5; 
					cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
					position="-50 -150 0" 
					rotation="0 0 0" 
					color="#f2f200" 
					
				></a-box>

				<a-box
					visible= "false"
					stream="audioID:static2; listener:#cam; canal:2;"  
					controls ="volume:4; refDistance:30; distModel:exponential; rolloffFac:1.5; 
					cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
					position="0 -10 0" 
					rotation="0 0 0" 
					color="#f2f200" 
					
				></a-box>
				
				<a-box
					visible= "false"
					stream="audioID:static2; listener:#cam; canal:3; " 
					controls ="volume:4; refDistance:30; distModel:exponential; rolloffFac:2; 
					cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
					position="0 -100 0" 
					rotation="0 0 0" 
					color="#f2f200" 
					
				></a-box>
				
				<a-box
					visible= "false"
					stream="audioID:static2; listener:#cam; canal:4; " 
					controls ="volume:4; refDistance:30; distModel:exponential; rolloffFac:2; 
					cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
					position="0 50 0" 
					rotation="0 0 0" 
					color="#f2f200" 
					
				></a-box>
			</a-entity>

			<!--*****************************************************************
			ZONES 
			******************************************************************-->
			<a-entity position="0 5 0" rotation="0 0 0">

				<!-- ETAT DU MONDE -->
				<EtatDuMonde
				v-if="this.renderEtat"
				@mouse-click="onZoneClicked"
				position= "0 35 0"
				rotation= "0 0 0"
				scale= "1 1 1"
				animation= ""
				target="etat"
				ref="etat"
				>
				</EtatDuMonde>


				<!-- LITTERATURE FERTILE -->
				<Litterature
				v-if="this.renderLitterature"
				@mouse-click="onZoneClicked"
				position="0 15 0" 
				rotation="0 0 0"
				animation="property: rotation; from:0 0 0 ; to: 0 360 0; loop: true; dur: 400000; easing:linear;"
				scale="1 1 1 "
				target="litterature"			
				ref="litterature"
				src="#asset_litterature"
				>
				</Litterature>


				<!-- PROJETS -->
				<Objets 
				v-if="this.renderObjets"
				@mouse-click="onZoneClicked"
				position="0 -30 0" 
				rotation="0 0 0"
				animation="property: rotation; from:0 0 0 ; to: 0 360 0; loop: true; dur: 400000; easing:linear;"
				scale="1 1 1"
				target="objets"
				ref="objets"		
				>
				</Objets>


				<!-- POLE TERRE -->
				

				<PoleTerre
				@mouse-click="onZoneClicked"
				position= "0 -70 0"
				rotation= "0 0 0"
				scale= "1 1 1"
				
				target="terre"
				ref="terre"
				src="#asset_terre"
				>
				</PoleTerre>

			</a-entity>

		</a-scene> 

		<!-- <div v-if="isVisible" class="width2 left66 btp-regular" >
			<a class="mouseTarget" id="backToContent" @click="onHideScene">Cacher la 3D ></a>
		</div>  -->
	</div>
</template>

<script>

	import EtatDuMonde from './EtatDuMonde';
	import Litterature from './Litterature';
	import Objets from './Projets';
	import PoleTerre from './PoleTerre';

	export default {
	name: "Scene",

	components: {
		EtatDuMonde,
		Litterature,
		Objets,
		PoleTerre,
	},

	data() {
		return {	
			isVisible:false,

			//zone currently targeted by the player
			activeZone:null,

			//default cam data
			defaultCamPos:null,
			defaultCamTarget:null,

			//camera position and target
			//used by orbit-control component
			camPos:null,
			camTarget:null,

			//teleportation speed
			travelSpeed:50,
			maxDurationTeleport: 5000,

			//show/hide animation
			//!!!! il faut mettre la meme dans le CSS
			animSpeed:1000,

			//loading 
			isLoading:true,
			renderEtat:false,
			renderLitterature:false,
			renderObjets:false,
			renderTerre:false,
		}
	},

	mounted(){
		this.defaultCamPos = new THREE.Vector3(160,80,0);
		this.defaultCamTarget = new THREE.Vector3(0,0,0);

		this.camPos = this.defaultCamPos.x + " " + this.defaultCamPos.y + " " + this.defaultCamPos.z;
		this.camTarget = this.defaultCamTarget.x + " " + this.defaultCamTarget.y + " " + this.defaultCamTarget.z;		
	},

	components: {
	},

		methods: {

			playSound(){
				this.$refs["scene"].systems["audio-manager"].resumeContext();
			},

			muteSound() {
				this.$refs["scene"].systems["audio-manager"].pauseContext();
			},
			
			onAssetsLoaded(){
				console.log("assets loaded");
			},
			
			onSceneLoaded(){
				console.log("scene loaded");	
				
				//init postprocessing
				//ADIOS! consomme trop hélas
				//this.$refs.scene.systems["postprocessing"].initCustomRenderer();

				//mute all sounds
				this.muteSound();

				setTimeout(()=>{ 
					this.isLoading = false;
					this.$root.onSceneLoaded(); 
				}, 4000);	

				//ça ne marche pas trop...
				setTimeout(()=>{ this.renderEtat = true;}, 0);	
				setTimeout(()=>{ this.renderLitterature= true;}, 500);	
				setTimeout(()=>{ this.renderObjets = true;}, 1000);	
				setTimeout(()=>{ this.renderTerre = true;}, 1500);
			},

			onRenderStart(){
				console.log("starting render")
			},

			onHideScene(){
				this.$root.onHideScene();
			},



			//appelé par les zones 
			//si on est déjà sur la zone il ne se passe rien
			//sinon alerte root
			onZoneClicked(zone) {
	
				console.log("onZoneClicked:", zone)

				if (zone.isActive) {
					console.log("zone déjà active");
					return;
				}
				//change content
				this.$root.goTo("main", zone.target);							
			},


			//appelé par root
			changeActiveZone(target){
				console.log("scene change active to target", target)

				//get zone as ref
				const split = target.split(".");
				let zone = null;
				if (split[0] == "objets" && split.length>1) 
					zone = this.$refs["objets"].getGroupe(split[1]);						
				else
					zone = this.$refs[split[0]];

				if (!zone) {
					if (target == "home")
						this.resetCam();
					else
						console.log("la zone n'existe pas...")
				}
					
				//launch tp
				else {
					this.previousZone = this.activeZone;

					//activate target zone
					zone.activate();
					this.activeZone = zone;
					console.log("new active zone in scene: new", this.activeZone, "old:", this.previousZone)

					//start tp (emits startTP and endTP to root)
					let targetTP =  zone.getTargetPosition();
					let positionTP = zone.getCamPosition();
					this.moveCamTo(targetTP, positionTP, ()=>{	
						//on tp end : desactivate previous zone	
						console.log("desactivate", this.previousZone)
						if (this.previousZone && this.previousZone != this.activeZone)
							this.previousZone.desactivate();					
					});							
				}				
			},



			/************************************************************************
			//ANIMATION TELEPORTATION
			*************************************************************************/
			//target : new lookat three vector
			//position : new position three vector
			//callback : on TP end callback
			moveCamTo(target, position, callback){

				//init teleportation
				let cam = this.$refs.cam;
				let camPos = cam.getObject3D('camera').position;
				let controls = cam.components['orbit-controls'];

				//compute speed
				//first call : start new anim
				let distance = camPos.distanceTo(position);
				let duration = distance / this.travelSpeed * 1000; //milliseconds
				duration = Math.min(duration, this.maxDurationTeleport)

				const ts = {
					startPos : new THREE.Vector3(camPos.x, camPos.y, camPos.z),
					startTarget: new THREE.Vector3(controls.data.target.x, controls.data.target.y, controls.data.target.z),
					endPos:position,
					endTarget:target,
					lerpPos: new THREE.Vector3(),
					lerpTarget : new THREE.Vector3(),
					duration:duration,
					distance:distance,
					timestamp:window.performance.now(),
				}

				//todo: lookat, then move
				function animate(t){
					const elapsed = t - ts.timestamp;
					const f = Math.min(ts.duration, elapsed)/ts.duration;

					//lerp target
					ts.lerpTarget.lerpVectors(ts.startTarget, ts.endTarget, f)
					this.camTarget= ts.lerpTarget.x.toString() + " " + ts.lerpTarget.y.toString() + " " +ts.lerpTarget.z.toString();
					//lerp pos
					ts.lerpPos.lerpVectors(ts.startPos, ts.endPos,f);
					this.$refs.cam.getObject3D('camera').position.set(ts.lerpPos.x, ts.lerpPos.y, ts.lerpPos.z)

					//no anim if the distance is too close
					if (elapsed < ts.duration && ts.distance > 1) { 
						window.requestAnimationFrame(animate.bind(this));
					}
					//end animation
					else {
						console.log("end TP");
						if (callback)
							callback();
					}
				};

				//start animation
				console.log("start TP")			
				window.requestAnimationFrame(animate.bind(this));
			},

			resetCam(){								

				//teleport cam
				let target =  this.defaultCamTarget;
				let position = this.defaultCamPos;

				this.moveCamTo(target, position, ()=>{
					if (this.previousZone)
						this.previousZone.desactivate();
					if (this.activeZone)
						this.activeZone.desactivate();
				});
			},




			show(){
				this.isVisible = true;				
				//force resize for mouse events
				setTimeout(()=>{this.$refs.scene.resize()}, this.animSpeed);			
			},

			hide(){
				this.isVisible = false;
			},
		},

		computed: {
			orbitControlAttributes(){
				return {
					target:this.camTarget,
					enableZoom:true,
					initialPosition: this.camPos,
					maxPolarAngle:180,
				}
			},
		}
	};

</script>


<style lang="less" scoped>

	@keyframes show {
		0% {	
			z-index:0;
			opacity:0.2;		
		}

		100% {
			opacity:1;
		}
	}
	
	#sceneHolder {
		height: 100vh;
        width: 100vw;
        position:fixed;
		//top:-100vh;
		top:0;
		left:0;
		background-color:rgba(255,255,255,0.8);
		transition: opacity 0.5s;
		
		&.loading {
			opacity:0 !important;
		}

		&.hidden {
			z-index:-9999;
			opacity:1;

			pointer-events: none;
		}

		&.visible {
			animation-name: show;
  			animation-duration: 1s;
			animation-fill-mode: forwards; 

			pointer-events: auto;
		}
	}
</style>


