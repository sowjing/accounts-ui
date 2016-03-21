var app = angular.module('app', [ 'ngRoute', 'ngCookies' ]);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller : homeCtrl,
		templateUrl : 'home.html'
	}).when('/txns', {
		controller : txnCtrl,
		templateUrl : 'txns.html'
	}).when('/customers', {
		controller : custCtrl,
		templateUrl : 'customers.html'
	}).when('/stmt', {
		controller : stmtCtrl,
		templateUrl : 'statements.html'
	}).when('/feedback', {
		controller : fdCtrl,
		templateUrl : 'feedback.html'
	}).otherwise({
		redirectTo : '/'
	})
});

var custCtrl = function($scope, $location) {
	$scope.test = "testing...hello";
}

var stmtCtrl = function($scope, $http) {

	$scope.wait = true;

	$http.get("http://localhost:8989/AccountMgmt/acctservice/txn/gettxn").then(
			function(response) {
				$scope.wait = false;
				$scope.ready = true;
				$scope.txn = response.data;
			});
}

var homeCtrl = function($cookies, $scope, $location) {
	var custName = $cookies.get('custName');
	// Setting a name
	// $cookies.put('custName', 'John');

	if (custName) {
		$scope.greeting = "Hello " + custName;
	}

	$scope.test = "testing...hello";
}

var txnCtrl = function($scope, $http) {

	$scope.addTxn = function() {
		if (!$scope.desc || !$scope.amt || !$scope.crDb) {

			$scope.errortext = "Please fill all details";
			return;
		}
		
		if(! angular.isNumber($scope.amt)) {
			$scope.errortext = "Amount is invalid. Please enter a valid number.";
			return;
		}

		var input = {
			desc : $scope.desc,
			amt : $scope.amt,
			crdb : $scope.crDb
		};

		$http.post("http://localhost:8989/AccountMgmt/acctservice/txn/addtxn",
				input).then(function(response, status) {
			$scope.result = response.data;
		});
	}
}

var fdCtrl = function($scope) {

	$scope.fbshow = true;

	$scope.sendFeedback = function() {

		$scope.fbdone = true;
		$scope.fbshow = false;
	}
}
