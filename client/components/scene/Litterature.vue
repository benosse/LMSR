<template>
	<!-- root entity -->
	<a-entity
	:position="position"
	:rotation="rotation"
	:animation="animation"
	:scale="scale"
	>
		<!-- flux dynamiques -->
		<a-entity v-if="isActive">
		</a-entity>

		<!--dummy TP entity for the cam-->
		<a-entity ref="tp" position="1.5 0 0"></a-entity>
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

			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'1'"			
				player="audioID:AT01; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>	
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'3'"			
				player="audioID:AT04; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>	

			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'5'"			
				player="audioID:BL07; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>	
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'6'"			
				player="audioID:BL05; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>	
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'7'"			
				player="audioID:BL06; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'8'"			
				player="audioID:BM04; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'10'"			
				player="audioID:BM07; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'12'"			
				player="audioID:BM01; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'13'"			
				player="audioID:BM10; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'14'"			
				player="audioID:BM10; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'18'"			
				player="audioID:NM01; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>			
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'19'"			
				player="audioID:SV03; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'21'"			
				player="audioID:SV02; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'22'"			
				player="audioID:VD01; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'23'"			
				player="audioID:VD08; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'24'"			
				player="audioID:VD11; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'26'"			
				player="audioID:VD09; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
			/>
			<ItemPlayer 
				:raycastable="isActive"
				src="#asset_cartels_litterature"
				:part="'27'"			
				player="audioID:VD04; listener:#cam;" 
				controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
				cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
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