// 1. Data Structure and declear input and price 
const servicesData = [
    { id: 1, name: 'Dry Cleaning', price: 99.00 },
    { id: 2, name: 'Wash & Fold', price: 199.00 },
    { id: 3, name: 'Ironing', price: 29.00 },
    { id: 4, name: 'Stain Removal', price: 499.00 },
    { id: 5, name: 'Leather & Suede Cleaning', price: 999.00 },
    { id: 6, name: 'Wedding Dress Cleaning', price: 2999.00 }
];
let cart = [];
// 2. Smooth Scroll to Booking Section
function scrollToBooking() {
    document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' });
}
// 3. Render Service List Dynamically
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
  : `<button class="btn-add" onclick="addToCart(${service.id})">Add Item ⊕</button>`
 }
 `;
   container.appendChild(div);
  });
}
// 4. Cart Functions and ues logic opration 
function addToCart(id) {
    const service = servicesData.find(s => s.id === id);
if (service && !cart.some(item => item.id === id)) {
        cart.push(service);
        updateCartUI();
        renderServices();
    }
}
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    renderServices();
}
function updateCartUI() {
    const tbody = document.getElementById('cart-table-body');
    const totalElement = document.getElementById('cart-total');
    tbody.innerHTML = '';
    let total = 0;
if (cart.length === 0) {
 tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#999;">No items added</td></tr>`;
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
// 5. Form Submission & EmailJS implementation
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Check if cart is empty
    if (cart.length === 0) {
alert("Please add at least one service to your cart before booking.");
        return;
    }
 const confirmMsg = document.getElementById('confirmation-message');
    // --- EMAILJS INTEGRATION LOGIC ---
    // If you have configured your EmailJS account, uncomment and update the IDs below:
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
    console.log('SUCCESS!');
  showSuccess();
        }, function(error) {
 console.log('FAILED...', error);
 alert("Failed to send email. Please try again.");
});
    // For now, simulating the success state directly as per UI requirements:
 showSuccess();
 function showSuccess() {
confirmMsg.style.display = 'block';
        // Reset form and cart
 document.getElementById('booking-form').reset();
 cart = [];
 updateCartUI();
renderServices();
        // Hide success message after 5 seconds
 setTimeout(() => {
 confirmMsg.style.display = 'none';
   }, 5000);
    }
});
// Initialize App on load
renderServices();
updateCartUI();