<template>
	<!-- root entity -->
	<a-entity
	:position="position"
	:rotation="rotation"
	:animation="animation"
	:scale="scale"
	>
		<!--dummy TP entity for the cam-->
		<a-entity ref="tp" position="0 0.1 -1"></a-entity>
		<a-entity ref="tpTarget" position="0 0.2 0"></a-entity>

		<a-gltf-model 
			@mouseenter="onMouseEnter" 
			@mouseleave="onMouseLeave" 
			@mouseup="onMouseUp" 
			@mousedown="onMouseDown"
			:src="src"
			:class="{raycastable:!isActive}">
		</a-gltf-model>

	</a-entity>			
</template>


<script>
	//mixins
	import { ClickHandler } from '../mixins/ClickHandler.js';
	import { Zone } from '../mixins/Zone.js';

	export default {
		name: "PoleTerre",

		mixins:[Zone, ClickHandler],

		props: {
			src: String,
		}
	};

</script>


<style scoped lang="less">
</style>