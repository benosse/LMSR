<template>
	<div 
	id="menu" 
	ref="menu"
	:class="{mobile:isMobile, desktop:!isMobile}"
	>
		<!-- Nav and title -->
		<div ref="mainMenu" id="mainMenu" :class="{hidden:isHidden}">
			<h1 id="LMSR" class="mouseTarget" @click="onClickMenu('home')">Le monde sinon rien</h1>

			<nav :class="{helpMode:isShowingHelp}">

				<!-- ETAT DU MONDE -->
				<div class="line" ></div>
				<MenuEntry :currentContent="currentContent" :hoveredContent="hoveredContent" target="etat" class="nav1" text="L'état du monde" @click="onClickMenu('etat')"></MenuEntry>
			

				<!-- LITTERATURE FERTILE -->
				<div class="line" ></div>
				<MenuEntry ref="litterature" @click="onClickMenu('litterature')" class="nav1" text="Littérature fertile" target="litterature" :currentContent="currentContent" :hoveredContent="hoveredContent">
					<template v-slot:children>
						<div class="line open" ></div>
						<MenuEntry  @click="onClickMenu('litterature.AT')" class="nav2" text="Anna Tsing" target="litterature.AT" :currentContent="currentContent" :hoveredContent="hoveredContent" />
						<MenuEntry  @click="onClickMenu('litterature.BM')" class="nav2" text="Baptiste Morizot" target="litterature.BM" :currentContent="currentContent" :hoveredContent="hoveredContent" />
						<MenuEntry  @click="onClickMenu('litterature.BL')" class="nav2" text="Bruno Latour" target="litterature.BL" :currentContent="currentContent" :hoveredContent="hoveredContent" />
						<MenuEntry  @click="onClickMenu('litterature.DH')" class="nav2" text="Donna Haraway" target="litterature.DH" :currentContent="currentContent" :hoveredContent="hoveredContent" />
						<MenuEntry  @click="onClickMenu('litterature.NM')" class="nav2" text="Nastassja Martin" target="litterature.NM" :currentContent="currentContent" :hoveredContent="hoveredContent" />
						<MenuEntry  @click="onClickMenu('litterature.SV')" class="nav2" text="Sarah Vanuxem" target="litterature.SV" :currentContent="currentContent" :hoveredContent="hoveredContent" />
						<MenuEntry  @click="onClickMenu('litterature.VD')" class="nav2" text="Vinciane Despret" target="litterature.VD" :currentContent="currentContent" :hoveredContent="hoveredContent" />
					</template>
				</MenuEntry>


				<!-- LES PROJETS -->
				<div class="line" ></div>
				<MenuEntry ref="projets" @click="onClickMenu('projets')" class="nav1" text="Objets vivants" target="projets" :currentContent="currentContent" :hoveredContent="hoveredContent">
					<template v-slot:children>
						<div class="line open" ></div>
						<MenuEntry  @click="onClickMenu('projets.enquete')" class="nav2" text="Enquête" target="projets.enquete" :currentContent="currentContent" :hoveredContent="hoveredContent" />
						<MenuEntry  @click="onClickMenu('projets.sensibilite')" class="nav2" text="Sensibilité" target="projets.sensibilite" :currentContent="currentContent" :hoveredContent="hoveredContent" />
						<MenuEntry  @click="onClickMenu('projets.polyphonie')" class="nav2" text="Polyphonie" target="projets.polyphonie" :currentContent="currentContent" :hoveredContent="hoveredContent" />
						<MenuEntry  @click="onClickMenu('projets.territoire')" class="nav2" text="Territoire" target="projets.territoire" :currentContent="currentContent" :hoveredContent="hoveredContent" />
						<MenuEntry  @click="onClickMenu('projets.diplomatie')" class="nav2" text="Diplomatie" target="projets.diplomatie" :currentContent="currentContent" :hoveredContent="hoveredContent" />
					</template>
				</MenuEntry>

				<!-- POLE TERRE -->
				<div class="line" ></div>
				<MenuEntry :currentContent="currentContent" :hoveredContent="hoveredContent" target="poleTerre" class="nav1"  text="Terre" @click="onClickMenu('poleTerre')"></MenuEntry>

				<!-- CREDITS -->
				<div class="line credits" ></div>
				<MenuEntry  @click="onClickCredits()" class="nav2 credits" text="Commissariat collectif" target="credits" :currentContent="currentContent" :hoveredContent="hoveredContent" />

			</nav>
		</div>


		<!--MENU TOGGLE-->
		<div id="toggleMainMenu"  @click="onToggleMainMenu">
			<div id="toggle" class="mouseTarget">
				<span id="arrow" :class="{hidden:isHidden}" >></span>	
				<h1> menu </h1>
			</div>
		</div>

		<!--ICONS-->
		<div v-if="!isMobile" id="icons">

			<!--ICON SCENE-->
			<img v-if="isShowingScene" src="/images/icons/icon3D.svg" class="icon mouseTarget" key="toggleHideScene" @click="onClickHideScene"/>
			<img v-else src="/images/icons/icon3D.svg"  class="icon mouseTarget off" key="toggleShowScene" @click="onClickShowScene"/>

			<!--ICON SOUND-->
			<img v-if="isPlayingSound" src="/images/icons/iconSound.svg" class="icon mouseTarget" id="toggleSound" key="toggleMuteSound" @click="onClickMuteSound"/>
			<img v-else src="/images/icons/iconSound.svg"  class="icon mouseTarget off" id="toggleSound" key="togglePlaySound" @click="onClickPlaySound"/>

			<!--ICON AIDE-->
			<img  v-if="isShowingHelp" src="/images/icons/iconHelp.svg"  class="icon mouseTarget" @click="onClickHideHelp"/>
			<img v-else src="/images/icons/iconHelp.svg"  class="icon mouseTarget off" @click="onClickShowHelp"/>
		</div>

	</div>	
</template>

<script>

//vue imports
import MenuEntry from './MenuEntry.vue'


export default {
	name: "Menu",

	components: {
		MenuEntry
	},

	props: ["currentContent", "hoveredContent", "isShowingScene", "isShowingContent", "isHome", "isPlayingSound", "isMobile", "isShowingHelp"],


	data(){
		return {	
			isHidden:true,
		}
	},

	mounted(){
		//reset scroll
		this.$refs.mainMenu.scrollTop=0;
	},

    methods: {

		/**************************************************************************
		EVENTS
		***************************************************************************/
		onClickMenu(target) {
			this.$root.onClickMenu(target);
		},
		onClickShowScene(){
			this.$root.onShowScene();
		},
		onClickHideScene(){
			this.$root.onHideScene();
		},
		onClickPlaySound(){
			this.$root.onPlaySound();
		},
		onClickMuteSound(){
			this.$root.onMuteSound();
		},
		onClickShowHelp(){
			this.$root.onShowHelp();
		},
		onClickHideHelp(){
			this.$root.onHideHelp();
		},
		onClickCredits(){
			this.$root.onClickCredits();
		},


		/**************************************************************************
		INTERNAL METHODS
		***************************************************************************/
		openMenuEntry(target) {
			console.log("opening", target, "in menu")

			//close all entries
			this.$refs["litterature"].close();
			this.$refs["projets"].close();

			//open target entry
			if (this.$refs[target])
				this.$refs[target].open();
		},


		onToggleMainMenu(){
			if (this.isHidden)
				this.show();
			else
				this.hide();
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

	@menuWidth:~"max(16.6vw, 270px)";
	@fontSize:21px;
	@asideWidth:34px;
	@offset:~"min(@{asideWidth} - 16.6vw, @{asideWidth} - 270px)";	
	@mainMenuWidth:~"max(16.6vw - 2 * @{asideWidth}, 270px - 2 * @{asideWidth})";	
	@lineMargin:~"max(16.6vw * 0.07, 270px * 0.07)";
	@iconWidth:30px;

	//animations
	@keyframes spinArrow {
		0% {transform:rotate(0deg);}
		100% {transform:rotate(180deg);}
	}
	@keyframes spinArrowMobile {
		0% {transform:rotate(90deg);}
		100% {transform:rotate(270deg);}
	}

	@keyframes spinLine {
		0% {transform:rotate(0deg);
			margin-top:0;
			margin-bottom:0;
		}
		100% {transform:rotate(10deg);
			margin-top:@lineMargin;
			margin-bottom: @lineMargin;
		}
	}

	@keyframes spin {
		100% {transform:rotate(360deg);}
	}

	.icon.off {
		opacity:0.6;
	}
	
	#menu {
		pointer-events: none;
		position:fixed;
		z-index:0;
		height:100vh;
		top:0;
		left:0;
		
		/*********************************************************
		MOBILE
		******************************************************* */
		&.mobile {
			width:100vw;				
			font-size: 20px;

			#mainMenu {
				pointer-events: auto;
				background-color: rgba(255, 255, 255,0.95);
				position:fixed;
				top: 0px;	
				left:0;
				height:calc(100vh - 56px);
				width:100vw;
				overflow-y:scroll;

				padding-left:30px;
				padding-right: 30px;
				box-sizing: border-box;

				transition: left 1s;

				&.hidden {
					left: -100vw;
				}

				#LMSR {
					position: relative;
					font-family: 'BTP regular';
					font-size: 20px;
					width:100%;
					text-align: left;
					margin-top: 0px;
					margin-bottom : 0;
					border:none;
				}

			
				nav {		
					margin-top: 0px;					
					
					.line {
						background-color: black;
						width:100%;
						height:2px;
						margin:0;
						padding:0;

						&.open {
							animation-name: spinLine;
							animation-duration: 0.5s;
							animation-fill-mode: forwards;
						}
					}

					.nav1, .nav2 {
						font-family: 'BTPG book';
						line-height: 1.4;
						font-size: 20px;
						margin:0;
						padding:0;
					}
				}
			}


			#toggleMainMenu {	
				position:fixed;
				width:30px;

				pointer-events: auto;
				left:0;
				right:0;
				top:0;
				font-family: 'BTP regular';
				
				h1 {
					white-space: pre;
					writing-mode: vertical-lr;
					transform: translate(-50%);
					transform: rotate(180%);
					margin: 0;
					margin-left:50%;

					font-size:20px;
					font-family: 'BTP regular';
					border:none;
				}

				#arrow {
					font-size:20px;
					text-align: center;
					margin-left:auto;
					margin-right:auto;
					display: block;

					transition:transform 0.5s;

					-webkit-transform: rotate(0) ;
					-moz-transform: rotate(0); 
					-ms-transform: rotate(0);
					-o-transform: rotate(0); 
					transform: rotate(0);

					&.hidden {
						-webkit-transform: rotate(180deg) ;
						-moz-transform: rotate(180deg); 
						-ms-transform: rotate(180deg);
						-o-transform: rotate(180deg); 
						transform: rotate(180deg);
					}
				}
			}


			// #icons {
			// 	pointer-events: auto;
			// 	background-color: white;
			// 	position:fixed;
			// 	bottom:0;
			// 	left:0;
			// 	right:0;
			// 	height: 40px;

			// 	padding:8px;

			// 	display:flex;
			// 	justify-content: center;

			// 	.icon {
			// 		max-height:100%;
			// 		height:100%;
			// 		flex-grow: 1;
			// 	}
			// }
		}



		/*********************************************************
		DESKTOP
		******************************************************* */
		&.desktop {
			
			width: @menuWidth;
			font-size: @fontSize;
			pointer-events: none;	
			
			#toggleMainMenu {	
				position:fixed;
				width:@asideWidth;	

				pointer-events: auto;
				left:0;
				right:0;
				top:20px;
				font-family: 'BTP regular';
				
				h1 {
					white-space: pre;
					writing-mode: vertical-lr;
					font-size:@fontSize;
					margin-left:50%;
					transform: translate(-50%);
					transform: rotate(180%);
					text-decoration: none;
					font-weight: normal;
					border:none;
					font-family: 'BTP regular';
					border:none;
				}

				#arrow {
					font-size:20px;
					text-align: center;
					margin-left:auto;
					margin-right:auto;
					display: block;

					transition:transform 0.5s;

					-webkit-transform: rotate(0) ;
					-moz-transform: rotate(0); 
					-ms-transform: rotate(0);
					-o-transform: rotate(0); 
					transform: rotate(0);

					&.hidden {
						-webkit-transform: rotate(180deg) ;
						-moz-transform: rotate(180deg); 
						-ms-transform: rotate(180deg);
						-o-transform: rotate(180deg); 
						transform: rotate(180deg);
					}
				}
			}	


			#icons {
				pointer-events: auto;
				
				position:fixed;
				bottom:15px;
				right:0;
				left:0;
				width:@asideWidth;

				.icon {
					display:block;
					width:@iconWidth;
					margin-left:auto;
					margin-right:auto;
					margin-top:10px;
					margin-bottom:10px;	
					position:relative;

					animation: spin 0.4s;
				}
			}


			#mainMenu {			
				position:absolute;
							
				top:20px;
				bottom:0;
				left:0;
				width:@mainMenuWidth;
				margin-left:@asideWidth;

				transition: left 0.5s;

				&.hidden {
					left: @offset;
				}

				#LMSR {
					position: relative;
					font-family: 'BTP regular';
					text-decoration: none;
					font-weight: normal;
					margin:0;
					padding:0;
					letter-spacing: -0.3;
					font-size: @fontSize;
					width:100%;
					text-align: right;
					border:none;
				}

			
				nav {		
					margin-top: 120px;

					&.helpMode {
						opacity:0.1;
					}
					

					.line {
						background-color: black;
						width:100%;
						height:2px;
						margin:0;
						padding:0;

						&.open {
							//margin-top: @lineMargin;
							//margin-bottom:@lineMargin;

							animation-name: spinLine;
							animation-duration: 0.5s;
							animation-fill-mode: forwards;
							// transform:rotate(10deg);
						}

						&.credits {
							margin-top: 120px;
						}
					}

					.nav1, .nav2 {
						font-family: 'BTPG book';
						line-height: 1.4;
						font-size: @fontSize;
						margin:0;
						padding:0;
						pointer-events: auto;

					}
				}
			}

		}

		&.tablet {

		}


		
			
	}

</style>