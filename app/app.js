(function() {
	angular.module('ordering.tool', ['ui.router', 'ui.bootstrap', 'ngMaterial', 'ngAnimate', 'ngCookies', 'ordering.tool.editor', 'ordering.tool.preferences', 'ordering.tool.dashboard', 'ordering.tool.tasks'])
	.config(orderingToolConfig);

	function orderingToolConfig($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}
})();