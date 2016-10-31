
//SampleClient googleapis-nodejs-client 

'use strict';



var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var http = require('http');
var spawn = require('child_process').spawn;
var url = require('url');
var querystring = require('querystring');
var secrets = require('../auth.json');

var called = false;

function callOnce (callback) {
  if (!called) {
    called = true;
    callback();
  }
}

function handler (request, response, server, callback) {
  var self = this;
  var qs = querystring.parse(url.parse(request.url).query);
  self.oAuth2Client.getToken(qs.code, function (err, tokens) {
    if (err) {
      console.error('Error getting oAuth tokens: ' + err);
    }
    self.oAuth2Client.setCredentials(tokens);
    self.isAuthenticated = true;
    response.end('Authentication successful! Please return to the console.');
    callback(tokens);
    server.close();
  });
}

function SampleClient (options) {
  var self = this;
  self.isAuthenticated = false;
  this._options = options || { scopes: [] };

  
  this.oAuth2Client = new OAuth2Client(
    secrets.web.client_id,
    secrets.web.client_secret,
    secrets.web.redirect_uris[0]
  );

 
  this._authenticate = function (scopes, callback) {
   
    self.authorizeUrl = self.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' ')
    });
  
  
  
  
    var server = http.createServer(function (request, response) {
      callOnce(function () {
        handler.call(self, request, response, server, callback);
      });
    }).listen(8080, function () {
      // open the browser to the authorize url to start the workflow
      spawn('open', [self.authorizeUrl]);
    });
  };

  self.execute = function (scopes, callback) {
    self._callback = callback;
    if (self.isAuthenticated) {
      callback.apply();
    } else {
      self._authenticate(scopes, callback);
    }
  };

  return self;
}

module.exports = new SampleClient();
