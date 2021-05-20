export const Zone = { 

	props: {
		//target content
		target: String,

		//zone position
		position: String,
		rotation: String,
		animation: String,
		scale: String,

		//cam pos
		camPosition: String,
	},

    data() {
        return {
			//pour les projets (item passe par groupes puis projets)
			isParent:false,	
			isActive: false,
			isHovered: false,
        };
    },

	methods: {

		/********************************************************
		directement géré par App	
		*******************************************************/	
		activate(){
            console.log("activating zone", this.target)	
            this.isActive = true;
			this.$root.changeCurrentContent(this.target);
			//emit en cas de sous zone
			this.$emit("zone-activated")
        },

        desactivate(){
            console.log("desactivating zone", this.target);
            this.isActive = false;
			//emit en cas de sous zone
			this.$emit("zone-desactivated")
        },

		onMouseEnter(){
			this.$root.changeHoveredContent(this.target);
		},

		onMouseLeave(){
			this.$root.changeHoveredContent(null);
		},


		/********************************************************
		géré par la Scene	
		*******************************************************/
		onClick(){
			console.log("click", this)
			if (!this.isActive)
				this.$emit("mouse-click", this)
		},

		onItemClicked(target){
			console.log("zone handling click on item", target);
			
			//teleport to zone
			if(!this.isActive) {
				this.$emit("mouse-click", this)
			}

			else {
				//target can be null (ex titres)
				if (target) {
					const split = target.split(".");
					this.$root.changeContent(split[0], split[1]);
				}
			}

			// if (this.isActive || this.isParent) {
			// 	//send item data to parent for content
			// 	console.log("zone handling click on item", this.target, target)

			// 	const split = target.split(".");
			// 	this.$root.changeContent(split[0], split[1]);
			// }
			// else
			// 	this.$emit("mouse-click", this)
		},


		//returns TP lookat target
		getTargetPosition(){
			if (this.$refs["tpTarget"]) {
				return this.$refs["tpTarget"].object3D.getWorldPosition(new THREE.Vector3());
			}
				
			else
				return this.$el.object3D.getWorldPosition(new THREE.Vector3());
		},

		//returns TP cam pos
		getCamPosition(){
			return this.$refs["tp"].object3D.getWorldPosition(new THREE.Vector3());
		},
    },
	
}