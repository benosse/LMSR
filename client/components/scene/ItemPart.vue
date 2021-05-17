<template >
	<a-entity 
		:gltf-part="gltfPartProps" 
		@mouseup="onMouseUp"
		@mousedown="onMouseDown"
		class="raycastable"		
	>
	</a-entity>
	

</template>




<script>

import {ClickHandler} from "../mixins/ClickHandler.js"

export default {
    name: "ItemPart",

	props: {
		src: String, 
		part: String,

		position: String,
		rotation: String,
		animation: String,
		scale: String,

		onItemClicked:Function,	
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
			console.log("click on item", this.target)
			//call zone handler
			if (this.onItemClicked)
				this.onItemClicked(this.target);
		},

    },

	computed: {
		gltfPartProps:function(){
			const res = "src:" + this.src + "; part:" + this.part
			console.log(res)
			return res;
		}
	}
};

</script>



