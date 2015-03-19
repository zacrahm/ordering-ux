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
angular.module("ordering.tool").run(["$templateCache", function($templateCache) {$templateCache.put("preferences/setup.html","<div flex layout=\"column\" layout-align=\"center center\">\r\n	<div id=\"panel\">\r\n		\r\n			<md-toolbar flex>\r\n				<div class=\"md-toolbar-tools\">\r\n					Before we get started, choose your ordering experience\r\n				</div>\r\n			</md-toolbar>\r\n		\r\n		<div layout=\"row\">\r\n			<md-content flex class=\"md-whiteframe-z1 text-center\" layout-padding>\r\n				\r\n				<div id=\"selection\">\r\n					<div layout=\"row\" layout-align=\"space-around\">\r\n						<!-- PRICE ITEM -->\r\n						<div class=\"panel price panel-green\">\r\n							<div class=\"panel-body text-center\">\r\n								<i class=\"fa fa-unlock fa-5x\"></i>\r\n								<h2>Unlocked</h2>\r\n							</div>\r\n							<ul class=\"list-group list-group-flush text-center\">\r\n								<li class=\"list-group-item\">Dashboard Default</li>\r\n								<li class=\"list-group-item\">One Page Ordering</li>\r\n								<li class=\"list-group-item\">Recommended for Power Users</li>\r\n							</ul>\r\n							<div class=\"panel-footer\">\r\n								<a class=\"btn btn-lg btn-block btn-success\" href=\"#\">Let\'s Go!</a>\r\n							</div>\r\n						</div>\r\n						<!-- /PRICE ITEM -->\r\n						<!-- PRICE ITEM -->\r\n						<div class=\"panel price panel-blue\">\r\n							\r\n							<div class=\"panel-body text-center\">\r\n								<i class=\"fa fa-map-marker fa-5x\"></i>\r\n								<h2>Guided</h2>\r\n							</div>\r\n							<ul class=\"list-group list-group-flush text-center\">\r\n								<li class=\"list-group-item\">Task List Default</li>\r\n								<li class=\"list-group-item\">Guided Ordering</li>\r\n								<li class=\"list-group-item\">Recommended for Newer Users</li>\r\n							</ul>\r\n							<div class=\"panel-footer\">\r\n								<a class=\"btn btn-lg btn-block btn-primary\" href=\"#\">Show Me The Way!</a>\r\n							</div>\r\n						</div>\r\n						<!-- /PRICE ITEM -->\r\n					</div>\r\n					<p >Don\'t worry, you can change these settings later. Just look for the <i class=\"fa fa-cog\"></i> symbol to change your user settings.</p>\r\n				</div>\r\n			</md-content>\r\n		</div>\r\n	</div>\r\n</div>");}]);