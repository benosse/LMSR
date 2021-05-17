<template>
	<div id="app" ref="app" :class="{mobile:isMobile, desktop:!isMobile}">

		<div v-if="!isSceneLoaded">
			<img src="/images/loading/loading2.gif" id="loading" alt="chargement">
		</div>



		<Content v-if="isSceneLoaded"
		id="content"
		ref="content"
		:isShowingScene="isShowingScene"
		:isMobile="isMobile"
		/>
		

		<Scene ref="scene"  
		@scene-loaded="onSceneLoaded"
		/>

		
		<Menu 
		id="menu" ref="menu"
		:isMobile="isMobile"
		:isHome="isHome"
		:isShowingScene="isShowingScene"
		:isShowingContent="isShowingContent"
		:currentContent="currentContent"
		:hoveredContent="hoveredContent"
		:isPlayingSound="isPlayingSound"
		/>



  </div>
</template>

<script>

//css
import "../assets/style.css";

//mobile detection
import { isMobile } from 'mobile-device-detect';
//vue components
// import Scene from './Scene.vue';
import Scene from './scene/Scene.vue';
import Content from'./content/Content.vue';
import Menu from './menu/Menu.vue';


export default {
  name: "App",
  
  components: {
    Scene,
    Content,
	Menu,
  },

  data() {
    return {
		//states
		isPlayingSound: false,
		isSceneLoaded: false,
		isShowingScene:false,
		isShowingContent:false,
		isHome:false,
		isMobile: isMobile,
		//isMobile:true,

		currentContent : "main.home",
		hoveredContent : null,

		//latest mouse pos for clickevent purposes
		mouseMoved:false,
		mouseTimeStamp:0,

		//scroll duration
		maxScrollDuration:3000,
    }
  },


  meteor: {
  },

  methods: {

	onSceneLoaded(){
		this.isSceneLoaded = true;
		//show the 3D
		this.showScene();
		//also show menu if desktop mode	
		if(!this.isMobile) {
			this.showMenu();
		}		
	},


	/*********************************************
	* MOUSE EVENTS
	*********************************************/
	// onWheel(e){
	// 	console.log("wheel from app", e.deltaY);

	// 	let minDelta = 0;

	// 	//scroll down
	// 	if (e.deltaY >= minDelta) {
	// 		if (this.isShowingScene)
	// 		this.hideScene();
	// 	}		
	// },

	// startRecordingMousePos(){
	// 	this.mouseMoved = false;
	// 	document.addEventListener("mousemove", this.onMouseMove)
	// 	document.addEventListener("touchmove", this.onMouseMove)
	// },

	// stopRecordingMousePos(){
	// 	document.removeEventListener("mousemove", this.onMouseMove);
	// 	document.removeEventListener("touchmove", this.onMouseMove);
	// 	return this.mouseMoved;
	// },

	// onMouseMove(e){
	// 	console.log("mouse moved", e.timeStamp)
	// 	this.mouseMoved = true;
	// },

	/*********************************************
	* SHOW / HIDE COMPONENTS
	*********************************************/
	showScene(){
		if (!this.isShowingScene) {
			this.$refs.scene.show();
			this.isShowingScene = true;	
			//this.$el.addEventListener("wheel", this.onWheel)	
		}	
	},

	hideScene(){
		this.$refs.scene.hide(()=>{
			if (this.$refs.content)
				this.$refs.content.activate();
			});
		this.isShowingScene = false;	
		//this.$el.removeEventListener("wheel", this.onWheel)		
	},

	showContent(){
		this.$refs.content.show();
		this.isShowingContent = true;
	},

	hideContent(){
		this.$refs.content.hide();
		this.isShowingContent = false;
		//show sceneif not already displaying
		if (!this.isShowingScene)
			this.showScene();
	},
	showMenu(){
		this.$refs.menu.show();
	},
	hideMenu(){
		this.$refs.menu.hide();
	},


	/*********************************************
	* EVENTS FROM COMPONENTS
	*********************************************/
	changeContent(selector, target) {
		this.currentContent = target;
		this.$refs["content"].changeContent(selector, target);

	},
	scrollContent(duration, target) {
		this.currentContent = target;
		//scroll content
		this.$refs["content"].scrollContent(target, Math.min(duration, this.maxScrollDuration));
		//open menu
		const split = target.split(".")
		this.$refs["menu"].openMenuEntry(split[0]);
	},
	reActivateContent(target) {
		//scroll content
		this.$refs["content"].scrollContent(target, this.maxScrollDuration);
	},

	changeHoveredContent(target) {
		this.hoveredContent = target;
	},

	onClickMenuEntry(target) {

		console.log("click from menu on", target)
		
		const split = target.split(".");

		//click on zone : teleport
		if (split.length == 1)
			this.$refs.scene.teleportFromMenu(target);	

		//click on auteur
		else if (split[0] == "litterature")
			this.changeContent(split[0], split[1]);	
		
		//click on groupe projet
		else if (split[0] == "projets")
			this.$refs.scene.teleportFromMenuToGroupe(split[1]);	

		//on mobile, close menu
		if (this.isMobile)
			this.hideMenu();

	},

	//home button from menu
	onClickHome(){
		//show menu (only on desktop)
		if (!this.isMobile)
			this.showMenu();
		//show scene
		this.showScene();
		//update scene
		this.$refs.scene.resetCam();
		
	},

	onClickItemEtat(target) {
		this.changeContent("etat", target);	
	},


	onPlaySound(){
		console.log("play sound")
		this.isPlayingSound = true;
		this.$refs.scene.playSound();
	},

	onMuteSound(){
		console.log("mute sound")
		this.isPlayingSound = false;
		this.$refs.scene.muteSound();
	},
  }
};

</script>


<style scoped lang="less">
	#loading {
		position:fixed;
		top:50vh;
		left:50vw;
		width:320px;
		height:auto;

		transform:translate(-50%, -50%);
	}
</style>