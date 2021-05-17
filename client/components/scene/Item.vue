<template >
	<a-gltf-model 
	
	@mouseup="onMouseUp"
	@mousedown="onMouseDown"
	:src="src"
	:position="position"
	:rotation="rotation"
	:scale="scale"
	:animation="animation"
	class="raycastable"
	:gltf-lambert-material="{color:color}"
	>
	</a-gltf-model>
</template>




<script>

import {ClickHandler} from "../mixins/ClickHandler.js"

export default {
    name: "Item",

	props: {
		target: String,
		position: String,
		rotation: String,
		animation: String,
		scale: String,
		src: String,
		color: String,

		onItemClicked:Function,
	},

	mixins: [ClickHandler],

    data() {
        return {
			type:"projets",
        };
    },


    methods: {

		//onMouseUp in mixin
		//onMouseDown in mixin

		onClick(e){
			console.log("click on item", this.target)
			//call zone handler
			if (this.onItemClicked)
				this.onItemClicked(this.target);
		},

    },
};

</script>



