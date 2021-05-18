<template >
	<a-plane 
		@mouseup="onMouseUp"
		@mousedown="onMouseDown"
		@mouseenter="onMouseEnter"
		@mouseleave="onMouseLeave"

		:position="position"
		:rotation="rotation"
		:animation="animation"
		:scale="scale"
		:src="src"
		material="side:double; transparent:true;"	
	>
	</a-plane>
</template>




<script>

import {ClickHandler} from "../mixins/ClickHandler.js"

export default {
    name: "Cloud",

	props: {
		position: String,
		rotation: String,
		animation: String,
		src: String,
		scale: String,
		parentOnClick:Function,
		parentOnMouseEnter: Function,
		parentOnMouseLeave: Function,
	},

	mixins: [ClickHandler],

    methods: {

		//onMouseUp in mixin
		//onMouseDown in mixin
		onClick(e){
			console.log("click on cloud")
			//call parent handler
			if (this.parentOnClick)
				this.parentOnClick();
		},

		onMouseEnter(e) {		
			if(this.parentOnMouseEnter)
				this.parentOnMouseEnter();
		},

		onMouseLeave(e) {
			if(this.parentOnMouseLeave)
				this.parentOnMouseLeave();
		}

    },
};

</script>



