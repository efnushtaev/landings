export let test = (function () {
    return (


        $(document).ready(function () {
            $('#work-collapse-btn').click(() => {
                $('#work-collapse').slideToggle('slow')
            });
            $(".navig__burger").click(function () {
                $(".navig__menu").toggleClass('navig__menu--visible');
                $(".banner").toggleClass('banner--visible');
            });
            setInterval(() => {
                let p = document.documentElement.scrollTop;
                if (p >= 1000) {
                    $('.scill__graph-fill').addClass('scill__graph-fill--visible');
                };
            });




            //''''''''''''''''''''''''''''' SLIDER
            var currentSlide = 0,
                slides = $('.mySlides'),
                dots = $('.dot');

            function hideAll() {
                for (let i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" active", "");
                };
                for (let i = 0; i < dots.length; i++) {
                    slides[i].style = ('none');
                };
            }

            function nextSlide(elem, index) {
                hideAll();
                currentSlide = index;

                elem.target.className += ' active';
                slides[index].style.display = ('block');
            }

            function autoShow() {
                hideAll();
                currentSlide++;

                if (currentSlide > slides.length) {
                    currentSlide = 1;
                }
                slides[currentSlide - 1].style.display = "block";
                dots[currentSlide - 1].className += ' active';
                setTimeout(autoShow, 3000);
            }

            slides[0].style.display = ('block');
            dots[0].className += ' active';

            autoShow();

            dots.click(function (e) {
                let dotIndex = $(this).index();
                nextSlide(e, dotIndex);
            });


            //''''''''''''''''''''''''''''' VIDEO__CONTROL
            var video = $('video').get(0);

            $(document).delegate('#videoControl', 'click', function (e) {

                if (video.paused === true) {
                    video.play();
                    console.log('play');
                } else {
                    video.pause();
                    console.log('pause');
                }


            })


            //'''''''''''''''''''''''''''''ORDER__SEND
            $("#order").submit(function (e) {
                e.preventDefault();
                 //устанавливаем событие отправки для формы с id=form
                var form_data = $(this).serialize(); //собераем все данные из формы
                $.ajax({
                    type: 'POST', //Метод отправки
                    url: 'send.php', //путь до php фаила отправителя
                    data: form_data,
                    success: function (data) { // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
                        alert('все ок'); // пoкaжeм eё тeкст
                    }
                });
            });







        })
    )
});