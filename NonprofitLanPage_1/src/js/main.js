export let
    menuPanel = document.getElementById('myTopnav'),
    menuBtn = document.getElementById('menu'),

    message = {
        loading: "Loading...",
        success: "Form is successfully sent! We will call you back!",
        failure: "Something went wrong!"
    },
    form = document.querySelector('.contact__form__post'),
    statusMessage = document.querySelector('.statusMessage');