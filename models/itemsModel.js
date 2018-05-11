'use strict';

class ItemsModel {
	
	constructor() {
		// Collection
		this.items = [];
	}
	
	// Insert new element
	set insertItem(msg) {
		// - Check for new one
		let isNew = true;
		this.items.forEach(function(item) {
			if (item.itemTitle === msg.itemTitle)
				isNew = false;
		});
		if (isNew) {
			let obj = Object.create(null);
			// - Items
			obj.itemTitle = msg.itemTitle;
			// - Items` comments array
			obj.comments = [];
			if (msg.itemComment != undefined)
				if (msg.itemComment != "")
					obj.comments.push(msg.itemComment);
			// - Insert to the collection
			this.items.push(obj);
		}
		else
			alert ("Such item exists");
	}
	
	// Get all elements from the collection
	get getItem() {
		return this.items;
	}
	
	// Remove an element
	removeItem(index) {
		if (index>=0 && index<this.items.length) 
			this.items.splice(index, 1);
		else
			console.error("Can`t remove the element with index=", index);
	}
	
	// Insert new comment in the element
	set insertComment(msg) {
		let isNew = true;
		let comments = this.items[msg.index].comments;
		for (var i = 0; i < comments.length; i++) {
			if (comments[i] === msg.itemComment) {
				isNew = false;
				break;
			}
		}
		if (isNew)		
			this.items[msg.index].comments.push(msg.itemComment);
		else
			alert ("Such comment exists");
	}

	set update(items) {
		items.forEach(function(msg) {
			let obj = Object.create(null);
			// - Items
			obj.itemTitle = msg.itemTitle;
			// - Items` comments array
			obj.comments = msg.comments;
			// - Insert to the collection
			this.items.push(obj);
		}.bind(this));
	}
	
}