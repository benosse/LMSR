<template>
	<div id="app" ref="app" :class="{mobile:isMobile, desktop:!isMobile}">

		<Content
		id="content"
		ref="content"
		:isShowingScene="isShowingScene"
		:isMobile="isMobile"
		/>
		
		<!-- <SceneDebug ref="scene"  
		@scene-loaded="onSceneLoaded"
		/> -->
		<Scene ref="scene"  
		v-if="!isMobile"
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

		<Loading v-if="isLoading"/>



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
import Loading from'./content/Loading.vue';
import ContentHelp from'./content/ContentHelp.vue';
import Menu from './menu/Menu.vue';

export default {
  name: "App",
  
  components: {
    Scene,
    Content,
	Menu,
	Loading,
	ContentHelp
  },

  data() {
    return {
		//states
		isPlayingSound: false,
		isLoading: true,
		isShowingScene:false,
		isHome:false,
		isShowingHelp: false,

		//isMobile: isMobile,
		isMobile:true,
		
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

	mounted() {
			console.log("app mounted");

			// mobile : enlève le chargement après 5s (ou une interaction)
			if (this.isMobile) {
				setTimeout(()=>{ 
					this.isLoading = false;
				}, 5000); 
			}
	},

	methods: {

		/*************************************************
		* FROM SCENE
		*************************************************/
		onSceneLoaded(){
			this.isLoading = false;
			this.showMenu();
		},
		/*************************************************
		* FROM MOBILE
		*************************************************/
		cancelLoading(){
			this.isLoading = false;
		},

		/*************************************************
		* FROM CONTENT
		*************************************************/

		/*************************************************
		* FROM MENU
		*************************************************/
		onClickCredits(){

			if (this.isMobile)
				this.hideMenu();

			this.currentContent="credits";	
			this.$refs["content"].changeContent("credits") 
		},

		onClickMenu(target) {
			this.hideHelp();

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
		onShowHelp(){
			this.showHelp();
		},
		onHideHelp(){
			this.hideHelp();		
		},
		onShowScene(){
			this.hideHelp();
			this.showScene();
			this.isPreviousScene = true;
		},
		onHideScene(){
			this.hideHelp();
			this.hideScene();
			this.isPreviousScene = false;
		},
		onClickHome(){
			this.hideHelp();
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
		onPlaySound(){
			this.hideHelp();
			console.log("play sound")
			this.isPlayingSound = true;
			this.$refs.scene.playSound();
		},
		onMuteSound(){
			this.hideHelp();
			console.log("mute sound")
			this.isPlayingSound = false;
			this.$refs.scene.muteSound();
		},





		/*************************************************
		* MODEL
		*************************************************/
		showScene(){
			if (!this.isShowingScene) {
				this.$refs.scene.show();
				this.isShowingScene = true;				
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
		hideHelp() {
			this.isShowingHelp = false;
		},
		showHelp() {
			this.isShowingHelp = true;
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
		
		setCurrentPlayer(player) {
			if (this.currentPlayer)
				this.currentPlayer.stopPlayer();
			this.currentPlayer = player;
		},
	}
};

</script>


<style scoped lang="less">
	
</style>