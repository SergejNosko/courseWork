/**
 * Created by Сергей Носко on 20.04.2017.
 */
$(document).ready(function () {
    var container = $(".product-form");
    var showAgain = $('.check');
    $(document).mouseup(function (e) {
        if (container.has(e.target).length === 0){
            container.hide();
            showAgain.show();
        }
    });
    showAgain.click(function () {
       $(this).hide();
       $(this).siblings().show();
    });

});
