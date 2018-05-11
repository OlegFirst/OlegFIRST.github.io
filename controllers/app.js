(function () {
	
	'use strict';
	
	var application = angular.module('application', []);
	
	application.controller('mainController', function($scope, save) {
			
		// Trigger Angular event when user presses 'ctrl+Enter' keys
		var body = document.querySelector("body");
		body.addEventListener('keydown', function(event) {
			if (event.ctrlKey && event.key.charCodeAt(0) == 69 && $scope.indexActive != undefined){	
				if ($scope.itemComment != "")
					$scope.commentNew(true);
				else
					alert ("Insert at last one word in the comments");
			}
		});
		
		// Model creates
		$scope.model = new ItemsModel();
		
		// Activated model item`s index
		$scope.indexActive = undefined;
		
		// Start
		siteStarted();
		
		// Item from the list is activated
		$scope.itemActivate = function(index) {
			$scope.indexActive = index;
			$scope.itemComment = "";
		}
		
		// Update
		// - Insert new item
		$scope.itemsNew = function() {
			$scope.model.insertItem = {itemTitle: $scope.itemTitle, itemComment: $scope.itemComment};
			$scope.itemTitle = "";
			save.store($scope.model);
		}
		// - Insert new comment
		$scope.commentNew = function(isKeyPressed = false) {
			$scope.model.insertComment = {index: $scope.indexActive, itemComment: $scope.itemComment};
			$scope.itemComment = "";
			save.store($scope.model);
			if (isKeyPressed)
				$scope.$digest();
		}
		// - Delete item
		$scope.itemsDelete = function(index) {
			$scope.model.removeItem(index);
			save.store($scope.model);
			if (index == $scope.indexActive || $scope.model.getItem.length == 0)
				$scope.indexActive = undefined;
		}
		
		// Run after site is started or updated
		function siteStarted() {
			let res = save.retieve();
			if (res != null)
				if (res.items.length !=0)
					$scope.model.update = res.items;							
		}
	
	});
	
	// Working with Local Storage
	application.service('save', function() {
		
		this.store = function(data) {
			let json = JSON.stringify(data);
			localStorage.setItem("Mpeek", json);
		}
		
		this.retieve = function() {
			let res = JSON.parse(localStorage.getItem("Mpeek"));
			return res;
		}
		
	});
		
})();