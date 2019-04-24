'use strict'

let messsage = {
	loding: "Loding...",
	success: "Form is successfully sent!",
	failury: "Something went wrong!"

};

let form = document.querySelector('.contact__form__post'),
	input = form.getElementsByTagName('input'),
	statusMessage = document.createElement('div');

form.addEventListener('submit', (event)=>{
	event.preventDefault();
	console.log('gud');
	form.appendChild(statusMessage);

	let request = new XMLHttpRequest();

	request.open('POST', 'server.php');
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencode')

	let formData = new FormData(form);
	request.send(formData);

	request.addEventListener('readystatechange', () => {
		if(request. redyState < 4) {
			statusMessage.innerHTML = messsage.loading;
		} else if (request.redyState === 4 && request.status == 200) {
			statusMessage.innerHTML = success.loading;
		} else {
			statusMessage.innerHTML = failure.loading;
		}                        
	})
})

