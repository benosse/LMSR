<template>
	<div id="help" @click="onClick">
		<img src="images/help/help_icons.png" id="help_icons">
		<img src="images/help/help_home.png" id="help_home">
		<img src="images/help/help_global.png" id="help_global">
	</div>    
</template>


<script>
	export default {
		name: "ContentHelp",
		//tmp : à terme on utilisera les id de la BDD et meteor pour dynamiser le contenu
		props: ["isMobile"],

		methods :{
			onClick:function(){
				console.log("click help")
				this.$root.hideHelp();
			},
		},

	};
</script>


<style scoped lang="less">
	#help {
		position:fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background-color: white;
		opacity:0.9;

		#catchClick {
			position:fixed;
			top:0;
			bottom:0;
			left:0;
			right:0;
			z-index:9999;
			background-color: red;
		}

		#help_icons {
			position:absolute;
			bottom:0;
			left:20px;
			width:600px;
		}
		#help_home {
			position:absolute;
			top:20px;
			left:100px;
			width:500px;
		}
		#help_global {
			position:absolute;
			top:0px;
			right:100px;
			width:650px;
		}
	}
</style>