'use strict'


const google = require('googleapis');
const youtube = google.youtube('v3')

var params = {
    part: 'snippet',
    id: 'K6pSryUe_AU'
}
Youtube.prototype.filter = function filter(vidID) {
    youtube.videos.list(params, function (err, response) {
        if (err) {
            console.log(err);
        } else {
            categoryId = response.categoryId;
            if (req == categoryId) {
                return true;
            } else {
                return false
            }
        }
    });
}