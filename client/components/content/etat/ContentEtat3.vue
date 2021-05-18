<template>
	<div >

		<!-- titre -->
		<h1 class="width3 left50 gutter">
			<span class="underlined">1910 Les archives de la planète</span>
		</h1>

		<div class="align-top">
			<div class="flex2 gutter">
				<img src="/images/etat/A 11 472.JPEG">
			</div>
			<div class="flex4">
				<div class="width2 gutter">
					<img src="/images/etat/A 12 350.JPEG">
				</div>			
			</div>
		</div>  


		<div class="align-top">
			<div class="flex3">
				<div class="width2 left33 gutter">
					<img src="/images/etat/A 12 373.JPEG">
				</div>
			</div>
			<div class="flex3">
				<div class="width2 gutter">
					<img src="/images/etat/A 12 403.JPEG">
				</div>			
			</div>
		</div> 


		<div class="align-center">
			<div class="flex2">
				<div class="width2 gutter">
					<img src="/images/etat/A 20 996.JPEG">
				</div>
			</div>
			<div class="flex2">
				<div class="width2 gutter">
					<img src="/images/etat/A 12 403.JPEG">
					<img src="/images/etat/A 32 077.JPEG">
				</div>			
			</div>
			<div class="flex2">
				<div class="width2 gutter">
					<img src="/images/etat/A 27 744.JPEG">
					<img src="/images/etat/A 36 773.JPEG">
				</div>			
			</div>
		</div>  


		<div class="align-center">
			<div class="flex2">
				<div class="width2 gutter">
					<img src="/images/etat/A 40 063.JPEG">
					<img src="/images/etat/A 40 066.JPEG">
				</div>			
			</div>

			<div class="flex4 ">
				<div class="gutter">
					<div class="btp-regular">
						<p>
							Entre 1910 et 1929, le philanthrope Albert Kahn envoie des émissaires dans de nombreuses régions avec le but de photographier et de filmer un état du monde. Il est habité par le sentiment que les sociétés sont en mutation : des modes de vie disparaissent, et il est urgent d’enregistrer le monde en une gigantesque archive :
						</p>

						<blockquote>
							« La photographie stéréoscopique, les projections, le cinématographe surtout, voilà ce que je voudrais faire fonctionner en grand afin de fixer une fois pour toutes des aspects, des pratiques et des modes de l’activité humaine dont la disparition fatale n’est plus qu’une question de temps ». Albert Kahn, janvier 1912
						</blockquote>
					</div>

					<div class="btp-light">
						<p>
							Les expéditions rencontreront des événements mondiaux. Elles traverseront la guerre mondiale et ses vestiges, ainsi que la grippe espagnole,  avant de s’arrêter avec la crise de 1929, qui provoquera la faillite de la banque d’Albert Kahn. Ainsi se sont constituées les Archives de la planète. Désormais sont accessibles en Open data une centaine d’heures de films, 4 000 stéréoscopies et 72 000 autochromes. La page s’ouvre sur une carte mondiale qui géolocalise les ressources. On circule dans la base soit en cliquant sur un lieu, soit par les entrées de mots clés sur la gauche de l’image. Les images et leur description apparaissent sous la carte.						
						</p>
						<a href="http://collections.albert-kahn.hauts-de-seine.fr/?page=themes&sub=paysages">Accéder à la cartographie</a>
						<p>
							Durant ces 20 ans les opérateurs ont capté un monde en transformation, encore agricole et déjà industriel. Les images choisies montrent des paysages au sein desquels des installations industrielles ont pris place. Cette industrie exploite les ressources naturelles, le bois, l’eau, la pêche. Autour des scieries, des centrales hydrauliques, des usines, dont certaines sont dévastées par la guerre de 14-18  , on voit la modification du paysage :tranchées de déboisement, baies équipées pour l’accostage de marchandises, bâtiments ancrés dans le pli d’une colline. De ces équipements de captation des ressources, l’eau, les minerais, le bois, on sait aujourd’hui la puissance de transformation. 
						</p>
					</div>

					<div class="btp-regular">
						<p>
							Albert Kahn est animé par l’idée que la découverte de l’altérité et des différences des cultures et des pratiques amènera la paix universelle. Une archive actuelle appelle à prendre soin du monde avec la même urgence, avec cette fois l’urgence explicite d’éviter non pas seulement des guerres, mais la sixième extinction de masse.
						</p>
					</div>

					<div class="btp-light">
						<p>
							Quelle archive un Albert Kahn de 2022 constituerait-il? ? De 2020, de 2021 que voulons-nous constituer en archive essentielle ? Si le projet des Archives de la planète est une base d’images, qui fait écho au Mundaneum d’Otlet – la bibliothèque des savoirs humains, des sciences applicatives, des techniques de l’industrie – l’archive que constituent les observateurs de l’environnement est celle de l’alerte et du désastre, celle du plastique dans l’Océan, des forêts dévastées, des cultures brûlées de sécheresse et ou dévorées par les pluies de cricket.						
						</p>
							<a href="http://collections.albert-kahn.hauts-de-seine.fr/">Archives Albert Kahn</a>
					</div>	
				</div>

				<div class="width2 gutter">
					<img src="/images/etat/A 40 058.JPEG">
					<img src="/images/etat/A 32 077.JPEG">
				</div>
			</div>
			
		</div>   

	</div>     
</template>


<script>
	export default {
		name: "ContentEtat3",
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