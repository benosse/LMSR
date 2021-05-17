
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
        console.log("init streamsManager", this.context)

        this.currentStreams = new Map();
    },

    getContext:function(){
        return this.context;
    },

    getNode:function(audioID, canal){

        let node;

        if (this.currentStreams.has(audioID)) {
            node = this.currentStreams.get(audioID);
            console.log("stream already existing")
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
       console.log(canal);
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





//var mediaElement= undefined;

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

        console.log(this.data);
        const listener = this.data.listener.components.listener.getListener();
        const manager = this.data.manager.components['streams-manager'];

        //create three positional sound
        const sound = new THREE.PositionalAudio(listener);

        //get audio node from manager
        let mergerNode = manager.getNode(audioID, canal);

        //set sound
        sound.setNodeSource(mergerNode);
        sound.setRefDistance( 50);
        sound.setDistanceModel('exponential');
        sound.setRolloffFactor(8);

        sound.setVolume ( 1.5)
        //console.log("sound : ",sound);

        let c = this.el //        
        c.getObject3D('mesh').add(sound);   //apply to the mesh

    }
});




AFRAME.registerComponent('controls', {
    schema: {
      
    },

    init:function(){
   
    }
});

