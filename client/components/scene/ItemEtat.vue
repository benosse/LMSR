<template >

	<a-gltf-model
			:src="src"
			@mouseup="onMouseUp"
			@mousedown="onMouseDown"
			:animation-mixer="animationMixerProps"
		>
	</a-gltf-model>


</template>


<script>

import {ClickHandler} from "../mixins/ClickHandler.js"

export default {
    name: "ItemPlayer",

	props: {
		src: String, 
		target: String,
		speed: String,
	},

	mixins: [ClickHandler],

    data() {
        return {
        };
    },


    methods: {

		//onMouseUp in mixin
		//onMouseDown in mixin
		onClick(e){
			this.$root.goTo("etat", this.target);
		},

    },

	computed: {
		animationMixerProps:function(){
			return "timeScale:" + this.speed;
		}
	}
};

</script>



