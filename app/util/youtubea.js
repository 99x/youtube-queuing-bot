

'use strict';

var google = require('googleapis');
var sampleClient = require('../util/oauthclient');
var util = require('util');

// initialize the Youtube API library
var youtube = google.youtube({
  version: 'v3',
  auth: sampleClient.oAuth2Client
});

function getCategory (id) {
  youtube.search.list({
    part: 'id,snippet',
    id: id
  }, function (err, data) {
    if (err) {
      console.error('Error: ' + err);
    }
    if (data) {
      console.log(util.inspect(data, false, null));
    }
   
  });
}

var scopes = [
  'https://www.googleapis.com/auth/youtube'
];
