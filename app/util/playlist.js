
const Playlist = function() {};
const settings = require('../config');
let playlistQueue = [];
//this queue is assumed as a volatile Queue and will be made so in future versions
let QUEUE = []

Playlist.prototype.add = function add(url) {
    try {
        if(playlistQueue.length < settings.playlist.size) {
            playlistQueue.push(url);
            return true;
        } else {
            QUEUE.push(url);
            return true;
        };
    } catch(e) {
        console.log(e);
        return false;
    }
}

Playlist.prototype.get = function get() {
    try {
        let size = playlistQueue.length;
        if(size > 0) {
            let url = playlistQueue.shift();
            if(size < settings.playlist.size) {
                playlistQueue.push(url);
            } else if( QUEUE.length > 0) {
                playlistQueue.push(QUEUE.shift());
                QUEUE.push(url);
            } else {
                QUEUE.push(url);
            } 
            return url;
        } else {
            return "Playlist is empty";
        }
    } catch(e) {
        console.log(e);
        return "An error occured";
    }
}

Playlist.prototype.refresh = function refresh() {
    try {
        playlistQueue = [];
        return true;
    } catch(e) {
        return false;
    }
}

Playlist.prototype.isExist = function isExist(url) {
    //check if the given url exists in the both the queues
}

Playlist.prototype.all = function all() {
    return playlistQueue;
}

Playlist.prototype.que = function all() {
    return QUEUE;
}

module.exports = Playlist;