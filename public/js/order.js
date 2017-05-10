/**
 * Created by Сергей Носко on 29.04.2017.
 */
(function () {
    $(document).ready(function () {
        var foodButtons =  $('.product-button'),
            orderPrice = 0,
            orderObject = {},
            itemsArray = [];

        foodButtons.click(function () {
            var siblings = $(this).siblings().children(),
                name = siblings.attr('data-name'),
                price = siblings.attr('data-price'),
                id = siblings.attr('data-id'),
                number = parseInt(siblings.val()),
                fullPrice = parseInt(price) * parseInt(number), // цена товара учитывая количество
                totalPrice = $('.total-price input'), // цена заказа
                orderContainer = $('.order-condition .elements'),
                check = orderContainer.children().children("input[data-id='"+ id +"']"); // переменная для проверки совпадеия id


            if(check.attr('data-id') == id){
                orderPrice -= parseInt(price) * parseInt(check.attr('data-number'));
                number += parseInt(check.attr('data-number'));
                fullPrice = parseInt(price) * parseInt(number);
                check.parent().remove();
            }

            itemsArray.push({id: id, name: name, number: number});
            orderPrice += fullPrice;
            orderContainer.append('<div class="order-item"><div class="remove-element"></div><input type="text" name="' + id + '" data-price="' + price +'" data-id="' + id + '" data-number="' + number + '" value="' + name +'/' + number + '" disabled><span> шт. - ' + fullPrice + ' грн.</span></div>');
            totalPrice.attr('value', orderPrice).text(orderPrice);

            $('.remove-element').off('click').on('click', function () {
                var removePrice = $(this).siblings().attr('data-price') * $(this).siblings().attr('data-number');
                orderPrice -= parseInt(removePrice);
                totalPrice.attr('value', orderPrice).text(orderPrice);
                $(this).parent().remove();
                console.log(removePrice);
            });
        });

        $('.reset').click(function () {
            $('.elements').children().remove();
            orderPrice = 0;
            $('.total-price input').val(orderPrice);
        });
        $(document.forms['order-form']).on('submit', function ()
        {
            var form = $(this);
            orderObject = {
                date: $('input[name="date"]').val(),
                time: $('input[name="time"]').val(),
                name: $('input[name="name"]').val(),
                telephone: $('input[name="telephone"]').val(),
                address: $('input[name="address"]').val(),
                comment: $('textarea[name="comment"]').val(),
                totalPrice: $('input[name="totalPrice"]').val(),
                items: itemsArray
            };
            console.log(orderObject);
            $('.error', form).html('');
            $(':submit', form).button('Оформляем...');

            $.ajax({
                url: '/sendOrder',
                method: 'POST',
                data: orderObject,//form.serialize(),
                complete: function () {
                    $(':submit', form).button('reset');
                },
                statusCode: {
                    200: function () {
                        $('.message', form).html('Заказ успешно оформлен!');
                        window.location.href = '/';
                    },
                    403: function (jqXHR) {
                        var error = JSON.parse(jqXHR.responseText);
                        $('.message', form).html(error.message);
                    }
                }
            });
            return false;
        });
    });
})();
