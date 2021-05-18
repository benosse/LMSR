<template>
	<!-- root entity -->
	<a-entity
	:position="position"
	:rotation="rotation"
	:animation="animation"
	:scale="scale"
	>
		<!--dummy TP entity for the cam-->
		<a-entity ref="tp" position="0 0 10"></a-entity>
		<a-entity ref="tpTarget" position="0 0 0"></a-entity>
		
		<!-- billboard planes -->
		<a-entity billboard >

			<a-entity light="type: point; intensity: 5; distance: 50; decay: 2"
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


		<a-gltf-model src="#asset_frag1" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag2" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag3" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag4" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag5" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag6" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag7" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag8" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>
		<a-gltf-model src="#asset_frag9" animation-mixer="timeScale:5;" scale="10 10 10"></a-gltf-model>

		<!-- derrière les nuages (zone active uniquement) -->
		<a-entity v-if="isActive">

			<a-entity rotation="0 0 0">
				<a-entity 
				gltf-part="src:#asset_frag_images; part:Frag_1_afp1" 
				@mouseup="onMouseUp"
				@mousedown="onMouseDown"
				class="raycastable"	
				position="0 0 -10"	
				>
				</a-entity>
			</a-entity>

			<a-entity rotation="0 50 0">
				<a-entity 
				gltf-part="src:#asset_frag_images; part:Frag_2_ak1" 
				@mouseup="onMouseUp"
				@mousedown="onMouseDown"
				class="raycastable"	
				position="0 0 -10"		
				>
				</a-entity>
			</a-entity>

			<a-entity rotation="0 80 0">
				<a-entity 
				gltf-part="src:#asset_frag_images; part:Frag_3_etudiant1" 
				@mouseup="onMouseUp"
				@mousedown="onMouseDown"
				class="raycastable"	
				position="0 0 -10"	
				animation="property:rotation; from:0 0 0; to:0 360 0; loop:true; dur:10000; ease:linear;"	
				>
				</a-entity>
			</a-entity>

			<a-entity rotation="0 120 0">
				<a-entity 
				gltf-part="src:#asset_frag_images; part:Frag_4_ak2" 
				@mouseup="onMouseUp"
				@mousedown="onMouseDown"
				class="raycastable"	
				position="0 0 -10"		
				>
				</a-entity>
			</a-entity>

			

			<ItemEtat
			position= "0 0 0"
			target="etat1"
			/>

			<ItemEtat
			position= "0 3 0"
			target="etat2"
			/>

			<ItemEtat
			position= "0 6 0"
			target="etat3"
			/>

			<ItemEtat
			position= "0 9 0"
			target="etat4"
			/>

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