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

			<!-- ZONE MAIN -->
			<Groupe
			ref="main"
			target="projets.main" 
			
			position="0 80 50" 
			rotation="0 0 0"
			animation="property: rotation; from:0 -360 360; to: 0 0 0; loop: true; dur: 100000; easing:linear;"
			src="#asset_main"

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
					<Item src="#asset_titre_main" :onItemClicked="slotProps.onItemClicked"/>

					<Item src="#asset_cyrus" target="projets.cyrus" :onItemClicked="slotProps.onItemClicked" />
					<Item src="#asset_dorian" target="projets.dorian" :onItemClicked="slotProps.onItemClicked" />
					<Item src="#asset_pierre" target="projets.pierre" :onItemClicked="slotProps.onItemClicked" />
				</template>

				<template v-slot:activeItems>
				</template>
			</Groupe>


			<!-- ZONE DONNEES -->
			<Groupe
			ref="donnees"
			target="projets.donnees" 
	
			position="0 0 60" 
			rotation="0 0 0"
			animation="property: rotation; from:0 -360 360; to: 0 0 0; loop: true; dur: 100000; easing:linear;"
			src="#asset_donnees"

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
					<Item src="#asset_titre_donnees"/>

					<Item position="5 -25 1" rotation="90 0 0" scale="2 2 2" src="#asset_benoit" target="projets.benoit" :onItemClicked="slotProps.onItemClicked" />
					<Item src="#asset_cartel_benoit" target="projets.benoit" :onItemClicked="slotProps.onItemClicked" />

					<!-- <Item position="-5 0 24" rotation="0 90 180" scale="3 3 3" src="#asset_lola" target="projets.lola" :onItemClicked="slotProps.onItemClicked" /> -->
					<Item src="#asset_cartel_lola" target="projets.lola" :onItemClicked="slotProps.onItemClicked" />

					<Item src="#asset_cartel_katja" target="projets.katja" :onItemClicked="slotProps.onItemClicked" />

				</template>

			</Groupe>


			<!-- ZONE SOIN  -->
			<Groupe 
			ref="soin"
			target="projets.soin" 

			camPos="0 0 80"
			camtarget="0 0 0"

			position="-60 0 0" 
			rotation="0 0 0"
			animation="property: rotation; from:0 -360 360; to: 0 0 0; loop: true; dur: 100000; easing:linear;"
			src="#asset_soin"

			@zone-activated="onGroupeActivated"
			@zone-desactivated="onGroupeDesactivated"
			@mouse-enter="onMouseEnterGroupe"
			@mouse-leave="onMouseLeaveGroupe"
			@mouse-click="onGroupeClicked"
			@click-item="onItemClicked"
			>

				<template v-slot:items="slotProps" >
					<Item src="#asset_titre_soin"/>

					<Item src="#asset_chetan" target="projets.chetan" :onItemClicked="slotProps.onItemClicked" />
					<Item src="#asset_ines" target="projets.ines" :onItemClicked="slotProps.onItemClicked" />

				</template>

			</Groupe>

			<!-- ZONE SYSTEMES -->
			<Groupe
			ref="systemes"
			target="projets.systemes" 

			camPos="0 0 80"
			camTarget="0 0 0"

			position="0 -60 0" 
			rotation="0 0 0"
			animation="property: rotation; from:0 -360 360; to: 0 0 0; loop: true; dur: 100000; easing:linear;"
			src="#asset_systemes"

			@zone-activated="onGroupeActivated"
			@zone-desactivated="onGroupeDesactivated"
			@mouse-enter="onMouseEnterGroupe"
			@mouse-leave="onMouseLeaveGroupe"
			@mouse-click="onGroupeClicked"
			@click-item="onItemClicked"
			>
				<template v-slot:items="slotProps" >
					<Item src="#asset_titre_systemes"/>

					<Item target="projets.pauline" :onItemClicked="slotProps.onItemClicked" src="#asset_cartel_pauline"/>
					<Item src="#asset_pauline" target="projets.pauline" :onItemClicked="slotProps.onItemClicked" />

					<Item src="#asset_cesar" target="projets.cesar" :onItemClicked="slotProps.onItemClicked" />	
					<Item src="#asset_valentine" target="projets.valentine" :onItemClicked="slotProps.onItemClicked" />

				</template>

				<template v-slot:activeItems>
				</template>
				
			</Groupe>

			<!-- ZONE INVISIBLE -->
			<Groupe 
			ref="invisible"
			target="projets.invisible" 

			camPos="0 0 80"
			camTarget="0 0 0"

			position="0 60 -50" 
			rotation="0 0 0"
			animation="property: rotation; from:0 -360 360; to: 0 0 0; loop: true; dur: 100000; easing:linear;"
			src="#asset_invisible"

			@zone-activated="onGroupeActivated"
			@zone-desactivated="onGroupeDesactivated"
			@mouse-enter="onMouseEnterGroupe"
			@mouse-leave="onMouseLeaveGroupe"
			@mouse-click="onGroupeClicked"
			@click-item="onItemClicked"
			>
				<template v-slot:items="slotProps" >
					<Item src="#asset_titre_invisible"/>

					<Item src="#asset_alexis" target="projets.alexis" :onItemClicked="slotProps.onItemClicked" />
					<Item src="#asset_guy" target="projets.guy" :onItemClicked="slotProps.onItemClicked" />
					<Item src="#asset_mathilde" target="projets.mathilde" :onItemClicked="slotProps.onItemClicked" />
				</template>

			</Groupe>

			<!-- ZONE EPREUVES -->
			<Groupe 
			ref="epreuves"
			target="projets.epreuves" 

			camPos="0 0 50"
			camTarget="0 0 0"

			position="60 30 0" 
			rotation="0 0 0"
			animation="property: rotation; from:0 -360 360; to: 0 0 0; loop: true; dur: 100000; easing:linear;"
			src="#asset_epreuves"

			@zone-activated="onGroupeActivated"
			@zone-desactivated="onGroupeDesactivated"
			@mouse-enter="onMouseEnterGroupe"
			@mouse-leave="onMouseLeaveGroupe"
			@mouse-click="onGroupeClicked"
			@click-item="onItemClicked"

			>
				<template v-slot:items="slotProps" >
					<Item src="#asset_titre_epreuves"/>

					<Item src="#asset_clara" target="projets.clara" :onItemClicked="slotProps.onItemClicked" />
					<Item src="#asset_lucas" target="projets.lucas" :onItemClicked="slotProps.onItemClicked" />
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