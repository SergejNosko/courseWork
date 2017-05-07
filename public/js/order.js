/**
 * Created by Сергей Носко on 29.04.2017.
 */
(function () {
    $(document).ready(function () {
        var foodButtons =  $('.product-button');
        var orderPrice = 0;
        foodButtons.click(function () {
            var siblings = $(this).siblings().children(),
                name = siblings.attr('data-name'),
                price = siblings.attr('data-price'),
                id = siblings.attr('data-id'),
                number = parseInt(siblings.val()),
                fullPrice = parseInt(price) * parseInt(number),
                totalPrice = $('.total-price span');
            var orderContainer = $('.order-condition .elements');

            var check = orderContainer.children().children("input[data-id='"+ id +"']");
            //console.log(check);
            if(check.attr('data-id') == id){
                orderPrice -= parseInt(price) * parseInt(check.attr('data-number'));
                number += parseInt(check.attr('data-number'));
                fullPrice = parseInt(price) * parseInt(number);
                check.parent().remove();
            }

            orderPrice += fullPrice;
            orderContainer.append('<div class="order-item"><div class="remove-element"></div><input type="text" data-price="' + price +'" data-id="' + id + '" data-number="' + number + '" value="' + name +'.....' + number + ' шт. / ' + fullPrice + ' грн." disabled></div>');
            totalPrice.text(orderPrice);

            $('.remove-element').off('click').on('click', function () {
                var removePrice = $(this).siblings().attr('data-price') * $(this).siblings().attr('data-number');
                orderPrice -= parseInt(removePrice);
                totalPrice.text(orderPrice);
                $(this).parent().remove();
                console.log(removePrice);
            });
        });

        $('.reset').click(function () {
            $('.elements').children().remove();
            orderPrice = 0;
            $('.total-price span').text(orderPrice);
        });
    });
})();
