// Product Database
const products = [
    {
        id: 1,
        name: "Donat Coklat Klasik",
        category: "klasik",
        price: 5000,
        description: "Donat lembut dengan topping coklat yang manis dan lezat",
        stock: 25,
        image: "🍩"
    },
    {
        id: 2,
        name: "Donat Strawberry",
        category: "klasik", 
        price: 5500,
        description: "Donat dengan glaze strawberry segar dan taburan warna-warni",
        stock: 20,
        image: "🍩"
    },
    {
        id: 3,
        name: "Donat Vanilla Glaze",
        category: "klasik",
        price: 4500,
        description: "Donat klasik dengan glaze vanilla yang creamy",
        stock: 30,
        image: "🍩"
    },
    {
        id: 4,
        name: "Donat Tiramisu Premium",
        category: "premium",
        price: 8000,
        description: "Donat premium dengan filling tiramisu dan topping mascarpone",
        stock: 15,
        image: "🧁"
    },
    {
        id: 5,
        name: "Donat Red Velvet",
        category: "premium",
        price: 8500,
        description: "Donat red velvet dengan cream cheese frosting yang lembut",
        stock: 12,
        image: "🧁"
    },
    {
        id: 6,
        name: "Donat Matcha Premium",
        category: "premium",
        price: 9000,
        description: "Donat dengan bubuk matcha asli Jepang dan white chocolate",
        stock: 10,
        image: "🧁"
    },
    {
        id: 7,
        name: "Donat Nutella Cheese",
        category: "special",
        price: 12000,
        description: "Donat spesial dengan filling nutella dan keju leleh di atasnya",
        stock: 8,
        image: "🍰"
    },
    {
        id: 8,
        name: "Donat Oreo Crunch",
        category: "special",
        price: 10000,
        description: "Donat dengan topping oreo hancur dan vanilla ice cream",
        stock: 15,
        image: "🍰"
    },
    {
        id: 9,
        name: "Donat Salted Caramel",
        category: "special",
        price: 11000,
        description: "Donat dengan saus salted caramel dan taburan garam laut",
        stock: 12,
        image: "🍰"
    }
];

// Shopping Cart
let cart = [];
let orderHistory = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const checkoutModal = document.getElementById('checkout-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutForm = document.getElementById('checkout-form');
const checkoutItems = document.getElementById('checkout-items');
const checkoutTotal = document.getElementById('checkout-total');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    updateCartDisplay();
});

// Product Management
function loadProducts(category = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.innerHTML = `
        <div class="product-image">${product.image}</div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">Rp ${formatPrice(product.price)}</div>
            <div class="product-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity(${product.id})">-</button>
                    <input type="number" class="quantity-input" id="qty-${product.id}" value="1" min="1" max="${product.stock}">
                    <button class="quantity-btn" onclick="increaseQuantity(${product.id})">+</button>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                    ${product.stock === 0 ? 'Habis' : 'Tambah ke Keranjang'}
                </button>
            </div>
            <div class="stock-info ${product.stock === 0 ? 'out-of-stock' : ''}">
                ${product.stock === 0 ? 'Stok habis' : `Stok: ${product.stock} buah`}
            </div>
        </div>
    `;
    return card;
}

function increaseQuantity(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const product = products.find(p => p.id === productId);
    const currentValue = parseInt(qtyInput.value);
    
    if (currentValue < product.stock) {
        qtyInput.value = currentValue + 1;
    }
}

function decreaseQuantity(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const currentValue = parseInt(qtyInput.value);
    
    if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
    }
}

// Cart Management
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const qtyInput = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(qtyInput.value);
    
    if (!product || quantity <= 0 || quantity > product.stock) {
        alert('Jumlah tidak valid!');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity + quantity <= product.stock) {
            existingItem.quantity += quantity;
        } else {
            alert('Stok tidak mencukupi!');
            return;
        }
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        });
    }
    
    // Update stock
    product.stock -= quantity;
    
    updateCartDisplay();
    loadProducts(); // Refresh products to show updated stock
    
    // Show success message
    showNotification(`${product.name} berhasil ditambahkan ke keranjang!`);
    
    // Reset quantity input
    qtyInput.value = 1;
}

function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        // Restore stock
        const product = products.find(p => p.id === productId);
        product.stock += cartItem.quantity;
        
        // Remove from cart
        cart = cart.filter(item => item.id !== productId);
        
        updateCartDisplay();
        loadProducts(); // Refresh products to show updated stock
        loadCartItems(); // Refresh cart display
    }
}

function updateCartQuantity(productId, newQuantity) {
    const cartItem = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);
    
    if (!cartItem || !product) return;
    
    const difference = newQuantity - cartItem.quantity;
    
    if (difference > 0 && difference > product.stock) {
        alert('Stok tidak mencukupi!');
        return;
    }
    
    cartItem.quantity = newQuantity;
    product.stock -= difference;
    
    if (cartItem.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
        loadCartItems();
        loadProducts();
    }
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = formatPrice(totalPrice);
    checkoutTotal.textContent = formatPrice(totalPrice);
    
    // Update checkout button state
    checkoutBtn.disabled = cart.length === 0;
    if (cart.length === 0) {
        checkoutBtn.textContent = 'Keranjang Kosong';
    } else {
        checkoutBtn.textContent = 'Checkout';
    }
}

function loadCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Keranjang belanja kosong</p>
                <p>Silakan tambahkan produk terlebih dahulu</p>
            </div>
        `;
        checkoutItems.innerHTML = '<p>Tidak ada item dalam keranjang</p>';
        return;
    }
    
    cartItems.innerHTML = '';
    checkoutItems.innerHTML = '';
    
    cart.forEach(item => {
        // Cart modal item
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.image} ${item.name}</div>
                <div class="cart-item-price">Rp ${formatPrice(item.price)} × ${item.quantity}</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})" style="margin-left: 1rem; background: #FF6B6B; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 5px; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        
        // Checkout modal item
        const checkoutItem = document.createElement('div');
        checkoutItem.style.cssText = 'display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;';
        checkoutItem.innerHTML = `
            <span>${item.image} ${item.name} × ${item.quantity}</span>
            <span>Rp ${formatPrice(item.price * item.quantity)}</span>
        `;
        checkoutItems.appendChild(checkoutItem);
    });
}

// Event Listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadProducts(this.dataset.category);
        });
    });
    
    // Cart button
    cartBtn.addEventListener('click', function() {
        loadCartItems();
        cartModal.style.display = 'block';
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) return;
        cartModal.style.display = 'none';
        loadCartItems();
        checkoutModal.style.display = 'block';
    });
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            cartModal.style.display = 'none';
            checkoutModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (event.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });
    
    // Checkout form submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processOrder();
    });
}

// Order Processing
function processOrder() {
    const formData = new FormData(checkoutForm);
    const orderData = {
        id: Date.now(),
        customer: {
            name: formData.get('name'),
            phone: formData.get('phone'),
            address: formData.get('address')
        },
        deliveryTime: formData.get('deliveryTime'),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'Pending',
        orderDate: new Date().toLocaleString('id-ID'),
        orderNumber: `DN${Date.now().toString().slice(-6)}`
    };
    
    // Save order
    orderHistory.push(orderData);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    
    // Close modal
    checkoutModal.style.display = 'none';
    
    // Show success message
    showOrderConfirmation(orderData);
    
    // Reset form
    checkoutForm.reset();
}

function showOrderConfirmation(order) {
    const confirmationHtml = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 3000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 500px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.3);">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #28a745; margin-bottom: 1rem;"></i>
                <h2 style="color: #8B4513; margin-bottom: 1rem;">Pesanan Berhasil!</h2>
                <p style="margin-bottom: 1rem;">Nomor Pesanan: <strong>${order.orderNumber}</strong></p>
                <p style="margin-bottom: 1rem;">Total: <strong>Rp ${formatPrice(order.total)}</strong></p>
                <p style="margin-bottom: 1rem;">Waktu Pengiriman: <strong>${order.deliveryTime}</strong></p>
                <p style="margin-bottom: 2rem; color: #666;">Pesanan Anda sedang diproses. Kami akan menghubungi Anda segera untuk konfirmasi.</p>
                <button onclick="this.parentElement.parentElement.remove()" style="background: #8B4513; color: white; border: none; padding: 1rem 2rem; border-radius: 25px; cursor: pointer; font-size: 1rem;">OK</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', confirmationHtml);
    
    // Auto close after 10 seconds
    setTimeout(() => {
        const confirmation = document.querySelector('[style*="position: fixed"][style*="z-index: 3000"]');
        if (confirmation) {
            confirmation.remove();
        }
    }, 10000);
}

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 2500;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Navigation
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Admin Functions (for demo purposes)
function resetStock() {
    // Reset all product stocks to original values
    products.forEach(product => {
        switch(product.id) {
            case 1: product.stock = 25; break;
            case 2: product.stock = 20; break;
            case 3: product.stock = 30; break;
            case 4: product.stock = 15; break;
            case 5: product.stock = 12; break;
            case 6: product.stock = 10; break;
            case 7: product.stock = 8; break;
            case 8: product.stock = 15; break;
            case 9: product.stock = 12; break;
        }
    });
    loadProducts();
    console.log('Stock reset successfully!');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

// Add console commands for testing
console.log('=== Dapoer Nimar E-Commerce ===');
console.log('Available commands:');
console.log('- resetStock(): Reset all product stock to original values');
console.log('- cart: View current cart contents');
console.log('- orderHistory: View all completed orders');
console.log('- products: View all products data');