var routes = angular.module("routes", ["ngRoute"]);

routes.config(function($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl : 'src/pages/home.html',
            controller  : 'homeController'
        })

        .when('/game', {
            templateUrl : 'src/pages/game.html',
            controller  : 'gameController'
        })

        .when('/options', {
            templateUrl : 'src/pages/options.html',
            controller  : 'optionsController'
        })

        .when('/credits', {
            templateUrl : 'src/pages/credits.html',
            controller  : 'creditsController'
        });
});