window.onload = () => {
	
	(async () => {
		var event;
		await product();
	})();
};

async function product() {

	const container = document.querySelector('body table tbody');
	container.textContent = null;
	const response = await (await fetch('http://localhost:3001/product/list')).json();

	for(const data of response) {

		const tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${data.ID}</td>
			<td>${data.name}</td>
			<td>${data.price}</td>
			<td>${data.gst}</td>
			<td class="edit">Edit</td>
			<td class="delete">Delete</td>
		`;
		tr.querySelector('.edit').addEventListener('click',() => {
			Edit(data);
		});

		tr.querySelector('.delete').addEventListener('click', () => {
			Delete(data.ID);
		});

		container.appendChild(tr);
	}
}
async function Edit(data) {
	document.querySelector('#product section#list').classList.add('hidden');
	document.querySelector('#product section#form').classList.remove('hidden');
	document.querySelector('#product section#form #back').addEventListener('click', () => {
		document.querySelector('#product section#list').classList.remove('hidden');
		document.querySelector('#product section#form').classList.add('hidden');
	});

	document.querySelector('#form h2').textContent = 'Edit product ' + data.ID;

	const form = document.querySelector('#form form');
	form.reset();

	form.name.value = data.name;
	form.price.value = data.price;
	form.gst.value = data.gst;
	if(event)
		form.removeEventListener('submit', event);

	form.addEventListener('submit', event = async (e) => {

		e.preventDefault();

		const option = {
			method: 'POST',
			headers: {
				'id': data.ID,
				'name': form.name.value,
				'price': form.price.value,
				'gst': form.gst.value,
			}
		}
		await fetch('http://localhost:3001/product/update', option);
		confirm('values updated');
		await product();
	})
}

async function Delete(id) {

	if(!confirm('Are you sure!!??'))
		return;

	await fetch('http://localhost:3001/product/delete', {
		cors: true,
		method: 'POST',
		headers: {
			'id': id,
		}
	});

	await product();
}