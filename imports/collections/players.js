import { Mongo } from 'meteor/mongo';

export const Players = new Mongo.Collection('players');

//publish
if (Meteor.isServer) {
    Meteor.publish('players', function playersPublication() {
        return Players.find();
    });
}


Meteor.methods({

    'players.insert'() {
        //create new
        let player = Players.insert({
            active:false,
            position:{},
            createdAt: new Date(),
            lastActiveAt : new Date(),
        });
        console.log("player created on server", player)
        return player;
    },

    'players.remove'(id) {
        console.log("removing player with id ", id)
        Players.remove(id);
    },

    'players.removeAll' (){
        Players.remove({});
    },

    'players.updatePos' (id, pos) {
        Players.update(id, { position:pos});
    },
    
   

});