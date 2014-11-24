var main = angular.module("main", []);
main.controller("mainController", [ "$rootScope", "$scope", function( $rootScope, $scope) {
	if (!angular.isDefined($rootScope.clockColor)) {
		$rootScope.clockColor = 'clock1';
	}
}]);