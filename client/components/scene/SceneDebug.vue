
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
			LUMIERES
			******************************************************************-->
			<a-entity light="type: ambient; color: #DDD"></a-entity>

			<!--*****************************************************************
			MANAGER
			******************************************************************-->
			<!-- <a-entity id="manager" ref="manager" streams-manager></a-entity> -->

			<!--*****************************************************************
			CAMERA
			******************************************************************-->
			<a-entity ref="cam" id="cam" camera="fov:35;" listener :orbit-controls="orbitControlAttributes"></a-entity>


			<!--*****************************************************************
			FLUX STATIQUES
			******************************************************************-->
			<!-- STATIC1 -->
			<!-- orage L+R? -->
			<a-box
				visible="false"				
				stream="audioID:static2; listener:#cam; canal:0;" 
				controls ="volume:1; refDistance:1000; distModel:inverse; rolloffFac:1; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#7209aa ; posColorOut:#32a852 " 
				position="500 -15 0" 
				rotation="0 -90 0" 
				color="#f2f200" 
				
			></a-box>

			<!-- rain1 -->
			<!-- <a-box
				visible="false"
				stream="audioID:static1; listener:#cam; canal:1; manager:#manager" 
				controls ="volume:4; refDistance:10; distModel:inverse; rolloffFac:1; 
				cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#4d4ddb ; posColorOut:#000075 " 
				position="-500 50 0" 
				rotation="0 90 0" 
				color="#f2f200" 
				
			></a-box> -->

			<!-- rain2 -->
			<!-- <a-box
				visible="false"
				stream="audioID:static1; listener:#cam; canal:2; manager:#manager" 
				controls ="volume:4; refDistance:30; distModel:inverse; rolloffFac:2; 
				cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#fcba03 ; posColorOut:#f78888 " 
				position="0 -50 500" 
				rotation="0 -180 0" 
				color="#f2f200" 
				
			></a-box> -->
			<!-- windR -->
			<!-- <a-box
				visible="false"
				stream="audioID:static1; listener:#cam; canal:3; manager:#manager" 
				controls ="volume:4; refDistance:30; distModel:inverse; rolloffFac:2; 
				cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#03fcdf ; posColorOut:#005c51 " 
				position="0 25 -500" 
				rotation="0 0 0" 
				color="#f2f200" 
				
			></a-box> -->
			<!-- WindL -->
			<!-- <a-box
				visible="false"
				stream="audioID:static1; listener:#cam; canal:4; manager:#manager" 
				controls ="volume:4; refDistance:30; distModel:inverse; rolloffFac:0.5; 
				cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#5005ff ; posColorOut:#230075 " 
				position="0 -100 -500" 
				rotation="0 0 0" 
				color="#f2f200" 
				
			></a-box> -->
			<!-- <a-box
				visible= "false"
				stream="audioID:static1; listener:#cam; canal:4; manager:#manager" 
				controls ="volume:4; refDistance:30; distModel:inverse; rolloffFac:0.5; 
				cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#5005ff ; posColorOut:#230075 " 
				position="0 100 500" 
				rotation="0 180 0" 
				color="#f2f200" 
				
			></a-box> -->

			<!-- STATIC2 -->
			<!-- <a-box
				visible= "false"
				stream="audioID:static2; listener:#cam; canal:0; manager:#manager" 
				controls ="volume:4; refDistance:30; distModel:exponential; rolloffFac:1.5; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#ffb300 ; posColorOut:#f7a6a6 " 
				position="50 -80 0" 
				rotation="0 0 0" 
				color="#f2f200" 
				
			></a-box>
			<a-box
				visible= "false"
				stream="audioID:static2; listener:#cam; canal:1; manager:#manager" 
				controls ="volume:4; refDistance:30; distModel:exponential; rolloffFac:1.5; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				position="-50 -150 0" 
				rotation="0 0 0" 
				color="#f2f200" 
				
			></a-box>

			 <a-box
				visible= "false"
				stream="audioID:static2; listener:#cam; canal:2; manager:#manager" 
				controls ="volume:4; refDistance:30; distModel:exponential; rolloffFac:1.5; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				position="0 -10 0" 
				rotation="0 0 0" 
				color="#f2f200" 
				
			></a-box>
			
			<a-box
				visible= "false"
				stream="audioID:static2; listener:#cam; canal:3; manager:#manager" 
				controls ="volume:4; refDistance:30; distModel:exponential; rolloffFac:2; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				position="0 -100 0" 
				rotation="0 0 0" 
				color="#f2f200" 
				
			></a-box>
			
			<a-box
				visible= "false"
				stream="audioID:static2; listener:#cam; canal:4; manager:#manager" 
				controls ="volume:4; refDistance:30; distModel:exponential; rolloffFac:2; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				position="0 50 0" 
				rotation="0 0 0" 
				color="#f2f200" 
				
			></a-box> -->

			<!--*****************************************************************
			3D 
			******************************************************************-->
			<a-box
				scale="30 30 30"
				position="0 0 0" 
				rotation="0 0 0" 
				color="#f2f200" 			
			></a-box>

		</a-scene> 
	</div>
</template>

<script>

	export default {
	name: "SceneDebug",

	components: {
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
			travelSpeed:100,
			maxDurationTeleport: 5000,

			//show/hide animation
			//!!!! il faut mettre la meme dans le CSS
			animSpeed:1000,

			currentContent:"main.home",

			isLoading:true,
		}
	},

	mounted(){
		this.defaultCamPos = new THREE.Vector3(950,0,0);
		this.defaultCamTarget = new THREE.Vector3(0,50,0);

		this.camPos = this.defaultCamPos.x + " " + this.defaultCamPos.y + " " + this.defaultCamPos.z;
		this.camTarget = this.defaultCamTarget.x + " " + this.defaultCamTarget.y + " " + this.defaultCamTarget.z;
	},

	components: {
	},

		methods: {

			playSound(){
				this.$refs["scene"].systems["audio-manager"].playAllMediaElements();
				//this.$refs.manager.components["streams-manager"].resumeContext();
			},

			muteSound() {
				//this.$refs.manager.components["streams-manager"].pauseContext();
			},
			
			onAssetsLoaded(){
				console.log("assets loaded");
			},

			
			onSceneLoaded(){
				console.log("scene loaded");	
				
				//init postprocessing
				this.$refs.scene.systems["postprocessing"].initCustomRenderer();
				setTimeout(()=>{ 
					this.isLoading = false;
					this.$emit("scene-loaded"); 
				}, 000);			
			},

			onRenderStart(){
				console.log("starting render")
			},

			//emit to parent handler
			onHideScene(){
				this.$emit("hide-scene")
			},



			teleportToRef(target) {
				console.log("teleport from scene to target:", target)

				const split = target.split(".");
				//teleport to zone
				if (split.length == 1 && this.$refs[split[0]]) {
					this.onZoneClicked(this.$refs[split[0]]);
				}

				else{
					//teleport  to groupe
					if (split[0] == "projets") {
							const groupe = this.$refs["projets"].getGroupe(split[1]);
							if (groupe)
								this.onZoneClicked(groupe);
							else
								console.log("la zone n'existe pas...")
					}

					//teleport to litterature
					else if (split[0] == "litterature")
						this.onZoneClicked(this.$refs["litterature"]);
					
					//teleport to etat
					else if (split[0] == "etat")
						this.onZoneClicked(this.$refs["etat"]);
				}
			},

			//appelé par les zones 
			//si on est déjà sur la zone il ne se passe rien
			onZoneClicked(zone) {
	
				console.log("onZoneClicked:", zone)

				if (zone.isActive) {
					console.log("zone déjà active");
					//this.$root.reActivateContent(this.currentContent);
					return;
				}
								
				this.previousZone = this.activeZone;

				//activate target zone
				zone.activate();
				this.activeZone = zone;
				console.log("new active zone in scene: new", this.activeZone, "old:", this.previousZone)	

				//save new content
				this.currentContent = this.activeZone.target;

				//start tp (emits startTP and endTP to root)
				let targetTP =  zone.getTargetPosition();
				let positionTP = zone.getCamPosition();

				this.moveCamTo(targetTP, positionTP, ()=>{	
					//on tp end : desactivate previous zone	
					console.log("desactivate", this.previousZone)
					if (this.previousZone && this.previousZone != this.activeZone)
						this.previousZone.desactivate();					
				});	

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
						window.requestAnimationFrame(boundAnimate);
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
				const boundAnimate = animate.bind(this);
				this.$root.scrollContent(ts.duration, this.currentContent);		
				window.requestAnimationFrame(boundAnimate);

			},


			/*********************************************
			* CHANGE ZONES AND STATES
			*********************************************/

			resetCam(){								
				//change content to home
				this.currentContent = "home"

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

			show(callback){
				this.isVisible = true;				
				console.log("show from scene")

				setTimeout(()=>{
					//force resize for mouse events
					this.$refs.scene.resize();
					//callback
					if (callback)
						callback();
				}, this.animSpeed);	
				
			},

			hide(callback){
				this.isVisible = false;
				console.log("hide from scene")
				setTimeout(callback, this.animSpeed);	
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
			opacity:0.3;		
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
		background-color:rgba(255,255,255,0.7);
		transition: opacity 1s;
		
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


