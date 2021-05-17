<template>
	<!-- root entity -->
	<a-entity
	:position="position"
	:rotation="rotation"
	:animation="animation"
	:scale="scale"

	>
		<!--dummy TP entity for the cam-->
		<a-entity ref="tp" position="0 0 40"></a-entity>
		<a-entity ref="tpTarget" position="0 0 0"></a-entity>

		<!-- model -->
		<a-gltf-model 
			@mouseenter="onMouseEnter" 
			@mouseleave="onMouseLeave" 
			@mouseup="onMouseUp" 
			@mousedown="onMouseDown"
			:src="src"
			:class="{raycastable:!isActive}"			
			>
		</a-gltf-model>

		<template>

			<!-- player="audioID:BM22; listener:#cam;" 
				controls ="volume:1; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
			 -->

			<ItemPlayer v-for="index in 25" :key="index"
				:raycastable="isActive"
				:src="'#asset_cartels_litterature; part:'+index"
			/>		
		</template>

	</a-entity>			
</template>


<script>
	//mixins
	import { ClickHandler } from '../mixins/ClickHandler.js';
	import { Zone } from '../mixins/Zone.js';

	//components
	import ItemPlayer from './ItemPlayer.vue';

	export default {
		name: "Litterature",

		mixins:[Zone, ClickHandler],
		components: {
			ItemPlayer,
		},

		props: {
			src: String,
		}
	};

</script>


<style scoped lang="less">
</style>