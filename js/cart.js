var cart = {};

function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        
        showCart();
        
    }
    else{
        $('.main-cart').html('Cart is empty!');
    }
}

function showCart() {
    if(!isEmpty(cart)){
        $('.main-cart').html('Cart is empty!');
    }else{

    $.getJSON('goods.json', function (data) {
        var goods = data;
        var out = '';
        for (var id in cart) {
            out += `<button data-id="${id}" class="del-goods">X</button>`;
            out += `<img src="images\\${goods[id].image}">`;
            out += ` ${goods[id].name}`;
            out += `<button data-id="${id}" class="minus-goods">-</button>`;
            out += ` ${cart[id]}`;
            out += `<button data-id="${id}" class="plus-goods">+</button>`;
            out += cart[id]*goods[id].cost;
            out += '<br>';
        }
        $('.main-cart').html(out);
        $('.del-goods').on('click', delGoods);
        $('.plus-goods').on('click', plusGoods);
        $('.minus-goods').on('click', minusGoods);
    });
}
} 

function delGoods() {
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}
function plusGoods() {
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    var id = $(this).attr('data-id');
    if(cart[id]==1){
        delete cart[id];
    }
    else{
    cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); 
}

function isEmpty(object){
    for(var key in object)
    if(object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!=undefined && email!=undefined && ephone!=undefined){
        if (isEmpty(cart)){
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data){
                    if (data == 1){
                        alert('Order is sent!');
                    }
                    else{
                        alert('Try again');
                    }
                }
            );
        }
    else{
       alert("Cart is empty"); 
    }
    }
    else{
        alert("Fill the fields");
    }
}

$(document).ready(function () {
    loadCart();
    $('.send-email').on('click', sendEmail);
});