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
	setupConfig.$inject = ["$stateProvider"];

})();
(function() {
	angular.module('ordering.tool.preferences', ['ordering.tool.preferences.setup']);
})();
(function() {
	angular.module('ordering.tool', ['ui.router', 'ngMaterial','ordering.tool.preferences'])
	.config(orderingToolConfig);

	function orderingToolConfig($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}
	orderingToolConfig.$inject = ["$urlRouterProvider"];
})();
angular.module("ordering.tool").run(["$templateCache", function($templateCache) {$templateCache.put("preferences/setup.html","<div class=\"col-lg-8 col-lg-offset-2\">\n	<div class=\"panel panel-primary\">\n		<div class=\"panel-heading text-center\">\n			<h4>Hello, User! Thanks for visiting the new NI&amp;S Online Ordering Tool</h4>\n		</div>\n		<div class=\"panel-body text-center\">\n\n			  <p>Before we get started, tell us what kind of experience you prefer<br>\n			  <small>(Don\'t sweat it, you can always change these settings later)</small></p>\n\n			<div class=\"row\">\n				<div class=\"col-lg-4\">\n					<div class=\"btn btn-lg btn-danger btn-block\" ng-class=\"{\'active\': setup.selected == \'unlocked\'}\" ng-click=\"setup.selected = \'unlocked\'\">\n				        <div>\n					        <i class=\"fa fa-unlock fa-2x pull-left\"></i>\n					        <span>Unlocked<br><small>Power Users</small></span>\n				        </div>\n					</div> \n				</div>\n\n				<div class=\"col-lg-4\">\n					<div class=\"btn btn-lg btn-info btn-block\" ng-class=\"{\'active\': setup.selected == \'standard\'}\" ng-click=\"setup.selected = \'standard\'\">\n				        <div>\n					        <i class=\"fa fa-user fa-2x pull-left\"></i>\n					        <span>Standard<br><small>Average Users</small></span>\n				        </div>\n					</div> \n				</div>\n				\n				<div class=\"col-lg-4\">\n					<div class=\"btn btn-lg btn-success btn-block\" ng-class=\"{\'active\': setup.selected == \'guided\'}\" ng-click=\"setup.selected = \'guided\'\">\n				        <div>\n					        <i class=\"fa fa-map-marker fa-2x pull-left\"></i>\n					        <span>Guided<br><small>New/Light Users</small></span>\n				        </div>\n					</div> \n				</div>\n			</div>\n			<div class=\"well\" ng-switch=\"setup.selected\">\n	  			<p ng-switch-when=\"unlocked\">\n	  				<strong>You chose the Unlocked experience. </strong><br>\n	  				You\'ll start with the full dashboard<br>\n	  				We\'ll always show you the advanced options<br>\n	  				You\'ll never see a wizard (merlin or otherwise)<br>\n	  				You should choose this option if you were an ICR pro and you like to see EVERYTHING.\n	  			</p>\n	  			<p ng-switch-when=\"standard\">\n	  				<strong>You chose the Standard experience. </strong><br>\n	  				We\'ll let you loose on the tool, but hide away the advanced stuff until you ask for it.<br>\n	  				This is a good option if you used the ICR application frequently, but rarely asked for anything crazy.\n	  			</p>\n	  			<p ng-switch-when=\"guided\">\n	  				<strong>You chose the Guided experience. </strong><br>\n	  				We\'ll walk you through the ordering process one step at a time!<br>\n	  				We\'ll start you off with a simple task list, and use an ordering wizard to make sure you\'re comfortable<br>\n	  				If you\'re not sure about how to order from NI&amp;S, or ICR gave you nightmares, this option is for you.<br>\n	  			</p>\n	  			<p ng-switch-default>\n		  			Choose from one of the options above. If you aren\'t sure, we\'d recommend the Guided Experience.\n		  		</p>\n			</div>\n		</div>\n		<div class=\"panel-footer\">\n			<button class=\"btn btn-success pull-right\" ng-disabled=\"!setup.selected\" type=\"button\">Get Started!</button>\n			<div class=\"clearfix\"></div>\n		</div>\n	</div>\n</div>");}]);