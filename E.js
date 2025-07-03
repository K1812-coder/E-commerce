// INR formatter using Intl.NumberFormat[6][8][3]
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2
});

// Sample product data (prices in INR)
const products = [
  {
    id: 1,
    name: "iPhone 13",
    category: "phones",
    price: 61380,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Desktop G6",
    category: "desktops",
    price: 53280,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Desktop i8",
    category: "desktops",
    price: 75860,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Camera Pro",
    category: "cameras",
    price: 29990,
    image: "https://images.unsplash.com/photo-1519183071298-a2962be56693?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    name: "Tablet X",
    category: "tablets",
    price: 21000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    name: "Smart TV",
    category: "tv",
    price: 45000,
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 7,
    name: "Laptop Pro",
    category: "laptops",
    price: 82000,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
  }
];

let filteredProducts = [...products];
let cart = [];

function renderProducts(list) {
  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = '';
  list.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <div class="price">${inrFormatter.format(product.price)}</div>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsDiv.appendChild(card);
  });
}

window.addToCart = function(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
};

function updateCart() {
  document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartSection = document.getElementById('cart-section');
  if (cart.length > 0) {
    cartSection.style.display = 'block';
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.name} x${item.qty}
        <span>${inrFormatter.format(item.price * item.qty)}</span>
      `;
      cartItems.appendChild(li);
    });
    document.getElementById('cart-total').textContent = 
      'Total: ' + inrFormatter.format(cart.reduce((sum, item) => sum + item.price * item.qty, 0));
  } else {
    cartSection.style.display = 'none';
  }
}

document.getElementById('checkout-btn').onclick = function() {
  alert('Checkout successful! (Simulation)');
  cart = [];
  updateCart();
};

document.getElementById('category-list').addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    document.querySelectorAll('#category-list li').forEach(li => li.classList.remove('active'));
    e.target.classList.add('active');
    const cat = e.target.getAttribute('data-category');
    if (cat === 'all') {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter(p => p.category === cat);
    }
    renderProducts(filteredProducts);
  }
});

document.getElementById('sort-low-high').onclick = function() {
  filteredProducts.sort((a, b) => a.price - b.price);
  renderProducts(filteredProducts);
};
document.getElementById('sort-high-low').onclick = function() {
  filteredProducts.sort((a, b) => b.price - a.price);
  renderProducts(filteredProducts);
};

document.getElementById('search').addEventListener('input', function(e) {
  const val = e.target.value.toLowerCase();
  renderProducts(filteredProducts.filter(p => p.name.toLowerCase().includes(val)));
});

// Initial render
renderProducts(products);
