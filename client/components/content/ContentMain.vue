<template>
	<div class="width2 left66 gutter">
		<div class="gutter">
			<div class="btp-regular">
				<p>    
					En mars 2021, nous préparions Le Monde sinon rien, l’exposition de l’Esadse et du CRI pour la Biennale du design toute proche quand l’annonce du report en 2022 changea tout. Plus question de déployer matériellement les projets prévus dans la Cité du design! Aucune frustration cependant. Notre sujet, la réinvention des écoles, bloquées dans les impasses du temps présent, n’allait pas nous attendre jusqu’à une meilleure saison. A l’époque de la distanciation sociale et du télétravail, nous avons spontanément investi un double numérique de l’exposition, qui deviendrait, en amont de l’exposition physique, un lieu de réflexion collective. Nous avons ainsi commencé le chemin vers la Biennale reportée en imaginant une planète virtuelle où héberger et incuber Le Monde sinon rien. Notre collectif curatorial s’est étendu au Random, le laboratoire numérique dirigé par David-Olivier Lartigaud,  et aux créateurs graphiques de l’Esadse, encadrés par Michel Lepetitdidier et Denis Couegnoux.
				</p>
				<p>
					Pendant un an, le projet va s’affirmer et la planète numérique sera un territoire de création pour les étudiants de l’Esadse et du CRI, et bien d’autres qui déjà agrandissent le cercle. Les écoles, toutes les écoles, des petites aux grandes entrent dans un âge de transformation. Il ne s’agit plus de réforme pédagogique. Le temps où on actualisait des programmes ou créait des cursus s’est épuisé. Les changements sont trop forts, les échéances sont là.
				</p>
				<p>
					La jeunesse présente aujourd’hui dans les écoles est appelée à prendre soin du monde, mieux que les vieux ne l’ont fait, et, déjà, elle s’y emploie : elle accepte l’état du monde, elle reçoit le monde dans cet état. Dans le cadre sécurisé des écoles, des ateliers, des laboratoires, elle s’entraîne discrètement à des inventions radicales. De quels apprentissages la jeunesse a-t-elle réellement besoin ? Quel corps de connaissances, d’idées, de croyances, quelles expériences émotionnelles et esthétiques sont fondamentales pour traverser une telle époque, et agencer des espaces de vie bonne ?
				</p>

				<h1 ref="litterature">Partie 1</h1>
				<p>
					Gropius crée le Bauhaus à Weimar en 1919. Il imagine une école pour des artistes et artisans capables de dessiner les objets qui donneront du sens à une époque bouleversée. L’art et le design vont alors innerver de nouveaux espaces domestiques, de nouveaux espaces démocratiques, et créer la sémiologie moderne des objets de tous les jours. Le Bauhaus se reconfigurera, à Dessau, puis à Berlin, face aux épreuves de la crise financière de 29, du nazisme, et de la Guerre Froide, pour renaître à Chicago avec Moholy-Nagy. Le Black Mountain College à son tour inspirera de nombreuses écoles d’art et de design. Issu des idées de John Dewey il fait de l’apprentissage une expérience holistique, d’enquête, d’observation et de création, et abritera de grands plasticiens et poètes du 20è siècle. 
				</p>
				<p>
					Les avant-gardes naissent dans les écoles. Le Monde sinon rien n’est pas une école, mais il se constitue en plateforme ouverte à l’amorce d’un dialogue sur les transformations. Il invite à lier une réinvention des écoles à la pensée de Donna Haraway, Anna Tsing, Vinciane Despret, Baptiste Morizot, Bruno Latour. Il propose une gamme d’objets créatifs, qui traduisent l’embarquement des sciences et des arts dans l’anthropocène. A partir des matériaux exposés, et dans l’attente de 2022, il s’offre comme une base d’où partir en expédition. Dans les programmes de rentrée des écoles partenaires, s’inscriront des workshops qui travailleront un dessin du monde, des enquêtes, des expériences d’apprentissage. Les étudiants mèneront leurs expéditions, feront leur programme de création, et produiront les œuvres exposées en 2022. 
				</p>
				<p>
					Dans l’esprit d’un New Bauhaus en gestation, le Monde sinon rien facilite et amorce une école virtuelle de re-création, en mettant en réseau écoles, laboratoires et ateliers. Le travail créateur des étudiants vient s’ancrer dans un état du monde, afin que  s’affirme leur capacité à  redessiner les objets du monde, vivants et non vivants, humains et non humains. 
				</p>

				<h1 ref="etat" id="main.etat">Partie 2</h1>

				<p>
					Comme le Bauhaus a proposé une sémiotique de la modernité, un New Bauhaus pourrait proposer une sémiotique des intelligences collectives, exprimant les bifurcations radicales,  les rendant belles, désirables et intéressantes. 
				</p>
				<p>
					Ici d’autres écoles, d’autres territoires, se découvriront et composeront un tableau vivant de propositions nouvelles. D’où l’image d’une planète pour représenter le terrain créatif de Saint-Etienne, une planète voisine d’autres planètes, une galaxie arts, sciences et design qui symbolise le défigement des mondes et l’ouverture d’espaces de pensée non finis.
				</p>
			</div>
		</div>
	</div>     
</template>


<script>
	export default {
		name: "ContentMain",
		
		methods: {	

			scrollTo:function(ID) {
				if (this.$refs[ID]) {
					console.log("scroll to", ID)
				}
			},

			getElemPos:function(ref){
				if (!this.$refs[ref])
					return null;
				else
					console.log(this.$refs[ref])
			}
		}

	};
</script>


<style scoped lang="less">
</style>