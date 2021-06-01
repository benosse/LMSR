<template>
	<div v-if="isMobile" class="mobile main loading" @click="onClick">
		<div id="mainLoading" class="btp-light">
			
			<img src="/images/loading/loading2.gif" alt="chargement">

			<p>
				Pour profiter d'une visite spatiale et sonore du monde sinon rien, consultez le site sur votre écran d'ordinateur!
			</p>
			<p>
				<a class="mouseTarget linkContent" @click="">Poursuivre vers la version mobile</a>
			</p>

		</div>
	</div> 


	<div v-else class="main loading">
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

