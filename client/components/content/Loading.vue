<template>
	<div v-if="isMobile" id="loading" class="mobile" @click="onClick">
		<div id="mainLoading" class="btp-light">
			<p>
				Pour profiter d'une visite spatiale et sonore du monde sinon rien, consultez le site sur votre écran d'ordinateur!
			</p>
			<img src="/images/loading/loading2.gif" alt="chargement">
		</div>
	</div> 


	<div v-else id="loading">
		<div id="mainLoading">
			<p class="btp-light" >Chargement...</p>
			<img src="/images/loading/loading2.gif" alt="chargement">
		</div>
	</div>  


</template>


<script>
	export default {
		name: "Loading",

		props: ["isMobile"],

		methods: {
			onClick(){
				this.$root.cancelLoading();
			},
		},	
	};
</script>


<style scoped lang="less">
	
</style>