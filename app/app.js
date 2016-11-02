'use strict';

const express = require('express');
const builder = require('botbuilder');
const validator = require('youtube-url');
const PlaylistQueue = require('./util/playlist');
const server = express();
server.listen(process.env.port || process.env.PORT || 3000, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
const bot = new builder.UniversalBot(connector, {
   localizerSettings: {
   botLocalePath: "./locale",
   defaultLocale: "en"
 }
 });
server.use(express.static('client'));
server.use(express.static('public'));
server.post('/api/messages', connector.listen());


bot.on('conversationUpdate', function (message) {
    // Check for group conversations
    if (message.address.conversation.isGroup) {
        if (message.membersAdded) {
            message.membersAdded.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    var reply = new builder.Message()
                        .address(message.address)
                        .text("Hello everyone!");
                    bot.send(reply);
                }
            });
        }

        // Send a goodbye message when bot is removed
        if (message.membersRemoved) {
            message.membersRemoved.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    var reply = new builder.Message()
                        .address(message.address)
                        .text("Goodbye");
                    bot.send(reply);
                }
            });
        }
    }
});

bot.on('contactRelationUpdate', function (message) {
    if (message.action === 'add') {
        var name = message.user ? message.user.name : null;
        var reply = new builder.Message()
            .address(message.address)
            .text("Hello %s... Thanks for adding me. Post your youtube links here and i will and them to the playlist",name || 'there');
        bot.send(reply);
    } else {
        // delete their data
    }
});

bot.on('deleteUserData', function (message) {
    // User asked to delete their data
});


// Anytime the major version is incremented any existing conversations will be restarted.
bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));


bot.dialog('/', [
    function (session) {
        //validate
        builder.Prompts.text(session, "Hello... Please Enter a youtube URL");
    },
    function (session, results) {
        let playlist = new PlaylistQueue();
        session.userData.url = results.response;
        if(validator.valid(session.userData.url)) {
            let urlId = validator.extractId(session.userData.url);
            if(playlist.add(urlId)) {
                session.endDialog("Your youtube url was successfully added");
            }            
        } else {
            session.endDialog("Please enter a valid youtube url");
            
        }       
    }
]);