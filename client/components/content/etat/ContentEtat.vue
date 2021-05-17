<template>
	<ContentEtat3 v-if="id == 'etat3'"/>   

	<div v-else>
		<p>404</p>
	</div>
	
</template>


<script>
	export default {
		name: "ContentEtat",
		//tmp : à terme on utilisera les id de la BDD et meteor pour dynamiser le contenu
		props: ["isMobile", "id"],

		mounted(){
			this.$el.scrollTo(0,0);	
		}
	};
</script>


<style scoped lang="less">

</style>