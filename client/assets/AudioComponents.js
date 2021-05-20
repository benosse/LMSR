const THREE = AFRAME.THREE;
const audioLoader = new THREE.AudioLoader();

class PositionalAudioHelper extends THREE.Line {

	constructor( audio, range = 1, divisionsInnerAngle = 16, divisionsOuterAngle = 2, colorIn=0x00ff00, colorOut= 0xffff00) {

		const geometry = new THREE.BufferGeometry();
		const divisions = divisionsInnerAngle + divisionsOuterAngle * 2;
		const positions = new Float32Array( ( divisions * 3 + 3 ) * 3 );
		geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

		const materialInnerAngle = new THREE.LineBasicMaterial( { color: colorIn } );
		const materialOuterAngle = new THREE.LineBasicMaterial( { color: colorOut } );

		super( geometry, [ materialOuterAngle, materialInnerAngle ] );

		this.audio = audio;
		this.range = range;
		this.divisionsInnerAngle = divisionsInnerAngle;
		this.divisionsOuterAngle = divisionsOuterAngle;
		this.type = 'PositionalAudioHelper';

		this.update();

	}

	update() {

		const audio = this.audio;
		const range = this.range;
		const divisionsInnerAngle = this.divisionsInnerAngle;
		const divisionsOuterAngle = this.divisionsOuterAngle;

		const coneInnerAngle = THREE.MathUtils.degToRad( audio.panner.coneInnerAngle );
		const coneOuterAngle = THREE.MathUtils.degToRad( audio.panner.coneOuterAngle );

		const halfConeInnerAngle = coneInnerAngle / 2;
		const halfConeOuterAngle = coneOuterAngle / 2;

		let start = 0;
		let count = 0;
		let i;
		let stride;

		const geometry = this.geometry;
		const positionAttribute = geometry.attributes.position;

		geometry.clearGroups();

		//

		function generateSegment( from, to, divisions, materialIndex ) {

			const step = ( to - from ) / divisions;

			positionAttribute.setXYZ( start, 0, 0, 0 );
			count ++;

			for ( i = from; i < to; i += step ) {

				stride = start + count;

				positionAttribute.setXYZ( stride, Math.sin( i ) * range, 0, Math.cos( i ) * range );
				positionAttribute.setXYZ( stride + 1, Math.sin( Math.min( i + step, to ) ) * range, 0, Math.cos( Math.min( i + step, to ) ) * range );
				positionAttribute.setXYZ( stride + 2, 0, 0, 0 );

				count += 3;

			}

			geometry.addGroup( start, count, materialIndex );

			start += count;
			count = 0;

		}

		//

		generateSegment( - halfConeOuterAngle, - halfConeInnerAngle, divisionsOuterAngle, 0 );
		generateSegment( - halfConeInnerAngle, halfConeInnerAngle, divisionsInnerAngle, 1 );
		generateSegment( halfConeInnerAngle, halfConeOuterAngle, divisionsOuterAngle, 0 );

		//

		positionAttribute.needsUpdate = true;

		if ( coneInnerAngle === coneOuterAngle ) this.material[ 0 ].visible = false;

	}

	dispose() {

		this.geometry.dispose();
		this.material[ 0 ].dispose();
		this.material[ 1 ].dispose();

	}

}



/********************************************************************
 * STREAM MANAGER
 * un seul pour tout le site
 * crée le contexte
 * distribue les nodes
 ******************************************************************/
 AFRAME.registerComponent('streams-manager', {
    init:function() {

		var AudioContext = window.AudioContext // Default
		|| window.webkitAudioContext // Safari and old versions of Chrome
		|| false; 

        this.context = new AudioContext();
        AFRAME.THREE.AudioContext.setContext(this.context)
        this.context.id="monContext"
        // console.log("init streamsManager", this.context)

		//tous les streams : 2 dynamiques et 4 statiques
        this.currentStreams = new Map();


		//les flux dynamiques
		this.dynamicStreams = [];
		this.maxDynamicStreams = 2;

		//création des flux statiques
		for (let i=1; i< 3; i++) {
			const audioID = "static" + i.toString();
			console.log("connection à ", audioID)

			const mediaElement = new Audio(src="//51.178.138.251:8000/"+ audioID + "?" + (Math.floor(Math.random()*1000).toString()));
			mediaElement.crossOrigin = "anonymous";   
			node = this.context.createMediaElementSource(mediaElement);
			mediaElement.play();
			this.currentStreams.set(audioID, node)  
		}

		console.log("manager prêt");
		
    },

    getContext:function(){
        return this.context;
    },

	//appel depluis un composant stream : forcément dynamique
    getNode:function(audioID, canal){

		let node;

        if (this.currentStreams.has(audioID)) {
            node = this.currentStreams.get(audioID);
        }

		else {
			//création du flux
			const baseURL = "http://51.178.138.251:8000/";
            const streamURL = baseURL + audioID + "?" +(Math.floor(Math.random()*1000).toString());
            const mediaElement = new Audio(src=streamURL);
            mediaElement.crossOrigin = "anonymous";   
            node = this.context.createMediaElementSource(mediaElement);
            mediaElement.play();
            this.currentStreams.set(audioID, node) 


			//remplacement
			if (this.dynamicStreams.length >= this.maxDynamicStreams) {
				
				//enlève le plus vieux flux
				let old = this.dynamicStreams.shift();
				this.currentStreams.delete(old) 

				//met à jour le tableau dynamique
				let tmp = [];
				tmp.push(audioID);
				tmp.push(this.dynamicStreams)
				this.dynamicStreams = tmp;

				console.log("remplacement dans le tableau", this.dynamicStreams)
			}

			//ajout sans remplacement
			else {
				//ajout au tableau dynamique
				this.dynamicStreams.push(audioID);

				console.log("ajout au tableau", this.dynamicStreams)
			}

			//ajout à currentStream
			this.currentStreams.set(audioID, node) 		
		}

		var splitter = this.context.createChannelSplitter(6);
		var merger = this.context.createChannelMerger(2);

		node.connect(splitter);  
		if (canal >= 0 ){
			splitter.connect(merger, canal, 0);
			splitter.connect(merger, canal, 1);
		}
		else{
			splitter.connect(merger, 0, 0);
			splitter.connect(merger, 1, 1);
		}

       return merger;
    },

	pauseContext(){
		this.context.suspend();
	},

	resumeContext(){
		this.context.resume();
	},

});

/********************************************************************
 * LISTENER
 * crée et applique à la camera un listener tree
 * nécessite un composant camera!!
 ****************************************************************/
AFRAME.registerComponent('listener', {

    init:function() {
        
        this.listener = new THREE.AudioListener();

        this.threeCam = this.el.components.camera.camera;
        this.threeCam.add(this.listener) ;
    },

    getListener:function(){
        return this.listener;
    },

});
/********************************************************************
 * STREAM
 * crée un positional audio / source sonore spatiale 
 * récupère le noeud correspondant au canal choisi 
 ****************************************************************/

AFRAME.registerComponent('stream', {
    schema: {
        //src:{'type':'string'},
        audioID:{'type':'string'},
        listener:{'type':'selector'},
        canal:{'type':'number', 'default':-1},
        manager: {'type': 'selector'},
        // mediaElement: {'type' :'' }
    },

    init:function(){

        //console.log("init stream with src", this.data.src)
        const canal = this.data.canal;
        const audioID = this.data.audioID;


        //console.log(this.data);
        const listener = this.data.listener.components.listener.getListener();
        const manager = this.data.manager.components['streams-manager'];

        //create three positional sound
        this.sound = new THREE.PositionalAudio(listener);


        //get audio node from manager
        let mergerNode = manager.getNode(audioID, canal);

        //set sound
        this.sound.setNodeSource(mergerNode);

        //default setup
        this.sound.setRefDistance( 45);
        this.sound.setDistanceModel('exponential');
        this.sound.setRolloffFactor(8);
        this.sound.setVolume ( 1);

        //attach sound to mesh
        this.el.getObject3D('mesh').add(this.sound);  

    },

    getSound:function(){
        return this.sound;
    },
});
/********************************************************************
 * CONTROLS
 * reglage spatialisation + volume de sortie de la source
 ****************************************************************/

AFRAME.registerComponent('controls', {
    schema: {

        refDistance: {'type' : 'number', 'default': 40},  
        distModel: {'type' : 'string', 'default':'exponential'},
        rolloffFac:{'type' : 'number', 'default' : 8},
        maxDist : {'type':'number', 'default':100},
        volume: {'type': 'number', 'default':1.5},
        
        cone: {'type':'boolean', 'default': false}, // sphere ou coneq
        coneInAngle: {'type':'number', 'default':10},
        coneOutAngle: {'type':'number', 'default':100},
        coneOutLevel: {'type':'number', 'default':0},
        
        posHelper: {'type': 'boolean', 'default': false},
        posColorIn: {'type' : 'color', 'default': 'red'},
        posColorOut: {'type' : 'color', 'default': 'green'}
      
    },

    init:function(){ 

        let c = this.el;
        if (c.components.stream){  
            sound= c.components.stream.getSound();
        }
        if (c.components.player){  
            sound= c.components.player.getSound();
        }
        let refDistance = this.data.refDistance;
        let distModel = this.data.distModel;  //string rolloff type
        let rolloff = this.data.rolloffFac;
        let maxDist = this.data.maxDist;
        let vol = this.data.volume;


        let cone = this.data.cone; //cone ou sphere
        let coneInAngle= this.data.coneInAngle;
        let coneOutAngle= this.data.coneOutAngle;
        let coneOutLevel= this.data.coneOutLevel;

        let posHelper= this.data.posHelper;

        const posColorIn= new THREE.Color( this.data.posColorIn );
        const posColorOut= new THREE.Color( this.data.posColorOut );
        
        // new THREE.Color( this.data.posColorIn );
        // console.log("sound in controls :", distModel)
   
        if (cone){
            sound.setDirectionalCone (coneInAngle, coneOutAngle, coneOutLevel); 
        }

        if (posHelper){
            const helper = new PositionalAudioHelper(sound, (refDistance/rolloff)*10, 10, 10, posColorIn, posColorOut);
            sound.add(helper);            
        }

        //set spatial controls
        sound.setRefDistance( refDistance);
        sound.setDistanceModel(distModel);
        sound.setRolloffFactor(rolloff);
        sound.setMaxDistance(maxDist);
        sound.setVolume ( vol); //volume adjust


    }
});



AFRAME.registerComponent('player', {

    schema: {
        audioID:{'type':'string'},  //nom du fichier dans le dossier son
        listener:{'type':'selector'},        
      
    },
    init:function(){

		//Cartel
        const audioID = this.data.audioID;
        const fileURL_C = "/sounds/" + audioID + "_C.mp3"+ "?" +(Math.floor(Math.random()*100000).toString());
        const fileURL_T = "/sounds/" + audioID + "_T.mp3"+ "?" +(Math.floor(Math.random()*100000).toString());

        const listener = this.data.listener.components.listener.getListener();

        this.sound = new THREE.PositionalAudio(listener);
		this.sound.setRefDistance(20);
		this.sound.onEnded = ()=>{
			this.el.emit('play-ended', {}, false);
		};

		this.buffer_C = null;
		this.buffer_T = null;
		

		//load Cartel
        audioLoader.load( fileURL_C, ( buffer ) => {
			this.buffer_C = buffer;      
        });
		//load Titre
        audioLoader.load( fileURL_T, ( buffer ) => {
			this.buffer_T = buffer;      
        });

		this.el.addEventListener("model-loaded", ()=>{
			console.log("loaded");
			this.el.getObject3D('mesh').add(this.sound); 
		})	
    },

    getSound:function(){
        return this.sound;
    },

	play_C:function(){
		this.stopPlayer();

		this.sound.setBuffer( this.buffer_C );
		//this.sound.stop();
		this.sound.play();
	}, 

	play_T:function(){
		this.stopPlayer();

		this.sound.setBuffer( this.buffer_T );
		//this.sound.stop();
		this.sound.play();
	}, 

    pausePlayer:function(){
        this.sound.pause();
    },

    stopPlayer:function(){
		if (this.sound.source)
       		this.sound.stop();
    },

	resumePlayer(){
		//todo : check if buffer exist
		this.sound.play();
	}
});