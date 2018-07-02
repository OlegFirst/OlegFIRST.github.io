'use strict';

angular.module('settingsModule').controller('settingsController', function($rootScope, $scope, storageService, settingsOriginal, $location, $anchorScroll) {
	
	$scope.myFilterResult = null;
	
	var updatingIndex = undefined;
	$scope.appearanceBookmark = {};
	
	// PEOPLE
	$scope.validationMessagesClear = function() {
		$scope.$broadcast("validatorAllMessagesRemove");
	}
	// - People. Manage
	$scope.peopleInsert = function() {
		$scope.manageForm = {
			file: null,
			userName: "",
			email:""
		}
		$scope.isManageVisible = true;
	}	
	$scope.manageFormSubmit = function() {
		var isDataValid = true;
		// - User name validates
		if ($rootScope.validator.isTrue("name", $scope.manageForm.userName)) {
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
		// - User e-mail validates
		if ($rootScope.validator.isTrue("email", $scope.manageForm.email)) {
			$scope.$broadcast("validatorMessageRemove", {title: "#2"});
		}
		else {
			isDataValid = false;
			$scope.$broadcast("validatorMessage", {
				title: "#2",
				message: "User e-mail doesn`t correct",
				example: "n33@gmail.com"
			});
		}
		if (isDataValid) {
			$rootScope.people.insertPerson = $scope.manageForm;
			$scope.isManageVisible = false;
			// - Save
			storageService.store("People", $rootScope.people);			
		}		
	}	
	// - People. Edit
	$scope.peopleEditPreparation = function(index) {
		updatingIndex = index;
		$scope.isPeopleEditVisible = true;
		$scope.peopleEditForm = angular.copy($rootScope.people.getItem(index));
	}
	$scope.peopleEditFormSubmit = function() {
		var isDataValid = true;
		// - User name validates
		if ($rootScope.validator.isTrue("name", $scope.peopleEditForm.userName)) {
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
		// - User e-mail validates
		if ($rootScope.validator.isTrue("email", $scope.peopleEditForm.email)) {
			$scope.$broadcast("validatorMessageRemove", {title: "#2"});
		}
		else {
			isDataValid = false;
			$scope.$broadcast("validatorMessage", {
				title: "#2",
				message: "User e-mail doesn`t correct",
				example: "n33@gmail.com"
			});
		}
		if (isDataValid) {
			$rootScope.people.updatePerson = {index: updatingIndex, item: {file: $scope.peopleEditForm.file, userName: $scope.peopleEditForm.userName, email: $scope.peopleEditForm.email}};
			$scope.isPeopleEditVisible = false;
			// - Save
			storageService.store("People", $rootScope.people);			
		}		
	}
	$scope.peopleEditFormRemove = function() {
		$rootScope.people.removeItem(updatingIndex);
		// - Save
		storageService.store("People", $rootScope.people);
	}
	
	// APPEARANCE	
	// - Appearance. 'Themes'
	$scope.themesChecked = function() {
		//Save
		storageService.store("Appearance", $rootScope.appearance);
	}	
	// - Appearance. 'Add bookmarks'
	$scope.appearanceInsert = function() {
		$scope.error = {
			title: false,
			url: false
		};
		var isDataValid = true;
		// - Bookmark title validates
		if ($rootScope.validator.isTrue("bookmark", $scope.appearanceBookmark.title)) {
			$scope.error.title = false;
		}
		else
			$scope.error.title = true;
		// - Bookmark URL validates
		if ($rootScope.validator.isTrue("url", $scope.appearanceBookmark.url)) {
			$scope.error.url = false;
		}
		else
			$scope.error.url = true;
		if (!$scope.error.title && !$scope.error.url) {
			$rootScope.bookmarks.insertBookmark = {title: $scope.appearanceBookmark.title, url: $scope.appearanceBookmark.url};
			$scope.appearanceBookmark = {};
			// - Save
			storageService.store("Bookmarks", $rootScope.bookmarks);
		}		
	}	
	// - Appearance. 'Show bookmark'
	$scope.showBookmarkChecked = function() {
		$rootScope.appearance.isShowBookmark = ($rootScope.appearance.isShowBookmark == true) ? false : true;
		//Save
		storageService.store("Appearance", $rootScope.appearance);
	}	
	//  - Appearance. 'Font size' default parameters
	$rootScope.fontSize = {
		list: ['Small','Medium','Height'],
		selected: 1,
		setFontSize: function(value) {
			let index = this.list.indexOf(value);
			if (index !=-1)
				this.selected = index;
		},
		getFontSize: function() {
			return this.list[this.selected];
		}		
	};
	$rootScope.fontSize.setFontSize($rootScope.appearance.fontSize);
	$rootScope.fontSizeSelected=function(index) {		
		$rootScope.fontSize.selected = index;
		$rootScope.appearance.fontSize = $rootScope.fontSize.getFontSize();
		//Save
		storageService.store("Appearance", $rootScope.appearance);
	}
	//  - Appearance. 'Page zoom' default parameters
	$rootScope.pageZoom = {
		list: ['10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],
		selected: 9,
		setPageZoom: function(value) {
			let index = this.list.indexOf(value);
			if (index !=-1)
				this.selected = index;
		},
		getPageZoom: function() {
			return this.list[this.selected];
		}
	};
	$rootScope.pageZoom.setPageZoom($rootScope.appearance.pageZoom);	
	$rootScope.pageZoomSelected=function(index) {
		$rootScope.pageZoom.selected = index;
		$rootScope.appearance.pageZoom = $rootScope.pageZoom.getPageZoom();
		//Save
		storageService.store("Appearance", $rootScope.appearance);
	}
	
	// PRINTING
	$rootScope.printers = {
		list: ['Printer #1','Printer #2','Printer #3'],
		selected: 1,
		setPrinter: function(value) {
			let index = this.list.indexOf(value);
			if (index !=-1)
				this.selected = index;
		},
		getPrinter: function() {
			return this.list[this.selected];
		}
	};
	$rootScope.printers.setPrinter($rootScope.printing.selectedValue);
	$scope.printersSelected = function(index) {
		$rootScope.printers.selected = index;
		$rootScope.printing.selectedValue = $rootScope.printers.getPrinter();
		//Save
		storageService.store("Printing", $rootScope.printing);
	}
	
	// RESET
	$scope.reset = function() {
		// - Copy parameters from Angular variable
		$rootScope.appearance = angular.copy(settingsOriginal.appearance);
		$rootScope.printing = angular.copy(settingsOriginal.printing);
		// - Objects updates
		$rootScope.fontSize.setFontSize($rootScope.appearance.fontSize);
		$rootScope.pageZoom.setPageZoom($rootScope.appearance.pageZoom);
		$rootScope.printers.setPrinter($rootScope.printing.selectedValue);		
		// - Save
		storageService.store("Appearance", $rootScope.appearance);		
		storageService.store("Printing", $rootScope.printing);
	}
		
	// OPEN FILE
	$scope.openFile = function(element, action) {
		let fileInfo = element.files[0];
		let preview = undefined;		
		switch (action) {
			case "managing":
				preview = document.querySelector("#photoPreview");		
				break;
			case "editing":
				preview = document.querySelector("#photoPreviewEdit");		
				break;
			default:
				console.error("Arguments error");
			}
		var reader = new FileReader();		
		reader.onload = function(e) {
			$scope.$apply(function() {
				if (preview != undefined) {
					if (action === "managing")					
						$scope.manageForm.file = reader.result;				
					else
						$scope.peopleEditForm.file = reader.result;				
					preview.src = reader.result;				
				}
			});
		}
		if (fileInfo)
			reader.readAsDataURL(fileInfo);
		else
			preview.src = "";
		//reader.readAsText(fileInfo);		
	}
	
	// Page scrolling
	$scope.scrollTo = function(id) {
		if (id !== null) {
			$anchorScroll.yOffset = 150;
			$location.hash(id);
			$anchorScroll();
		}
	}
	
})

// Filter for search user
.filter('myFilter', function() {
	
	return function(array, arg1, arg2) {
		//  Arguments:
		// array - where will be searched
		// arg1 - what will be searched
		// arg2 - is searching will be case sensitive
		
		var res = [];
		
		if (arg1 == undefined || arg1 == '')
			res = array;
		else {
			arg1 = (arg2 === "caseInsensitive") ? arg1.toLowerCase() : arg1;
			array.forEach(function(item) {
				let itemUserName = item.userName;
				itemUserName = (arg2 === "caseInsensitive") ? itemUserName.toLowerCase() : itemUserName;
				if (arg1 === itemUserName)
					res.push(item);
			});
		}
		return res;
	}
	
});