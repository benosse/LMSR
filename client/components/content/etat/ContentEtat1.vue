<template>
	<div >

		<!-- titre -->
		<h1 class="width3 left50 gutter">
			<span class="underlined">2020 - Pandémie</span>
		</h1>

		<div class="width3 left50 gutter">
			<p class="btp-light">
				En 2020, le monde entier s’est mis à vivre avec la COVID-19. Voici déjà un an que dans tous les pays du monde des changements irréversibles se sont installés. En quelques mois, les épisodes de la pandémie, les deuils, les peurs, les privations, l’arrêt de nombreuses activités humaines, signifiant l’impossibilité de gagner sa vie, ont assombri le sort de millions de gens. À la racine du malaise, la « distanciation sociale » et les « gestes barrières » qui séparent les proches et appauvrissent les émotions. Dans toutes les aires géographiques, la même expérience affolée se déroule.
			</p>
			<p class="btp-light">
				Les journalistes de l’AFP sont présents partout sur ces terrains dévastés. Parmi les drames, ils ont aussi pris le temps de regarder d’étonnantes recréations. Ce sont les réinventions des relations humaines, créatives, esthétiques, émouvantes que Pierre Fernandez, commissaire pour l’AFP, a choisies pour le Monde sinon rien. Elles convainquent de la beauté d’un monde qui ne peut se libérer du carcan pandémique que grâce à l’imagination et à la rencontre. Ces images incarnent une promesse : un monde a disparu avec cette pandémie, mais déjà d’autres façons d’être sont en germe. Elles montrent aussi le travail des journalistes et la bifurcation de sujets, de regard, que la COVID-19 a provoquée. Les images montrent leur attention sensible à l’état du monde tel qu’il est. Leur émotion est aussi le reflet des changements qu’ils vivent eux-mêmes sur des terrains bouleversés.
			</p>
		</div>

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