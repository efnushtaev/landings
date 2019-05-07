export let

    /* menuCollapse */
    menuPanel = document.getElementById('nav'),
    menuBtn = document.getElementById('menu'),

    /* postRequest */
    message = {
        loading: "Loading...",
        success: "Form is successfully sent! We will call you back!",
        failure: "Something went wrong!"
    },
    form = document.querySelector('.purchase__contact'),
    statusMessage = document.querySelector('.statusMessage'),

    /* modalWindow */
    modalBtn = document.querySelectorAll('.modal-btn'),
    modalElement = document.querySelectorAll('.modal'),
    modalInner = document.querySelectorAll('.modal__inner');

