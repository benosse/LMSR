import { Meteor } from 'meteor/meteor';
import WebSocket from "ws";
import { v4 as uuidv4 } from 'uuid';



Meteor.startup(() => {
  
    const wss = new WebSocket.Server({ port: 8080 })



    let sockets = [];
    let socketsIds = [];
 
    wss.on('connection', ws => {
        //génère un id unique
        let id = uuidv4();
        //ajoute aux connexions existantes
        ws.id = id;
        socketsIds.push(id);
        //donne son id au client
        let message = JSON.stringify({
            type:"setId",
            id:id,
        })
        ws.send(message);
        console.log("connection ouverte sur l'id ", id);

        ws.on('close', e => {
            console.log("connection fermée", ws.id);
            let message = JSON.stringify({
                type:"removePlayer",
                id:ws.id,
            })

            //envoi du message
            for (var s of wss.clients) {
                if (s.id != id)
                    s.send(message)
            }
        });

        ws.on('message', message => {
            let id = ws.id;
            let parsed = JSON.parse(message);

            //todo : des meilleurs checks
            if (!parsed.position)
                console.log("le message ne contient pas de pos")
            else {
                //creation du message
                parsed.id = id;
                parsed.type = "updatePos";

                //envoi du message
                for (var s of wss.clients) {
                    if (s.id != id)
                        s.send(JSON.stringify(parsed))
    
                }
            }
            
        });
        
      
    })

    
    


});