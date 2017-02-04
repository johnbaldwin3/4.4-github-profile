
/*************************************
Setting Requirements (Libraries, etc)
*************************************/
var $ = window.$ = window.jQuery = require('jquery');
var Handlebars = require('handlebars');
var _ = require('underscore');
require('bootstrap-sass');
var moment = require('moment');
var githubtoken = require('./gitapikey.js');
var octicons = require("octicons");
/*************************************
Setting Variables
*************************************/
var url = "https://api.github.com/users/johnbaldwin3";
var repoURL = "https://api.github.com/users/johnbaldwin3/repos";
var userName= '';
/*************************************
Octicons
*************************************/

(function(){
var sourceOcticons = $('#octicons-template').html();
var templateOcticons = Handlebars.compile(sourceOcticons);
var ctx = {
  repo: octicons.repo.toSVG(),
  organization: octicons.organization.toSVG()
};
console.log(ctx);
  // $('.repoicon').html(template(ctx));
  $('.new-button').html(templateOcticons(ctx));
}());

// (function(){
// var source = $('#octicons-org-template').html();
// var template = Handlebars.compile(source);
// var ctx = {
//   organization: octicons.organization.toSVG()
// };
// console.log(ctx);
//   // $('.repoicon').html(template(ctx));
//   $('.org-icon').html(template(ctx));
// }());









//send auth. token to github if token is provided
if(githubtoken !== undefined) {
  $.ajaxSetup({
    headers: {
      'Authorization' : 'token ' + githubtoken.token
    }
  });
}

/*************************************
AJAX Calls
*************************************/
//main AJAX call to get profile info
$.ajax(url).done(function(profile){

  //AJAX call to get organization list info
  $.ajax(profile.organizations_url).done(function(orgList){

    displayOrg(orgList);

  });

  displayProf(profile);
  displayOverview(profile);
  displayProfThumb(profile);
  displayUserName(profile);

});

/*************************************
Functions
*************************************/

//displays the organization avatars for each
function displayOrg(orgs){
  var source = $('#org-template').html();
  var template = Handlebars.compile(source);

  _.each(orgs, function(orgs){
    //return orgs.Array.avatar_url;
    $('.organizations').append(template(orgs));
  });

}
//displays the menu options in sub nav
//most importantly badges
function displayOverview(profile){
  var source = $('#overview-template').html();
  var template = Handlebars.compile(source);
    $('#menu-list').append(template(profile));
}

//displays the profile/bio on the left side of page
function displayProf(profile){
  var source = $('#prof-template').html();
  var template = Handlebars.compile(source);
    $('.bio').append(template(profile));
}

function displayUserName(profile){
  var source = $('#profile-menu-template').html();
  var template = Handlebars.compile(source);
    userName = profile.login;
    $('#user-name').html(userName);
}
//displays profile picture thumbnail in main nav
function displayProfThumb(profile){
  var source = $('#prof-thumb-template').html();
  var template = Handlebars.compile(source);
    $('.prof-thumb').append(template(profile));
}

//gets REPO title data
$.ajax(repoURL).done(function(repoList){
  //console.log(repoList);
  displayRepos(repoList);
});

//displays each repo title, language, and updated time
function displayRepos(repoList){
  var source = $('#repo-template').html();
  var template = Handlebars.compile(source);
//chained underscore methods
//sorts data in reverse chrono order (-)
_.chain(repoList)
  .sortBy(function(repo){
    return -(new Date(repo.updated_at)).getTime()
  })
  .each(function(repo){
    repo.updated_at = moment(new Date(repo.updated_at)).fromNow();

    $('.repo-list').append(template(repo));
  });
}

//toggles the hover over tooltips from bootstrap
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})



// $('.plus-menu').on('click', function() {
//   $('plus-menu').hide('[data-toggle]="tooltip"');
// })
