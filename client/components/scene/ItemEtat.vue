<template >
	<a-entity
		:position="position"
		:rotation="rotation"	
		:scale="scale"
		:animation="animation"
	>
		<!-- <a-entity 
		:gltf-part="gltfPartProps" 
		@mouseup="onMouseUp"
		@mousedown="onMouseDown"
		:class="{raycastable:raycastable}"		
		></a-entity> -->
		<a-box color="red"
		@mouseup="onMouseUp"
		@mousedown="onMouseDown"
		target="test"
		class="raycastable">
		</a-box>

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

		target: String,
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
			this.$root.onClickItemEtat(this.target)
		},

    },

	computed: {
		gltfPartProps:function(){
			return "src:" + this.src;
		}
	}
};

</script>



