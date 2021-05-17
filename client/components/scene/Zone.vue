
<template>
	<a-entity
	:id="id"
	:position="position"
	:rotation="rotation"
	:animation="animation"
	>

		<!--Zone Body gltf-basic-material -->
		<a-gltf-model :src="src" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @mouseup="onMouseUp" @mousedown="onMouseDown"
		:class="{raycastable:!isActive}"></a-gltf-model>

		<!--dummy TP entity for the cam, todo:make it an optionnal slot-->
		<a-entity ref="tp" :position="camPosition"></a-entity>

		<!--Slot for custom items -->
		<slot name="items" :onItemClicked="onItemClicked"></slot>

		<!--Active Zone only-->
		<template v-if="isActive">
			<slot name="activeItems"></slot>
		</template>		

		<!--Unactive Zone only-->
		<template v-else>
			<slot name="unActiveItems"></slot>
		</template>		

	</a-entity>
</template>


<script>

import {ClickHandler} from "../mixins/ClickHandler.js"


export default {
    name: "Zone",

	props: {
		//id to link content
		id: String,

		//zone position
		position: String,
		rotation: String,
		animation: String,

		//gltf src
		src: String,

		//cam pos
		camPosition: String,
	},

	mixins: [ClickHandler],

    data() {
        return {
			isActive: false,
			isHovered: false,
			type:"zone",

			//state item selected : no zoom, scroll launches 2d mode
			isItemActive: false,
        };
    },

    mounted() {
    },

    methods: {

		onMouseEnter(){
			this.$emit("mouse-enter", this.id)
		},

		onMouseLeave(){
			this.$emit("mouse-leave", this.id)
		},

		onClick(){
			if (!this.isActive)
				this.$emit("mouse-click", this.id)
		},

		//on item clicked : 
		//if the zone is active, activate item
		//else, activate zone
		onItemClicked(target){
			if (this.isActive) {
				//send item data to parent for content
				this.$emit("click-item", target);
			}
			else
				this.$emit("mouse-click", this.id)
		},


		//returns TP lookat target
		getTargetPosition(){
			return this.$el.object3D.getWorldPosition(new THREE.Vector3());
		},

		//returns TP cam pos
		getCamPosition(){
			return this.$refs.tp.object3D.getWorldPosition(new THREE.Vector3());
		},


        activate(){
            console.log("activating zone", this.id)	
            this.isActive = true;
			this.$emit("zone-activated", this.id)	
        },
		
        desactivate(){
            console.log("desactivating zone", this.id);
            this.isActive = false;
			this.$emit("zone-desactivated", this.id)
        },

		onWheel(e){
			let minDelta = 0;

			if(e.deltaY > minDelta) {
				this.$emit("hide-scene");
				document.removeEventListener("wheel", this.onWheel)			
			}
				
		},
    },
};

</script>




