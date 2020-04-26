let elementList = document.querySelectorAll(".welcomeAnim");

const anim = () => {
    elementList.forEach(e => {
        e.classList.add("anim--active")
    });
}

document.addEventListener("load", anim());


var $page = $('html, body');
$('a[href*="#"]').click(function () {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
});


$(window).scroll(function () {

    let start = $(window).scrollTop();
    let about = $("#about").offset().top - 1100;
    let rooms = $("#rooms").offset().top - 600;
    console.log(start + "-------" + about);
    if (start > about && start < rooms && !($('.aboutArticle').hasClass('aboutArticle__anim'))) {
        $('.aboutArticle').addClass('aboutArticle__anim')
        return (console.log("about anim go"));
    } else if (start > rooms && !($('room').hasClass('room__anim'))) {
        $('.room').addClass('room__anim')
        return (console.log("rooms anim go"));
    };

})

$('#menuButton').click(() => {
    $('#menu').is(':hidden') ? $('#menu').slideDown(200) : $('#menu').slideUp(200)
})

$(window).on('load resize', () => {
    $(window).width() <= "901" && $('#menu').css( "display", "none" );
    $(window).width() >= "901" && $('#menu').css( "display", "flex" )
});