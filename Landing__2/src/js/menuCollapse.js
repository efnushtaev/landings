'use strict'

export let menuCollapse = (function () {
    return (
        function (menuBtn, menuPanel) {
            menuBtn.addEventListener('click', function () {
                if (menuPanel.className === "header__nav") {
                    menuPanel.className += " responsive";
                } else {
                    menuPanel.className = "header__nav";
                }
            })
        }
    )
}());
