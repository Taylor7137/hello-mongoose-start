
angular.module('todoApp', [

]); //this is the setter syntax, you are creating an application using this one

angular.module('todoApp')
		.controller('TodoController', TodoController);//this is the getter syntax, we can use this so we don't have to make a variable to store our angular application; YAYYY no globals
      

TodoController.$inject = ['$scope', '$http', 'TodoService'];

function TodoController($scope, $http, TodoService){
	getTodos();
	$scope.isEditing = false; 
  

  //Create a new todo
  $scope.saveTodo = function(todo){
  		TodoService.create(todo)
			.then(function(){
					$scope.newTodo = {};
					getTodos();
			});
  }
  
  $scope.editTodo = function(todo){
	  $scope.isEditing = !$scope.isEditing;
	  $scope.editingTodo = todo;
  }
  
  $scope.updateTodo = function(todo){
	  TodoService.update(todo._id, todo)
	  		.then(function(){
		  	getTodos();
		   $scope.isEditing = false;
	  });
  }
  
  $scope.deleteTodo = function(todo){
	  TodoService.delete(todo._id)
	  		.then(function(){	
		   getTodos();
     });
  }
 
  function getTodos(){
	  TodoService.read()
		.then(function(response){
		$scope.todos = response;
		});
  }
 
}

