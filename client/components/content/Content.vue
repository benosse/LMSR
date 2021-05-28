<template>

	<!-- main div -->
	<div class="main" ref="content" id="content" @wheel="onWheel" :class="{visible:!isShowingScene, hidden:isShowingScene, under:isUnder}"
	>
		<ContentLitterature class="over" v-if="selectorIs('litterature')" :id="target"/>	
		<ContentProjets class="over" v-else-if="selectorIs('projets')" :id="target"/>	
		<ContentEtat class="over" v-else-if="selectorIs('etat')" :id="target"/>	
		<ContentCredits class="over" v-else-if="selectorIs('credits')"/>	



		<div class="width2 left66 gutter btp-regular">
<!-- INTRO -->
			<h1 ref="home"><span class="underlined">Le monde sinon rien</span></h1>
			<!-- <a class="mouseTarget linkScene" @click="onClickScene('home')">Accéder à l'espace en 3D</a> -->

			<p class="btp-regular">
			En mars 2021, nous préparions Le Monde sinon rien, l’exposition de l’Esadse et du CRI pour la Biennale du design toute proche quand l’annonce du report en 2022 changea tout. Plus question de déployer matériellement les projets prévus dans la Cité du design ! Aucune frustration cependant. Notre sujet, la réinvention des écoles, bloquées dans les impasses du temps présent, n’allait pas nous attendre jusqu’à une meilleure saison.</p>
			<p class="btp-light">
			À l’époque de la distanciation sociale et du télétravail, nous avons spontanément investi un double numérique de l’exposition, qui deviendrait, en amont de l’exposition physique, un lieu de réflexion collective. Nous avons ainsi commencé le chemin vers la Biennale reportée en imaginant une planète virtuelle où héberger et incuber Le Monde sinon rien. Notre collectif curatorial s’est étendu au Random, le laboratoire numérique dirigé par David-Olivier Lartigaud, et aux créateurs graphiques de l’Esadse, encadrés par Michel Lepetitdidier et Denis Couegnoux.
			Pendant un an, le projet va s’affirmer et la planète numérique sera un territoire de création pour les étudiants de l’Esadse et du CRI, et bien d’autres qui déjà agrandissent le cercle. Les écoles, toutes les écoles, des petites aux grandes entrent dans un âge de transformation. Il ne s’agit plus de réforme pédagogique. Le temps où on actualisait des programmes ou créait des cursus s’est épuisé. Les changements sont trop forts, les échéances sont là.
			</p>
			<p class="btp-regular">La jeunesse présente aujourd’hui dans les écoles est appelée à prendre soin du monde, mieux que les vieux ne l’ont fait, et, déjà, elle s’y emploie : elle accepte l’état du monde, elle reçoit le monde dans cet état. Dans le cadre sécurisé des écoles, des ateliers, des laboratoires, elle s’entraîne discrètement à des inventions radicales. 
			</p>
			<p class="btp-light">
			De quels apprentissages la jeunesse a-t-elle réellement besoin ? Quel corps de connaissances, d’idées, de croyances, quelles expériences émotionnelles et esthétiques sont fondamentales pour traverser une telle époque, et agencer des espaces de vie bonne ?
			<p class="btp-light">
			Gropius crée le Bauhaus à Weimar en 1919. Il imagine une école pour des artistes et artisans capables de dessiner les objets qui donneront du sens à une époque bouleversée. L’art et le design vont alors innerver de nouveaux espaces domestiques, de nouveaux espaces démocratiques, et créer la sémiologie moderne des objets de tous les jours. Le Bauhaus se reconfigurera, à Dessau, puis à Berlin, face aux épreuves de la crise financière de 29, du nazisme, et de la Guerre Froide, pour renaître à Chicago avec Moholy-Nagy. Le Black Mountain College à son tour inspirera de nombreuses écoles d’art et de design. Issu des idées de John Dewey il fait de l’apprentissage une expérience holistique, d’enquête, d’observation et de création, et abritera de grands plasticiens et poètes du 20è siècle. 
			Les avant-gardes naissent dans les écoles.</p>
			<p class="btp-light">
			Le Monde sinon rien n’est pas une école, mais il se constitue comme une plateforme d’amorce du dialogue sur les transformations. Il invite à lier une réinvention des écoles à la pensée de Donna Haraway, Anna Tsing, Vinciane Despret, Baptiste Morizot, Bruno Latour. Il propose une gamme d’objets créatifs, qui traduisent l’embarquement des sciences et des arts dans l’anthropocène. À partir des matériaux exposés, et dans l’attente de 2022, il s’offre comme une base d’où partir en expédition. Dans les programmes de rentrée des écoles partenaires, s’inscriront des workshops qui travailleront un dessin du monde, des enquêtes, des expériences d’apprentissage. Les étudiants mèneront leurs expéditions, feront leur programme de création, et produiront les œuvres exposées en 2022. 
			</p>
			<p class="btp-light">
			Dans l’esprit d’un New Bauhaus en gestation, le Monde sinon rien facilite et amorce une école virtuelle de re-création, en mettant en réseau écoles, laboratoires et ateliers. Le travail créateur des étudiants vient s’ancrer dans un état du monde, afin que s’affirme leur capacité à redessiner les objets du monde, vivants et non vivants, humains et non humains. 
			</p>
			<p class="btp-regular">
			Comme le Bauhaus a proposé une sémiotique de la modernité, un New Bauhaus pourrait proposer une sémiotique des intelligences collectives, exprimant les bifurcations radicales, les rendant belles, désirables et intéressantes. 
			</p>
			<p class="btp-light">
			Ici d’autres écoles, d’autres territoires, se découvriront et composeront un tableau vivant de propositions nouvelles. D’où l’image d’une planète pour représenter le terrain créatif de Saint-Etienne, une planète voisine d’autres planètes, une galaxie arts, sciences et design qui symbolise le défigement des mondes et l’ouverture d’espaces de pensée non finis.
			</p>
				

<!-- ETAT DU MONDE -->
			<h1 ref="etat"><span class="underlined">L'état du monde</span></h1>

			<!-- 3D link -->
			<a v-if="!isMobile" class="mouseTarget linkScene" @click="onClickScene('etat')">Accéder à l'état du monde en 3D</a>

			<p class="btp-regular">
			Le Monde sinon rien ouvre avec quatre récits qui évoquent le monde que reçoit la jeunesse, un monde chargé de menaces et cependant sensible et divers, rendu vivant et même palpitant par les événements intenses et  les lointaines histoires,  qui percent l’oubli pour ranimer le présent. 
			</p>
			<p class="btp-light">
			Ces récits ont été choisis et composés par le collectif curatorial, et sont faits d’images confiées par des partenaires de la Biennale de Saint-Etienne. Vincent Toublanc, de l’INA, a offert un ensemble représentant la place grandissante des catastrophes dites “naturelles”, et qui saturent notre actualité d’alertes très angoissantes.  Pierre Fernandez, à l’AFP, a choisi pour la Biennale dix images qui reflètent la bifurcation de l’activité journalistique depuis le début de 2020 : la pandémie a tout transformé, les sujets, les enquêtes, les postures. Ensuite nous avons puisé dans les images du passé : les Archives de la planète, publiées en open data par le Musée Albert Kahn et la Région Île-de-France nous ont donné  des photos des paysages industriels des années 1920. Enfin Lisa Swieton et Victor Oozeer nous confient l’annonce de leur film. Constitué grâce aux archives cinématographiques de la ville Saint-Etienne, dans lesquelles les a guidés Antoine Ravat, leur conservateur, ce film sera un grand moment de la Biennale 2022.
			</p>

			<a class="mouseTarget linkContent" 
			@click="onClickEtat('etat1')">2020 - Pandémie</a>
			<a class="mouseTarget linkContent" @click="onClickEtat('etat2')">2020 - Catastrophes spectaculaires</a>
			<a class="mouseTarget linkContent" 
			@click="onClickEtat('etat3')">1910 - Les Archives de la Planète</a>
			<a class="mouseTarget linkContent" 
			@click="onClickEtat('etat4')">Saint-Étienne, territoire créatif</a>
			
 
			
<!-- LITTERATURE -->
			<h1 ref="litterature"><span class="underlined">Littérature fertile</span></h1>

			<!-- 3D link -->
			<a v-if="!isMobile" class="mouseTarget linkScene" @click="onClickScene('litterature')">Accéder à la littérature fertile en 3D</a>

			<p class="btp-regular">
				L’histoire du Monde sinon rien commence avec Le Champignon de la fin du monde, d’Anna Tsing. Celle-ci retrace l’histoire du Matsutake, un champignon disparu au Japon, alors qu’il  est essentiel à la culture gastronomique. Le Matsutake est réapparu dans les forêts de l’Oregon, si meurtries par les incendies et les pollutions qu’elles semblaient stériles. 
			</p>
			<p class="btp-light">
				Sa cueillette fait désormais vivre des communautés marginalisées, qui ont su agencer un fructueux marché mondialisé. Anna Tsing expose les « possibilités de vivre dans les ruines du capitalisme », art qui donne son sous-titre au livre, en montrant que des mondes abîmés s’enchevêtrent à des mondes fertiles, ce qu’elle nomme la « diversité contaminée ». Elle se fait aussi le chantre d’une science des nouveaux récits, récits complexes qui donnent le détail attentif d’enquêtes sur les formes de vie, et se révèle la science qui, instaurant une compréhension inter-espèces, pourrait aider à préserver la Terre.
			</p>
			<p class="btp-regular">
				Le Champignon de la fin du monde est devenu notre repère pour décrire les mondes des écoles. Ceux-ci sont encombrés de vestiges, et sont pourtant des lieux de vitalité. La jeunesse qui s’étonne, s’impatiente et se révolte contre l’inertie des pouvoirs, des industries, des systèmes sociaux, face aux menaces sur le vivant, est celle qui vit aujourd’hui dans les écoles. 
			</p>
			<p class="btp-light">
				Ces écoles invoquent toutes les besoins de création, et d’inventivité, et pas seulement les écoles d’art et design, également les écoles de sciences, d’industries, de politique et d’administration. Cependant, la reproduction l’emporte sur la création.
			</p>
			<p class="btp-light">
				Les étudiants sont face à un dilemme. Ils ne se reconnaissent pas toujours dans les apprentissages qu’on leur assigne, mais ils s’en accommodent, en sont curieux et savent les tisser avec leurs programmes personnels. Cependant ils cherchent des voies nouvelles et les écoles, et les laboratoires,  abritent leurs créations. Le Monde sinon rien a entrepris de décrire la « diversité contaminée » des écoles et laboratoires, la combinaison des vestiges et des renouveaux, sous la forme des projets de jeunes chercheurs et créateurs. Les productions des écoles s’y présentent comme de nouveaux objets, porteurs de récits qui rapportent des enquêtes scientifiques et artistiques sur des mondes en gestation que nous ne pouvons parfois pas encore percevoir.
			</p>
			<p class="btp-light">
				Pour accompagner ces projets, prototypes scientifiques, laboratoires participatifs, installations artistiques, films, tableaux, nous avons mis en place le cadre de pensée qui anime un domaine de la transformation écologique, la philosophie du vivant. Donna Haraway, philosophe, éthologue, biologiste, anthropologue, propose aux humains de renouer avec les autres espèces, qu’elle appelle « les terrestres » en leur portant attention. Cela opère un replacement de l’espèce humaine au milieu des autres espèces. Une juste place, et une attitude compréhensive et esthétique, en découlent, qui modifient toutes les relations, y compris inter-humaines. À la suite des écrits fondateurs de Donna Haraway, mais aussi de Bruno Latour et Isabelle Stengers, et bien sûr Anna Tsing, une génération d’auteurs, dont beaucoup de langue française, enrichit cette science des récits. 
			</p>
			<p class="btp-light">
				On trouvera ici de larges extraits de Baptiste Morizot qui écrit sur le pistage des loups, de Vinciane Despret, qui décrit de conserve les sociétés des oiseaux et les sociétés savantes qui les étudient. Grâce au travail créatif de l’Esadse et du CRI pour ce double numérique d’une « exposition-qui-existe-mais-n’a-pas-eu-lieu », ces très beaux textes sont installés comme des objets matériels, graphiques et sonores, et accompagnent le visiteur dans la découverte des travaux que Le Monde sinon rien soumet à la discussion.
			</p>						
			
<!-- PROJETS -->
			<h1 ref="projets"><span class="underlined">Objets vivants</span></h1>

			<!-- 3D link -->
			<a v-if="!isMobile" class="mouseTarget linkScene" @click="onClickScene('projets')">Accéder aux objets vivants en 3D</a>

			<p class="btp-light">
				L’exposition invite à vivre les étapes d’une enquête. Au départ il y a la question de ce qu’est un territoire, un lieu où l’on vit et dont on dépend. Ensuite il y a les façons multiples de le ressentir, de l’éprouver, d’en être ému, ce que nous avons nommé la sensibilité. Puis arrivent les solutions pour le dessiner, le modéliser, le rendre visible, ce que nous appelons, d’après Vinciane Despret, les polyphonies. Enfin les mondes enchevêtrés s’organisent. Il y faut des opérations qui définissent les coexistences, des négociations et médiations, que Baptiste Morizot nomme les diplomaties. Ainsi émerge le sujet du futur : qu’allons-nous faire ensemble de ces récits ? Comment organiser le territoire futur ?
			</p>	
			<p class="btp-regular">
				À ce stade de la réflexion collective qui anime sur une longue durée le dialogue entre le CRI, l’Esadse et la Cité du design, c’est cela que nous définissons comme les chemins d’apprentissage dont émergent les mondes en gestation, inconnus, non perçus, mondes qui offrent à la jeunesse créative des chemins praticables de réinvention.
			</p>
			<p class="btp-light">
				Cette première version de notre Monde sinon rien, numérique, est un appel aux diplomaties : nous aimerions que les étudiants des écoles de création, qu’elles soient en sciences, en art, en design, en ingénierie, en politique,  rejoignent ce territoire qui s’offre, et inventent ainsi le Bauhaus de l’Anthropocène, ou du Chthulucène si l’on veut bien parler comme Donna Haraway, le territoire-réseau des écoles de notre modernité.
				De ces négociations, concrétisées par de nouveaux projets, sortiront d’autres contenus, qui enrichiront une seconde version du Monde sinon rien numérique.
			</p>


			<h2 ref="projets.enquete">Enquête</h2>

			<!-- 3D link --> 
			<a v-if="!isMobile" class="mouseTarget linkScene" @click="onClickScene('projets.enquete')">Accéder à l'enquête en 3D</a>

			<p class="btp-light">
			Au départ, il y a un regard, une impatience, une intuition. Ce peut être une attention à un paysage, à un comportement, à des idées, un engagement pour une cause et dans une lutte.  On cherche à savoir comment les choses étaient avant ou pourraient être demain, pourquoi elles sont ainsi. Il faut se renseigner, observer, se laisser guider par les conversations et les lectures, explorer. C’est l’enquête. Elle produit de la connaissance. Bruno Latour, dans ses récents écrits, fait de l’enquête le moyen de comprendre ce qui nous lie les uns aux autres, et aux lieux où nous vivons. 
			</p>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('enquete', 'guy')">Guy Aidelberg</a>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('enquete', 'felix')">Félix Hol</a>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('enquete', 'ines')">Inès Leménèc</a>


			<h2 ref="projets.sensibilite">Sensibilité</h2>

			<!-- 3D link --> 
			<a v-if="!isMobile" class="mouseTarget linkScene" @click="onClickScene('projets.sensibilite')">Accéder à la sensibilité en 3D</a>

			<p class="btp-light">
			Pour maintenir son attention, il faut être touché. La relation à l’objet de l’enquête est esthétique, c’est-à-dire que l’observation, l’écoute, le toucher, la vue font naître une émotion. Qu’il s’agisse de la vie animale, du changement d’un paysage, d’une réalité sous-jacente que l’on veut mettre au jour, d’une passion pour un sujet scientifique, d’empathie pour une situation,  d’une envie d’agir avec d’autres, la sensibilité, la compassion, la joie, la créativité, l’angoisse, le désir de savoir vont pousser à aller plus loin dans l’enquête et dans l’action. 
			</p>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('sensibilite', 'bastian')">Bastian Greshake Tzovaras</a>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('sensibilite', 'katja')">Katja Heuer / Roberto Toro </a>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('sensibilite', 'dorian')">Dorian Felgines</a>


			<h2 ref="projets.polyphonie">Polyphonie</h2>

			<!-- 3D link --> 
			<a v-if="!isMobile" class="mouseTarget linkScene" @click="onClickScene('projets.polyphonie')">Accéder à la polyphonie 3D</a>

			<p class="btp-light">
			Les auteurs que nous suivons aiment qualifier notre époque de phonocène, une ère où l’on entend les sons des vivants, les voix humaines, les bruits des villes, l’activité des insectes et des oiseaux et les grondements de la terre. Enquêter, c’est découvrir une polyphonie du monde, les bruits par lesquels les informations se signalent à notre attention. Cette polyphonie exprime une diversité des modes de vie, des modes de présence et d’action. Les sons sont localisés dans l’espace d’un territoire. L’enquête les entend, les recense et en fait un matériau pour l’interprétation.
			</p>
			<a class="mouseTarget linkContent"  @click="onClickEtudiant('polyphonie', 'valentine')">Valentine Maupetit Kadawa</a>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('polyphonie', 'alexis')">Alexis Guidet</a>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('polyphonie', 'pauline')">Pauline Provini</a>


			<h2 ref="projets.territoire">Territoire</h2>

			<!-- 3D link --> 
			<a v-if="!isMobile" class="mouseTarget linkScene" @click="onClickScene('projets.territoire')">Accéder au territoire en 3D</a>

			<p class="btp-light">
			L’enquête décrit les liens d’interdépendance qu’entretiennent les vivants dans un espace. Latour propose de nommer territoire l’espace défini par les liens que nous entretenons avec lui, et de partir de ces liens pour mener l’enquête, exprimer des doléances, imaginer comment ces liens pourraient évoluer, et négocier la forme que le territoire devrait et pourrait prendre dans le futur.  
			</p>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('territoire', 'lucas')">Lucas Macabéo</a>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('territoire', 'mathilde')">Mathilde Reynaud</a>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('territoire','clara')">Clara Monteil</a>


			<h2 ref="projets.diplomatie">Diplomatie</h2>
			<!-- 3D link --> 
			<a v-if="!isMobile" class="mouseTarget linkScene" @click="onClickScene('projets.diplomatie')">Accéder à la diplomatie en 3D</a>

			<p class="btp-light">
			Si l’on veut que chacun et chacune s’entende dans cette polyphonie, on a besoin de médiateurs. Des négociations sont nécessaires pour comprendre les controverses autour de l’occupation d’un territoire, et de certains modes d’être. C’est un champ d’action pour de nouvelles diplomaties de coexistence des ordres et des espèces. La diplomatie organise les consultations sur le futur des territoires, par la renégociation des liens entretenus avec lui par les divers occupants.
			</p>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('diplomatie', 'benoit')">Benoît Zenker</a>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('diplomatie', 'lola')">Lola Hen</a>
			<a class="mouseTarget linkContent" @click="onClickEtudiant('diplomatie', 'marc')">Thomas Landrain / Marc Santolini</a>

		
<!-- POLE TERRE-->
			<h1 ref="poleTerre"><span class="underlined">Terre</span></h1>

			<!-- 3D link -->
			<a v-if="!isMobile" class="mouseTarget linkScene" @click="onClickScene('terre')">Accéder à la terre en 3D</a>

			<p class="btp-regular">
				Lancé en janvier 2021, le Pôle Terre est un espace de travail et d’expérimentation qui s’inscrit dans le programme pédagogique de l’Ecole supérieure d’art et design de Saint-Étienne, au même titre que les ateliers techniques (bois, métal, photo, édition, numérique). Pour les futur·e·s artistes et designers, c’est un jardin-atelier qui permet d'appréhender collectivement notre rapport au vivant. 
			</p>
			<p class="btp-light">
				Le jardinage devient le terrain d’un processus créatif dans le cursus de l’école : apprendre à semer, à patienter puis récolter, découvrir les plantes et leur évolution, être familier de la terre et du compost, considérer le rôle de l'eau, de l'air et des saisons... Autant d'apprentissages et d'outils qui se trouvent être des portes d’entrée vers une pensée écologique en pratique. Ces questions sont cruciales dans l’évolution du designer ou de l’artiste, elles lui permettent d'interroger son rapport à l’alimentation, à l’agriculture, à la production en général, à la nature et aux autres...
			</p>


			<div id="bottom"></div>

		</div>
	</div>  

</template>

<script>

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
		ContentPoleTerre,
	},

	//tmp : à terme on utilisera les id de la BDD et meteor pour dynamiser le contenu
	props: ["isMobile", "isShowingScene", "isShowingHelp"],

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

		onWheel(e) {
			if(this.isShowingScene)
				e.preventDefault();
		},


		onClickRef(target) {
			//teleport & change content
			this.$root.onClickRef(target);
		},

		onClickEtudiant(selector, target) {
			//teleport to groupe
			//also scroll content to selector...
			this.$root.onClickRef("projets." + selector);		
			//change content
			this.changeContent("projets", target)
		},
		onClickEtat(target) {
			//teleport to groupe
			//also scroll content to selector...
			this.$root.onClickRef("etat");
			//change content
			this.changeContent("etat", target)
		},

		onClickScene(target) {
			//show scene
			this.$root.showScene();
			//teleport & change content
			this.$root.onClickRef(target);
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

	computed: {
		isUnder:function(){
			return (this.selector != null);
		}
	}
	
};



</script>


<style scoped lang="less">

	@keyframes show {
		0% {	
			z-index:0;
			opacity:0.3;		
		}

		100% {
			opacity:1;
		}
	}

	#content {

		#bottom {
			margin-bottom:50vh;
		}

		h1 {
			display:block;
		}

		h2 {
			margin-bottom:30px;
			margin-top:30px;
		}

		&.hidden {
			z-index:-9999;
			opacity:1;

			pointer-events: none;
		}

		&.visible {
			animation-name: show;
  			animation-duration: 1s;
			animation-fill-mode: forwards; 
			pointer-events: auto;
			opacity:1;
		}

		&.under {
			visibility:hidden;
		}
	}

	.over {
		visibility: visible;
	}

	

	
			
</style>