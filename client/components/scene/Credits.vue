<template>
	<!-- root entity -->
	<a-entity
	:position="position"
	:rotation="rotation"
	:animation="animation"
	:scale="scale"
	>
		<!-- <a-gltf-model 
			@mouseenter="onMouseEnter" 
			@mouseleave="onMouseLeave" 
			@mouseup="onMouseUp" 
			@mousedown="onMouseDown"
			:src="src"
			:class="{raycastable:!isActive}">
		</a-gltf-model> -->

		<a-entity ref="tp" position="0 0 10"></a-entity>
		<a-entity ref="tpTarget" position="0 0 0"></a-entity>

		<a-box color="red" scale="10 10 10"
			@mouseenter="onMouseEnter" 
			@mouseleave="onMouseLeave" 
			@mouseup="onMouseUp" 
			@mousedown="onMouseDown"
			:class="{raycastable:!isActive}"
			>
		</a-box>

	</a-entity>			
</template>


<script>
	//mixins
	import { ClickHandler } from '../mixins/ClickHandler.js';
	import { Zone } from '../mixins/Zone.js';

	export default {
		name: "Credits",

		mixins:[Zone, ClickHandler],

		props: {
			src: String,
		}
	};

</script>


<style scoped lang="less">
</style>