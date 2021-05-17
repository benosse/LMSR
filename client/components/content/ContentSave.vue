<template>

	<div ref="content" id="content" @wheel="onWheel"
	:class="{mobile:isMobile, desktop:!isMobile, visible:isShowing, hidden:!isShowing}"
	>
		<ContentHome v-if="isType('home')" :isMobile="isMobile" :id="getTarget"/>

		<!-- zone -->
		<!-- <ContentEtat v-if="isType('etat')" :id="getId"/> -->

		<!-- pole terre -->
		<!-- <ContentPoleTerre v-if="isType('poleTerre')" :id="getId"/> -->



		<ContentMain v-if="isType('main')" :target="getTarget" ref="main"/>

		<!-- page auteur -->
		<ContentLitterature v-if="isType('litterature')" :id="getTarget"/>	

		<!-- projet etudiant -->
		<ContentProjets v-if="isType('projets')" :id="getTarget"/>

	
		<div class="width2 left66 " :class="{hidden:isShowingScene, visible:!isShowingScene}">
			<h2 class=" gutter mouseTarget" id="backTo3D" @click="onClickToggleScene">retour à la 3D</h2>
		</div>
		

	</div>    
</template>

<script>


import ContentHome from "./ContentHome.vue"
import ContentMain from "./ContentMain.vue"
import ContentEtat from "./etat/ContentEtat.vue"
import ContentLitterature from "./litterature/ContentLitterature.vue"
import ContentProjets from "./projets/ContentProjets.vue"
import ContentPoleTerre from "./poleTerre/ContentPoleTerre.vue"

export default {
	name: "Content",

	components: {
		ContentEtat,
		ContentProjets,
		ContentLitterature,
		ContentHome,
		ContentPoleTerre,
		ContentMain,
	},

	//tmp : à terme on utilisera les id de la BDD et meteor pour dynamiser le contenu
	props: ["isMobile", "currentContent", "isShowingScene"],

	data(){
		return {
			isShowing:true,
			isActive:false,	
		}
	},

    methods: {

		isType(type) {

			if (!this.currentContent)
				return false;
			
			else {
				const split = this.currentContent.split(".");
				const contentType = split[0];
				
				return contentType === type;
			}			
		},

		show(){
			this.isShowing=true;
		},

		hide(){
			this.isShowing=false;
		},

		activate(){
			console.log("activating content")
			this.isActive = true;
		},

		desactivate() {
			console.log("desactivating content")
			this.isActive = false;
		},

		onWheel(e) {
			if(!this.isActive)
				e.preventDefault();

			let minDelta = 0;

			//scroll up
			if (e.deltaY <= -minDelta) {
				if (this.$el.scrollTop == 0) {
					this.$emit("show-scene")
					this.desactivate();
				}
				
			}	
		},

		onClickToggleScene(){
			this.$emit("show-scene")
		}
    },

	computed: {
		getTarget:function(){
			const split = this.currentContent.split(".");
			return split[split.length-1]
		}
	},

	watch: {
		currentContent:function(old){

			const split = this.currentContent.split(".");

			//scroll to id
			if (split.length > 1) {
				const targetID = split[1];
				console.log("scroll content to", targetID)

				if (this.$refs["main"]) {
					console.log("main here", this.$refs["main"].getElemPos(targetID))
				}
				else {
					console.log("no main")
				}
			}

			//or scroll to top
			else {
				this.$el.scrollTo(0,0);
			}
		}
	}
};



</script>


<style scoped lang="less">

	#content {
		margin:0;
		padding:0;
		position:fixed;
		overflow-x: hidden;
		overflow-y: scroll;
		bottom:0;
		top:0;
		left:0;
		right:0;
		padding-top:30px;

		transition: opacity 1s
	}

	.visible {
		opacity:1;
		pointer-events: auto;
	}

	.hidden {
		opacity:0;
		pointer-events: none;
	}

	#backTo3D {
		text-align:right;
	}

	
</style>