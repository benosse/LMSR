<template>

	<!-- main div -->
	<div class="main" ref="content" id="content" @wheel="onWheel"
	>

		<ContentLitterature v-if="selectorIs('litterature')" :id="target"/>	
		<ContentProjets v-else-if="selectorIs('projets')" :id="target"/>	
		<ContentEtat v-else-if="selectorIs('etat')" :id="target"/>	

		<div class="width2 left66 gutter btp-regular">

			<h1 ref="home" id="content.home">Partie 1</h1>
			<p>    
				En mars 2021, nous préparions Le Monde sinon rien, l’exposition de l’Esadse et du CRI pour la Biennale du design toute proche quand l’annonce du report en 2022 changea tout. Plus question de déployer matériellement les projets prévus dans la Cité du design! Aucune frustration cependant. Notre sujet, la réinvention des écoles, bloquées dans les impasses du temps présent, n’allait pas nous attendre jusqu’à une meilleure saison. A l’époque de la distanciation sociale et du télétravail, nous avons spontanément investi un double numérique de l’exposition, qui deviendrait, en amont de l’exposition physique, un lieu de réflexion collective. Nous avons ainsi commencé le chemin vers la Biennale reportée en imaginant une planète virtuelle où héberger et incuber Le Monde sinon rien. Notre collectif curatorial s’est étendu au Random, le laboratoire numérique dirigé par David-Olivier Lartigaud,  et aux créateurs graphiques de l’Esadse, encadrés par Michel Lepetitdidier et Denis Couegnoux.
			</p>
			<p>
				Pendant un an, le projet va s’affirmer et la planète numérique sera un territoire de création pour les étudiants de l’Esadse et du CRI, et bien d’autres qui déjà agrandissent le cercle. Les écoles, toutes les écoles, des petites aux grandes entrent dans un âge de transformation. Il ne s’agit plus de réforme pédagogique. Le temps où on actualisait des programmes ou créait des cursus s’est épuisé. Les changements sont trop forts, les échéances sont là.
			</p>
			<p>
				La jeunesse présente aujourd’hui dans les écoles est appelée à prendre soin du monde, mieux que les vieux ne l’ont fait, et, déjà, elle s’y emploie : elle accepte l’état du monde, elle reçoit le monde dans cet état. Dans le cadre sécurisé des écoles, des ateliers, des laboratoires, elle s’entraîne discrètement à des inventions radicales. De quels apprentissages la jeunesse a-t-elle réellement besoin ? Quel corps de connaissances, d’idées, de croyances, quelles expériences émotionnelles et esthétiques sont fondamentales pour traverser une telle époque, et agencer des espaces de vie bonne ?
			</p>

			<h1 ref="etat" id="content.etat">Etat du monde</h1>
			<p>
				Gropius crée le Bauhaus à Weimar en 1919. Il imagine une école pour des artistes et artisans capables de dessiner les objets qui donneront du sens à une époque bouleversée. L’art et le design vont alors innerver de nouveaux espaces domestiques, de nouveaux espaces démocratiques, et créer la sémiologie moderne des objets de tous les jours. Le Bauhaus se reconfigurera, à Dessau, puis à Berlin, face aux épreuves de la crise financière de 29, du nazisme, et de la Guerre Froide, pour renaître à Chicago avec Moholy-Nagy. Le Black Mountain College à son tour inspirera de nombreuses écoles d’art et de design. Issu des idées de John Dewey il fait de l’apprentissage une expérience holistique, d’enquête, d’observation et de création, et abritera de grands plasticiens et poètes du 20è siècle. 
			</p>
			<p>
				Les avant-gardes naissent dans les écoles. Le Monde sinon rien n’est pas une école, mais il se constitue en plateforme ouverte à l’amorce d’un dialogue sur les transformations. Il invite à lier une réinvention des écoles à la pensée de Donna Haraway, Anna Tsing, Vinciane Despret, Baptiste Morizot, Bruno Latour. Il propose une gamme d’objets créatifs, qui traduisent l’embarquement des sciences et des arts dans l’anthropocène. A partir des matériaux exposés, et dans l’attente de 2022, il s’offre comme une base d’où partir en expédition. Dans les programmes de rentrée des écoles partenaires, s’inscriront des workshops qui travailleront un dessin du monde, des enquêtes, des expériences d’apprentissage. Les étudiants mèneront leurs expéditions, feront leur programme de création, et produiront les œuvres exposées en 2022. 
			</p>
			<p>
				Dans l’esprit d’un New Bauhaus en gestation, le Monde sinon rien facilite et amorce une école virtuelle de re-création, en mettant en réseau écoles, laboratoires et ateliers. Le travail créateur des étudiants vient s’ancrer dans un état du monde, afin que  s’affirme leur capacité à  redessiner les objets du monde, vivants et non vivants, humains et non humains. 
			</p>

			<h1 ref="litterature" id="content.litterature">Litterature</h1>

			<p>
				Comme le Bauhaus a proposé une sémiotique de la modernité, un New Bauhaus pourrait proposer une sémiotique des intelligences collectives, exprimant les bifurcations radicales,  les rendant belles, désirables et intéressantes. 
			</p>
			<p>
				Ici d’autres écoles, d’autres territoires, se découvriront et composeront un tableau vivant de propositions nouvelles. D’où l’image d’une planète pour représenter le terrain créatif de Saint-Etienne, une planète voisine d’autres planètes, une galaxie arts, sciences et design qui symbolise le défigement des mondes et l’ouverture d’espaces de pensée non finis.
			</p>

			<h1 ref="projets" id="content.projets">Projets</h1>
			<p>
				Comme le Bauhaus a proposé une sémiotique de la modernité, un New Bauhaus pourrait proposer une sémiotique des intelligences collectives, exprimant les bifurcations radicales,  les rendant belles, désirables et intéressantes. 
			</p>
			<p>
				Ici d’autres écoles, d’autres territoires, se découvriront et composeront un tableau vivant de propositions nouvelles. D’où l’image d’une planète pour représenter le terrain créatif de Saint-Etienne, une planète voisine d’autres planètes, une galaxie arts, sciences et design qui symbolise le défigement des mondes et l’ouverture d’espaces de pensée non finis.
			</p>
			<h1 ref="projets.soin" >soin</h1>
			<h1 ref="projets.main" >main</h1>
			<h1 ref="projets.donnees" >donnees</h1>
			<h1 ref="projets.systemes" >systemes</h1>
			<h1 ref="projets.epreuves" >epreuves</h1>
			<h1 ref="projets.invisible" >invisible</h1>


			<h1 ref="poleTerre" id="content.poleTerre">Pole Terre</h1>

			<div id="bottom">

			</div>

		</div>
	</div>  

</template>

<script>


import ContentHome from "./ContentHome.vue"
import ContentEtat from "./etat/ContentEtat.vue"
import ContentLitterature from "./litterature/ContentLitterature.vue"
import ContentProjets from "./projets/ContentProjets.vue"
import ContentPoleTerre from "./poleTerre/ContentPoleTerre.vue"


var VueScrollTo = require('vue-scrollto');

export default {
	name: "Content",

	components: {
		ContentEtat,
		ContentProjets,
		ContentLitterature,
		ContentHome,
		ContentPoleTerre,
	},

	//tmp : à terme on utilisera les id de la BDD et meteor pour dynamiser le contenu
	props: ["isMobile"],

	data(){
		return {
			isActive:false,		
			//current content tracker
			selector:null,
			target:null,
		}
	},

	mounted(){
		this.$el.scrollTo(0,0);
	},

    methods: {
		selectorIs(selector) {
			return this.selector == selector;
		},

		activate(){
			console.log("activating content")
			this.isActive = true;
		},

		desactivate() {
			console.log("desactivating content")
			this.isActive = false;
		},

		onWheel(e) {
			console.log("wheel on content, ", this.isActive)
			if(!this.isActive)
				e.preventDefault();
		},

		showScene() {
			this.$root.showScene();
			this.desactivate();
		},

		changeContent(selector, target) {
			console.log("change content to", selector, target);		
			this.target = target;
			this.selector = selector;
		},

		scrollContent(target, duration) {
			console.log("scroll content to", target, "in", duration)

			this.selector = null;
			this.target = null;

			const options = {
				container: '#content',
				easing: 'ease-in',
				lazy: false,
				offset: this.isMobile?-4:-30,
				force: true,
				cancelable: false,
				onStart: function(element) {
				// scrolling started
				},
				onDone: function(element) {
				// scrolling is done
				},
				onCancel: function() {
				// scrolling has been interrupted
				},
				x: false,
				y: true
			}
			


			const targetEl = this.$refs[target];
			VueScrollTo.scrollTo(targetEl, duration, options)
		}
    },
	
};



</script>


<style scoped lang="less">

	#content {

		#bottom {
			margin-bottom:100vh;
		}

		h1 {
			display:block;
		}


	}

	

	
			
</style>