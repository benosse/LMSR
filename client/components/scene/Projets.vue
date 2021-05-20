<template>
	<!-- root entity -->
	<a-entity
	:position="position"
	:rotation="rotation"
	:animation="animation"
	:scale="scale"
	>
		<!-- flux dynamiques communs à tous les étudiants-->
		<a-entity v-if="showActive">
			<a-box color="red" scale="10 10 10"></a-box>
		</a-entity>


		<!--dummy TP entity for the cam-->
		<a-entity ref="tp" position="0 0 300"></a-entity>
		<a-entity ref="tpTarget" position="0 -40 0"></a-entity>


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
			
			position="0 40 20" 
			rotation="0 0 0"
			animation="property: rotation; from:60 -360 20; to: 60 0 20; loop: true; dur: 100000; easing:linear;"
			gltfpart="src:#asset_enquete; part:Enquete"

			camPos="0 0 100"
			camTarget="0 0 0"

			@zone-activated="onGroupeActivated"
			@zone-desactivated="onGroupeDesactivated"
			@mouse-click="onGroupeClicked"
			@click-item="onItemClicked"			
			>
				
				<template v-slot:items="slotProps" >
					
				<!-- titre -->
					<ItemPart src="#asset_enquete" part="Titre_enquete" :onItemClicked="slotProps.onItemClicked"/>

				<!-- cartels -->
					<ItemPart src="#asset_enquete" target="projets.guy" part="cartel_guy_aidelberg" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_enquete" target="projets.ines" part="cartel_ines_lemenec" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_enquete" target="projets.felix" part="felix_hol" :onItemClicked="slotProps.onItemClicked"/>

				<!-- 3D -->
					<ItemPart src="#asset_enquete" target="projets.ines" part="3D_Ines" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_enquete" target="projets.felix" part="3D_Felix" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_enquete" target="projets.guy" part="3D_Guy" :onItemClicked="slotProps.onItemClicked"/>

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


			<!-- ZONE SENSIBILITE -->
			<Groupe
				ref="sensibilite"
				target="projets.sensibilite" 
		
				position="-50 -10 -20" 
				rotation="0 0 0"
				animation="property: rotation; from:30 -360 -30; to: 30 0 -30; loop: true; dur: 100000; easing:linear;"
				gltfpart="src:#asset_sensibilite; part:Sensibilite"

				camPos="0 0 100"
				camTarget="0 0 0"

				@zone-activated="onGroupeActivated"
				@zone-desactivated="onGroupeDesactivated"
				@mouse-click="onGroupeClicked"
				@click-item="onItemClicked"			
				>
					
					<template v-slot:items="slotProps" >
						
					<!-- titre -->
						<ItemPart src="#asset_sensibilite" part="Titre_sensibilite" :onItemClicked="slotProps.onItemClicked"/>

					<!-- cartels -->
						<ItemPart src="#asset_sensibilite" target="projets.katja" part="Cartel_katja_heueur" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_sensibilite" target="projets.dorian" part="Cartel_dorian_felgines" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_sensibilite" target="projets.bastian" part="Cartel_bastian" :onItemClicked="slotProps.onItemClicked"/>

					<!-- 3D -->
						<ItemPart src="#asset_sensibilite" target="projets.dorian" part="3D_Dorian_Bas" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_sensibilite" target="projets.dorian" part="3D_Dorian_Haut" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_sensibilite" target="projets.bastian" part="3D_Bastian" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_sensibilite" target="projets.katja" part="3D_Katja" :onItemClicked="slotProps.onItemClicked"/>


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
		
				position="40 -30 40" 
				rotation="0 0 0"
				animation="property: rotation; from:30 -360 0; to: 30 0 0; loop: true; dur: 100000; easing:linear;"
				gltfpart="src:#asset_polyphonie; part:Polyphonie"

				camPos="0 0 100"
				camTarget="0 0 0"

				@zone-activated="onGroupeActivated"
				@zone-desactivated="onGroupeDesactivated"
				@mouse-click="onGroupeClicked"
				@click-item="onItemClicked"			
				>
					
					<template v-slot:items="slotProps" >
						
					<!-- titre -->
						<ItemPart src="#asset_polyphonie" part="Titre_Polyphonie" :onItemClicked="slotProps.onItemClicked"/>

					<!-- cartels -->
						<ItemPart src="#asset_polyphonie" target="projets.pauline" part="Cartel_pauline_provini" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_polyphonie" target="projets.valentine" part="Cartel_valentine_maupetit" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_polyphonie" target="projets.alexis" part="Cartel_alexis_guidet" :onItemClicked="slotProps.onItemClicked"/>

					<!-- 3D -->
						<ItemPart src="#asset_polyphonie" target="projets.pauline" part="3d_Pauline" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_polyphonie" target="projets.alexis" part="3D_Alexis" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_polyphonie" target="projets.valentine" part="3D_Valentine" :onItemClicked="slotProps.onItemClicked"/>

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


			<!-- ZONE TERRITOIRE -->
			<Groupe
			ref="territoire"
			target="projets.territoire" 
	
			position="0 -60 -80" 
			rotation="0 0 0"
			animation="property: rotation; from:-40 -360 50; to: -40 0 50; loop: true; dur: 100000; easing:linear;"
			gltfpart="src:#asset_territoire; part:Territoire"

			camPos="0 0 100"
			camTarget="0 0 0"

			@zone-activated="onGroupeActivated"
			@zone-desactivated="onGroupeDesactivated"
			@mouse-click="onGroupeClicked"
			@click-item="onItemClicked"			
			>
				
				<template v-slot:items="slotProps" >
					
				<!-- titre -->
					<ItemPart src="#asset_territoire" part="Titre_Territoire" :onItemClicked="slotProps.onItemClicked"/>

				<!-- cartels -->
					<ItemPart src="#asset_territoire" target="projets.clara" part="Carel_clara_monteil" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_territoire" target="projets.mathilde" part="Cartel_mathilde_reynaud" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_territoire" target="projets.lucas" part="Cartel_lucas_maccabeo" :onItemClicked="slotProps.onItemClicked"/>

				<!-- 3D -->
					<ItemPart src="#asset_territoire" target="projets.clara" part="3D_Clara" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_territoire" target="projets.lucas" part="3D_Lucas" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_territoire" target="projets.mathilde" part="3D_Mathilde" :onItemClicked="slotProps.onItemClicked"/>

				<!-- Players -->
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_territoire"
						part="Cartel_Sonore_Clara_Mathilde_VD"						
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


			<!-- ZONE DIPLOMATIE -->
			<Groupe
			ref="diplomatie"
			target="projets.diplomatie" 
	
			position="-30 -90 60" 
			rotation="0 0 0"
			animation="property: rotation; from:0 -360 30; to: 0 0 30; loop: true; dur: 100000; easing:linear;"
			gltfpart="src:#asset_diplomatie; part:Diplomatie"

			camPos="0 0 100"
			camTarget="0 0 0"

			@zone-activated="onGroupeActivated"
			@zone-desactivated="onGroupeDesactivated"
			@mouse-click="onGroupeClicked"
			@click-item="onItemClicked"			
			>
				
				<template v-slot:items="slotProps" >
					
				<!-- titre -->
					<ItemPart src="#asset_diplomatie" part="Titre_diplomatie" :onItemClicked="slotProps.onItemClicked"/>

				<!-- cartels -->
					<ItemPart src="#asset_diplomatie" target="projets.marc" part="Cartel_thomas_landrain" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_diplomatie" target="projets.lola" part="Cartel_lola_hen" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_diplomatie" target="projets.benoit" part="Cartel_benoit_zenker" :onItemClicked="slotProps.onItemClicked"/>

				<!-- 3D -->
					<ItemPart src="#asset_diplomatie" target="projets.marc" part="3D_Thomas" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_diplomatie" target="projets.benoit" part="3D_Benoit" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_diplomatie" target="projets.lola" part="3D_Lola" :onItemClicked="slotProps.onItemClicked"/>

				<!-- Players -->
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_diplomatie"
						part="Cartel_Sonore_Benoit_BM"						
					/> 
					<ItemPlayer 
						:raycastable="isActive"
						src="#asset_diplomatie"
						part="Cartel_Sonore_Thomas_Lola_BM"	
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
			currentGroupe: null,
		},

		data(){
			return {
				color:"#ff3300",
			}
		},

		methods: {

			onGroupeActivated:function(groupe) {
				this.currentGroupe = groupe;
			},
			onGroupeDesactivated:function(groupe) {
				if (this.currentGroupe == groupe)
					this.currentGroupe = null;
			},
			onGroupeClicked:function(zone) {
				this.$emit("mouse-click", zone)
			},
			getGroupe(ref) {
				return this.$refs[ref];
			}
		},

		computed: {
			showActive:function(){
				return this.isActive || this.currentGroupe;
			}
		}
		
	};

</script>


<style scoped lang="less">
</style>