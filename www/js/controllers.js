angular.module('starter.controllers', ['starter.services', 'ngOpenFB'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $openFB) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  // Perform Facebook login
  $scope.fbLogin = function () {
    $openFB.login({scope: 'email,public_profile,user_friends'})
      .then(function(token) {
        // log in successful
        console.log('Facebook login succeeded');
        $scope.closeLogin();
        // send token to your server
      }, function(err) {
        // error logging in
        alert('Facebook login failed');
    });
  };

})

.controller('ProfileCtrl', function ($scope, $openFB) {
    $openFB.isLoggedIn()
    .then(function(loginStatus) {
        // logged in
        
        // get user info
        $openFB.api({path: '/me'})
        .then(function(user) {
            $scope.user = user;
            console.log($scope.user);
        }
        , function(err) {
            // error
            alert('Facebook error: ' + err);
        });
        
        // get user profile
        
        
    } , function(err) {
        // not logged in
        alert('Please use Facebook login!');
    });
})

.controller('FilmsCtrl', function($scope, Film) {    
    Film.query(function(data) {
        $scope.films = data.results;
        //console.log($scope.films);
    });    
    //window.tmp = $scope.films; 
})

.controller('FilmCtrl', function($scope, $stateParams, Film) {
    $scope.film = Film.get({filmId: $stateParams.filmId});
});

