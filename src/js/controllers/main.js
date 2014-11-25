var main = angular.module("main", []);
main.controller("mainController", function( $rootScope, $scope) {
	if (!angular.isDefined($rootScope.clockColor)) {
		$rootScope.clockColor = 'clock1';
	}
});