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

		<ContentHelp v-if="isShowingHelp" :isMobile="isMobile"/>	

		
		<Menu 
		id="menu" ref="menu"
		:isMobile="isMobile"
		:isHome="isHome"
		:isShowingScene="isShowingScene"
		:isShowingHelp="isShowingHelp"
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
		isPlayingSound: true,
		isSceneLoaded: false,
		isShowingScene:false,
		isShowingContent:false,
		isHome:false,
		isMobile: isMobile,
		//isMobile:true,
		isShowingHelp: false,

		currentContent : "main.home",
		hoveredContent : null,

		//latest mouse pos for clickevent purposes
		mouseMoved:false,
		mouseTimeStamp:0,

		//scroll duration
		maxScrollDuration:3000,

		//previous content state (3d visible ou pas)
		isPreviousScene:true,

		//sound
		currentPlayer:null,
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

	showHelp(){
		this.isShowingHelp = true;
	},

	hideHelp(){
		this.isShowingHelp = false;
	},

	onShowScene(){
		this.showScene();
		this.isPreviousScene = true;
	},

	onHideScene(){
		this.hideScene();
		this.isPreviousScene = false;
	},

	showScene(){
		if (!this.isShowingScene) {
			this.$refs.scene.show();
			this.isShowingScene = true;				
			//this.$el.addEventListener("wheel", this.onWheel)	
		}	
	},
	hideScene(){
		this.$refs.scene.hide();
		this.isShowingScene = false;
	},

	showMenu(){
		this.$refs.menu.show();
	},
	hideMenu(){
		this.$refs.menu.hide();
	},


	//from scene
	changeContent(selector, target) {
		console.log("change content from app", selector, target)
		//change content
		this.$refs["content"].changeContent(selector, target);
		//hide scene
		this.hideScene();
		//keep track of previous state
		this.isPreviousScene = true;
	},
	scrollContent(duration, target) {
		console.log("scroll content from app:", target)
		//scroll content
		this.$refs["content"].scrollContent(target, Math.min(duration, this.maxScrollDuration));
		//open menu
		const split = target.split(".")
		this.$refs["menu"].openMenuEntry(split[0]);
	},
	reActivateContent(target) {
		console.log("re-activate content from app:", target)
		this.$refs["content"].scrollContent(target, 1000);
		this.currentContent = target;

		//show scene if needed
		if (this.isPreviousScene)
			this.showScene();
	},


	changeHoveredContent(target) {
		this.hoveredContent = target;
	},
	changeCurrentContent(target) {
		this.currentContent = target;
	},

	onClickCredits(){
		this.currentContent="credits";
		this.$refs["content"].changeContent("credits") 
	},

	//from menu and content
	onClickMenu(target) {
		console.log("click from menu on", target)	
		//on mobile, close menu
		if (this.isMobile)
			this.hideMenu();

		const split = target.split(".");
		//change content to litterature
		if (split.length>1 && split[0] == "litterature") {
			//change content
			this.$refs["content"].changeContent("litterature", split[1]);
			//hide scene
			this.hideScene();
			this.currentContent = target;
		}

		else
			this.onClickRef(target);
	},

	onClickRef(target) {

		console.log("click from content on", target)
		if (target == "home")
			this.onClickHome();
		else {
			this.$refs["scene"].teleportToRef(target);
			//keep track of previous state
			this.isPreviousScene =false;
		}
			
	},
	onClickHome(){
		//hide menu on desktop
		if (this.isMobile)
			this.hideMenu();
		//show scene
		this.showScene();
		//update scene
		this.$refs.scene.resetCam();
		//change current content
		this.currentContent = null;	
		this.isPreviousScene = true;
	},


	//sound
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
	setCurrentPlayer(player) {
		if (this.currentPlayer)
			this.currentPlayer.stopPlayer();
		this.currentPlayer = player;
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