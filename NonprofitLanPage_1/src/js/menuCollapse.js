export let menuCollapse = (function () {
    return (
        function (menuBtn, menuPanel) {
            menuBtn.addEventListener('click', function () {
                if (menuPanel.className === "topnav") {
                    menuPanel.className += " responsive";
                } else {
                    menuPanel.className = "topnav";
                }
            })
        }
    )
}());