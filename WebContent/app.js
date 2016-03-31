var app = angular.module('app', [ 'ngRoute', 'ngCookies', 'ngStorage',
		'ngAnimate', 'ngAria', 'ngMessages', 'ngMaterial' ]);

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
	}).when('/test', {
		controller : 'testCtrl',
		templateUrl : 'test.html'
	}).otherwise({
		redirectTo : '/'
	})
});

var custCtrl = function($scope, $location) {
	$scope.test = "testing...hello";
}

var stmtCtrl = function($scope, $http, $window) {

	$scope.wait = true;

	$scope.sort = function() {
		$scope.ordercol = 'description';
	}

	$http.get("http://localhost:8989/AccountMgmt/acctservice/txn/gettxn").then(
			function(response) {
				$scope.wait = false;
				$scope.ready = true;
				$scope.txn = response.data;
			});
}

// Use of cookies
var homeCtrl = function($cookies, $scope, $location) {
	var custName = $cookies.get('custName');

	var expDate = new Date();
	expDate.setDate(expDate.getDate() + 365);
	var options = {
		expires : expDate
	};

	var showDate = new Date();
	var date = showDate.getHours();
	$scope.currentDate = showDate;
	// Setting a name
	$cookies.put('custName', 'Vihari', options);

	if (custName) {
		if (date < 12) {
			day = "Good Morning.";
		}
		if (date >= 12 && date < 15) {
			day = "Good Afternoon.";
		}
		if (date >= 15 && date < 24) {
			day = "Good Evening.";
		}

		$scope.greeting = "Hello " + custName + ", " + day;
	}
}

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

var txnCtrl = function($scope, $http) {

	$scope.addTxn = function() {
		if (!$scope.desc || !$scope.amt || !$scope.crDb) {

			$scope.errortext = "Please fill all details";
			return;
		}

		// if (!angular.isNumber($scope.amt)) {
		// console.log("amount=" + $scope.amt);
		// $scope.errortext = "Amount is invalid. Please enter a valid number.";
		// return;
		// }

		var input = {
			desc : $scope.desc,
			amt : $scope.amt,
			mydate : $scope.mydate,
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