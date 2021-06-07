import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',

    routes: [
        { path: '/', name: "default" },

        { path: '/accueil', name: "home", meta: { selector: "main", target: "home" } },

        { path: '/etat-du-monde', name: "etat", meta: { selector: "main", target: "etat" } }, ,
        { path: '/etat-du-monde/2020-pandemie', name: "etat.etat1", meta: { selector: "etat", target: "etat1" } },
        { path: '/etat-du-monde/2020-catastrophes-spectaculaires', name: "etat.etat2", meta: { selector: "etat", target: "etat2" } },
        { path: '/etat-du-monde/les-archives-de-la-planete', name: "etat.etat3", meta: { selector: "etat", target: "etat3" } },
        { path: '/etat-du-monde/saint-etienne-territoire-creatif', name: "etat.etat4", meta: { selector: "etat", target: "etat4" } },

        { path: '/litterature-fertile', name: "litterature", meta: { selector: "main", target: "litterature" } },
        { path: '/litterature-fertile/Anna-Tsing', name: "litterature.AT", meta: { selector: "litterature", target: "AT" } },
        { path: '/litterature-fertile/Baptiste-Morizot', name: "litterature.BM", meta: { selector: "litterature", target: "BM" } },
        { path: '/litterature-fertile/Bruno-Latour', name: "litterature.BL", meta: { selector: "litterature", target: "BL" } },
        { path: '/litterature-fertile/Donna-Haraway', name: "litterature.DH", meta: { selector: "litterature", target: "DH" } },
        { path: '/litterature-fertile/Nastassja-Martin', name: "litterature.NM", meta: { selector: "litterature", target: "NM" } },
        { path: '/litterature-fertile/Sarah-Vanuxem', name: "litterature.SV", meta: { selector: "litterature", target: "SV" } },
        { path: '/litterature-fertile/Vinciane-Despret', name: "litterature.VD", meta: { selector: "litterature", target: "VD" } },

        { path: '/objet-vivants', name: "objets", meta: { selector: "main", target: "objets" } },

        { path: '/objet-vivants/enquete', name: "objets.enquete", meta: { selector: "main", target: "objets.enquete" } },
        { path: '/objet-vivants/sensibilite', name: "objets.sensibilite", meta: { selector: "main", target: "objets.sensibilite" } },
        { path: '/objet-vivants/polyphonie', name: "objets.polyphonie", meta: { selector: "main", target: "objets.polyphonie" } },
        { path: '/objet-vivants/territoire', name: "objets.territoire", meta: { selector: "main", target: "objets.territoire" } },
        { path: '/objet-vivants/diplomatie', name: "objets.diplomatie", meta: { selector: "main", target: "objets.diplomatie" } },

        { path: '/objet-vivants/alexis-guidet', name: "objets.alexis", meta: { selector: "objets", target: "alexis" } },
        { path: '/objet-vivants/bastian-greshake-tzovaras', name: "objets.bastian", meta: { selector: "objets", target: "bastian" } },
        { path: '/objet-vivants/benoit-zenker', name: "objets.benoit", meta: { selector: "objets", target: "benoit" } },
        { path: '/objet-vivants/clara-monteil', name: "objets.clara", meta: { selector: "objets", target: "clara" } },
        { path: '/objet-vivants/dorian-felgines', name: "objets.dorian", meta: { selector: "objets", target: "dorian" } },
        { path: '/objet-vivants/felix-hol', name: "objets.felix", meta: { selector: "objets", target: "felix" } },
        { path: '/objet-vivants/guy-aidelberg', name: "objets.guy", meta: { selector: "objets", target: "guy" } },
        { path: '/objet-vivants/ines-lemenec', name: "objets.ines", meta: { selector: "objets", target: "ines" } },
        { path: '/objet-vivants/katja-heuer', name: "objets.katja", meta: { selector: "objets", target: "katja" } },
        { path: '/objet-vivants/lola-hen', name: "objets.lola", meta: { selector: "objets", target: "lola" } },
        { path: '/objet-vivants/lucas-maccabeo', name: "objets.lucas", meta: { selector: "objets", target: "lucas" } },
        { path: '/objet-vivants/marc-santolini', name: "objets.marc", meta: { selector: "objets", target: "marc" } },
        { path: '/objet-vivants/mathilde-reynaud', name: "objets.mathilde", meta: { selector: "objets", target: "mathilde" } },
        { path: '/objet-vivants/pauline-provini', name: "objets.pauline", meta: { selector: "objets", target: "pauline" } },
        { path: '/objet-vivants/valentine-maupetit-kadawa', name: "objets.valentine", meta: { selector: "objets", target: "valentine" } },

        { path: '/terre', name: "terre", meta: { selector: "main", target: "terre" } },
        { path: '/terre/pole-terre', name: "terre.poleTerre", meta: { selector: "terre", target: "poleTerre" } },
        { path: '/terre/jardin-punk', name: "terre.jardinPunk", meta: { selector: "terre", target: "jardinPunk" } },

        { path: '/commissariat-collectif', name: "credits", meta: { selector: "credits" } },

        { path: '/aide', name: "aide", meta: { selector: "aide" } },
    ]
});