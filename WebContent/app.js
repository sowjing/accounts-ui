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
		$scope.reverse = !$scope.reverse;
	}

	$http.get("/data/stmt.json").then(function(response) {
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

var txnCtrl = function($scope, $http) {
	$scope.categories = [ {
		value : "merchandise",
		label : "Merchandise"
	}, {
		value : "groceries",
		label : "Groceries"
	} ];

	$scope.addTxn = function() {
		// if (!$scope.desc || !$scope.amt || !$scope.crDb) {
		//
		// $scope.errortext = "Please fill all details";
		// return;
		// }

		// if (!angular.isNumber($scope.amt)) {
		// console.log("amount=" + $scope.amt);
		// $scope.errortext = "Amount is invalid. Please enter a valid number.";
		// return;
		// }

		var input = {
			desc : $scope.desc.value,
			amt : $scope.amt,
			mydate : $scope.mydate,
			crdb : $scope.crDb
		};

		$http.post("http://localhost:8989/AccountMgmt/acctservice/txn/addtxn",
				input).then(function(response, status) {
			if (response.data = 'success') {
				$scope.result = 'Transaction added successfully.'
			} else {
				$scope.result = 'Transaction failed.'
			}
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