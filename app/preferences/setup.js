(function() {
	angular.module('ordering.tool.preferences.setup', [])
	.config(setupConfig);

	function setupConfig($stateProvider) {

		$stateProvider
			.state('setup', {
				url: '/setup',
				templateUrl: 'preferences/setup.html'
			});
	}

})();