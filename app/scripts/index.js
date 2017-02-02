var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var githubtoken = require('./gitapikey.js');


//send auth. token to github if token is provided

if(githubtoken !== undefined) {
  $.ajaxSetup({
    headers: {
      'Authorization' : 'token' + githubtoken.token
    }
  });
}
