<template >
	<a-entity
		:position="position"
		:rotation="rotation"	
		:scale="scale"
		:animation="animation"
	>
		<a-entity 
		ref="player"
		:gltf-part="gltfPartProps" 
		@mouseup="onMouseUp"
		@mousedown="onMouseDown"
		@mouseenter="onMouseEnter"
		@mouseleave="onMouseLeave"
		@play-ended="onPlayEnded"
	
		:player="player"

		:controls="controls"
		animation="property: position; from:0 30 0 ; to: 0 0 0; loop: false; dur: 1000; easing:easeInOutElastic;"
		:class="{raycastable:raycastable}"		
		>
			<!-- TODO -->
			<!-- <a-plane v-if="isPlaying" height="3" width="3" position="-4 0 1" material="shader: flat" src="#asset_isPlaying" transparent="true">
			</a-plane>	 -->
		</a-entity>
	
	</a-entity>
</template>




<script>

import {ClickHandler} from "../mixins/ClickHandler.js"

export default {
    name: "ItemPlayer",

	props: {
		src: String, 
		part: String,

		position: String,
		rotation: String,
		animation: String,
		scale: String,

		player:String,
		controls:String,

		onItemClicked:Function,	
		raycastable : Boolean,	
	},

	mixins: [ClickHandler],

    data() {
        return {
			type:"projets",
			isPlaying:false,
			isSelected:false,
			center:"0 0 0",
        };
    },


    methods: {

		//onMouseUp in mixin
		//onMouseDown in mixin

		//todo : si on est sur une autre fenêtre, on garde la pos de la souris et ça lance l'audio!!
		onMouseEnter(){
			if(!this.isSelected) {
				this.$refs.player.components.player.play_T();
				this.isPlaying = true;
			}		
		},

		onMouseLeave(){
			if (!this.isSelected) {
				this.$refs.player.components.player.stopPlayer();
				this.isPlaying = false;
			}						
		},

		//TODO: jouer un seul son
		onClick(e){
			this.isSelected = !this.isSelected;
			this.$refs.player.components.player.play_C();

			//save currently playing cartel in root
			this.$root.setCurrentPlayer(this);

			// if (this.$refs["player"].object3D.children > 0) {
			// 	console.log(this.$refs["player"].object3D.children[0].position);
			// 	this.center = this.$refs["player"].object3D.children[0].position;
			// }
			
		},

		onPlayEnded(){
			console.log("play over from vue")
			this.isPlaying = false;
			this.isSelected = false;
		},
		
		//called from app
		stopPlayer(){
			this.$refs.player.components.player.stopPlayer();
			this.isPlaying = false;	
		},

    },

	computed: {
		color:function(){
			if (this.isPlaying)
				return "blue"
			else
				return "green"
		},

		gltfPartProps:function(){
			const res = "src:" + this.src + "; part:" + this.part
			return res;
		}
	}
};

</script>



