'use strict'

function ModalWindow(modalBtn, modalElement) {
	modalBtn.addEventListener('click', () => {
		// modalElement.style.display = "block";
		modalElement.classList.remove('modal');
		modalElement.classList.add('modal--active');

			let step = 0.1;
			setInterval(() => {modalElement.style.opacity =+ step }, 1000)

	});
};


let modalWin = new ModalWindow(
								document.querySelector('.btn'), 
								document.querySelector('.modal')
								);


