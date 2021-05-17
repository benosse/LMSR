
/********************************************************************
 * STREAM MANAGER
 * un seul pour tout le site
 * crée le contexte
 * distribue les nodes
 ******************************************************************/
AFRAME.registerComponent('streams-manager', {
    init:function() {
        this.context = new AudioContext();
        AFRAME.THREE.AudioContext.setContext(this.context)
        this.context.id="monContext"
        // console.log("init streamsManager", this.context)

        this.currentStreams = new Map();
    },

    getContext:function(){
        return this.context;
    },

    getNode:function(audioID, canal){

        let node;

        if (this.currentStreams.has(audioID)) {
            node = this.currentStreams.get(audioID);
            // console.log("stream already existing")
        }

        else {
            const baseURL = "http://51.178.138.251:8000/";
            const streamURL = baseURL + audioID + "?" +(Math.floor(Math.random()*1000).toString());
            const mediaElement = new Audio(src=streamURL);
            mediaElement.crossOrigin = "anonymous";   
            node = this.context.createMediaElementSource(mediaElement);
            mediaElement.play();
            this.currentStreams.set(audioID, node)  
        }
       
        var splitter = this.context.createChannelSplitter(6);
        var merger = this.context.createChannelMerger(2);

       node.connect(splitter);  
    //    console.log(canal);
       if (canal >= 0 ){
           splitter.connect(merger, canal, 0);
           splitter.connect(merger, canal, 1);
       }
       else{
           splitter.connect(merger, 0, 0);
           splitter.connect(merger, 1, 1);
       }

       return merger;
    }

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
        posColorIn: {'type' : 'color', 'default': 0x00ff00},
        posColorOut: {'type' : 'color', 'default': 0xffff00}
      
    },

    init:function(){ 

        let c = this.el;

        sound= c.components.stream.getSound();
        
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
            //const helper = new PositionalAudioHelper(sound, (refDistance/rolloff)*10, 10, 10, posColorIn, posColorOut);
            //sound.add(helper);            
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
 * DISPLAY
 * visualisation de la spatialisation
 ***************************************************************
 AFRAME.registerComponent('display', {

    schema: {
        posColorIn: {'type' : 'color', 'default': 0x00ff00},
        posColorOut: {'type' : 'color', 'default': 0xffff00}
      
    },
});*/