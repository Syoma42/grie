var slideIndex = 0;
var slideText;
var slides = [
    {
        title: 'Наши преимущества',
        description: 'Фурнитура - мы используем фурнитуру с разных уголков земли, которую мы долго собирали и подбирали. Саквояжные замочки, например, нам доставляют из штатов. Рамочные застежки нам делают по нашим чертежам во Львове.',
    },
    {
        title: 'Наши преимущества2',
        description: 'Фурнитура - мы используем фурнитуру с разных уголков земли, которую мы долго собирали и подбирали. Саквояжные замочки, например, нам доставляют из штатов. Рамочные застежки нам делают по нашим чертежам во Львове.',
    },
    {
        title: 'Наши преимущества3',
        description: 'Фурнитура - мы используем фурнитуру с разных уголков земли, которую мы долго собирали и подбирали. Саквояжные замочки, например, нам доставляют из штатов. Рамочные застежки нам делают по нашим чертежам во Львове.',
    }
];

showCarouselInfo(slideIndex);

function changeSlide(i) {
    slideIndex = slideIndex + i;

    if (slideIndex > slides.length - 1) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    showCarouselInfo(slideIndex);
};

function showCarouselInfo(i) {
    slideText = document.getElementById('carousel-text-nav');
    slideTitle = document.getElementById('carousel-title');
    slideDescription = document.getElementById('carousel-description');

    slideText.innerHTML = i + 1 + '/' + slides.length;
    slideTitle.innerHTML = slides[i].title;
    slideDescription.innerHTML = slides[i].description;
};



// Bags scroll

document.addEventListener('wheel', (e) => {
    document.getElementById('product_scroll').scrollLeft += e.deltaY;
})

let myTextarea = document.getElementById('product_scroll');

myTextarea.onwheel = function (e) {
    if (this.scrollTop === this.scrollHeight - this.clientHeight && e.deltaY !== -100) {
        e.preventDefault();
    }
    if (this.scrollTop === 0 && e.deltaY !== 100){
        e.preventDefault();
    }
}


// Nav 

function navToggle() {
    var nav = document.getElementById('nav');
    var burger = document.getElementById('burger');
    var navLinks = document.querySelectorAll('nav_links li');
    // Toggle
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    // Animate
    /*
    navLinks.forEach((link, index) => {
        if(link.style.animation){
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    */
};

// Shopping Cart

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready () {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', function(event) {
        })
    };

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
};

function cartToggle() {
    var cart = document.getElementById('cart');
    cart.classList.toggle('cart-active');
}

function purchaseClicked() {
    alert('Thank you for your purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
};

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
};

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;

    addItemToCart(title, price, imageSrc);
    updateCartTotal();
};

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title ) {
            alert('This item is already added to the cart');
            return
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">Удалить</button>
    </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('₴', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '₴' + total;
};
