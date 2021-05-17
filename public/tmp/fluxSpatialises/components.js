
AFRAME.registerComponent('listener', {
    init:function() {
        this.listener = new THREE.AudioListener();
        this.threeCam = this.el.components.camera.camera
        this.threeCam.add(this.listener) 
        console.log("listener:", this.listener)
    },

    getListener:function(){
        return this.listener;
    },
});


AFRAME.registerComponent('getaudio', {
    schema: {
        src:{'type':'string'},
    },

    init:function(){
        let src = this.data.src + "?random=" + (Math.floor(Math.random()*1000).toString());
        this.mediaElement = new Audio( src=src);
        console.log(this.mediaElement)
        this.mediaElement.crossOrigin = "anonymous";
    },

    getMediaElement: function(){
        return this.mediaElement;
    }
});


AFRAME.registerComponent('stream', {
    schema: {
        //src:{'type':'string'},
        audioID:{'type':'selector'},
        listener:{'type':'selector'},

        split: {'type' : 'boolean' },
        canal:{'type':'number'},
    },

    init:function(){

        //console.log("init stream with src", this.data.src)
        const canal = this.data.canal;
        const split = this.data.split;

        console.log(canal);

        const listener = this.data.listener.components.listener.getListener()
        //console.log(this.data.audioID)

        const sound = new THREE.PositionalAudio(listener);

        let context = sound.context;
        let mediaElement = this.data.audioID.components.getaudio.getMediaElement();

        let node = context.createMediaElementSource(mediaElement)

        var splitter = context.createChannelSplitter(6);
        var merger = context.createChannelMerger(2);

        node.connect(splitter);  
        
        if (split == true){
            splitter.connect(merger, canal, 0);
            splitter.connect(merger, canal, 1);
        }
        else{
            splitter.connect(merger, 0, 0);
            splitter.connect(merger, 1, 1);
        }

        sound.setNodeSource(merger);
        sound.setRefDistance( 50);
        sound.setDistanceModel('exponential');
        sound.setRolloffFactor(8);

        sound.setVolume ( 1.5)
        //console.log("sound : ",sound);

        let c = this.el //        
        c.getObject3D('mesh').add(sound);   //apply to the mesh
        mediaElement.play();

    }

});


AFRAME.registerComponent('controls', {
    schema: {
      
    },

    init:function(){

   
    }

});