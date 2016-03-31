describe('testCtrl', function() {

	// run before each test
	beforeEach(module('app'));
	beforeEach(angular.mock.module('ngCookies', 'app'));

	var scope, controller, localStorage;

	beforeEach(inject(function($rootScope, $controller, $cookies) {
		scope = $rootScope.$new();

		// set cookie before each test
		$cookies.put('custName', 'Vihari');

		controller = $controller('testCtrl', {
			$scope : scope,
			$cookies : $cookies
		});
	}));

	it('sets 1 + 4 to 5', function() {

		scope.x = 1;
		scope.y = 4;
		scope.add();

		expect(scope.z).toBe(5);
	});

	it('sets 9 - 3 to 6', function() {

		scope.x = 9;
		scope.y = 3;
		scope.subtract();

		expect(scope.z).toBe(6);
	});

	it('sets cookie name to Vihari', function() {
		expect(scope.cname).toEqual('Vihari');
	});
});