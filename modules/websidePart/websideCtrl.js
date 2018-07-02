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
	$scope.validationMessagesClear = function() {
		$scope.$broadcast("validatorAllMessagesRemove");
	}
	$scope.formSubmit = function(isEditing) {		
		switch (isEditing) {
			case false:
				// Create bookmark
				// - Validation
				if (validate({title: $scope.form.title, url: $scope.form.url})) {
					// - Add to the collection
					$rootScope.bookmarks.insertBookmark = angular.copy({title: $scope.form.title, url: $scope.form.url});
					$scope.pagination.setter($rootScope.bookmarks.items.length);
					$scope.isEditVisible = false;
					// - Save
					storageService.store("Bookmarks", $rootScope.bookmarks);
				}
			break;
			case true:
				// Edit bookmark
				// - Validation
				if (validate({title: $scope.formEditing.title, url: $scope.formEditing.url})) {
					// - Collection item updates
					$rootScope.bookmarks.updateBookmark = angular.copy({index: updatingIndex, item: {title: $scope.formEditing.title, url: $scope.formEditing.url}});
					$scope.pagination.setter($rootScope.bookmarks.items.length);
					$scope.isEditVisible = false;
					// - Save
					storageService.store("Bookmarks", $rootScope.bookmarks);
				}
			break;
			default:
				console.error("Data error");
		}
		
		// - Validation
		function validate(bookmark) {
			var isDataValid = true;
			// - Bookmark title validates
			if ($rootScope.validator.isTrue("bookmark", bookmark.title)) {
				$scope.$broadcast("validatorMessageRemove", {title: "#1"});
			}
			else {
				isDataValid = false;
				$scope.$broadcast("validatorMessage", {
					title: "#1",
					message: "User name doesn`t correct",
					example: "Oksana"
				});
			}
			// - Bookmark URL validates
			if ($rootScope.validator.isTrue("url", bookmark.url)) {
				$scope.$broadcast("validatorMessageRemove", {title: "#2"});
			}
			else {
				isDataValid = false;
				$scope.$broadcast("validatorMessage", {
					title: "#2",
					message: "User URL doesn`t correct",
					example: "https://siteName.abc"
				});
			}
			return isDataValid;
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
			console.log(itemsCount);
			// - If there is none bookmark
			if (itemsCount == 0)
				this.items.push({
					from: 0,
					to: 9,
					view: 1
				});
			else
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