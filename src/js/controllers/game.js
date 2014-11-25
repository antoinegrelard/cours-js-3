var game = angular.module("game", ["clockService"]);
game.controller("gameController", function($rootScope, ngDialog, $scope, $timeout, $location, clockService) {
	console.log($scope);
	$scope.location = $location;
	$scope.hour = 0;
	$scope.minute = 0;
	$scope.clock = {};
	clockService.initGame($rootScope.clockColor);
	clockService.startGame();
	$scope.clock.info = clockService.getPartTime();
	$scope.checkHour = function() {
	    if (clockService.checkHour($scope.hour, $scope.minute)) {
	        ngDialog.open({
	            preCloseCallback: function(value) {
	                if (value === 0) {
	                    $scope.location.path("/");
	                }
	                if (value == '$document' || value == '$closeButton' || value == 1) {
	                    $scope.reloadGame();
	                }
	            },
	            scope: $scope,
	            template: './src/pages/dialog-success.html'
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
	                    $scope.reloadGame();
	                }
	            },
	            scope: $scope,
	            template: './src/pages/dialog-fail.html'
	        });
	    }
	};
	$scope.reloadGame = function() {
	    $timeout(function() {
	        clockService.reloadGame();
	        $scope.hour = 0;
	        $scope.minute = 0;
	        $scope.clock.info = clockService.getPartTime();
	    }, 200);
	};
	$scope.increaseNumber = function(unit) {
		if(unit == "hour") {
			if($scope.hour == 23) {
				$scope.hour = 0;
			} else {
				$scope.hour = $scope.hour + 1;
			}
		} else {
			if($scope.minute == 55) {
				$scope.minute = 0;
			} else {
				$scope.minute = $scope.minute + 5;
			}
		}
	};
	$scope.decreaseNumber = function(unit) {
		if(unit == "hour") {
			if($scope.hour === 0) {
				$scope.hour = 23;
			} else {
				$scope.hour = $scope.hour - 1;
			}
		} else {
			if($scope.minute === 0) {
				$scope.minute = 55;
			} else {
				$scope.minute = $scope.minute - 5;
			}
		}
	};
});