import { auth } from './firebase.js';

// Cart Load (localStorage)
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

function renderCart() {
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalElement = document.getElementById("total");

  if (!cartItemsContainer || !totalElement) return;

  cartItemsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalElement.textContent = "₹0.00";
    return;
  }

  let total = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-card");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="details">
        <h2>${item.name}</h2>
        <p>₹${item.price}</p>
        <div class="quantity-controls">
          <button class="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="increase">+</button>
        </div>
      </div>
      <button class="remove-item">×</button>
    `;
    cartItemsContainer.appendChild(cartItem);

    // Increase quantity
    cartItem.querySelector(".increase").addEventListener("click", () => {
      item.quantity++;
      saveCart();
      renderCart();
    });

    // Decrease quantity
    cartItem.querySelector(".decrease").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cartItems.splice(index, 1);
      }
      saveCart();
      renderCart();
    });

    // Remove item
    cartItem.querySelector(".remove-item").addEventListener("click", () => {
      cartItems.splice(index, 1);
      saveCart();
      renderCart();
    });
  });

  totalElement.textContent = `₹${total}`;
}

// ----------- Proceed To Checkout Logic -----------
function setupCheckout() {
  const checkoutBtn = document.getElementById('checkout-btn');
  const loginModal = document.getElementById('login-modal');
  const closeBtn = document.querySelector('.close-modal');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (auth.currentUser) {
        window.location.href = 'customer_info.html';
      } else if (loginModal) {
        loginModal.style.display = 'flex';
      }
    });
  }

  if (closeBtn && loginModal) {
    closeBtn.addEventListener('click', () => {
      loginModal.style.display = 'none';
    });
    // Modal ke bahar click se close
    loginModal.addEventListener("click", (e) => {
      if (e.target === loginModal) loginModal.style.display = 'none';
    });
  }
}

// ----------- MAIN -----------

window.addEventListener("DOMContentLoaded", () => {
  // Render cart only on cart.html
  if (window.location.pathname.includes("cart.html")) {
    renderCart();
    setupCheckout();
  }

  // (Optional) Cakes page se add-to-cart array bhi yahan handle kar sakte ho
  // Lekin ideally add-to-cart cakes.js me hi hona chahiye
});
