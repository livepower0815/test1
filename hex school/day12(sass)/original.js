$(document).ready(function () {
    $(".scrollTop").click(function (e) { 
        e.preventDefault();
        var target = $(this).attr('href');
        var targetPos = $(target).offset().top;
        $('html,body').animate({ scrollTop: targetPos}, 1000);
    });

    $(window).scroll(function(){
        var scrollPos = $(window).scrollTop();
        $('.scrollTop').each(function(){
            var target = $(this).attr('href');
            var targetPos = $(target).offset().top;
            var targetHeight = $(target).outerHeight();
            if (targetPos - 1 <= scrollPos && (targetPos + targetHeight) > scrollPos) {
                $('.scrollTop').removeClass('active');
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
        
    });
});