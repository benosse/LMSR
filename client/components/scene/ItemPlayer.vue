<template >
	<a-entity
		:position="position"
		:rotation="rotation"	
		:scale="scale"
		:animation="animation"
	>
		<a-entity 
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
		
		></a-entity>
	
		<a-plane v-if="isPlaying" height="3" width="3" position="-4 0 1" material="shader: flat" src="#asset_isPlaying" transparent="true">
		</a-plane>

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
        };
    },


    methods: {

		//onMouseUp in mixin
		//onMouseDown in mixin

		onMouseEnter(){
			// if(!this.isSelected) {
			// 	this.$refs.player.components.player.playPlayer();
			// 	this.isPlaying = true;
			// }		
		},

		onMouseLeave(){
			// if (!this.isSelected) {
			// 	this.$refs.player.components.player.stopPlayer();
			// 	this.isPlaying = false;
			// }						
		},

		onClick(e){
			//call zone handler (sent as props)
			// if (this.onItemClicked)
			// 	this.onItemClicked({type:this.type, id:this.target});

			this.isSelected = !this.isSelected;

		},

		onPlayEnded(){
			console.log("play over from vue")
			this.isPlaying = false;
			this.isSelected = false;
		}

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



