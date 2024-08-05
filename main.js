

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const productElement = document.querySelector(`.product[data-id='${productId}']`);
    const name = productElement.getAttribute('data-name');
    const price = parseFloat(productElement.getAttribute('data-price'));

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name, price, quantity: 1 });
    }

    updateCart();
    saveCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(listItem);
    });

    const totalElement = document.getElementById('total');
    const total = calculateTotal();
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function clearCart() {
    cart = [];
    updateCart();
    saveCart();
}

// Inicializa el carrito al cargar la página
updateCart();
