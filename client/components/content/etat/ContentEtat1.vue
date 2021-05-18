<template>
	<div >

		<!-- titre -->
		<h1 class="width3 left50 gutter">
			<span class="underlined">2020 Pandémie</span>
		</h1>

	</div>     
</template>


<script>
	export default {
		name: "ContentEtat1",
		//tmp : à terme on utilisera les id de la BDD et meteor pour dynamiser le contenu
		props: ["isMobile", "id"],

		mounted(){
			const targetElem = this.$refs[this.id];
			if (targetElem)
				targetElem.scrollIntoView(); 
			else {
				this.$el.scrollTo(0,0);
				console.log(this.id, "not found")
			}
			
		}
	};
</script>


<style scoped lang="less">

</style>