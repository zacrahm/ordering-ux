(function() {
	angular.module('ordering.tool', ['ui.router', 'ngMaterial','ordering.tool.preferences'])
	.config(orderingToolConfig);

	function orderingToolConfig($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}
})();