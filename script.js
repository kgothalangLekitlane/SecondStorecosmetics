document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartSummaryElement = document.getElementById('cart-summary');
    const checkoutButton = document.getElementById('checkout-button');
    const checkoutSection = document.getElementById('checkout');
    const checkoutForm = document.getElementById('checkout-form');

    function updateCart() {
        cartCountElement.textContent = cart.length;
        cartSummaryElement.innerHTML = '';

        if (cart.length === 0) {
            cartSummaryElement.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <p>${item.name} - R${item.price.toFixed(2)}</p>
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                `;
                cartSummaryElement.appendChild(itemElement);
            });

            const totalElement = document.createElement('p');
            totalElement.innerHTML = `<strong>Total: R${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</strong>`;
            cartSummaryElement.appendChild(totalElement);
        }
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.product-card');
            const name = card.querySelector('h3').textContent;
            const priceText = card.querySelector('p').textContent.replace('R', '');
            const price = parseFloat(priceText);

            // Ensure the price is a valid number
            if (!isNaN(price)) {
                cart.push({ name, price });
                updateCart();
            } else {
                console.error('Invalid price:', priceText);
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });

    checkoutButton.addEventListener('click', () => {
        document.querySelector('#cart').style.display = 'none';
        checkoutSection.style.display = 'block';
    });

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for your purchase!');
        checkoutSection.style.display = 'none';
        document.querySelector('#cart').style.display = 'block';
        cart.length = 0;
        updateCart();
    });

    const categoryButtons = document.querySelectorAll('.category-button');
    const productCategories = document.querySelectorAll('.product-category');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            productCategories.forEach(categorySection => {
                if (categorySection.id === category) {
                    categorySection.classList.add('active');
                } else {
                    categorySection.classList.remove('active');
                }
            });
        });
    });
});


