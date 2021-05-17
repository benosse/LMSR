<template>
	<!-- root entity -->
	<a-entity
	:position="position"
	:rotation="rotation"
	:animation="animation"
	:scale="scale"
	>
		<!--dummy TP entity for the cam-->
		<a-entity ref="tp" :position="camPos"></a-entity>
		<a-entity ref="tpTarget" :position="camTarget"></a-entity>

		<!-- model -->
		<a-gltf-model 
			@mouseenter="onMouseEnter" 
			@mouseleave="onMouseLeave" 
			@mouseup="onMouseUp" 
			@mousedown="onMouseDown"
			:src="src"
			:class="{raycastable:!isActive}">
		</a-gltf-model>

		<!--Slot for custom items -->
		<slot name="items" :onItemClicked="onItemClicked">		
		</slot>


	</a-entity>			
</template>


<script>
	//mixins
	import { ClickHandler } from '../mixins/ClickHandler.js';
	import { Zone } from '../mixins/Zone.js';

	//components
	import ItemPlayer from './ItemPlayer.vue';

	export default {
		name: "Groupe",

		mixins:[Zone, ClickHandler],
		components: {
			ItemPlayer,
		},

		props: {
			src: String,
			camPos: String,
			camTarget: String,
		}
	};

</script>


<style scoped lang="less">
</style>