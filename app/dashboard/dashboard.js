(function() {
	angular.module('ordering.tool.dashboard', [])
	.controller('DashboardController', DashboardController)
	.config(dashboardConfig);


	function dashboardConfig($stateProvider) {
		$stateProvider
			.state('dashboard', {
				url: '/dashboard',
				controller: 'DashboardController as dashboard', 
				templateUrl: 'dashboard/dashboard.html'
			});
	}

	function DashboardController($scope) {
		$scope.pageClass = 'inFromRight';
	} 
})();