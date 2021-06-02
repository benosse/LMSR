<template>

	<div  class="main help" @click="onClick">
		<div id="contentHelp">
			<img src="/images/help/help.png">
		</div>
		
	</div> 

</template>


<script>
	export default {
		name: "ContentHelp",

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
	}
</style>