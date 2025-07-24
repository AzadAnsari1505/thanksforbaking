// cake.js
window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".cake-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      delay: index * 0.1
    });
  });
});
const header = document.querySelector('.navbar'); // Fix class name
let lastScroll = window.scrollY;

window.addEventListener('scroll', () => {
  let currentScroll = window.scrollY;

  if (currentScroll > lastScroll) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }

  lastScroll = currentScroll;
});
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.cake-card');
      const name = card.querySelector('h3').innerText;
      const price = parseInt(card.querySelector('p').innerText.replace(/[^\d]/g, ''));
      const image = card.querySelector('img').src;

      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cartItems.find(item => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cartItems.push({ name, price, image, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cartItems));
      alert(`${name} added to cart!`);
    });
  });
});
