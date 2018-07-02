'use strict';

angular.module('websideModule').controller('websideController', function($rootScope, $scope, storageService) {
	
	var updatingIndex = undefined;	
	
	// Manipulating with bookmark
	$scope.formPreparation = function(index = undefined) {
		if (index == undefined) {
			// Will be created
			$scope.form = {
				tile: "",
				url: ""
			};
		}
		else {
			// Will be edited
			$scope.formEditing = $rootScope.bookmarks.getItem(index);
			updatingIndex = index;
		}
	}
	$scope.formSubmit = function(isEditing) {
		switch (isEditing) {
			case false:
				// Create bookmark
				// - Validation
				// - Add to the collection
				$rootScope.bookmarks.insertBookmark = {title: $scope.form.title, url: $scope.form.url};
				$scope.pagination.setter($rootScope.bookmarks.items.length);
				// - Save
				storageService.store("Bookmarks", $rootScope.bookmarks);				
			break;
			case true:
				// Edit bookmark
				// - Validation
				// - Collection item updates
				$rootScope.bookmarks.updateBookmark = {index: updatingIndex, item: {title: $scope.formEditing.title, url: $scope.formEditing.url}};
				// - Save
				storageService.store(0, $rootScope.bookmarks);
			break;
			default:
				console.error("Data error");
		}
	}

	// PAGINATION
	// - Pagination. Object
	$scope.pagination = {
		// - List
		items: [],
		// - Setter
		setter: function(bookmarksCount) {
			this.items = [];
			let itemsCount = Math.ceil(bookmarksCount/10);
			let index = 0;
			for (var i = 1; i <= itemsCount; i++) {
				this.items.push({
					from: index,
					to: index+9,
					view: index
				});
				index += 10;
			}
			this.items[0].view = 1;
		}			
	}
	$scope.pagination.setter($rootScope.bookmarks.items.length);
	// - Pagination. Events
	$scope.paginationSelected = 0;
	$scope.paginationItemSelect = function(index) {
		$scope.paginationSelected = index;
	}
	
})

// Pagination filter
.filter('paginationFilter', function() {
	
	return function(array, arg, search) {
		var res = [];
		for (var i = arg.from; i<=arg.to; i++) {
			if (i<array.length) {
				if (search != undefined && search !='') {
					if (array[i].title === search)
						res.push(array[i]);
				}
				else
					res.push(array[i]);
			}
		}
		return res;
	}
	
});