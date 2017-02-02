var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var githubtoken = require('./gitapikey.js');
var url = "https://api.github.com/users/johnbaldwin3";
var repoURL = "https://api.github.com/users/johnbaldwin3/repos";
//send auth. token to github if token is provided

if(githubtoken !== undefined) {
  $.ajaxSetup({
    headers: {
      'Authorization' : 'token ' + githubtoken.token
    }
  });
}

// function start(ajaxResults){
//   console.log(ajaxResults);
//   var repos = $('#')
//
// }

//sort data by chrono order inside function?
//_.sort?

$.ajax(url).done(function(data){
  console.log(data);
});

$.ajax(repoURL).done(function(data){
  console.log(data);
  _.each(function(data){


  })
});
