<template>
	<div  id="app" ref="app" :class="{mobile:isMobile, desktop:!isMobile}">

		<Content
			id="content"		
			ref="content"
			:isShowingScene="isShowingScene"
			:isMobile="isMobile"
			:class="{visible:!isShowingScene, hidden:isShowingScene}"
		/>

		<Scene ref="scene"  
		v-if="!isMobile"
		/> 
	
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

		<div  id="buttons" class="btp-regular" v-if="!isMobile">
			
			<a v-if="hideBackButton" class="mouseTarget button buttonHidden" @click="">< retour</a>
			<a v-else class="mouseTarget button" @click="goBack()">< retour</a>

			<a v-if="isShowingScene" class="mouseTarget button" @click="onHideScene()">cacher la 3D</a>
			<a v-else class="mouseTarget button" @click="onShowScene()">montrer la 3D</a>

			<a v-if="isPlayingSound" class="mouseTarget button" @click="onMuteSound">son ON/<span class="buttonHidden">OFF</span></a>
			<a v-else class="mouseTarget button" @click="onPlaySound">son <span class="buttonHidden">ON</span>/OFF</a>

			<a v-if="isShowingHelp" class="mouseTarget button" @click="onHideHelp">aide</a>
			<a v-else class="mouseTarget button" @click="onShowHelp">aide</a>

		</div> 
		
		<transition name="swipe-loading">
			<Loading v-if="isLoading" :isMobile="isMobile"/>			
		</transition>
		<transition name="swipe-help">
			<ContentHelp v-if="isShowingHelp"/>	
		</transition>


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

		isMobile: isMobile,
		//isMobile:true,
		
		currentContent : "home",
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

		//state
		currentState: {
			selector:"main",
			target:"home",
		},
    }
  },


	meteor: {
	},

	mounted() {
			console.log("app mounted");

			this.$router.afterEach((to, from) => {	

				//back button
				if (!this.isInternalNavigation) {
					console.log("go back to", to)
					this.goTo(to.meta.selector, to.meta.target);
				}
				//reset
				this.isInternalNavigation = false;
			})
			
			//router to home
			this.routerGoTo("home");

			// mobile : enlève le chargement après 5s (ou une interaction)
			if (this.isMobile) {
				setTimeout(()=>{ 
					this.isLoading = false;
				}, 8000); 
			}
	},


	methods: {

		/*************************************************
		* ROUTER
		*************************************************/
		routerGoTo(name) {
			console.log("router go to", name)
			if (this.$route.name !== name)  {
				this.isInternalNavigation = true;
				this.$router.push({ name: name});
			}		
		},

		/*************************************************
		* FROM SCENE
		*************************************************/
		onSceneLoaded(){
			this.isLoading = false;
		},
		/*************************************************
		* FROM MOBILE
		*************************************************/
		cancelLoading(){
			this.isLoading = false;
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

			//update scene
			if (!this.isMobile) {
				//show scene
				this.showScene();
				//update scene
				this.$refs.scene.resetCam();
				this.isPreviousScene = true;
			}
				
			//change current content
			this.goTo("main", "home");	
			
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
				this.$refs.content.allowScroll=false;			
			}	
		},
		hideScene(){
			this.$refs.scene.hide();
			this.isShowingScene = false;	
			setTimeout(()=>{this.$refs.content.allowScroll=true;}, 500);		
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


		//main handler for state change
		//update the content and the Scene
		goTo(selector, target, options) {
			
			if (this.currentState.selector == selector && this.currentState.target == target)
				return;

			console.log("app go to :", selector, target)

			const split = selector.split('.');

			const content = this.$refs["content"];
			const scene = this.$refs["scene"];
			const menu = this.$refs["menu"];


			//content
			let forceScroll = null;
			let noScroll = null;
			if (options) {
				forceScroll = options.forceScroll;
				noScroll = options.noScroll;
			}

			content.changeContent(split[0], target);
			if ((this.currentState.selector == selector || forceScroll) && !noScroll) {
				console.log("scroll to", target)
				content.scrollContent(target);
			}

			//menu et currentContent
			if (selector == "main") {				
				//currentContent
				this.currentContent = target;
				//menu
				const split = target.split(".");
				menu.openMenuEntry(split[0]);
			}	
			//objets - etud ou bien credits - null		
			else {			
				//currentContent
				const split = selector.split(".");
				if (target)
					this.currentContent = split[0] + "." + target;
				else
					this.currentContent = split[0]

				//menu	
				menu.openMenuEntry(selector);			
			}

			//router
			this.routerGoTo(this.currentContent);

			//scene
			//teleport to new zone
			if (scene && selector == "main") {
				scene.changeActiveZone(target)
				//also show scene if needed
				if (this.currentState.showScene) {
					this.showScene();
					this.currentState.showScene = false;	
				}
					
			}
			//or hide scene if click on content
			else if (this.isShowingScene){
				this.hideScene();
				this.currentState.showScene = true;			
			}
					
			//save new state
			this.currentState.selector = selector;
			this.currentState.target = target;
		},







		goBack(){
			console.log("router pos:", this.$router)
			this.$router.go(-1);
		},

		changeHoveredContent(target) {
			this.hoveredContent = target;
		},

	
		setCurrentPlayer(player) {
			if (this.currentPlayer)
				this.currentPlayer.stopPlayer();
			this.currentPlayer = player;

			//also unmute if needed
			if (!this.isPlayingSound)
				this.onPlaySound();
		},
	},

	computed: {
		hideBackButton:function(){
			return this.currentContent == "home";
		},
	}
};

</script>


<style scoped lang="less">
	
</style>