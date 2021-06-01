const THREE = AFRAME.THREE;
const audioLoader = new THREE.AudioLoader();

//load ogv lib https://github.com/brion/ogv.js/ for SAFARI ogg 
var ogv = require('ogv');



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



AFRAME.registerSystem('audio-manager', {
	schema: {},  
  
	init: function () {
		console.log("init audio manager system")

		//create custom AudioContext
		this.createAudioContext();

		//tous les streams : 2 dynamiques et 4 statiques [audioID, mediaElement]
        this.currentStreams = new Map();
		//les audioId des flux dynamiques
		this.dynamicStreams = [];	

		this.nbStatics = 2;
		this.nbDynamics = 4;

		//connect to static streams
		this.connectToAllStatics();
		
	},

	createAudioContext(){
		var AudioContext = window.AudioContext // Default
		|| window.webkitAudioContext // Safari and old versions of Chrome
		|| false; 

		if (!AudioContext)
			console.log("no audiocontext found")
		else {
			this.context = new AudioContext();
        	AFRAME.THREE.AudioContext.setContext(this.context)
		}   
	},


	connectToAllStatics(){

		for (let i=1; i< this.nbStatics + 1 ; i++) {
			const audioID = "static" + i.toString();
			this.createMediaElement(audioID);			
		}
	},


	createMediaElement(audioID){

		//get stream src
		const src = "http://51.178.138.251:8000/"+ audioID + "?" + (Math.floor(Math.random()*1000).toString());

		//create mediaElement
		const mediaElement = new Audio(src);
		mediaElement.crossOrigin = "anonymous"; 
		mediaElement.type="audio/mpeg";

		//add new mediaElement to currentStreams map
		this.currentStreams.set(audioID, {
			mediaElement:mediaElement,
			node:this.context.createMediaElementSource(mediaElement),
		});	

		//ne marche pas à cause de CORS...
		// var player = new OGVPlayer({
		// });
		// player.src = src;
		// console.log("ogv player : ", player);
	},



	//appel depluis un composant stream : forcément dynamique
    getNode:function(audioID, canal){

		//create new stream
		if(!this.currentStreams.has(audioID)) {
		
			this.createMediaElement(audioID);	

			//remplacement
			if (this.dynamicStreams.length >= this.nbDynamics) {
				
				//remove old id from dynamic streams
				let old = this.dynamicStreams.shift();

				//also remove corresponding mediaElement from all streams
				this.currentStreams.delete(old) 

				//add new id to dynamic streams
				let tmp = [];
				tmp.push(audioID);
				tmp.push(this.dynamicStreams)
				this.dynamicStreams = tmp;
			}

			//ajout sans remplacement
			else {
				//ajout au tableau dynamique
				this.dynamicStreams.push(audioID);
			}
		}

		//get mediaElement...
		const mediaElement = this.currentStreams.get(audioID).mediaElement;
		//get audio node...
		const node = this.currentStreams.get(audioID).node;
		//get channel
		const splitter = this.context.createChannelSplitter(6);
		const merger = this.context.createChannelMerger(2);
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

	playAllMediaElements: function(){
		for (const element of this.currentStreams.values()	) {
			element.mediaElement.play();
		}
	},

	getContext:function(){
        return this.context;
    },

	pauseContext(){
		this.context.suspend();
	},

	resumeContext(){
		this.context.resume();
		this.playAllMediaElements();
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
        audioID:{'type':'string'},
        listener:{'type':'selector'},
        canal:{'type':'number', 'default':0},
    },

    init:function(){

        //console.log("init stream with src", this.data.src)
        const canal = this.data.canal;
        const audioID = this.data.audioID;


        //console.log(this.data);
        const listener = this.data.listener.components.listener.getListener();

        // const manager = this.data.manager.components['streams-manager'];
		const manager = this.el.sceneEl.systems["audio-manager"];

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


/********************************************************************
 * PLAYER
 * plays an audio file from a three positionnal audio
 ****************************************************************/
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