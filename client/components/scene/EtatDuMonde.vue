<template>
	<!-- root entity -->
	<a-entity
	:position="position"
	:rotation="rotation"
	:animation="animation"
	:scale="scale"
	>
		<a-entity>
			<!-- orageL -->
			<a-entity animation="property:rotation; from:0 0 0; to:0 360 0; dur:10000; loop:true; easing:linear;">
				<a-box
					visible="false"
					position="2.5 0 0"
					stream= "audioID:EDM1; listener:#cam; canal:0;" 
					controls ="volume:1; refDistance:5; distModel:exponential; rolloffFac:2.5; 
					cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
					>
				</a-box>
			</a-entity>

			<!-- pluie sol -->
			<a-entity animation="property:rotation; from:0 0 0; to:0 -360 0; dur:10000; loop:true; easing:linear;">
				<a-box
					visible="false"
					position="3 0 0"
					stream= "audioID:EDM1; listener:#cam; canal:1;" 
					controls ="volume:1; refDistance:5; distModel:exponential; rolloffFac:2.5; 
					cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
					>
				</a-box>
			</a-entity>

			<!-- pluie vitre -->
			<a-entity animation="property:rotation; from:0 0 0; to:360 0 0; dur:10000; loop:true; easing:linear;">
				<a-box
					visible="false"
					position="0 2.5 0"
					stream= "audioID:EDM1; listener:#cam; canal:2;" 
					controls ="volume:1; refDistance:5; distModel:exponential; rolloffFac:2.5; 
					cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
					>
				</a-box>
			</a-entity>

			<!-- feu + Elec -->
			<a-entity animation="property:rotation; from:0 0 0; to:-360 0 0; dur:10000; loop:true; easing:linear;">
				<a-box
					visible="false"
					position="0 3 0"
					stream= "audioID:EDM1; listener:#cam; canal:3;" 
					controls ="volume:1; refDistance:5; distModel:exponential; rolloffFac:2.5; 
					cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
					>
				</a-box>
			</a-entity>

			<!-- Vent -->
			<a-entity animation="property:rotation; from:0 0 0; to:-360 0 0; dur:10000; loop:true; easing:linear;">
				<a-box
					visible="false"
					position="0 2.5 0"
					stream= "audioID:EDM1; listener:#cam; canal:4;" 
					controls ="volume:1; refDistance:5; distModel:exponential; rolloffFac:2.5; 
					cone:false; coneInAngle: 25; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 
					>
				</a-box>
			</a-entity>
		</a-entity>




		<!--dummy TP entity for the cam-->
		<a-entity ref="tp" position="0 0 4"></a-entity>
		<a-entity ref="tpTarget" position="0 0 0"></a-entity>
		
		<!-- billboard planes -->
		<a-entity billboard >

			<a-entity light="type: point; intensity: 1; distance: 10; decay: 2"
			animation="property: position; to: 0 0 80; dur: 1000; easing: linear; dir:alternate; loop: true"
			position="0 0 0">
			</a-entity>

			<Cloud
				position="0 0 2"
				rotation="0 0 0"
				animation="property: rotation; to: 0 0 -360; dur: 100000; easing: linear;  loop: true"
				src="#asset_nuage1"
				scale="20 20 20"
				:parentOnClick="onClick"
				:parentOnMouseEnter="onMouseEnter"
				:parentOnMouseLeave="onMouseLeave"
				:class="{raycastable:!isActive}"
			/>
			<Cloud
				position="0 0 5"
				rotation="0 0 0"
				animation="property: rotation; to: 0 0 360; dur: 80000; easing: linear;  loop: true"
				src="#asset_nuage1"
				scale="15 15 15"
				:parentOnClick="onClick"
				:parentOnMouseEnter="onMouseEnter"
				:parentOnMouseLeave="onMouseLeave"
				:class="{raycastable:!isActive}"
			/>

			<Cloud
				position="0 0 8"
				rotation="0 0 0"
				animation="property: rotation; to: 0 0 360; dur: 60000; easing: linear;  loop: true"
				src="#asset_nuage1"
				scale="10 10 10"
				:parentOnClick="onClick"
				:parentOnMouseEnter="onMouseEnter"
				:parentOnMouseLeave="onMouseLeave"
				:class="{raycastable:!isActive}"
			/>

			<Cloud
				position="0 0 10"
				rotation="0 0 0"
				animation="property: rotation; to: 0 0 -360; dur: 40000; easing: linear;  loop: true"
				src="#asset_nuage1"
				scale="6 6 6"
				:parentOnClick="onClick"
				:parentOnMouseEnter="onMouseEnter"
				:parentOnMouseLeave="onMouseLeave"
				:class="{raycastable:!isActive}"
			/>
		</a-entity>

	

	
		<!-- fragments (particules)-->	
		<a-gltf-model src="#asset_frag1" animation-mixer="timeScale:5;" scale="3 3 3"></a-gltf-model>
		<a-gltf-model src="#asset_frag2" animation-mixer="timeScale:5;" scale="3 3 3"></a-gltf-model>
		<a-gltf-model src="#asset_frag3" animation-mixer="timeScale:5;" scale="3 3 3"></a-gltf-model>
		<a-gltf-model src="#asset_frag4" animation-mixer="timeScale:5;" scale="3 3 3"></a-gltf-model>
		<a-gltf-model src="#asset_frag5" animation-mixer="timeScale:5;" scale="3 3 3"></a-gltf-model>
		<a-gltf-model src="#asset_frag6" animation-mixer="timeScale:5;" scale="3 3 3"></a-gltf-model>
		<a-gltf-model src="#asset_frag7" animation-mixer="timeScale:5;" scale="3 3 3"></a-gltf-model>
		<a-gltf-model src="#asset_frag8" animation-mixer="timeScale:5;" scale="3 3 3"></a-gltf-model>
		<a-gltf-model src="#asset_frag9" animation-mixer="timeScale:5;" scale="3 3 3"></a-gltf-model>

		<!-- fragments cliquables -->
		<a-entity scale="0.1 0.1 0.1" position="0 0 0">
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
		</a-entity>
			
		<!-- derrière les nuages (zone active uniquement) -->
		<a-entity v-if="isActive">

			<a-entity 
				billboard
				position="0 0 -4"
				rotation="0 0 0"
			>
				<Cloud			
				animation="property: rotation; to: 0 0 360; dur: 40000; easing: linear;  loop: true"
				src="#asset_nuage2"
				scale="6 6 6"	
			/>
			</a-entity>	
			<a-entity 
				billboard
				position="0 0 4"
				rotation="0 0 0"
			>
				<Cloud			
				animation="property: rotation; to: 0 0 360; dur: 40000; easing: linear;  loop: true"
				src="#asset_nuage2"
				scale="6 6 6"	
			/>
			</a-entity>	
			<a-entity 
				billboard
				position="4 0 0"
				rotation="0 0 0"
			>
				<Cloud			
				animation="property: rotation; to: 0 0 360; dur: 40000; easing: linear;  loop: true"
				src="#asset_nuage2"
				scale="6 6 6"	
			/>
			</a-entity>	
			<a-entity 
				billboard
				position="-4 0 0"
				rotation="0 0 0"
			>
				<Cloud			
				animation="property: rotation; to: 0 0 360; dur: 40000; easing: linear;  loop: true"
				src="#asset_nuage2"
				scale="6 6 6"
			/>
			</a-entity>	

			<!-- background -->
			<a-entity 
				billboard
				position="0 0 0"
				rotation="0 0 0"
			>
				<Cloud	
				position="0 0 -10"		
				animation="property: rotation; to: 0 0 360; dur: 100000; easing: linear;  loop: true"
				src="#asset_nuage1"
				scale="15 15 15"	
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