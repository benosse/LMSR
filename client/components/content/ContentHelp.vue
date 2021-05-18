<template>
	<div id="help" @click="onClick">

		<!-- titre -->
		<h1 class="width3 left50 gutter">
			<span class="underlined">HELP</span>
		</h1>

	</div>     
</template>


<script>
	export default {
		name: "ContentHelp",
		//tmp : à terme on utilisera les id de la BDD et meteor pour dynamiser le contenu
		props: ["isMobile"],

		mounted(){
			const targetElem = this.$refs[this.id];
			if (targetElem)
				targetElem.scrollIntoView(); 
			else {
				this.$el.scrollTo(0,0);
				console.log(this.id, "not found")
			}			
		},

		methods :{
			onClick:function(){
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
		background-color: green;
	}
</style>