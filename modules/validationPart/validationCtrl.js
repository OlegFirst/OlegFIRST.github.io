'use strict';

angular.module('validationModule').controller('validationController', function($scope, $rootScope) {
	
	// OBJECT
	$rootScope.validator = {
		// - Regex patterns
		pattern: {
			name: /^[A-Z]+[a-z]+/,
			email: /^[a-zA-Z]{1}[a-zA-Z0-9]+@[a-zA-Z0-9]+\.+[a-zA-Z0-9]+/,
			url: /^(https?:\/\/)?[a-zA-Z0-9]+\.([a-zA-Z\.]{2,5})/,
			bookmark: /[a-zA-Z0-9]+/
		},
		// - Regex function
		isTrue: function(arg, msg) {
			let res = false;
			let pat = this.pattern[arg];			
			if (pat == undefined)
				console.error("Wrong pattern name");
			else 
				if (msg != undefined)
					res = pat.test(msg);
			return res;
		}
	};
	
	$scope.messages = {
		// - List of error messages
		items: [],
		// - Set new message
		setter: function(data) {
			let isNew = true;
			for (var i = 0; i < this.items.length; i++) {
				if (data.title === this.items[i].title) {
					isNew = false;
					break;
				}
			}
			if (isNew)
				this.items.push(data);
		},
		// - Remove an old message
		remove: function(title) {
			for (var i = 0; i < this.items.length; i++) {
				if (title === this.items[i].title) {
					this.items.splice(i,1);
					break;
				}
			}
		},
		// - Array clears
		clear: function() {
			this.items = [];
		}
	}
	
	$scope.$on("validatorMessage", function(event, data) {
		$scope.messages.setter(data);		
	});	
	
	$scope.$on("validatorMessageRemove", function(event, data) {
		$scope.messages.remove(data.title);
	});
	
	$scope.$on("validatorAllMessagesRemove", function() {
		$scope.messages.clear();
	});
	
});