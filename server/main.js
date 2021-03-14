import { Meteor } from 'meteor/meteor';

import {Players} from "../imports/collections/players.js";

import WebSocket from "ws";


Meteor.startup(() => {
  
    const wss = new WebSocket.Server({ port: 8080 })
 
    wss.on('connection', ws => {
      ws.on('message', message => {
        console.log(`Received message => ${message}`)
      })
      ws.send('Hello! Message From Server!!')
    })
    


});