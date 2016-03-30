describe('testCtrl', function() {

	beforeEach(module('app'));
	beforeEach(angular.mock.module('ngCookies', 'app'));

	var scope, createController, localStorage;

	beforeEach(inject(function($rootScope, $controller, $cookies) {
		scope = $rootScope.$new();

		$cookies.custName = 'Vihari';

		createController = function() {
			return $controller('testCtrl', {
				$scope : scope,
				$cookies : $cookies
			});
		}
	}));

	it('1 + 4 should equal 5', function() {
		var controller = createController();

		scope.x = 1;
		scope.y = 4;
		scope.add();

		expect(scope.z).toBe(5);
	});

});