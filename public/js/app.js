angular.module('todoApp', []);

angular.module('todoApp')
	.controller('TodoController', TodoController);

TodoController.$inject = ['$scope', '$http'];

function TodoController($scope, $http){
	$scope.todos = [];
	initTodos();
	
	$scope.saveTodo = function(){
		$http.post('/api/todos', $scope.newTodo)
			.then(function(response){
				initTodos();
				$scope.newTodo = {};
		})
			.catch(function(err){
				console.err(err);
		});
	}
	
	function initTodos(){
		$http.get('/api/todos')
			.then(function(response){
				$scope.todos = response.data;
			})
			.catch(function(err){
				console.err(err);		
		 	});
	}
	
}