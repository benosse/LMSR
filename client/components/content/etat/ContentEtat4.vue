<template>
	<div >

		<!-- titre -->
		<h1 class="width3 left50 gutter">
			<span class="underlined">Saint-Etienne, territoire créatif</span>
		</h1>


		<div class="width3 left50 gutter">
			<p class="btp-light">
				La cinémathèque de Saint-Etienne constitue une archive sociologique et historique des années 20 à aujourd’hui. Son fonds est né de la volonté de faire du cinéma naissant le reflet de l’activité de la municipalité :« En 1922, la municipalité avec la collaboration du Conseil général et de l'Académie décide la création d'un cinématographe destiné à l'enseignement dans les écoles de la ville. C'est une des premières cinémathèques créées en France. Sa mission est de diffuser l'instruction et la culture par le film, elle collecte et permet la sauvegarde des courts et longs métrages » (Présentation de la cinémathèque sur le site de la ville de Saint-Etienne)
			</p>

			<p class="btp-light">
				Les inaugurations, discours, séances officielles y tiennent une grande place. Au travers de la vie institutionnelle,  la vie de la société filtre : les rentrées scolaires montrent l’école toute proche du puits de mine, les pères qui accompagnent leurs enfants au retour du travail de nuit, la fillette dont la blouse cachera la robe kabyle. À l’occasion d’une visite des jardins ouvriers, la caméra capte l’explication d’un paysan expert à d’un jardinier débutant, autour d’un arbre fruitier. Elle s’attarde sur la beauté miraculeuse de dahlias que les ouvriers ont fait éclore malgré la prescription de ne planter que des légumes. Aux portes d’un train, l’étreinte entre parents et enfants rappelle les grands départs estivaux vers les fermes de Chambon-sur-Lignon, où les fils et filles des familles ouvrières devaient recevoir chaque jour un litre de lait et de bons repas, une œuvre du Pasteur Louis Comte. Ce réseau d’accueil, « Les enfants de la Montagne » ancré au Chambon prépara le terrain à Magda et André Trocmé, pasteur à son tour qui, dès 1940, cacheront dans la « Montagne refuge » les enfants juifs.
			</p>
			<p class="btp-light">
				C’est à Saint-Étienne que se sont inventés les métiers du soin aux personnes : les Amicales Laïques ont imaginé tout ce que l’État ne faisait pas. Aujourd’hui encore, le réseau associatif est à Saint-Étienne d’un tel dynamisme qu’il soutient les habitants frappés par la pandémie, et attire à Saint-Étienne des Lyonnais poussés par le désir de trouver de partager la vie de ce territoire et d’y trouver du sens.
			</p>
			<p class="btp-light">
				Issus de l’Esadse, deux cinéastes, Lisa Swieton et Victor Oozeer, ont réalisé un film de montage à partir des archives municipales. Le Monde sinon rien est heureux de présenter un extrait de ce film, pour témoigner de l’histoire de Saint-Étienne, territoire fertile où prospère le design et où les étudiants rencontrent une histoire vivante des façons de prendre soin du monde.
			</p>
			<p class="btp-light">
				<a href="https://www.saint-etienne.fr/d%C3%A9couvrir-sortir/culture/cin%C3%A9math%C3%A8que-minicipale" target="_blank">Histoire de la cinémathèque de Saint-Étienne</a>
				<a href="https://www.forez-info.com/encyclopedie/memoire-et-patrimoine/1362-le-pasteur-comte.html" target="_blank">Le Pasteur Comte</a>
				<a href="https://archives.saint-etienne.fr/" target="_blank">Archives municipales de Saint-Étienne</a>
			</p>
		</div>




	</div>     
</template>


<script>
	export default {
		name: "ContentEtat4",
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