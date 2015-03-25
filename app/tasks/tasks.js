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

	function TaskController($scope) {
		$scope.pageClass = 'inFromRight';
	}
})();