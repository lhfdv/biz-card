$(document).ready(function(){

    $('#slides').superslides({
        animation: 'fade',
        play: 10000,
        pagination: false
    });

    var typed = new Typed(".typed", {
        strings: ["Full-Stack Web Developer", "IT Analyst", "Development Student"],
        typeSpeed: 90,
        loop: true,
        startDelay: 1100,
        showCursos: false,
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        items: 4,
        responsive:{
            0:{
                items:1
            },
            480:{
                items:2
            },
            770:{
                items:3
            },
            940:{
                items:4
            }
        }
    });

    var skillsTopOffset = $(".Skills").offset().top;
    var statsTopOffset = $(".Stats").offset().top;
    var countUpEnd = false;

    $(window).scroll(function(){
        if(window.pageYOffset>skillsTopOffset - $(window).height() + 200){
            $('.chart').easyPieChart({
                easing: 'easeInOut',
                barColor: '#fdcb6e',
                trackColor: false,
                scaleColor: false,
                lineWidth: 4,
                size: 150,
                onStep: function(from, to, percent){
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        }

        if(!countUpEnd && window.pageYOffset>statsTopOffset - $(window).height() + 200){
            $(".counter").each(function(){
                var element = $(this);
                var endValue = parseInt(element.text());
                element.countup(endValue);
            });
            countUpEnd = true;
        }
    });

    $("[data-fancybox]").fancybox();
    $(".items").isotope({
        filter: '*',
        animationOptiopns: {
            duration: 1520,
            easing: 'linear',
            queue: false
        }
    });

    $("#filters a").click(function(){
        $("#filters .current").removeClass("current");
        $(this).addClass("current");
        var selector = $(this).attr("data-filter");

        $(".items").isotope({
            filter: selector,
            animationOptiopns: {
                duration: 1520,
                easing: 'linear',
                queue: false
            }
        });

        return false;
    })

});