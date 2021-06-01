<template>
	<div class="main etat">
		<ContentEtat1 v-if="id == 'etat1'"/>  
		<ContentEtat2 v-else-if="id == 'etat2'"/>  
		<ContentEtat3 v-else-if="id == 'etat3'"/>  
		<ContentEtat4 v-else-if="id == 'etat4'"/>   

		<!-- <div class="width2 left66 gutter back">
				<h2 class="mouseTarget" @click="onClickMainContent">Retour</h2>
		</div>  -->
	</div>
	
</template>


<script>
	export default {
		name: "ContentEtat",
		//tmp : à terme on utilisera les id de la BDD et meteor pour dynamiser le contenu
		props: ["isMobile", "id"],

		mounted(){
			this.$el.scrollTo(0,0);	
		},

		// methods: {
		// 	onClickMainContent(){
		// 		this.$root.goBack();
		// 	}
		// },
	};
</script>


<style scoped lang="less">

</style>