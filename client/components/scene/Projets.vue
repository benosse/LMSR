<template>
	<!-- root entity -->
	<a-entity
	:position="position"
	:rotation="rotation"
	:animation="animation"
	:scale="scale"
	>
		<!-- flux dynamiques communs à tous les étudiants-->
		<a-entity v-if="hasActiveChildren || isActive">
		</a-entity>


		<!--dummy TP entity for the cam-->
		<a-entity ref="tp" position="0 0 50"></a-entity>
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
			target="objets.enquete" 
			
			position="0 15 10" 
			rotation="0 0 0"
			animation="property: rotation; from:60 -360 20; to: 60 0 20; loop: true; dur: 100000; easing:linear;"
			gltfpart="src:#asset_enquete; part:Enquete"

			camPos="0 0 20"
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
					<ItemPart src="#asset_enquete" target="objets.guy" part="cartel_guy_aidelberg" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_enquete" target="objets.ines" part="cartel_ines_lemenec" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_enquete" target="objets.felix" part="felix_hol" :onItemClicked="slotProps.onItemClicked"/>

				<!-- 3D -->
					<ItemPart src="#asset_enquete" target="objets.ines" part="3D_Ines" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_enquete" target="objets.felix" part="3D_Felix" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_enquete" target="objets.guy" part="3D_Guy_Haut" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_enquete" target="objets.guy" part="3D_Guy_Bas" :onItemClicked="slotProps.onItemClicked"/>

				<!-- Players -->

					<ItemPlayer 
					:raycastable="isActive || hasActiveChildren"
					src="#asset_enquete"
					:part="'Cartel_Sonore_Ines_BM'"			
					player="audioID:BM04; listener:#cam;" 
					controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
					cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
					/>

					<ItemPlayer 
					:raycastable="isActive || hasActiveChildren"
					src="#asset_enquete"
					part="Cartel_Sonore_Felix_BL"		
					player="audioID:BL05; listener:#cam;" 
					controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
					cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
					/>

					<ItemPlayer 
					:raycastable="isActive || hasActiveChildren"
					src="#asset_enquete"
					part="Cartel_Sonore_Guy_NM"			
					player="audioID:NM01; listener:#cam;" 
					controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
					cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
					/>
				</template>

				<template v-slot:activeItems>
				</template>
			</Groupe>


			<!-- ZONE SENSIBILITE -->
			<Groupe
				ref="sensibilite"
				target="objets.sensibilite" 
		
				position="15 5 -10" 
				rotation="0 0 0"
				animation="property: rotation; from:30 -360 -30; to: 30 0 -30; loop: true; dur: 100000; easing:linear;"
				gltfpart="src:#asset_sensibilite; part:Sensibilite"

				camPos="0 0 20"
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
						<ItemPart src="#asset_sensibilite" target="objets.katja" part="Cartel_katja_heueur" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_sensibilite" target="objets.dorian" part="Cartel_dorian_felgines" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_sensibilite" target="objets.bastian" part="Cartel_bastian" :onItemClicked="slotProps.onItemClicked"/>

					<!-- 3D -->
						<ItemPart src="#asset_sensibilite" target="objets.dorian" part="3D_Dorian_Bas" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_sensibilite" target="objets.dorian" part="3D_Dorian_Haut" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_sensibilite" target="objets.bastian" part="3D_Bastian" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_sensibilite" target="objets.katja" part="3D_Katja" :onItemClicked="slotProps.onItemClicked"/>


					<!-- Players -->
						<ItemPlayer 
						:raycastable="isActive || hasActiveChildren"
						src="#asset_sensibilite"
						part="Cartel_Sonore_Dorian_NM"			
						player="audioID:; listener:#cam;" 
						controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
						cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
						posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
						/>

						<ItemPlayer 
						:raycastable="isActive || hasActiveChildren"
						src="#asset_sensibilite"
						part="Cartel_Sonore_Bastian_BM"			
						player="audioID:BM07; listener:#cam;" 
						controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
						cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
						posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
						/>

						<ItemPlayer 
						:raycastable="isActive || hasActiveChildren"
						src="#asset_sensibilite"
						part="Cartel_Sonore_Katja_BM"		
						player="audioID:BM10; listener:#cam;" 
						controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
						cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
						posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
						/>

					</template>

					<template v-slot:activeItems>
				</template>
			</Groupe>


			<!-- ZONE POLYPHONIE -->
			<Groupe
				ref="polyphonie"
				target="objets.polyphonie" 
		
				position="-10 10 -15" 
				rotation="0 0 0"
				animation="property: rotation; from:30 -360 0; to: 30 0 0; loop: true; dur: 100000; easing:linear;"
				gltfpart="src:#asset_polyphonie; part:Polyphonie"

				camPos="0 0 20"
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
						<ItemPart src="#asset_polyphonie" target="objets.pauline" part="Cartel_pauline_provini" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_polyphonie" target="objets.valentine" part="Cartel_valentine_maupetit" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_polyphonie" target="objets.alexis" part="Cartel_alexis_guidet" :onItemClicked="slotProps.onItemClicked"/>

					<!-- 3D -->
						<ItemPart src="#asset_polyphonie" target="objets.pauline" part="3D_Pauline" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_polyphonie" target="objets.alexis" part="3D_Alexis" :onItemClicked="slotProps.onItemClicked"/>
						<ItemPart src="#asset_polyphonie" target="objets.valentine" part="3D_Valentine" :onItemClicked="slotProps.onItemClicked"/>

					<!-- Players -->

						<ItemPlayer 
						:raycastable="isActive || hasActiveChildren"
						src="#asset_polyphonie"
						part="Cartel_Sonore_Pauline_VD"		
						player="audioID:VD08; listener:#cam;" 
						controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
						cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
						posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
						/>

						<ItemPlayer 
						:raycastable="isActive || hasActiveChildren"
						src="#asset_polyphonie"
						part="Cartel_Sonore_Alexis_VD"	
						player="audioID:VD01; listener:#cam;" 
						controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
						cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
						posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
						/>

						<ItemPlayer 
						:raycastable="isActive || hasActiveChildren"
						src="#asset_polyphonie"
						part="Cartel_Sonore_Valentine_VD"		
						player="audioID:VD09; listener:#cam;" 
						controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
						cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
						posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
						/>
					</template>

					<template v-slot:activeItems>
				</template>
			</Groupe>


			<!-- ZONE TERRITOIRE -->
			<Groupe
			ref="territoire"
			target="objets.territoire" 
	
			position="10 -10 7" 
			rotation="0 0 0"
			animation="property: rotation; from:-40 -360 50; to: -40 0 50; loop: true; dur: 100000; easing:linear;"
			gltfpart="src:#asset_territoire; part:Territoire"

			camPos="0 0 20"
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
					<ItemPart src="#asset_territoire" target="objets.clara" part="Carel_clara_monteil" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_territoire" target="objets.mathilde" part="Cartel_mathilde_reynaud" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_territoire" target="objets.lucas" part="Cartel_lucas_maccabeo" :onItemClicked="slotProps.onItemClicked"/>

				<!-- 3D -->
					<ItemPart src="#asset_territoire" target="objets.clara" part="3D_Clara" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_territoire" target="objets.lucas" part="3D_Lucas" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_territoire" target="objets.mathilde" part="3D_Mathilde" :onItemClicked="slotProps.onItemClicked"/>

				<!-- Players -->

					<ItemPlayer 
					:raycastable="isActive || hasActiveChildren"
					src="#asset_territoire"
					part="Cartel_Sonore_Clara_Mathilde_VD"		
					player="audioID:; listener:#cam;" 
					controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
					cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
					/>

					<ItemPlayer 
					:raycastable="isActive || hasActiveChildren"
					src="#asset_territoire"
					part="Cartel_Sonore_Lucas_BL"		
					player="audioID:; listener:#cam;" 
					controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
					cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
					/>

				</template>

				<template v-slot:activeItems>
				</template>
			</Groupe>


			<!-- ZONE DIPLOMATIE -->
			<Groupe
			ref="diplomatie"
			target="objets.diplomatie" 
	
			position="-15 -15 -15" 
			rotation="0 0 0"
			animation="property: rotation; from:0 -360 30; to: 0 0 30; loop: true; dur: 100000; easing:linear;"
			gltfpart="src:#asset_diplomatie; part:Diplomatie"

			camPos="0 0 20"
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
					<ItemPart src="#asset_diplomatie" target="objets.marc" part="Cartel_thomas_landrain" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_diplomatie" target="objets.lola" part="Cartel_lola_hen" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_diplomatie" target="objets.benoit" part="Cartel_benoit_zenker" :onItemClicked="slotProps.onItemClicked"/>

				<!-- 3D -->
					<ItemPart src="#asset_diplomatie" target="objets.marc" part="3D_Thomas" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_diplomatie" target="objets.benoit" part="Benoit_3D" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_diplomatie" target="objets.lola" part="3D_Lola_Haut" :onItemClicked="slotProps.onItemClicked"/>
					<ItemPart src="#asset_diplomatie" target="objets.lola" part="3D_Lola_Bas" :onItemClicked="slotProps.onItemClicked"/>

				<!-- Players -->
					<ItemPlayer 
					:raycastable="isActive || hasActiveChildren"
					src="#asset_diplomatie"
					part="Cartel_Sonore_Benoit_BM"		
					player="audioID:BM04; listener:#cam;" 
					controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
					cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
					/>

					<ItemPlayer 
					:raycastable="isActive || hasActiveChildren"
					src="#asset_diplomatie"
					part="Cartel_Sonore_Thomas_Lola_BM"		
					player="audioID:BM09; listener:#cam;" 
					controls ="volume:2; refDistance:20; distModel:inverse; rolloffFac:0.5; 
					cone:false; coneInAngle: 90; coneOutAngle: 180; coneOutLevel: 0; 
					posHelper:false; posColorIn:#720909 ; posColorOut:#f7a6a6 " 		
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
		name: "Objets",

		mixins:[Zone, ClickHandler],
		components: {Groupe},

		props: {
			src: String,		
		},

		data(){
			return {
				color:"#ff3300",
				currentGroupe: null,
			}
		},

		methods: {

			onGroupeActivated:function(groupe) {
				console.log("groupe activated in projets", groupe)
				this.currentGroupe = groupe;
			},
			onGroupeDesactivated:function(groupe) {
				console.log("groupe desactivated in projets")
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
			hasActiveChildren:function(){
				return this.currentGroupe != null;
			}
		}
		
	};

</script>


<style scoped lang="less">
</style>