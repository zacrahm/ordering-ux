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
	setupConfig.$inject = ["$stateProvider"];

	function SetupController(preferences) {
		var vm = this;
		vm.experience = null;
		vm.saveUserExperience = saveUserExperience;

		function saveUserExperience(experience) {
			preferences.createByProfile(experience);
		}
	}
	SetupController.$inject = ["preferences"];

})();
(function() {
	angular.module('ordering.tool.preferences', ['ordering.tool.preferences.setup', 'ngCookies'])
	.factory('preferences', preferences);

	function preferences($cookies) {
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
					preferences = new Preferences('taskList', true, true, false);
					break;
				default: 
					throw 'Unsupported Preferences Profile';
			}
			storePreferences(preferences);
		}

		function storePreferences(preferences) {
			console.log("Let's store ", preferences);
			$cookies.putObject('preferences', preferences);
		}

	}
	preferences.$inject = ["$cookies"];
})();
(function() {
	angular.module('ordering.tool', ['ui.router', 'ngMaterial','ngCookies', 'ordering.tool.preferences'])
	.config(orderingToolConfig);

	function orderingToolConfig($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}
	orderingToolConfig.$inject = ["$urlRouterProvider"];
})();
angular.module("ordering.tool").run(["$templateCache", function($templateCache) {$templateCache.put("preferences/setup.html","<div class=\"col-lg-8 col-lg-offset-2\">\r\n	<div class=\"panel panel-primary\">\r\n		<div class=\"panel-heading text-center\">\r\n			<h4>Hello, User! Thanks for visiting the new NI&amp;S Online Ordering Tool</h4>\r\n		</div>\r\n		<div class=\"panel-body text-center\">\r\n\r\n			  <p>Before we get started, tell us what kind of experience you prefer<br>\r\n			  <small>(Don\'t sweat it, you can always change these settings later)</small></p>\r\n\r\n			<div class=\"row\">\r\n				<div class=\"col-lg-4\">\r\n					<div class=\"btn btn-lg btn-danger btn-block\" ng-class=\"{\'active\': setup.experience == \'unlocked\'}\" ng-click=\"setup.experience = \'unlocked\'\">\r\n				        <div>\r\n					        <i class=\"fa fa-unlock fa-2x pull-left\"></i>\r\n					        <span>Unlocked<br><small>Power Users</small></span>\r\n				        </div>\r\n					</div> \r\n				</div>\r\n\r\n				<div class=\"col-lg-4\">\r\n					<div class=\"btn btn-lg btn-info btn-block\" ng-class=\"{\'active\': setup.experience == \'standard\'}\" ng-click=\"setup.experience = \'standard\'\">\r\n				        <div>\r\n					        <i class=\"fa fa-user fa-2x pull-left\"></i>\r\n					        <span>Standard<br><small>Average Users</small></span>\r\n				        </div>\r\n					</div> \r\n				</div>\r\n				\r\n				<div class=\"col-lg-4\">\r\n					<div class=\"btn btn-lg btn-success btn-block\" ng-class=\"{\'active\': setup.experience == \'guided\'}\" ng-click=\"setup.experience = \'guided\'\">\r\n				        <div>\r\n					        <i class=\"fa fa-map-marker fa-2x pull-left\"></i>\r\n					        <span>Guided<br><small>New/Light Users</small></span>\r\n				        </div>\r\n					</div> \r\n				</div>\r\n			</div>\r\n			<div class=\"well\" ng-switch=\"setup.experience\">\r\n	  			<p ng-switch-when=\"unlocked\">\r\n	  				<strong>You chose the Unlocked experience. </strong><br>\r\n	  				You\'ll start with the full dashboard<br>\r\n	  				We\'ll always show you the advanced options<br>\r\n	  				You\'ll never see a wizard (merlin or otherwise)<br>\r\n	  				You should choose this option if you were an ICR pro and you like to see EVERYTHING.\r\n	  			</p>\r\n	  			<p ng-switch-when=\"standard\">\r\n	  				<strong>You chose the Standard experience. </strong><br>\r\n	  				We\'ll let you loose on the tool, but hide away the advanced stuff until you ask for it.<br>\r\n	  				This is a good option if you used the ICR application frequently, but rarely asked for anything crazy.\r\n	  			</p>\r\n	  			<p ng-switch-when=\"guided\">\r\n	  				<strong>You chose the Guided experience. </strong><br>\r\n	  				We\'ll walk you through the ordering process one step at a time!<br>\r\n	  				We\'ll start you off with a simple task list, and use an ordering wizard to make sure you\'re comfortable<br>\r\n	  				If you\'re not sure about how to order from NI&amp;S, or ICR gave you nightmares, this option is for you.<br>\r\n	  			</p>\r\n	  			<p ng-switch-default>\r\n		  			Choose from one of the options above. If you aren\'t sure, we\'d recommend the Guided Experience.\r\n		  		</p>\r\n			</div>\r\n		</div>\r\n		<div class=\"panel-footer\">\r\n			<button \r\n				class=\"btn btn-success pull-right\" \r\n				type=\"button\"\r\n				ng-click=\"setup.saveUserExperience(setup.experience)\" \r\n				ng-disabled=\"!setup.experience\">Get Started!</button>\r\n			<div class=\"clearfix\"></div>\r\n		</div>\r\n	</div>\r\n</div>");}]);