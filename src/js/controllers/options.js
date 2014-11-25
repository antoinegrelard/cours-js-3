var options = angular.module("options", []);
options.controller("optionsController", function($rootScope, $scope, $location) {
	$scope.changeColor = function(color) {
		$rootScope.clockColor = color;
		$location.path("/");
	};
});