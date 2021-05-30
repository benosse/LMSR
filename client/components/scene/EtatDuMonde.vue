<template>
	<!-- root entity -->
	<a-entity
	:position="position"
	:rotation="rotation"
	:animation="animation"
	:scale="scale"
	>

		<!-- orageL -->
		<a-entity animation="property:rotation; from:0 0 0; to:0 360 0; dur:10000; loop:true; easing:linear;">
			<a-box
				visible="false"
				position="35 0 0"
				stream= "audioID:EDM1; listener:#cam; canal:0;" 
				controls ="volume:0.5; refDistance:30; distModel:exponential; rolloffFac:4; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				>
			</a-box>
		</a-entity>

		<!-- pluie sol -->
		<a-entity animation="property:rotation; from:0 0 0; to:0 -360 0; dur:10000; loop:true; easing:linear;">
			<a-box
				visible="false"
				position="35 0 0"
				stream= "audioID:EDM1; listener:#cam; canal:1;" 
				controls ="volume:0.15; refDistance:30; distModel:exponential; rolloffFac:4; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				>
			</a-box>
		</a-entity>

		<!-- pluie vitre -->
		<a-entity animation="property:rotation; from:0 0 0; to:360 0 0; dur:10000; loop:true; easing:linear;">
			<a-box
				visible="false"
				position="0 35 0"
				stream= "audioID:EDM1; listener:#cam; canal:2;" 
				controls ="volume:0.75; refDistance:30; distModel:exponential; rolloffFac:4; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				>
			</a-box>
		</a-entity>

		<!-- feu + Elec -->
		<a-entity animation="property:rotation; from:0 0 0; to:-360 0 0; dur:10000; loop:true; easing:linear;">
			<a-box
				visible="false"
				position="0 35 0"
				stream= "audioID:EDM1; listener:#cam; canal:3;" 
				controls ="volume: 0.35; refDistance:30; distModel:exponential; rolloffFac:4; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				>
			</a-box>
		</a-entity>

		<!-- Vent -->
		<a-entity animation="property:rotation; from:0 0 0; to:-360 0 0; dur:10000; loop:true; easing:linear;">
			<a-box
				visible="false"
				position="0 35 0"
				stream= "audioID:EDM1; listener:#cam; canal:4;" 
				controls ="volume: 0.75; refDistance:30; distModel:exponential; rolloffFac:4; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				>
			</a-box>
		</a-entity>




		<!--dummy TP entity for the cam-->
		<a-entity ref="tp" position="0 0 10"></a-entity>
		<a-entity ref="tpTarget" position="0 0 0"></a-entity>
		
		<!-- billboard planes -->
		<a-entity billboard >

			<a-entity light="type: point; intensity: 1; distance: 10; decay: 2"
			animation="property: position; to: 0 0 80; dur: 1000; easing: linear; dir:alternate; loop: true"
			position="0 0 0">
			</a-entity>

			<Cloud
				position="0 0 20"
				rotation="0 0 0"
				animation="property: rotation; to: 0 0 -360; dur: 100000; easing: linear;  loop: true"
				src="#asset_nuage1"
				scale="200 200 200"
				:parentOnClick="onClick"
				:parentOnMouseEnter="onMouseEnter"
				:parentOnMouseLeave="onMouseLeave"
				:class="{raycastable:!isActive}"
			/>
			<Cloud
				position="0 0 40"
				rotation="0 0 0"
				animation="property: rotation; to: 0 0 360; dur: 80000; easing: linear;  loop: true"
				src="#asset_nuage1"
				scale="150 150 150"
				:parentOnClick="onClick"
				:parentOnMouseEnter="onMouseEnter"
				:parentOnMouseLeave="onMouseLeave"
				:class="{raycastable:!isActive}"
			/>

			<Cloud
				position="0 0 60"
				rotation="0 0 0"
				animation="property: rotation; to: 0 0 360; dur: 60000; easing: linear;  loop: true"
				src="#asset_nuage1"
				scale="100 100 100"
				:parentOnClick="onClick"
				:parentOnMouseEnter="onMouseEnter"
				:parentOnMouseLeave="onMouseLeave"
				:class="{raycastable:!isActive}"
			/>

			<Cloud
				position="0 0 80"
				rotation="0 0 0"
				animation="property: rotation; to: 0 0 -360; dur: 40000; easing: linear;  loop: true"
				src="#asset_nuage1"
				scale="60 60 60"
				:parentOnClick="onClick"
				:parentOnMouseEnter="onMouseEnter"
				:parentOnMouseLeave="onMouseLeave"
				:class="{raycastable:!isActive}"
			/>
		</a-entity>

		<!-- orageL -->
		<a-entity animation="property:rotation; from:0 0 0; to:0 360 0; dur:10000; loop:true; easing:linear;">
			<a-box
				visible="false"
				position="35 0 0"
				stream= "audioID:EDM1; listener:#cam; canal:0; manager:#manager" 
				controls ="volume:0.5; refDistance:30; distModel:exponential; rolloffFac:4; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				>
			</a-box>
		</a-entity>

		<!-- pluie sol -->
		<a-entity animation="property:rotation; from:0 0 0; to:0 -360 0; dur:10000; loop:true; easing:linear;">
			<a-box
				visible="false"
				position="35 0 0"
				stream= "audioID:EDM1; listener:#cam; canal:1; manager:#manager" 
				controls ="volume:0.15; refDistance:30; distModel:exponential; rolloffFac:4; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				>
			</a-box>
		</a-entity>

		<!-- pluie vitre -->
		<a-entity animation="property:rotation; from:0 0 0; to:360 0 0; dur:10000; loop:true; easing:linear;">
			<a-box
				visible="false"
				position="0 35 0"
				stream= "audioID:EDM1; listener:#cam; canal:2; manager:#manager" 
				controls ="volume:0.75; refDistance:30; distModel:exponential; rolloffFac:4; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				>
			</a-box>
		</a-entity>

		<!-- feu + Elec -->
		<a-entity animation="property:rotation; from:0 0 0; to:-360 0 0; dur:10000; loop:true; easing:linear;">
			<a-box
				visible="false"
				position="0 35 0"
				stream= "audioID:EDM1; listener:#cam; canal:3; manager:#manager" 
				controls ="volume: 0.35; refDistance:30; distModel:exponential; rolloffFac:4; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				>
			</a-box>
		</a-entity>

		<!-- Vent -->
		<a-entity animation="property:rotation; from:0 0 0; to:-360 0 0; dur:10000; loop:true; easing:linear;">
			<a-box
				visible="false"
				position="0 35 0"
				stream= "audioID:EDM1; listener:#cam; canal:4; manager:#manager" 
				controls ="volume: 0.75; refDistance:30; distModel:exponential; rolloffFac:4; 
				cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
				posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
				>
			</a-box>
		</a-entity>
		

		<a-gltf-model src="#asset_frag1" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag2" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag3" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag4" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag5" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag6" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag7" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag8" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag9" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>

		

		<ItemEtat
		src="#asset_frag_etudiant3"
		speed="0.2"
		target="etat4"
		:class="{raycastable:isActive}"
		>
		</ItemEtat>
		<ItemEtat
		src="#asset_frag_etudiant2"
		speed="0.4"
		target="etat4"
		:class="{raycastable:isActive}"
		/>
		<ItemEtat
		src="#asset_frag_etudiant1"
		speed="0.3"
		target="etat4"
		:class="{raycastable:isActive}"
		/>
		<ItemEtat
		src="#asset_frag_ak1"
		speed="0.6"
		target="etat3"
		:class="{raycastable:isActive}"
		/>
		<ItemEtat
		src="#asset_frag_ak2"
		speed="0.2"
		target="etat3"
		:class="{raycastable:isActive}"
		/>
		<ItemEtat
		src="#asset_frag_afp1"
		speed="0.3"
		target="etat1"
		:class="{raycastable:isActive}"
		/>
		<ItemEtat
		src="#asset_frag_afp2"
		speed="0.6"
		target="etat1"
		:class="{raycastable:isActive}"
		/>

			
	<!-- derrière les nuages (zone active uniquement) -->
		<a-entity v-if="isActive">

			<a-entity 
				billboard
				position="0 0 -10"
				rotation="0 0 0"
			>
				<Cloud			
				animation="property: rotation; to: 0 0 360; dur: 40000; easing: linear;  loop: true"
				src="#asset_nuage2"
				scale="20 20 20"	
			/>
			</a-entity>	
			<a-entity 
				billboard
				position="0 0 10"
				rotation="0 0 0"
			>
				<Cloud			
				animation="property: rotation; to: 0 0 360; dur: 40000; easing: linear;  loop: true"
				src="#asset_nuage2"
				scale="20 20 20"	
			/>
			</a-entity>	
			<a-entity 
				billboard
				position="10 0 0"
				rotation="0 0 0"
			>
				<Cloud			
				animation="property: rotation; to: 0 0 360; dur: 40000; easing: linear;  loop: true"
				src="#asset_nuage2"
				scale="20 20 20"	
			/>
			</a-entity>	
			<a-entity 
				billboard
				position="-10 0 0"
				rotation="0 0 0"
			>
				<Cloud			
				animation="property: rotation; to: 0 0 360; dur: 40000; easing: linear;  loop: true"
				src="#asset_nuage2"
				scale="20 20 20"	
			/>
			</a-entity>	

			<!-- background -->
			<a-entity 
				billboard
				position="0 0 0"
				rotation="0 0 0"
			>
				<Cloud	
				position="0 0 -100"		
				animation="property: rotation; to: 0 0 360; dur: 100000; easing: linear;  loop: true"
				src="#asset_nuage1"
				scale="200 200 200"	
			/>
			</a-entity>			

		</a-entity>

	</a-entity>

				

</template>


<script>
	//mixins
	import { ClickHandler } from '../mixins/ClickHandler.js';
	import { Zone } from '../mixins/Zone.js';
	

	//components
	import ItemEtat from './ItemEtat.vue';
	import Cloud from "./Cloud.vue"

	export default {
		name: "EtatDuMonde",

		mixins:[Zone, ClickHandler],
		components:{
			Cloud,
			ItemEtat,		
			},

	};

</script>


<style scoped lang="less">
</style>