<template>
	<div 
	id="menu" 
	ref="menu"
	class="mobile"
	>

		<aside>

			<div id="icons">
				<img src="/images/icons/iconHome.svg"  class="icon top mouseTarget" id="toggleHome" @click="onClickHome"/>


				<img src="/images/icons/iconSound.svg"  class="icon top mouseTarget" id="toggleSound"/>

				<!--ICON SOUND-->
				<img v-if="isPlayingSound" src="/images/icons/iconSound.svg"  class="icon top mouseTarget" id="toggleSound" key="toggleMuteSound" @click="onClickMuteSound"/>
				<img v-else src="/images/icons/iconSound.svg"  class="icon top mouseTarget" id="toggleSound" key="togglePlaySound" @click="onPlaySound"/>

				<!--ICON CONTENT-->
				<img v-if="isShowingContent" src="/images/icons/icon2D.svg"  class="icon top mouseTarget" id="toggleContent" key="toggleHideContent" @click="onClickHideContent"/>
				<img v-else src="/images/icons/icon2D.svg"  class="icon top mouseTarget" id="toggleContent" key="toggleShowContent" @click="onClickShowContent"/>

				<!--ICON SCENE-->
				<img v-if="isShowingScene" src="/images/icons/icon3D.svg"  class="icon top mouseTarget" key="toggleHideScene" @click="onClickHideScene"/>
				<img v-else src="/images/icons/icon3D.svg"  class="icon top mouseTarget" key="toggleShowScene" @click="onClickShowScene"/>

			</div>
			<div class="top mouseTarget" id="toggleMainMenu"  @click="onToggleMainMenu">
				<h1> menu </h1>
			</div>
			

		</aside>

		
		<div ref="mainMenu" id="mainMenu" :class="{hidden:isHidden}">
			<nav >
				<h1><MenuEntry text="L'état du monde" @click="onClickMenu('etat')"/></h1>
				<h1><MenuEntry text="Littérature fertile" @click="onClickMenu('lutrins')"/></h1>
				<h1><MenuEntry text="Les étudiant.e.s" @click="onClickMenu('etudiants')"/></h1>

				<h2><MenuEntry :class="getEntryClass('main')" text="La main" @click="onClickMenu('main')"/></h2>
				<h2><MenuEntry :class="getEntryClass('donnees')" text="Les données" @click="onClickMenu('donnees')"/></h2>
				<h2><MenuEntry :class="getEntryClass('systemes')" text="Les systèmes" @click="onClickMenu('systemes')"/></h2>
				<h2><MenuEntry :class="getEntryClass('epreuves')" text="Les épreuves" @click="onClickMenu('epreuves')"/></h2>
				<h2><MenuEntry :class="getEntryClass('invisible')" text="L'invisible" @click="onClickMenu('invisible')"/></h2>
				<h2><MenuEntry :class="getEntryClass('soin')" text="Le soin" @click="onClickMenu('soin')"/></h2>

				<h1><MenuEntry :class="getEntryClass('jardin')" text="Le pôle terre" @click="onClickMenu('jardin')"/></h1>
			</nav>
		</div>
	</div>	
</template>

<script>


//vue imports
import MenuEntry from './MenuEntry.vue'


export default {
	name: "MenuM",

	components: {
		MenuEntry
	},

	props: ["currentContent", "hoveredContent", "isShowingScene", "isShowingContent", "isHome", "isPlayingSound"],



	data(){
		return {	
			isHidden:true,
		}
	},

	mounted(){
	},

    methods: {

		getEntryClass(id){
			return {
				'hovered':id==this.hoveredContent.id,
				'active':id==this.currentContent.id,
			}
		},

		onClickMenu(id) {
			console.log("click from menu", id)
			this.$emit("click-menu", id)
		},

		onClickHome(){
			this.$emit("click-home")
		},

		onClickShowScene(){
			this.$emit("show-scene")
		},

		onClickHideScene(){
			this.$emit("hide-scene")
		},

		onClickShowContent(){
			this.$emit("show-content")
		},

		onClickHideContent(){
			this.$emit("hide-content")
		},

		onToggleMainMenu(){
			if (this.isHidden)
				this.show();
			else
				this.hide();
		},

		onPlaySound(){
			this.$emit("play-sound")
		},

		onMuteSound(){
			this.$emit("mute-sound")
		},

		show(){
			//reset scroll
			this.$refs.mainMenu.scrollTop=0;
			this.isHidden = false;
		},

		hide(){
			this.isHidden = true;
		},
    }
};
</script>


<style scoped lang="less">

	#menu {
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		font-family: 'BTP regular';	
		
		overflow: hidden;
		z-index:9999;

		aside {
			position: fixed;
			bottom:0;
			left:0;
			width: 100vw;
			height:8vh;
			z-index:9999;
			background-color:white;

			#icons {
				position:absolute;
				left:0;
				bottom:0;
				top:0;
				width:75%;

				.icon {
					height:80%;
					width:auto;
					position:relative;
					float:left;
					margin:5px;
				}
			}

			#toggleMainMenu {
				position: absolute;
				bottom:50%;
				transform:translate(0, 50%);
				right:5px;

				h1 {
					margin:0;
				}
			}

		}

		#mainMenu {
			position:fixed;
			top:0;
			height:100vh;
			right:0;
			left:0;
			background-color: white;

			transition: top 0.5s;

			&.hidden {
				top:100vh;
			}

			nav {
				padding:15px;

				h1, h2, h3, h4 {
						margin-bottom:0;
						font-weight:normal;
					}

					h1 {
						font-size: 30px;
						margin-top:15px;
						margin-left:5px;							
					}

					h2 {
						font-size: 26px;
						margin-top:8px;
						margin-left:10px;
						
					}

					h3 {
						font-size: 22px;
						margin-top:10px;
						margin-left:15px;
					}

					h4 {
						font-size: 18px;
						margin-left:20px;
						margin-top:8px;
					}
			}
		}
	
	}


</style>