var $ = window.$ = window.jQuery = require('jquery');
var Handlebars = require('handlebars');
var _ = require('underscore');
require('bootstrap-sass');
var moment = require('moment');
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

$.ajax(url).done(function(profile){
  console.log(profile);
  displayProf(profile);
  displayOverview(profile);
  displayProfThumb(profile)
});

function displayOverview(profile){
  var source = $('#overview-template').html();
  var template = Handlebars.compile(source);
    $('#menu-list').append(template(profile));
}

function displayProf(profile){
  var source = $('#prof-template').html();
  var template = Handlebars.compile(source);
    $('.bio').append(template(profile));
}

function displayProfThumb(profile){
  var source = $('#prof-thumb-template').html();
  var template = Handlebars.compile(source);
    $('.prof-thumb').append(template(profile));
}

//gets REPO title data
$.ajax(repoURL).done(function(repoList){
  console.log(repoList);
  displayRepos(repoList);
});


function displayRepos(repoList){
  var source = $('#repo-template').html();
  var template = Handlebars.compile(source);


  _.each(repoList, function(repo){
    $('.repo-list').append(template(repo));
    //var time = moment(new Date(repo.update_at).fromNow());
    //console.log('time', time);
    //$('.updated').html(timeSinceUpdate);
  });
}
//var time = moment(new Date(repo.update at).fromNow())

//sort data by chrono order inside function?
//_.sort?

//lloooook up humanize

// _.each(repos, function(items){
//
//   var context = {
//     "name" : repos.name
//   };
//   console.log(context);
// $('#repo-template').append(template(context));
// });
