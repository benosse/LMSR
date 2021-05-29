import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
	mode: 'history',

	routes: [
		{ path: '/', name:"default"},

		{ path: '/accueil', name:"home", meta:{selector:"home"}},

		{ path: '/etat-du-monde', name:"etat", meta:{selector:"etat"}},,
		{ path: '/etat-du-monde/2020-pandemie', name:"etat.etat1", meta:{selector:"etat", target:"etat1"}},
		{ path: '/etat-du-monde/2020-catastrophes-spectaculaires', name:"etat.etat2", meta:{selector:"etat", target:"etat2"}},
		{ path: '/etat-du-monde/les-archives-de-la-planete', name:"etat.etat3", meta:{selector:"etat", target:"etat3"}},
		{ path: '/etat-du-monde/saint-etienne-territoire-creatif', name:"etat.etat4", meta:{selector:"etat", target:"etat4"}},

		{ path: '/litterature-fertile', name:"litterature", meta:{selector:"litterature"}},
		{ path: '/litterature-fertile/Anna-Tsing', name:"litterature.AT", meta:{selector:"litterature", target:"AT"}},
		{ path: '/litterature-fertile/Baptiste-Morizot', name:"litterature.BM", meta:{selector:"litterature", target:"BM"}},
		{ path: '/litterature-fertile/Bruno-Latour', name:"litterature.BL", meta:{selector:"litterature", target:"BL"}},
		{ path: '/litterature-fertile/Donna-Haraway', name:"litterature.DH", meta:{selector:"litterature", target:"DH"}},
		{ path: '/litterature-fertile/Nastassja-Martin', name:"litterature.NM", meta:{selector:"litterature", target:"NM"}},
		{ path: '/litterature-fertile/Sarah-Vanuxem', name:"litterature.SV", meta:{selector:"litterature", target:"SV"}},
		{ path: '/litterature-fertile/Vinciane-Despret', name:"litterature.VD", meta:{selector:"litterature", target:"VD"}},
		
		{ path: '/objet-vivants', name:"objets", meta:{selector:"objets"}},

		{ path: '/objet-vivants/enquete', name:"objets.enquete", meta:{selector:"objets.enquete"}},
		{ path: '/objet-vivants/sensibilite', name:"objets.sensibilite", meta:{selector:"objets.sensibilite"}},
		{ path: '/objet-vivants/polyphonie', name:"objets.polyphonie", meta:{selector:"objets.polyphonie"}},
		{ path: '/objet-vivants/territoire', name:"objets.territoire", meta:{selector:"objets.territoire"}},
		{ path: '/objet-vivants/diplomatie', name:"objets.diplomatie", meta:{selector:"objets.diplomatie"}},

		{ path: '/terre', name:"terre", meta:{selector:"terre"}},

		{ path: '/commissariat-collectif', name:"credits", meta:{selector:"credits"}},
	]
});