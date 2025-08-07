// Product Data
const products = [
    {
        id: '1',
        name: 'عطر مردانه دیور',
        brand: 'Dior',
        description: 'عطر مردانه دیور با رایحه گرم و جذاب، مناسب برای استفاده روزانه و مراسم خاص',
        price: 850000,
        originalPrice: 1200000,
        image: '🫙',
        category: 'men',
        rating: 4.8,
        reviews: 1247,
        inStock: true,
        discount: 29,
        volume: '100ml',
        features: ['ضد حساسیت', 'مقاوم در برابر تعریق', 'رایحه پایدار']
    },
    {
        id: '2',
        name: 'عطر زنانه شنل',
        brand: 'Chanel',
        description: 'عطر زنانه شنل با رایحه گل‌های بهاری و نت‌های گرم، مناسب برای بانوان شیک‌پوش',
        price: 1200000,
        originalPrice: 1500000,
        image: '🫙',
        category: 'women',
        rating: 4.9,
        reviews: 892,
        inStock: true,
        discount: 20,
        volume: '50ml',
        features: ['رایحه طبیعی', 'مقاوم 8 ساعته', 'بسته‌بندی لوکس']
    },
    {
        id: '3',
        name: 'عطر یونیسکس تام فورد',
        brand: 'Tom Ford',
        description: 'عطر یونیسکس تام فورد با رایحه منحصر به فرد و ترکیب خاص، مناسب برای افراد خاص‌پسند',
        price: 2100000,
        image: '🫙',
        category: 'unisex',
        rating: 4.7,
        reviews: 567,
        inStock: true,
        volume: '100ml',
        features: ['رایحه منحصر به فرد', 'مقاوم 12 ساعته', 'بسته‌بندی شیشه‌ای']
    },
    {
        id: '4',
        name: 'عطر مردانه آرمانی',
        brand: 'Armani',
        description: 'عطر مردانه آرمانی با رایحه تازه و ورزشی، مناسب برای استفاده روزانه',
        price: 650000,
        originalPrice: 950000,
        image: '🫙',
        category: 'men',
        rating: 4.6,
        reviews: 734,
        inStock: true,
        discount: 32,
        volume: '75ml',
        features: ['رایحه تازه', 'مناسب ورزش', 'مقاوم در برابر آب']
    },
    {
        id: '5',
        name: 'عطر زنانه ویکتوریا سیکرت',
        brand: 'Victoria\'s Secret',
        description: 'عطر زنانه ویکتوریا سیکرت با رایحه شیرین و جذاب، مناسب برای بانوان جوان',
        price: 450000,
        originalPrice: 680000,
        image: '🫙',
        category: 'women',
        rating: 4.5,
        reviews: 445,
        inStock: true,
        discount: 34,
        volume: '50ml',
        features: ['رایحه شیرین', 'مناسب جوانان', 'قیمت مناسب']
    },
    {
        id: '6',
        name: 'عطر یونیسکس جو مالون',
        brand: 'Jo Malone',
        description: 'عطر یونیسکس جو مالون با رایحه طبیعی و ملایم، مناسب برای استفاده در تمام فصول',
        price: 890000,
        image: '🫙',
        category: 'unisex',
        rating: 4.8,
        reviews: 623,
        inStock: true,
        volume: '100ml',
        features: ['رایحه طبیعی', 'مناسب تمام فصول', 'رایحه ملایم']
    },
    {
        id: '7',
        name: 'عطر مردانه هوگو باس',
        brand: 'Hugo Boss',
        description: 'عطر مردانه هوگو باس با رایحه کلاسیک و حرفه‌ای، مناسب برای محیط کار',
        price: 720000,
        originalPrice: 1100000,
        image: '🫙',
        category: 'men',
        rating: 4.4,
        reviews: 389,
        inStock: true,
        discount: 35,
        volume: '100ml',
        features: ['مناسب محیط کار', 'رایحه کلاسیک', 'مقاوم 6 ساعته']
    },
    {
        id: '8',
        name: 'عطر زنانه لانکوم',
        brand: 'Lancome',
        description: 'عطر زنانه لانکوم با رایحه رمانتیک و عاشقانه، مناسب برای قرارهای عاشقانه',
        price: 950000,
        originalPrice: 1300000,
        image: '🫙',
        category: 'women',
        rating: 4.7,
        reviews: 512,
        inStock: true,
        discount: 27,
        volume: '75ml',
        features: ['رایحه رمانتیک', 'مناسب قرارهای عاشقانه', 'بسته‌بندی زیبا']
    }
];

// Cart State
let cart = [];
let filteredProducts = [...products];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const sortFilter = document.getElementById('sortFilter');
const categoryButtons = document.querySelectorAll('.category-btn');
const viewButtons = document.querySelectorAll('.view-btn');
const themeToggle = document.getElementById('themeToggle');

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
}

function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function renderStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push('<i class="fas fa-star star"></i>');
        } else {
            stars.push('<i class="fas fa-star star empty"></i>');
        }
    }
    return stars.join('');
}

function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <div class="product-actions">
                    <button class="action-btn-small wishlist-btn" onclick="toggleWishlist('${product.id}')">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                ${product.discount ? `<div class="discount-badge">${product.discount}%</div>` : ''}
                <div class="volume-badge">${product.volume}</div>
                <div class="product-icon">${product.image}</div>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${renderStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    ${product.originalPrice ? 
                        `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''
                    }
                    <span class="current-price">${formatPrice(product.price)} تومان</span>
                </div>
                <div class="product-features">
                    ${product.features.slice(0, 2).map(feature => 
                        `<span class="feature-tag">${feature}</span>`
                    ).join('')}
                </div>
                <div class="quantity-selector">
                    <span class="quantity-label">تعداد:</span>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="changeQuantity('${product.id}', -1)">-</button>
                        <span class="quantity-value" id="quantity-${product.id}">1</span>
                        <button class="quantity-btn" onclick="changeQuantity('${product.id}', 1)">+</button>
                    </div>
                </div>
                <div class="product-buttons">
                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}')" ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i>
                        ${product.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
                    </button>
                    <button class="more-info-btn" onclick="showMoreInfo('${product.id}')">
                        <i class="fas fa-info-circle"></i>
                        اطلاعات بیشتر
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderProducts() {
    if (productsGrid) {
        productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    }
}

function filterProducts() {
    const selectedCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
    const selectedBrand = brandFilter?.value || 'all';
    const categoryFilterValue = document.getElementById('categoryFilter')?.value || 'all';
    const minPrice = parseInt(document.getElementById('minPrice')?.value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice')?.value) || 100000000;
    const searchTerm = searchInput?.value.toLowerCase() || '';

    filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
        const categoryFilterMatch = categoryFilterValue === 'all' || product.category === categoryFilterValue;
        const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;
        const searchMatch = product.name.toLowerCase().includes(searchTerm) || 
                          product.brand.toLowerCase().includes(searchTerm) ||
                          product.description.toLowerCase().includes(searchTerm);
        
        return categoryMatch && categoryFilterMatch && brandMatch && priceMatch && searchMatch;
    });

    sortProducts();
    renderProducts();
}

function sortProducts() {
    const sortBy = sortFilter.value;
    
    filteredProducts.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return parseInt(b.id) - parseInt(a.id);
            default:
                return b.reviews - a.reviews;
        }
    });
}

function changeQuantity(productId, change) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent);
    quantity = Math.max(1, quantity + change);
    quantityElement.textContent = quantity;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent);
    
    const existingItem = cart.find(item => item.product.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    
    updateCartDisplay();
    showNotification('محصول با موفقیت به سبد خرید اضافه شد!');
    
    // Reset quantity
    document.getElementById(`quantity-${productId}`).textContent = '1';
}

function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.product.image}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.product.name}</div>
                <div class="cart-item-price">${formatPrice(item.product.price)} تومان</div>
                <div class="cart-item-quantity">
                    <div class="quantity-control">
                        <button onclick="updateCartQuantity('${item.product.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity('${item.product.id}', 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item.product.id}')">حذف</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total) + ' تومان';
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        updateCartDisplay();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCartDisplay();
    showNotification('محصول از سبد خرید حذف شد!');
}

function toggleWishlist(productId) {
    const wishlistBtn = document.querySelector(`[data-id="${productId}"] .wishlist-btn i`);
    wishlistBtn.classList.toggle('fas');
    wishlistBtn.classList.toggle('far');
    
    if (wishlistBtn.classList.contains('fas')) {
        wishlistBtn.style.color = '#ef4444';
        showNotification('به لیست علاقه‌مندی‌ها اضافه شد!');
    } else {
        wishlistBtn.style.color = '#6b7280';
        showNotification('از لیست علاقه‌مندی‌ها حذف شد!');
    }
}

function showMoreInfo(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Redirect to product detail page
        window.location.href = `product-detail.html?id=${productId}`;
    }
}

// Cart Sidebar Functions
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the main page (has products)
    if (productsGrid) {
        renderProducts();
    }
    
    // Cart events
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCart) closeCart.addEventListener('click', closeCartSidebar);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);
    
    // Search
    if (searchInput) searchInput.addEventListener('input', filterProducts);
    
    // Filters
    if (brandFilter) brandFilter.addEventListener('change', filterProducts);
    if (sortFilter) sortFilter.addEventListener('change', filterProducts);
    
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    
    // Price filter events
    const priceRange = document.getElementById('priceRange');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceDisplay = document.getElementById('priceDisplay');
    
    if (priceRange && minPriceInput && maxPriceInput && priceDisplay) {
        priceRange.addEventListener('input', function() {
            maxPriceInput.value = this.value;
            updatePriceDisplay();
            filterProducts();
        });
        
        minPriceInput.addEventListener('input', function() {
            updatePriceDisplay();
            filterProducts();
        });
        
        maxPriceInput.addEventListener('input', function() {
            priceRange.value = this.value;
            updatePriceDisplay();
            filterProducts();
        });
    }
    
    function updatePriceDisplay() {
        const min = parseInt(minPriceInput.value) || 0;
        const max = parseInt(maxPriceInput.value) || 100000000;
        if (priceDisplay) {
            priceDisplay.textContent = `${formatPrice(min)} تا ${formatPrice(max)} تومان`;
        }
    }
    
    // Category buttons
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                filterProducts();
            });
        });
    }
    
    // View mode buttons
    if (viewButtons.length > 0) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                viewButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const viewMode = this.dataset.view;
                if (viewMode === 'list' && productsGrid) {
                    productsGrid.style.gridTemplateColumns = '1fr';
                } else if (productsGrid) {
                    productsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
                }
            });
        });
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
        });
    }
    
    // Smooth scrolling for anchor links
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
    
    // Smooth scrolling for anchor links
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
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCartSidebar();
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.product-card, .trust-feature, .offer-card, .review-card');
    animatedElements.forEach(el => observer.observe(el));
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s;
    }
`;
document.head.appendChild(style); 