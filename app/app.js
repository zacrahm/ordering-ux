(function() {
	angular.module('ordering.tool', ['ui.router', 'ngMaterial', 'ngAnimate', 'ngCookies', 'ordering.tool.preferences', 'ordering.tool.dashboard'])
	.config(orderingToolConfig);

	function orderingToolConfig($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}
})();