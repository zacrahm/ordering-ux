(function() {
	angular.module('ordering.tool.preferences.setup', [])
	.controller('SetupController', SetupController)
	.config(setupConfig);

	function setupConfig($stateProvider) {

		$stateProvider
			.state('setup', {
				url: '/setup',
				controller: 'SetupController as setup',
				templateUrl: 'preferences/setup.html'
			});
	}

	function SetupController(preferences) {
		var vm = this;
		vm.experience = null;
		vm.saveUserExperience = saveUserExperience;

		function saveUserExperience(experience) {
			preferences.createByProfile(experience);
		}
	}

})();