<template>
	<div>

		<!-- titre -->
		<h1 class="width2 left33 gutter">
			<span class="underlined">Benoît Zenker</span>
		</h1>

		<!-- intro -->
		<div class="align-top ">	

			<!-- artiste -->
			<div class="flex4">
				<div class="btp-light width2 left50 gutter">
					<p class="btp-light">
						Diplômé de l’École supérieure d’art et design de Saint-Étienne (DNSEP option design, mention média), Benoit Zenker est designer.
					</p>
				</div>			
			</div>

			<!-- projet global -->
			<div class="flex2">
				<div class="btp-regular gutter">
					<p>Pour Walter Benjamin, traduire, c'est mesurer l'écart entre les langues, pour mieux comprendre ce qui les distingue et ce qui les rassemble. La série d'algorithmes que j'ai codés applique cette philosophie de la traduction à des langages informatiques. Un programme vient échelonner dans l'espace les contours d'un dessin. Un autre reconstitue une image à partie de fichiers STL ou G-Code, destinés à l'impression 3D. Un autre encore affiche le contenu d'une image bitmap sous forme de page web interactive, et un dernier s'inspire des L-Systèmes pour dessiner des volumes à partir d'une chaîne de caractères.
					Avec, lors de chaque opération, des accidents, imprévus, choix à faire, données lost in translation, qui créent la surprise et font toute la richesse formelle. L'enjeu est double, puisqu'il s'agit de passer d'un format à l'autre (bitmap, HTML, STL, G-Code..), mais aussi de varier et faire communiquer entre eux différents langages de programmation : les algorithmes sont codés en python, sur processing, sur grasshopper, en javascript.
					Une plateforme en ligne vient récapituler cet éventail de traductions. Sur le site, les utilisateur·ice·s sont invité·e·s à créer et transformer des images, alimentant ainsi une base de données commune. Passant d'un utilisateur·ice à un·e autre, les images sont transformées à l'infini, faisant du site une véritable usine virtuelle.
					</p>				
				</div>		
			</div>
	
		</div>

		<!-- separation -->
		<img src="./images/misc/separator3.png" class="separator width3 left16 ">

		<div class="align-top">

			<div class="flex2">
				<div class="width1 left50 btp-light">
					<h2>L-Systems -> 3D</h2>
					<p>
						2020<br>
						Impressions céramiques, Grasshopper <br>
						15 x 15x 15 cm 
					</p>
				</div>
			</div>

			<div class="flex2 btp-light gutter">
				<p>Un algorithme génère des formes à imprimer en céramique à partir de courbes dessinées à la main. Les couches de l'objet imprimé croissent en suivant les règles inspirées des L-Systems.
				</p>
			</div>

			<div class="flex2 gutter">
				<img src="./images/projets/Benoit/imagebenoit1.jpg">
			</div>
		</div>

		<!-- separation -->
		<img src="./images/misc/separator3.png" class="separator width3 left16 ">

		<div class="align-top">

			<div class="flex2">
				<div class="width1 left50 btp-light">
					<h2>3D -> 2D</h2>
					<p>
						2020<br>
						Papier<br>
						60 x 50 cm
					</p>
				</div>
			</div>

			<div class="flex2 btp-light gutter">
				<p>Le G-code est un langage de programmation utilisé pour commander des machines-outils, et notamment les imprimantes 3D. Ici, les fichiers G-code sont traduits de manière à être imprimés non pas en 3D mais à plat, comme une image.
				</p>
			</div>

			<div class="flex2 gutter">
				<img src="./images/projets/Benoit/imagebenoit2.jpg">
			</div>
		</div>

	</div> 	
</template>


<script>
	export default {
		name: "ContentBenoit",
	};
</script>


<style scoped lang="less">
	// .main {
	// 	overflow:scroll !important;
	// 	position:fixed;
	// 	top:0;
	// 	bottom:0;
	// 	left:0;
	// 	right:0;
	// }
</style>