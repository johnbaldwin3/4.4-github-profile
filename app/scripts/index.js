var $ = window.$ = window.jQuery = require('jquery');
var Handlebars = require('handlebars');
var _ = require('underscore');
require('bootstrap-sass');
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
});

function displayProf(profile){
  var source = $('#prof-template').html();
  var template = Handlebars.compile(source);


    $('.bio').append(template(profile));


}

  $.ajax(repoURL).done(function(repoList){
    console.log(repoList);
    displayRepos(repoList);
  });


function displayRepos(repoList){
  var source = $('#repo-template').html();
  var template = Handlebars.compile(source);

  _.each(repoList, function(repo){
    $('.repo-list').append(template(repo));

  });
}
//sort data by chrono order inside function?
//_.sort?



// _.each(repos, function(items){
//
//   var context = {
//     "name" : repos.name
//   };
//   console.log(context);
// $('#repo-template').append(template(context));
// });
