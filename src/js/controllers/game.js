var game = angular.module("game");
game.controller("gameController", [ "$rootScope", "$scope", "ngDialog", "$timeout", "clockService", function($rootScope, ngDialog, $scope, $timeout, clockService) {
	$scope.hour = 0;
	$scope.minute = 0;
	$scope.clock = {};
	$rootScope.colorClock = 'clock1';
	clockService.onInit($rootScope.colorClock);
	clockService.onStartGame();
	$scope.clock.info = clockService.getPartTime();
	$scope.onMatchedTimeClock = function() {
	    if (clockService.onMatchedTimeClock($scope.hour, $scope.minute)) {
	        ngDialog.open({
	            preCloseCallback: function(value) {
	                if (value === 0) {
	                    $scope.location.path("/");
	                }
	                if (value == '$document' || value == '$closeButton' || value == 1) {
	                    $scope.onReloadGame();
	                }
	            },
	            scope: $scope,
	            template: '<div class="row"><div class="col-lg-10 col-lg-offset-1"><img class="img-responsive" src="./src/img/success.png" alt="Bravo !"></div><div class="ngdialog-buttons"><button type="button" class="button col-lg-6" ng-click="closeThisDialog(0)" ><img class="img-responsive" src="./src/img/button_menu.png" alt="Menu"></button><button type="button" class="button col-lg-6" ng-click="closeThisDialog(1)"><img class="img-responsive" src="./src/img/button_replay.png" alt="Rejouer"></button></div></div>',
	            plain: true
	        });
	    } else {
	        $scope.clock.hour = clockService.getHour();
	        $scope.clock.minute = clockService.getMinute();
	        ngDialog.open({
	            preCloseCallback: function(value) {
	                if (value === 0) {
	                    $scope.location.path("/");
	                }
	                if (value == '$document' || value == '$closeButton' || value == 1) {
	                    $scope.onReloadGame();
	                }
	            },
	            scope: $scope,
	            template: '<div class="row"><div class="col-lg-10 col-lg-offset-1"><img class="img-responsive" src="./src/img/fail.png" alt="Raté !"><p>L\'heure exacte était : {{clock.hour}} h {{clock.minute}}</p></div><div class="ngdialog-buttons"><button type="button" class="button col-lg-6" ng-click="closeThisDialog(0)"><img class="img-responsive" src="./src/img/button_menu.png" alt="Menu"></button><button type="button" class="button col-lg-6" ng-click="closeThisDialog(1)"><img class="img-responsive" src="./src/img/button_replay.png" alt="Rejouer"></button></div></div>',
	            plain: true
	        });
	    }
	};
	$scope.onReloadGame = function() {
	    $timeout(function() {
	        clockService.onReloadGame();
	        $scope.hour = 0;
	        $scope.minute = 0;
	        $scope.clock.info = clockService.getPartTime();
	    }, 200);
	};
}]);