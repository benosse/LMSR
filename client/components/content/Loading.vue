<template>
	<div v-if="isMobile" id="loading" @click="onClick">
		<div id="mainLoading">
			<p>
				Pour profiter d'une visite saptiale et sonore du monde sinon rien, consultez le site sur votre écran d'ordinateur!
			</p>
			<img src="/images/loading/loading2.gif" alt="chargement">
		</div>
	</div> 


	<div v-else id="loading">
		<div id="mainLoading">
			<p>Chargement...</p>
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
	#loading {
		position:fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background-color:white;

		#mainLoading {
			position:absolute;
			top:50vh;
			left:50vw;
			width:320px;
			transform:translate(-50%, -50%);
			
			p {
				text-align:center;
				font-family: 'BTP light';
			}
			img {
				width:100%;
				max-width:320px;
				height:auto;
			}
		}

		
	}
</style>