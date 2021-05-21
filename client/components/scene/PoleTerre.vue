<template>
	<!-- root entity -->
	<a-entity
	:position="position"
	:rotation="rotation"
	:animation="animation"
	:scale="scale"
	>
		
		<a-box
			visible="false"
			position="1 0.15 0"
			stream= "audioID:jardin1; listener:#cam; canal:0; manager:#manager" 
			controls ="volume: 2.5; refDistance:10; distModel:exponential; rolloffFac:1.5; 
			cone:true; coneInAngle: 45; coneOutAngle: 180; coneOutLevel: 0; 
			posHelper:false; posColorIn:#adfc03 ; posColorOut:#f7a6a6 " 
			scale = "-80 -80 -80"
			rotation="0 90 0"
			>
		</a-box>

		<a-box
			visible="false"
			position="-1 0.15 0"
			stream= "audioID:jardin1; listener:#cam; canal:1; manager:#manager" 
			controls ="volume: 2.5; refDistance:10; distModel:exponential; rolloffFac:1.5; 
			cone:true; coneInAngle: 45; coneOutAngle: 180; coneOutLevel: 0; 
			posHelper:false; posColorIn:#3294a8 ; posColorOut:#013945 " 
			scale = "-80 -80 -80"
			rotation="0 -90 0"
			>
		</a-box>

		<a-box
			visible="false"
			position="0 0.15 1"
			stream= "audioID:jardin1; listener:#cam; canal:2; manager:#manager" 
			controls ="volume: 2.5; refDistance:10; distModel:exponential; rolloffFac:1.5; 
			cone:true; coneInAngle: 45; coneOutAngle: 180; coneOutLevel: 0; 
			posHelper:false; posColorIn:#3294a8 ; posColorOut:#013945 " 
			scale = "-80 -80 -80"
			rotation="0 0 0"
			>
		</a-box>

		<a-box
			visible="false"
			position="0 0.15 -1"
			stream= "audioID:jardin1; listener:#cam; canal:3; manager:#manager" 
			controls ="volume: 2.5; refDistance:10; distModel:exponential; rolloffFac:1.5; 
			cone:true; coneInAngle: 45; coneOutAngle: 180; coneOutLevel: 0; 
			posHelper:false; posColorIn:#bb73ff ; posColorOut:#4b0091 " 
			scale = "-80 -80 -80"
			rotation="0 180 0"
			>
		</a-box>



		<a-box
			visible="false"
			position="-0.5 -0.1 -0.25"
			scale = "-80 -80 -80"
			stream= "audioID:jardin2; listener:#cam; canal:0; manager:#manager" 
			controls ="volume: 2.5; refDistance:50; distModel:inverse; rolloffFac:1.5; 
			cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
			posHelper:false; posColorIn:#bb73ff ; posColorOut:#4b0091 " 
			rotation =" -90 0 0"
			
			>
		</a-box>

		<a-box
			visible="false"
			position="0.5 -0.1 0"
			scale = "-80 -80 -80"
			stream= "audioID:jardin2; listener:#cam; canal:1; manager:#manager" 
			controls ="volume: 2.5; refDistance:50; distModel:inverse; rolloffFac:1.5; 
			cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
			posHelper:false; posColorIn:#bb73ff ; posColorOut:#4b0091 " 
			rotation =" -90 0 0"
		
			>
		</a-box>

		<a-box
			visible="false"
			position="0.5 -0.1 0.75"
			scale = "-80 -80 -80"
			stream= "audioID:jardin2; listener:#cam; canal:2; manager:#manager" 
			controls ="volume: 2.5; refDistance:50; distModel:inverse; rolloffFac:1.5; 
			cone:true; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
			posHelper:false; posColorIn:#bb73ff ; posColorOut:#4b0091 " 
			rotation =" -90 0 0"
		
			>
		</a-box>




		

		
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