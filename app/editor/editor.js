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

	function EditorController() {
		var vm = this;
		vm.title = "Editor";

	}

	function AnalogTelephoneController($state, $scope) {
		var vm = this;
		$scope.editor.title = $state.current.data.title;
		vm.uc = "UC";
	}

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