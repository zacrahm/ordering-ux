(function() {
	angular.module('ordering.tool.preferences', ['ordering.tool.preferences.setup', 'ngCookies'])
	.factory('preferences', preferences);

	function preferences($cookies, $state) {
		var service = {
			Preferences: Preferences,
			storePreferences: storePreferences,
			createByProfile: createByProfile
		};
		return service;

		function Preferences(defaultView, showSubscriptionWizard, showEditorWizard, showAdvancedOptions) {
			this.defaultView = defaultView;
			this.showSubscriptionWizard = showSubscriptionWizard;
			this.showEditorWizard = showEditorWizard;
			this.showAdvancedOptions = showAdvancedOptions;
		}

		function createByProfile(profile) {
			var preferences = null;
			switch(profile) {
				case 'unlocked':
					preferences = new Preferences('dashboard', false, false, true);
					break;
				case 'standard': 
					preferences = new Preferences('dashboard', false, false, false);
					break;
				case 'guided':
					preferences = new Preferences('tasks', true, true, false);
					break;
				default: 
					throw 'Unsupported Preferences Profile';
			}
			storePreferences(preferences);
		}

		function storePreferences(preferences) {
			$cookies.putObject('preferences', preferences);
			var nextState = $cookies.getObject('preferences').defaultView;

			$state.go(nextState);
		}

	}
})();