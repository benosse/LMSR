<template>
	<!-- root entity -->
	<a-entity
	:position="position"
	:rotation="rotation"
	:animation="animation"
	:scale="scale"
	>

		<!--dummy TP entity for the cam-->
		<a-entity ref="tp" position="0 0 250"></a-entity>
		<a-entity ref="tpTarget" position="0 0 0"></a-entity>


		<!-- centre de la zone (Noemie Penne??)-->
		<a-gltf-model 
			@mouseenter="onMouseEnter" 
			@mouseleave="onMouseLeave" 
			@mouseup="onMouseUp" 
			@mousedown="onMouseDown"
			:src="src"
			:class="{raycastable:!isActive}">
		</a-gltf-model>


		<!-- centre de la zone -->
		<a-entity position="0 0 0"> 

			<!-- ZONE ENQUETE -->
			<Groupe
			ref="enquete"
			target="projets.enquete" 
			
			position="0 80 50" 
			rotation="0 0 0"
			animation="property: rotation; from:0 -360 360; to: 0 0 0; loop: true; dur: 100000; easing:linear;"
			gltfpart="src:#asset_enquete; part:Enquete"

			camPos="0 0 80"
			camTarget="0 0 0"

			@zone-activated="onGroupeActivated"
			@zone-desactivated="onGroupeDesactivated"
			@mouse-enter="onMouseEnterGroupe"
			@mouse-leave="onMouseLeaveGroupe"
			@mouse-click="onGroupeClicked"
			@click-item="onItemClicked"			
			>
				
				<template v-slot:items="slotProps" >
					
				<!-- titre -->
					<ItemPart src="#asset_enquete" part="Titre_enquete" :onItemClicked="slotProps.onItemClicked"/>

				<!-- cartels -->
					<ItemPart src="#asset_enquete" part="cartel_guy_aidelberg" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_enquete" part="cartel_ines_lemenec" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_enquete" part="felix hol" :onItemClicked="slotProps.onItemClicked"/>

				<!-- 3D -->
					<ItemPart src="#asset_enquete" part="3D_Ines" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_enquete" part="3D_Felix" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_enquete" part="3D_Guy" :onItemClicked="slotProps.onItemClicked"/>

				<!-- Players -->
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_enquete"
						part="Cartel_Sonore_Ines_BM"						
					/> 
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_enquete"
						part="Cartel_Sonore_Felix_BL"	
					/> 
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_enquete"
						part="Cartel_Sonore_Guy_NM"						
					/> 
				</template>

				<template v-slot:activeItems>
				</template>
			</Groupe>


			<!-- ZONE ENQUETE -->
			<Groupe
			ref="territoire"
			target="projets.territoire" 
	
			position="0 0 60" 
			rotation="0 0 0"
			animation="property: rotation; from:0 -360 360; to: 0 0 0; loop: true; dur: 100000; easing:linear;"
			gltfpart="src:#asset_territoire; part:Territoire"

			camPos="0 0 80"
			camTarget="0 0 0"

			@zone-activated="onGroupeActivated"
			@zone-desactivated="onGroupeDesactivated"
			@mouse-enter="onMouseEnterGroupe"
			@mouse-leave="onMouseLeaveGroupe"
			@mouse-click="onGroupeClicked"
			@click-item="onItemClicked"			
			>
				
				<template v-slot:items="slotProps" >
					
				<!-- titre -->
					<ItemPart src="#asset_territoire" part="Titre_Territoire" :onItemClicked="slotProps.onItemClicked"/>

				<!-- cartels -->
					<ItemPart src="#asset_territoire" part="Carel_clara_monteil" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_territoire" part="Cartel_mathilde_reynaud" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_territoire" part="Cartel_lucas_maccabeo" :onItemClicked="slotProps.onItemClicked"/>

				<!-- 3D -->
					<ItemPart src="#asset_territoire" part="3D_Clara" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_territoire" part="3D_Lucas" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_territoire" part="3D_Mathilde" :onItemClicked="slotProps.onItemClicked"/>

				<!-- Players -->
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_territoire"
						part="Cartel_Sonore_Clara+Mathilde_VD"						
					/> 
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_territoire"
						part="Cartel_Sonore_Lucas_BL"	
					/> 

				</template>

				<template v-slot:activeItems>
				</template>
			</Groupe>



			<!-- ZONE ENQUETE -->
			<Groupe
			ref="sensibilite"
			target="projets.sensibilite" 
	
			position="-60 0 0" 
			rotation="0 0 0"
			animation="property: rotation; from:0 -360 360; to: 0 0 0; loop: true; dur: 100000; easing:linear;"
			gltfpart="src:#asset_sensibilite; part:Sensibilite"

			camPos="0 0 80"
			camTarget="0 0 0"

			@zone-activated="onGroupeActivated"
			@zone-desactivated="onGroupeDesactivated"
			@mouse-enter="onMouseEnterGroupe"
			@mouse-leave="onMouseLeaveGroupe"
			@mouse-click="onGroupeClicked"
			@click-item="onItemClicked"			
			>
				
				<template v-slot:items="slotProps" >
					
				<!-- titre -->
					<ItemPart src="#asset_sensibilite" part="Titre_sensibilite" :onItemClicked="slotProps.onItemClicked"/>

				<!-- cartels -->
					<ItemPart src="#asset_sensibilite" part="Cartel_katja_heueur" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_sensibilite" part="Cartel_dorian_felgines" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_sensibilite" part="Cartel_bastian" :onItemClicked="slotProps.onItemClicked"/>

				<!-- 3D -->
					<ItemPart src="#asset_sensibilite" part="3D_Dorian" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_sensibilite" part="3D_Bastian" :onItemClicked="slotProps.onItemClicked"/>


				<!-- Players -->
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_sensibilite"
						part="Cartel_Sonore_Dorian_NM"						
					/> 
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_sensibilite"
						part="Cartel_Sonore_Bastian_BM"	
					/> 
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_sensibilite"
						part="Cartel_Sonore_Katja_BM"	
					/> 

				</template>

				<template v-slot:activeItems>
				</template>
			</Groupe>

			
			<!-- ZONE POLYPHONIE -->
			<Groupe
			ref="polyphonie"
			target="projets.polyphonie" 
	
			position="-0 -60 0" 
			rotation="0 0 0"
			animation="property: rotation; from:0 -360 360; to: 0 0 0; loop: true; dur: 100000; easing:linear;"
			gltfpart="src:#asset_polyphonie; part:Polyphonie"

			camPos="0 0 80"
			camTarget="0 0 0"

			@zone-activated="onGroupeActivated"
			@zone-desactivated="onGroupeDesactivated"
			@mouse-enter="onMouseEnterGroupe"
			@mouse-leave="onMouseLeaveGroupe"
			@mouse-click="onGroupeClicked"
			@click-item="onItemClicked"			
			>
				
				<template v-slot:items="slotProps" >
					
				<!-- titre -->
					<ItemPart src="#asset_polyphonie" part="Titre_Polyphonie" :onItemClicked="slotProps.onItemClicked"/>

				<!-- cartels -->
					<ItemPart src="#asset_polyphonie" part="Cartel_pauline_provini" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_polyphonie" part="Cartel_valentine_maupetit" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_polyphonie" part="Cartel_alexis_guidet" :onItemClicked="slotProps.onItemClicked"/>

				<!-- 3D -->
					<ItemPart src="#asset_polyphonie" part="3d_Pauline" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_polyphonie" part="3D_Alexis" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_polyphonie" part="3D_Valentine" :onItemClicked="slotProps.onItemClicked"/>

				<!-- Players -->
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_polyphonie"
						part="Cartel_Sonore_Pauline_VD"						
					/> 
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_polyphonie"
						part="Cartel_Sonore_Alexis_VD"	
					/> 
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_polyphonie"
						part="Cartel_Sonore_Valentine_VD"	
					/> 

				</template>

				<template v-slot:activeItems>
				</template>
			</Groupe>



			<!-- ZONE DIPLOMATIE -->
			<Groupe
			ref="diplomatie"
			target="projets.diplomatie" 
	
			position="-0 60 -50" 
			rotation="0 0 0"
			animation="property: rotation; from:0 -360 360; to: 0 0 0; loop: true; dur: 100000; easing:linear;"
			gltfpart="src:#asset_diplomatie; part:Diplomatie"

			camPos="0 0 80"
			camTarget="0 0 0"

			@zone-activated="onGroupeActivated"
			@zone-desactivated="onGroupeDesactivated"
			@mouse-enter="onMouseEnterGroupe"
			@mouse-leave="onMouseLeaveGroupe"
			@mouse-click="onGroupeClicked"
			@click-item="onItemClicked"			
			>
				
				<template v-slot:items="slotProps" >
					
				<!-- titre -->
					<ItemPart src="#asset_diplomatie" part="Titre_diplomatie" :onItemClicked="slotProps.onItemClicked"/>

				<!-- cartels -->
					<ItemPart src="#asset_diplomatie" part="Cartel_thomas landrain" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_diplomatie" part="Cartel_lola_hen" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_diplomatie" part="Cartel_benoit_zenker" :onItemClicked="slotProps.onItemClicked"/>

				<!-- 3D -->
					<ItemPart src="#asset_diplomatie" part="3D_Thomas" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_diplomatie" part="3D_Benoit" :onItemClicked="slotProps.onItemClicked"/>

				<!-- Players -->
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_diplomatie"
						part="Cartel_Sonore_Benoit_BM"						
					/> 
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_diplomatie"
						part="Cartel_Sonore_Thomas + Lola_BM"	
					/> 

				</template>

				<template v-slot:activeItems>
				</template>
			</Groupe>
		</a-entity>

	</a-entity>			
</template>


<script>
	//mixins
	import { ClickHandler } from '../mixins/ClickHandler.js';
	import { Zone } from '../mixins/Zone.js';

	//components
	import Groupe from './Groupe.vue';

	export default {
		name: "Projets",

		mixins:[Zone, ClickHandler],
		components: {Groupe},

		props: {
			src: String,
		},

		data(){
			return {
				color:"#ff3300",
			}
		},

		methods: {

			onGroupeActivated:function(target) {
				this.isParent = true;
				this.$root.changeContent(target);
			},
			onGroupeDesactivated:function(target) {
				this.isParent = false;
				this.$root.changeContent(null);
			},
			onMouseEnterGroupe:function(target) {
				this.$root.onMouseEnterZone(target);
			},
			onMouseLeaveGroupe:function(target) {
				this.$root.onMouseLeaveZone(target);
			},
			onGroupeClicked:function(zone) {
				this.$emit("mouse-click", zone)
			},
			getGroupe(ref) {
				return this.$refs[ref];
			}
		}
	};

</script>


<style scoped lang="less">
</style>