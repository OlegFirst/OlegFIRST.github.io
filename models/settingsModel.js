class People {
	
	constructor() {
		this.items = [];
	}
	
	// - Insert new person
	set insertPerson(newPerson) {
		//Validation
		//
		this.items.push(newPerson);
	}
	
	// - Update existing bookmark
	set updatePerson(obj) {
		let {index, item} = obj;
		this.items[index] = item;
	}
	
	// - Remove item from the collection
	removeItem(index) {
		this.items.splice(index,1);
	}
	
	// - Get collection item using it`s index
	getItem(index) {
		return this.items[index];
	}
	
	// - Collection length
	get isEmpty() {
		let res = (this.items.length>0) ? false : true;
		return res;
	}
	
	// - Collection creates
	set create(items) {
		this.items = [];
		items.forEach(function(msg) {
			let obj = Object.create(null);
			obj.file = msg.file;
			obj.userName = msg.userName;
			obj.email = msg.email;
			this.items.push(obj);
		}.bind(this));
	}
	
}