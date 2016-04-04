app.controller('testCtrl', function($scope, $cookies, $localStorage) {

	$localStorage.message = "Testing local storage";

	$scope.local = $localStorage.message;

	var cookies = $cookies.getAll();
	$scope.cookies = cookies;

	$scope.cname = $cookies.get('custName');

	$scope.add = function() {
		$scope.z = $scope.x + $scope.y;
	}

	$scope.subtract = function() {
		$scope.z = $scope.x - $scope.y;
	}
})