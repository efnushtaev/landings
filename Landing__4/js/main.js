'use strict'

let body = document.querySelectorAll('.tail__body');
let buttonText = document.querySelectorAll('.tail__button');

for (let i = 0; i < body.length; i++) {
    buttonText[i].addEventListener('click', function () {
        body[i].classList.toggle('tail__body--active');
        if (buttonText[i].innerHTML === 'Подробнее...') {
            buttonText[i].innerHTML = 'Свернуть'
        } else {
            buttonText[i].innerHTML = 'Подробнее...'
        }
    })
}