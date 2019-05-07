'use strict'

export let modalWindow = (function () {
	return (function (modalBtn, modalElement, modalInner) {

		
		for (let i = 0; i < modalBtn.length; i++) {
			let layout = document.createElement('div'),
				close = document.createElement('div');
	
			layout.classList.add('modal__layout');
			close.classList.add('modal__close');
			
			modalElement[i].append(layout);
			modalInner[i].append(close);
	
			close.innerHTML = "X";

			modalBtn[i].addEventListener('click', (event) => {

				event.preventDefault();
				modalElement[i].classList.remove('modal');
				modalElement[i].classList.add('modal--active');
				document.body.style.overflow = 'hidden';

				setTimeout(() => {
					layout.classList.add('modal__layout--active');
					layout.classList.remove('modal__layout');
					modalInner[i].classList.add('modal__inner--active');
					modalInner[i].classList.remove('modal__inner');
				}, 100);


			});

			close.addEventListener('click', () => {
				event.preventDefault();
				layout.classList.remove('modal__layout--active');
				layout.classList.add('modal__layout');
				modalInner[i].classList.remove('modal__inner--active');
				modalInner[i].classList.add('modal__inner');
				setTimeout(() => {
					modalElement[i].classList.add('modal');
					modalElement[i].classList.remove('modal--active');
					document.body.style.overflow = '';
				}, 300);

			})
		}
	})
}());


// modalWindow(
// 	document.querySelector('.btn--more'),
// 	document.querySelector('.modal'),
// 	document.querySelector('.modal__inner')
// );