(function() {
	angular.module('ordering.tool.tasks', [])
	.config(taskConfig)
	.controller('TaskController', TaskController);

	function taskConfig($stateProvider) {
		$stateProvider
			.state('tasks', {
				url: '/tasks',
				controller: 'TaskController as tasks',
				templateUrl: 'tasks/task-list.html'
			});
	}
	taskConfig.$inject = ["$stateProvider"];

	function TaskController($scope) {
		$scope.pageClass = 'inFromRight';
	}
	TaskController.$inject = ["$scope"];
})();
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

	function SetupController($scope, preferences) {
		$scope.pageClass = 'inFromLeft';
		var vm = this;
		vm.experience = null;
		vm.saveUserExperience = saveUserExperience;

		function saveUserExperience(experience) {
			preferences.createByProfile(experience);
		}
	}
	SetupController.$inject = ["$scope", "preferences"];

})();
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
	preferences.$inject = ["$cookies", "$state"];
})();
(function() {


angular.module('ordering.tool.editor', [])
	.controller('EditorController', EditorController)
	.controller('AnalogTelephoneController', AnalogTelephoneController)
	.directive('formField', formField)
	.config(editorConfig);

	function editorConfig($stateProvider) {

		$stateProvider
			.state('editor', {
				url: '/editor',
				abstract: true, 
				controller: 'EditorController as editor',
				templateUrl: 'editor/root.html'	
			})
			.state('analogtelephone', {
				parent: 'editor', 
			 	url: '/analog-telephone', 
			 	controller: 'AnalogTelephoneController as uc',
			 	templateUrl: 'editor/telephone.html', 
			 	data: {
			 		title: 'UC Telephone Service'
			 	}
			})
	}
	editorConfig.$inject = ["$stateProvider"];

	function EditorController() {
		var vm = this;
		vm.title = "Editor";

	}

	function AnalogTelephoneController($state, $scope) {
		var vm = this;
		$scope.editor.title = $state.current.data.title;
		vm.uc = "UC";
	}
	AnalogTelephoneController.$inject = ["$state", "$scope"];

	function formField() {
		return {
			restrict: 'EA', 
			scope: {
				label: '=',
				helpText: '='
			}, 
			transclude: true,
			templateUrl: 'editor/form-field.html'
		}
	}
})();
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
	dashboardConfig.$inject = ["$stateProvider"];

	function DashboardController($scope) {
		$scope.pageClass = 'inFromRight';
	}
	DashboardController.$inject = ["$scope"]; 
})();
(function() {
	angular.module('ordering.tool', ['ui.router', 'ui.bootstrap', 'ngMaterial', 'ngAnimate', 'ngCookies', 'ordering.tool.editor', 'ordering.tool.preferences', 'ordering.tool.dashboard', 'ordering.tool.tasks'])
	.config(orderingToolConfig);

	function orderingToolConfig($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}
	orderingToolConfig.$inject = ["$urlRouterProvider"];
})();
angular.module("ordering.tool").run(["$templateCache", function($templateCache) {$templateCache.put("dashboard/dashboard.html","dashboard.html");
$templateCache.put("editor/form-field.html","<div class=\"col-lg-12 form-group\">\r\n	<div class=\"col-lg-3 text-right\"><label>{{label}} <i class=\"fa fa-question-circle\" popover=\"{{helpText}}\" popover-trigger=\"mouseenter\"></i></div>\r\n	<div class=\"col-lg-9\" ng-transclude></div>\r\n</div>");
$templateCache.put("editor/root.html","<div class=\"container\">\r\n	<form name=\"editor.form\">\r\n		<div class=\"panel panel-default\">\r\n			<div class=\"panel-heading text-center\"><h3>{{editor.title}}</h3></div>\r\n			<div class=\"panel-body\">\r\n			<!-- Start Form Body -->\r\n			<div class=\"col-lg-8 col-lg-offset-2\" ui-view>\r\n				\r\n			</div>\r\n			<!-- End Form Body-->\r\n			</div>\r\n			<div class=\"panel-footer\">\r\n				<div class=\"col-lg-1 col-lg-offset-10\">\r\n					<button class=\"btn btn-success\" type=\"submit\">Submit</button>\r\n				</div>\r\n				<div class=\"col-lg-1\">\r\n					<button class=\"btn btn-danger\" type=\"button\">Cancel</button>\r\n				</div>\r\n				<div class=\"clearfix\"></div>\r\n			</div>\r\n		</div>\r\n	</form>\r\n</div>\r\n");
$templateCache.put("editor/telephone.html","\r\n<fieldset>\r\n	<legend><h2>Service Configuration</h2></legend>\r\n    	<form-field label=\"\'Expedite\'\" help-text=\"\'Expediting orders costs $50, but gets things done faster. Money Talks.\'\">\r\n    		<input type=\"checkbox\">\r\n    	</form-field>\r\n    	<form-field label=\"\'User\'\" help-text=\"\'help\'\">\r\n    		<input type=\"text\" class=\"form-control\" placeholder=\"VT Employee Name\">\r\n    	</form-field>\r\n    	<form-field label=\"\'Calling Name\'\" help-text=\"\'help\'\">\r\n    		<input type=\"text\" class=\"form-control\" placeholder=\"Calling Name\">\r\n    	</form-field>\r\n    	<form-field label=\"\'Calling Privilege\'\" help-text=\"\'help\'\">\r\n    		<select class=\"form-control\">\r\n    			<option>1</option>\r\n    		</select>\r\n    	</form-field>\r\n    	<form-field label=\"\'Call Waiting\'\" help-text=\"\'help\'\">\r\n    		<input type=\"checkbox\">\r\n    	</form-field>\r\n    	<form-field label=\"\'Unified Messaging\'\" help-text=\"\'help\'\">\r\n    		<input type=\"checkbox\">\r\n    	</form-field>\r\n</fieldset>\r\n\r\n<fieldset>\r\n	<legend><h2>Advanced Configuration</h2></legend>\r\n	<fieldset>\r\n		<legend>Caller ID</legend>\r\n		<form-field label=\"\'On System\'\" help-text=\"\'Help\'\">\r\n    		<input type=\"text\" class=\"form-control\">\r\n    	</form-field>\r\n		<form-field label=\"\'Off System\'\" help-text=\"\'Help\'\">\r\n    		<input type=\"text\" class=\"form-control\">\r\n    	</form-field>\r\n	</fieldset>\r\n	<fieldset>\r\n		<legend>Call Coverage</legend>\r\n		<div class=\"col-lg-12 form-group\">\r\n			<div class=\"col-lg-3 text-right\">After</div>\r\n			<div class=\"col-lg-2\">\r\n				<select class=\"form-control\">\r\n	    			<option>1</option>\r\n	    		</select>\r\n    		</div>\r\n    		<div class=\"col-lg-3\">rings, send calls to </div>\r\n			<div class=\"col-lg-4 text-right\"><input type=\"text\" class=\"form-control\" placeholder=\"5 digit extension\"></div>\r\n		</div>\r\n		<div class=\"col-lg-12 form-group\">\r\n			<div class=\"col-lg-3 text-right\">After</div>\r\n			<div class=\"col-lg-2\">\r\n				<select class=\"form-control\">\r\n	    			<option>1</option>\r\n	    		</select>\r\n    		</div>\r\n    		<div class=\"col-lg-3\">rings, send calls to </div>\r\n			<div class=\"col-lg-4 text-right\"><input type=\"text\" class=\"form-control\" value=\"Unified Messaging\" placeholder=\"5 digit extension\"></div>\r\n		</div>\r\n	</fieldset>\r\n	<fieldset>\r\n		<legend>Unified Messaging</legend>\r\n		<form-field label=\"\'Mobile Name\'\" help-text=\"\'Help\'\">\r\n    		<input type=\"text\" class=\"form-control\">\r\n    	</form-field>\r\n		<form-field label=\"\'Personal Attendant\'\" help-text=\"\'Help\'\">\r\n    		<input type=\"text\" class=\"form-control\">\r\n    	</form-field>\r\n		<form-field label=\"\'Email Address For Fax Delivery\'\" help-text=\"\'Help\'\">\r\n    		<input type=\"text\" class=\"form-control\">\r\n    	</form-field>\r\n    	<form-field label=\"\'Message Blocking\'\" help-text=\"\'help\'\">\r\n    		<select class=\"form-control\">\r\n    			<option>1</option>\r\n    		</select>\r\n    	</form-field>\r\n    	<form-field label=\"\'SMS Notification\'\" help-text=\"\'help\'\">\r\n    		<select class=\"form-control\">\r\n    			<option>None</option>\r\n    			<option>Urgent Messages</option>\r\n    			<option>All Messages</option>\r\n    		</select>\r\n    	</form-field>\r\n	</fieldset>\r\n</fieldset>\r\n\r\n<fieldset>\r\n	<legend>Device</legend>\r\n	Existing Phone <br>\r\n	<form-field label=\"\'Existing Phone\'\" help-text=\"\'help\'\">\r\n		<input type=\"checkbox\">\r\n	</form-field>\r\n	<form-field label=\"\'High Availability\'\" help-text=\"\'help\'\">\r\n		<input type=\"checkbox\">\r\n	</form-field>\r\n	<form-field label=\"\'Analog\'\" help-text=\"\'help\'\">\r\n		<input type=\"checkbox\">\r\n	</form-field>\r\n	<form-field label=\"\'Phone Model\'\" help-text=\"\'help\'\">\r\n    		<select class=\"form-control\">\r\n    			<option>1</option>\r\n    		</select>\r\n    	</form-field>\r\n</fieldset>\r\n\r\n<fieldset>\r\n	<legend>Connectivity</legend>\r\n	<form-field label=\"\'Building\'\" help-text=\"\'help\'\">\r\n		<select class=\"form-control\">\r\n			<option>1</option>\r\n		</select>\r\n	</form-field>\r\n	<form-field label=\"\'Room\'\" help-text=\"\'help\'\">\r\n		<select class=\"form-control\">\r\n			<option>1</option>\r\n		</select>\r\n	</form-field>\r\n	<form-field label=\"\'Outlet\'\" help-text=\"\'help\'\">\r\n		<select class=\"form-control\">\r\n			<option>1</option>\r\n		</select>\r\n	</form-field>\r\n</fieldset>\r\n			\r\n");
$templateCache.put("preferences/setup.html","<div class=\"col-lg-6 col-lg-offset-3\">\r\n	<div class=\"panel panel-primary\">\r\n		<div class=\"panel-heading text-center\">\r\n			<h4>Hello, User! Thanks for visiting the new NI&amp;S Online Ordering Tool</h4>\r\n		</div>\r\n		<div class=\"panel-body text-center\">\r\n\r\n			  <p>Before we get started, tell us what kind of experience you prefer<br>\r\n			  <small>(Don\'t sweat it, you can always change these settings later)</small></p>\r\n\r\n			<div class=\"row\">\r\n				<div class=\"col-lg-4\">\r\n					<div class=\"btn btn-lg btn-danger btn-block\" ng-class=\"{\'active\': setup.experience == \'unlocked\'}\" ng-click=\"setup.experience = \'unlocked\'\">\r\n				        <div>\r\n					        <i class=\"fa fa-unlock fa-2x pull-left\"></i>\r\n					        <span>Unlocked<br><small>Power Users</small></span>\r\n				        </div>\r\n					</div> \r\n				</div>\r\n\r\n				<div class=\"col-lg-4\">\r\n					<div class=\"btn btn-lg btn-info btn-block\" ng-class=\"{\'active\': setup.experience == \'standard\'}\" ng-click=\"setup.experience = \'standard\'\">\r\n				        <div>\r\n					        <i class=\"fa fa-user fa-2x pull-left\"></i>\r\n					        <span>Standard<br><small>Average Users</small></span>\r\n				        </div>\r\n					</div> \r\n				</div>\r\n				\r\n				<div class=\"col-lg-4\">\r\n					<div class=\"btn btn-lg btn-success btn-block\" ng-class=\"{\'active\': setup.experience == \'guided\'}\" ng-click=\"setup.experience = \'guided\'\">\r\n				        <div>\r\n					        <i class=\"fa fa-map-marker fa-2x pull-left\"></i>\r\n					        <span>Guided<br><small>New/Light Users</small></span>\r\n				        </div>\r\n					</div> \r\n				</div>\r\n			</div>\r\n			<div class=\"well\" ng-switch=\"setup.experience\">\r\n	  			<p ng-switch-when=\"unlocked\">\r\n	  				<strong>You chose the Unlocked experience. </strong><br>\r\n	  				You\'ll start with the full dashboard<br>\r\n	  				We\'ll always show you the advanced options<br>\r\n	  				You\'ll never see a wizard (merlin or otherwise)<br>\r\n	  				You should choose this option if you were an ICR pro and you like to see EVERYTHING.\r\n	  			</p>\r\n	  			<p ng-switch-when=\"standard\">\r\n	  				<strong>You chose the Standard experience. </strong><br>\r\n	  				We\'ll let you loose on the tool, but hide away the advanced stuff until you ask for it.<br>\r\n	  				This is a good option if you used the ICR application frequently, but rarely asked for anything crazy.\r\n	  			</p>\r\n	  			<p ng-switch-when=\"guided\">\r\n	  				<strong>You chose the Guided experience. </strong><br>\r\n	  				We\'ll walk you through the ordering process one step at a time!<br>\r\n	  				We\'ll start you off with a simple task list, and use an ordering wizard to make sure you\'re comfortable<br>\r\n	  				If you\'re not sure about how to order from NI&amp;S, or ICR gave you nightmares, this option is for you.<br>\r\n	  			</p>\r\n	  			<p ng-switch-default>\r\n		  			Choose from one of the options above. If you aren\'t sure, we\'d recommend the Guided Experience.\r\n		  		</p>\r\n			</div>\r\n		</div>\r\n		<div class=\"panel-footer\">\r\n			<button \r\n				class=\"btn btn-success pull-right\" \r\n				type=\"button\"\r\n				ng-click=\"setup.saveUserExperience(setup.experience)\" \r\n				ng-disabled=\"!setup.experience\">Get Started!</button>\r\n			<div class=\"clearfix\"></div>\r\n		</div>\r\n	</div>\r\n</div>");
$templateCache.put("tasks/task-list.html","	<div class=\"row\">\r\n        <div class=\"col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 bhoechie-tab-container\">\r\n            <div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 bhoechie-tab-menu\">\r\n              <div class=\"list-group\">\r\n                <a href=\"#\" class=\"list-group-item active text-center\">\r\n                  <i class=\"fa fa-users fa-2x\"></i><br/>Employees\r\n                </a>\r\n                <a href=\"#\" class=\"list-group-item text-center\">\r\n                  <i class=\"fa fa-unlock fa-2x\"></i><br/>Services\r\n                </a>\r\n                <a href=\"#\" class=\"list-group-item text-center\">\r\n                  <i class=\"fa fa-unlock fa-2x\"></i><br/>Orders\r\n                </a>\r\n                <a href=\"#\" class=\"list-group-item text-center\">\r\n                  <i class=\"fa fa-unlock fa-2x\"></i><br/>Restaurant\r\n                </a>\r\n               \r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9 bhoechie-tab\">\r\n                <!-- flight section -->\r\n               <div class=\"list-group active\">\r\n				  <a href=\"#\" class=\"list-group-item \">\r\n				    <h4 class=\"list-group-item-heading\">List group item heading</h4>\r\n				    <p class=\"list-group-item-text\">Something else and some more things that I thought were good fake text.</p>\r\n				  </a>\r\n				  <a href=\"#\" class=\"list-group-item \">\r\n				    <h4 class=\"list-group-item-heading\">List group item heading</h4>\r\n				    <p class=\"list-group-item-text\">Something else and some more things that I thought were good fake text.</p>\r\n				  </a>\r\n				  <a href=\"#\" class=\"list-group-item \">\r\n				    <h4 class=\"list-group-item-heading\">List group item heading</h4>\r\n				    <p class=\"list-group-item-text\">Something else and some more things that I thought were good fake text.</p>\r\n				  </a>\r\n				</div>\r\n                <!-- train section -->\r\n                <div class=\"bhoechie-tab-content\">\r\n                    <center>\r\n                      <h1 class=\"glyphicon glyphicon-road\" style=\"font-size:12em;color:#55518a\"></h1>\r\n                      <h2 style=\"margin-top: 0;color:#55518a\">Cooming Soon</h2>\r\n                      <h3 style=\"margin-top: 0;color:#55518a\">Train Reservation</h3>\r\n                    </center>\r\n                </div>\r\n    \r\n                <!-- hotel search -->\r\n                <div class=\"bhoechie-tab-content\">\r\n                    <center>\r\n                      <h1 class=\"glyphicon glyphicon-home\" style=\"font-size:12em;color:#55518a\"></h1>\r\n                      <h2 style=\"margin-top: 0;color:#55518a\">Cooming Soon</h2>\r\n                      <h3 style=\"margin-top: 0;color:#55518a\">Hotel Directory</h3>\r\n                    </center>\r\n                </div>\r\n                <div class=\"bhoechie-tab-content\">\r\n                    <center>\r\n                      <h1 class=\"glyphicon glyphicon-cutlery\" style=\"font-size:12em;color:#55518a\"></h1>\r\n                      <h2 style=\"margin-top: 0;color:#55518a\">Cooming Soon</h2>\r\n                      <h3 style=\"margin-top: 0;color:#55518a\">Restaurant Diirectory</h3>\r\n                    </center>\r\n                </div>\r\n                <div class=\"bhoechie-tab-content\">\r\n                    <center>\r\n                      <h1 class=\"glyphicon glyphicon-credit-card\" style=\"font-size:12em;color:#55518a\"></h1>\r\n                      <h2 style=\"margin-top: 0;color:#55518a\">Cooming Soon</h2>\r\n                      <h3 style=\"margin-top: 0;color:#55518a\">Credit Card</h3>\r\n                    </center>\r\n                </div>\r\n            </div>\r\n        </div>");}]);