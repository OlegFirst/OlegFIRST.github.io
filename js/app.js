(function() {
	'use strict';
	
	// Declare modules
	angular.module('websideModule', []);
	angular.module('settingsModule', [])
	angular.module('serviceModule', []);
	angular.module('validationModule', []);
	
	// Configure
	var myApp = angular.module('myApp', [
		'websideModule',
		'settingsModule',
		'validationModule',
		'ngRoute'
	]);
	//'serviceModule',
	
	// Routing
	myApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/websidePart', {
				templateUrl: 'modules/websidePart/webside.html',
				controller: 'websideController'
			})
			.when('/settings', {
				templateUrl: 'modules/settingsPart/settings.html',
				controller: 'settingsController'
			})
			.otherwise({redirectTo: 'settings'});
	}]);
	
	// Project runs
	myApp.run(function($location) {
		$location.path('settings');
		//$location.path('websidePart');		
	});	
	
	myApp.value("settingsOriginal", 
		{
			appearance: {
				'themes': 'White',
				'isShowBookmark': true,
				'fontSize': 'Small',
				'pageZoom': '100%'
			},
			printing: {
				selectedValue: 'Printer #1'
			}
		}
	);
	
	// Main controller
	myApp.controller('myController', function($rootScope, $scope, storageService, settingsOriginal) {
		
		// - MODEL. Objects
		$rootScope.bookmarks = new Bookmarks();
		$rootScope.people = new People();
		// - Set original values
		$rootScope.appearance = angular.copy(settingsOriginal.appearance);
		$rootScope.printing = angular.copy(settingsOriginal.printing);		
		
		// RUN after site is started or updated		
		// - 'Bookmark' loading
		storageService.retieve("Bookmarks", function(response) {
			if (response.success)
				$rootScope.bookmarks.create = response.msg.items;				
		});
		// - 'People' part loading
		storageService.retieve("People", function(response) {
			if (response.success)
				$rootScope.people.create = response.msg.items;
		});
		// - 'Appearance' part loading
		storageService.retieve("Appearance", function(response) {
			if (response.success)
				$rootScope.appearance = response.msg;
		});
		// - 'Printing' part loading
		storageService.retieve("Printing", function(response) {
			if (response.success)
				$rootScope.printing = response.msg;
		});
			
	})

	// WORKING WITH LOCALSTORAGE
	.service('storageService', function() {
		
		var storageName = ["Bookmarks", "People", "Appearance", "Printing"];
		storageName.__proto__.getName = function(type) {
			let res = this.indexOf(type);
			res = (res == -1) ? false : true;
			if (!res)
				console.error("Wrong storage type");
			return res;
		}
		
		// Store information
		this.store = function(type, data) {
			if (storageName.getName(type)) {
				let json = JSON.stringify(data);
				localStorage.setItem(type,json);
			}			
		}
		
		// Retieve information
		this.retieve = function(type, callBack) {
			let res = {
				success: false,
				msg: null
			}
			if (storageName.getName(type)){
				res.msg = JSON.parse(localStorage.getItem(type));
				if (res.msg != null)
					res.success = true;
			}
			return callBack(res);
		}
		
		// Remove item from LocalStorage
		this.remove = function(type) {
			if (storageName.getName(type))
				localStorage.removeItem(type);
		}
		
	});
	
})();