let cart = JSON.parse(localStorage.getItem('cart-page')) || [];

function addToCart(itemName, price) {
  // Check if item already exists
  const existingItem = cart.find(item => item.name === itemName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: itemName, price: price, quantity: 1 });
  }

  localStorage.setItem('cart-page', JSON.stringify(cart));
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-item');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  if (cartItems) {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.name} - $${item.price} x ${item.quantity}
        <button onclick="decreaseQuantity(${index})">−</button>
        <button onclick="increaseQuantity(${index})">+</button>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;

      cartItems.appendChild(li);
      total += item.price * item.quantity;
    });

    const totalElement = document.createElement('li');
    totalElement.style.fontWeight = 'bold';
    totalElement.textContent = `Total: $${total}`;
    cartItems.appendChild(totalElement);
  }
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  localStorage.setItem('cart-page', JSON.stringify(cart));
  updateCartDisplay();
}

function decreaseQuantity(index) {
  cart[index].quantity -= 1;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart-page', JSON.stringify(cart));
  updateCartDisplay();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart-page', JSON.stringify(cart));
  updateCartDisplay();
}

function emptyCart() {
  if (confirm("Are you sure you want to empty your cart?")) {
    cart = [];
    localStorage.setItem('cart-page', JSON.stringify(cart));
    updateCartDisplay();
  }
}

// Initial display on page load
updateCartDisplay();