const servicesData = [
{ id: 1, name: 'Dry Cleaning', price: 99.00 },
    { id: 2, name: 'Wash & Fold', price: 199.00 },
    { id: 3, name: 'Ironing', price: 29.00 },
{ id: 4, name: 'Stain Removal', price: 499.00 },
 { id: 5, name: 'Leather & Suede Cleaning', price: 999.00 },
    { id: 6, name: 'Wedding Dress Cleaning', price: 2999.00 },
];
// Load cart from localStorage (or start empty)
let cart = JSON.parse(localStorage.getItem('cart')) || [];
//  EMAILJS INIT 
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key.
// Find it at: https://dashboard.emailjs.com/admin/account
emailjs.init('YOUR_PUBLIC_KEY');
//  SMOOTH SCROLL HELPERS 

/**
 * Scrolls smoothly to any element by its ID.
 * Used by the hero button and navbar links.
 */
function scrollToSection(sectionId) {
const target = document.getElementById(sectionId);
 if (target) {
 target.scrollIntoView({ behavior: 'smooth' });
}
}
// Hero button — kept as a named function so the onclick attr works
function scrollToBooking() {
    scrollToSection('booking-section');
}
// Wire up navbar links to their sections.
// Add id="home-section", id="services-section", etc. to your HTML
// sections, or adjust the mapping below to match your IDs.
document.addEventListener('DOMContentLoaded', () => {
    const navMap = {
        'Home': 'home-section',
     'Services': 'booking-section',

'About Us': 'about-section',
        'Contact Us': 'contact-section',
    };
    document.querySelectorAll('.nav-links a').forEach(link => {
const label = link.textContent.trim();
if (navMap[label]) {
  link.addEventListener('click', e => {
 e.preventDefault();
 scrollToSection(navMap[label]);
  });
 }
    });
});
//  RENDER SERVICES 

function renderServices() {
const container = document.getElementById('services-list-container');
container.innerHTML = '';

servicesData.forEach(service => {
 const inCart = cart.some(item => item.id === service.id);
 const div = document.createElement('div');
div.className = 'service-item';
div.innerHTML = `
 <div class="service-info">
<span>👔 ${service.name}</span>
<span class="service-price">₹${service.price.toFixed(2)}</span>
</div>
 ${inCart
  ? `<button class="btn-remove" onclick="removeFromCart(${service.id})">Remove Item ⊖</button>`
  : `<button class="btn-add"    onclick="addToCart(${service.id})">Add Item ⊕</button>`
            }
        `;
        container.appendChild(div);
    });
}
//  CART FUNCTIONS
/** Add a service to the cart (no duplicates). */
function addToCart(id) {
 const service = servicesData.find(s => s.id === id);
 if (!service) return;
 if (cart.some(item => item.id === id)) return; // already in cart

    cart.push(service);    saveCart();
 renderServices();
    updateCartUI();
}
/** Remove a service from the cart by id. */
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);

    saveCart();
 renderServices();
  updateCartUI();
}

/** Persist cart to localStorage. */
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
/** Clear cart from memory and storage, refresh UI. */
function clearCart() {
    cart = [];
 localStorage.removeItem('cart');
renderServices();
    updateCartUI();
}
/** Re-render the cart table and total. */
function updateCartUI() {
 const tbody = document.getElementById('cart-table-body');
const totalElement = document.getElementById('cart-total');
    tbody.innerHTML = '';
    let total = 0;
 if (cart.length === 0) {
 tbody.innerHTML = `
 <tr>
 <td colspan="3" style="text-align:center; color:#999;">
     No items added
 </td>
   </tr>`;
    } else {
  cart.forEach((item, index) => {
  total += item.price;
      const tr = document.createElement('tr');
  tr.innerHTML = `
 <td>${index + 1}</td>
 <td>${item.name}</td>
 <td class="price-col">₹${item.price.toFixed(2)}</td>
  `;
  tbody.appendChild(tr);
   });
 }
    totalElement.textContent = `₹${total.toFixed(2)}`;
}
//  FORM VALIDATION HELPERS 
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9]{10}$/;
function validateEmail(email) {
 return emailPattern.test(email);
}
function validatePhone(phone) {
return phonePattern.test(phone);
}
// Single, top-level listener — no nesting, no duplicates.
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // 7a. Cart check
 if (cart.length === 0) {
alert('Please add at least one service to your cart before booking.');
        return;
}
    // 7b. Field validation
const email = document.getElementById('email_id').value.trim();
    const phone = document.getElementById('phone_number').value.trim();

 if (!validateEmail(email)) {
 alert('Please enter a valid email address.');
 return;
    }
 if (!validatePhone(phone)) {
   alert('Please enter a valid 10-digit phone number.');
        return; }

    // 7c. Send via EmailJS
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your real values.
    // Find them at: https://dashboard.emailjs.com/admin
 emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
 .then(() => {
  onBookingSuccess();
    })
     .catch(error => {
            console.error('EmailJS error:', error);
alert('Failed to send confirmation email. Please try again.');
        });
});

/** Called after a successful EmailJS send. */
function onBookingSuccess() {
    // Show the thank-you message
    const confirmMsg = document.getElementById('confirmation-message');
    confirmMsg.style.display = 'block';
    // Reset the form fields
    document.getElementById('booking-form').reset();
    // Clear the cart completely
    clearCart();
    // Hide the message after 5 seconds
    setTimeout(() => {
        confirmMsg.style.display = 'none';
    }, 5000);
}
// ── 8. NEWSLETTER SUBSCRIPTION 
document.getElementById('subscribe-btn').addEventListener('click', () => {
    const name = document.getElementById('newsletter-name').value.trim();
    const email = document.getElementById('newsletter-email').value.trim();
    if (name === '' || email === '') {
 alert('Please fill in all fields.');
        return;
    }
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    alert('Newsletter subscription successful!');
    document.getElementById('newsletter-name').value = '';
    document.getElementById('newsletter-email').value = '';
});
renderServices();
updateCartUI();
