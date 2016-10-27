const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const PlaylistQueue = require('./util/playlist');
const Playlist = new PlaylistQueue();
let count = 0;
app.use(express.static('client'));
app.get('/api/add', (req,res) => {
    res.status(200).json({
        temp : Playlist.add(count++)
    })
});
app.get('/api/get', (req,res) => {
    res.status(200).json({
        temp : Playlist.get()
    })
});
app.get('/api/all', (req,res) => {
    res.status(200).json({
        temp : Playlist.all(),
        queue : Playlist.que()
    })
});
app.listen(port, () => {
    console.log('server listening on port ', port);
})