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
		<a-entity
			@mouseenter="onMouseEnter" 
			@mouseleave="onMouseLeave" 
			@mouseup="onMouseUp" 
			@mousedown="onMouseDown"
			:gltf-part="gltfpart"
			:class="{raycastable:!isActive}">
		</a-entity>


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
			gltfpart: String,
			camPos: String,
			camTarget: String,
		}
	};

</script>


<style scoped lang="less">
</style>