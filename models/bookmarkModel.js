// MODEL		
		// - MODEL. Bookmarks class
		class Bookmarks {			
			constructor() {
				this.items = [];
			}			
			// - Insert new bookmark
			set insertBookmark(newBookmark) {			
				// - Validation
				// - Checking if new one
				let isNew = true;
				this.items.forEach(function(item) {
					if (item.title === newBookmark.title)
						isNew = false;
				});
				if (isNew) {
					this.items.push(newBookmark);				
				}
				else {
					// The same bookmark has already present
					alert("The same bookmark is present");
				}
			}			
			// - Update existing bookmark
			set updateBookmark(obj) {
				let {index, item} = obj;
				this.items[index] = item;
			}			
			// - Collection creates
			set create(items) {
				this.items = [];
				items.forEach(function(msg) {
					let obj = Object.create(null);
					obj.title = msg.title;
					obj.url = msg.url;
					this.items.push(obj);
				}.bind(this));
			}			
			// - Get collection item using it`s index
			getItem(index) {
				return this.items[index];
			}
			
		}