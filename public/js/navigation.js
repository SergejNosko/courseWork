/**
 * Created by Сергей Носко on 20.04.2017.
 */
$(document).ready(function() {
    $(".scroll").click(function() {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
    });
});