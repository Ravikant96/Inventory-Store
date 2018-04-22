window.onload = () => {
	
	(async () => {
		Product.setup();
		await Product.load();
	})();
};

class Product {

	static setup() {
		Product.container = document.querySelector('body table tbody');
	}

	static async load() {

		Product.response = (await (await fetch('http://localhost:3001/product/list')).json());
		debugger;
		Product.render();
	}

	static render() {
		for(const data of Product.response) {
			const tr = document.createElement('tr');
			tr.innerHTML = `
				<td>${data.ID}</td>
				<td>${data.name}</td>
				<td>${data.price}</td>
				<td>${data.gst}</td>
				<td>EDIT</td>
				<td>Delete</td>
			`;
			Product.container.appendChild(tr);
		}
	}
}