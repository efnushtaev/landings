export let postRequest = (function () {
	return (
		function (message, form, statusMessage) {
console.log('загрузил');
			form.addEventListener('submit', (event) => {
				event.preventDefault();
				console.log('отправил');
				let request = new XMLHttpRequest();

				request.open('POST', './server.php');
				request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

				let formData = new FormData(form);

				let obj = {};
				formData.forEach(function (value, key) {
					obj[key] = value;
				});

				let json = JSON.stringify(obj);
				request.send(json);

				request.addEventListener('readystatechange', () => {
					if (request.readyState < 4) {
						statusMessage.innerHTML = message.loading;
					} else if (request.status == 200) {
						statusMessage.innerHTML = message.success;
					} else {
						statusMessage.innerHTML = message.failure;
					}
				});
			});
		}
	);
}());