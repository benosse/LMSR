export const ClickHandler = { 
	data(){
		return{
			timeStamp:null,
		}	
	},


	methods: {

		onMouseUp(e){

			if (!this.timeStamp)
				return;

			if (e.timeStamp - this.timeStamp < 200)
				this.onClick();
				
			this.timeStamp = null;
	
		},

		onMouseDown(e) {
			console.log("mouse down")
			this.timeStamp = e.timeStamp;
		},
	}
}