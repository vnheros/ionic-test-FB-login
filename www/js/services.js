angular.module('starter.services', ['ngResource'])

.factory('Film', function ($resource) {
    //return $resource('http://localhost:5000/sessions/:filmId');
    return $resource(
      'http://swapi.co/api/films/:filmId', //url
      {}, // query parameters
      {'query': { method: 'GET', isArray: false }} //action
    );
});
