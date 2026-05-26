// ===== STATE =====
let state = {
  currentUser: null,
  currentAdmin: null,
  products: [],
  vouchers: [],
  users: [],
  orders: [],
  pendingAdmins: [],
  admins: [],
  cart: [],
  appliedVoucher: null,
  wishlist: [],
  activeFilter: 'Semua',
  selectedPayment: 'transfer',
};

// ===== INITIAL DATA =====
function initData() {
  state.admins = JSON.parse(localStorage.getItem('igs_admins') || '[]');
  if (state.admins.length === 0) {
    state.admins = [{ id: 'a1', name: 'Super Admin', email: 'admin@igsstore.com', password: 'admin123', role: 'super', status: 'active', createdAt: new Date().toISOString() }];
    saveAdmins();
  }
  state.products = JSON.parse(localStorage.getItem('igs_products') || '[]');
  if (state.products.length === 0) {
    state.products = [
      { id: 'p1', name: 'Wireless Headphones Pro', category: 'Elektronik', price: 1250000, discount: 10, stock: 45, emoji: '🎧', desc: 'Headphone premium dengan noise cancelling terbaik. Baterai tahan 30 jam, kenyamanan seharian.', isNew: true, isFeatured: true, isHot: false, rating: 4.8, sold: 320 },
      { id: 'p2', name: 'Sneakers Urban Classic', category: 'Fashion', price: 850000, discount: 0, stock: 120, emoji: '👟', desc: 'Sneakers stylish cocok untuk segala aktivitas. Material premium, sol anti-slip.', isNew: false, isFeatured: true, isHot: true, rating: 4.6, sold: 580 },
      { id: 'p3', name: 'Smart Watch Series 8', category: 'Elektronik', price: 2350000, discount: 15, stock: 30, emoji: '⌚', desc: 'Smartwatch canggih dengan GPS, monitor detak jantung, SpO2, dan layar AMOLED.', isNew: true, isFeatured: false, isHot: true, rating: 4.9, sold: 210 },
      { id: 'p4', name: 'Skincare Set Premium', category: 'Kecantikan', price: 450000, discount: 20, stock: 200, emoji: '💄', desc: 'Paket perawatan kulit lengkap. Cocok untuk semua jenis kulit, formula alami.', isNew: false, isFeatured: true, isHot: false, rating: 4.7, sold: 890 },
      { id: 'p5', name: 'Tas Ransel Laptop 15"', category: 'Aksesoris', price: 320000, discount: 0, stock: 75, emoji: '🎒', desc: 'Ransel multifungsi dengan ruang laptop 15 inch, port USB, waterproof.', isNew: false, isFeatured: false, isHot: false, rating: 4.5, sold: 430 },
      { id: 'p6', name: 'Protein Whey Premium', category: 'Olahraga', price: 580000, discount: 5, stock: 60, emoji: '💪', desc: 'Protein whey berkualitas tinggi, 25g protein per serving. Tersedia 5 rasa.', isNew: true, isFeatured: false, isHot: true, rating: 4.8, sold: 165 },
      { id: 'p7', name: 'Kemeja Flannel Unisex', category: 'Fashion', price: 195000, discount: 0, stock: 300, emoji: '👕', desc: 'Kemeja flannel kualitas premium, tersedia berbagai warna dan ukuran S-XL.', isNew: false, isFeatured: false, isHot: false, rating: 4.4, sold: 720 },
      { id: 'p8', name: 'Kopi Arabika Gayo 500g', category: 'Makanan', price: 125000, discount: 0, stock: 500, emoji: '☕', desc: 'Kopi arabika asli dari Gayo, Aceh. Roast medium, aroma kuat, rasa fruity.', isNew: false, isFeatured: true, isHot: false, rating: 4.9, sold: 1200 },
    ];
    saveProducts();
  }
  state.vouchers = JSON.parse(localStorage.getItem('igs_vouchers') || '[]');
  if (state.vouchers.length === 0) {
    state.vouchers = [
      { id: 'v1', code: 'IGSSTORE10', type: 'percent', value: 10, minOrder: 100000, limit: 100, used: 23, expiry: '2025-12-31', isActive: true },
      { id: 'v2', code: 'WELCOME50K', type: 'fixed', value: 50000, minOrder: 200000, limit: 50, used: 12, expiry: '2025-11-30', isActive: true },
      { id: 'v3', code: 'FLASH30', type: 'percent', value: 30, minOrder: 500000, limit: 20, used: 20, expiry: '2025-10-15', isActive: false },
    ];
    saveVouchers();
  }
  state.users = JSON.parse(localStorage.getItem('igs_users') || '[]');
  state.orders = JSON.parse(localStorage.getItem('igs_orders') || '[]');
  state.pendingAdmins = JSON.parse(localStorage.getItem('igs_pending_admins') || '[]');

  // Session
  const savedUser = localStorage.getItem('igs_session_user');
  const savedAdmin = localStorage.getItem('igs_session_admin');
  if (savedUser) { state.currentUser = JSON.parse(savedUser); updateUserUI(); }
  if (savedAdmin) { state.currentAdmin = JSON.parse(savedAdmin); }
}

function saveProducts() { localStorage.setItem('igs_products', JSON.stringify(state.products)); }
function saveVouchers() { localStorage.setItem('igs_vouchers', JSON.stringify(state.vouchers)); }
function saveUsers() { localStorage.setItem('igs_users', JSON.stringify(state.users)); }
function saveOrders() { localStorage.setItem('igs_orders', JSON.stringify(state.orders)); }
function saveAdmins() { localStorage.setItem('igs_admins', JSON.stringify(state.admins)); }
function savePendingAdmins() { localStorage.setItem('igs_pending_admins', JSON.stringify(state.pendingAdmins)); }

// ===== SCREEN =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
  if (id === 'screen-profile') loadProfileScreen();
  if (id === 'screen-admin') loadAdminScreen();
}

// ===== TOAST =====
function toast(msg, type='info', icon='') {
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  const colors = { success: 'var(--success)', error: 'var(--danger)', info: 'var(--accent)' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fa ${icon || icons[type]}" style="color:${colors[type]}"></i> <span>${msg}</span>`;
  document.getElementById('toastContainer').appendChild(el);
  setTimeout(() => { el.style.animation = 'toastOut .3s ease forwards'; setTimeout(() => el.remove(), 300); }, 3000);
}

// ===== MODAL =====
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ===== AUTH =====
function openAuthModal() { openModal('authModal'); }
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t,i) => t.classList.toggle('active', (i===0&&tab==='login')||(i===1&&tab==='register')));
  document.querySelectorAll('.auth-content').forEach(c => c.classList.remove('active'));
  document.getElementById('auth-'+tab).classList.add('active');
}

function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPass').value;
  if (!email || !pass) return toast('Isi email dan password!', 'error');
  const user = state.users.find(u => u.email === email && u.password === pass);
  if (!user) return toast('Email atau password salah!', 'error');
  if (user.status === 'banned') return toast('Akun Anda telah diblokir!', 'error');
  loginUser(user);
}

function handleRegister() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPass').value;
  if (!name || !email || !pass) return toast('Semua field harus diisi!', 'error');
  if (pass.length < 8) return toast('Password minimal 8 karakter!', 'error');
  if (state.users.find(u => u.email === email)) return toast('Email sudah terdaftar!', 'error');
  const user = { id: 'u' + Date.now(), name, email, password: pass, status: 'active', createdAt: new Date().toISOString(), address: '', phone: '', orders: [] };
  state.users.push(user); saveUsers();
  loginUser(user);
  toast(`Selamat datang, ${name}! 🎉`, 'success');
}

function socialLogin(provider) {
  const names = { google: 'Google User', facebook: 'Facebook User', instagram: 'IGS User' };
  const emails = { google: 'user@gmail.com', facebook: 'user@fb.com', instagram: 'user@ig.com' };
  const icons = { google: '🔴', facebook: '🔵', instagram: '🟣' };
  let user = state.users.find(u => u.email === emails[provider]);
  if (!user) {
    user = { id: 'u' + Date.now(), name: names[provider], email: emails[provider], password: '', status: 'active', provider, createdAt: new Date().toISOString(), address: '', phone: '', orders: [] };
    state.users.push(user); saveUsers();
  }
  loginUser(user);
  toast(`Berhasil masuk dengan ${provider.charAt(0).toUpperCase()+provider.slice(1)}!`, 'success');
}

function loginUser(user) {
  state.currentUser = user;
  localStorage.setItem('igs_session_user', JSON.stringify(user));
  closeModal('authModal');
  updateUserUI();
  toast(`Halo, ${user.name}! 👋`, 'success');
}

function updateUserUI() {
  const u = state.currentUser;
  if (u) {
    document.getElementById('guestActions').style.display = 'none';
    document.getElementById('userMenuEl').style.display = 'flex';
    document.getElementById('navProfileLink').style.display = 'inline';
    document.getElementById('userAvatarEl').textContent = u.name.charAt(0).toUpperCase();
    // profile screen
    const initials = u.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
    const pbig = document.getElementById('profileAvatarBig');
    if (pbig) pbig.textContent = initials;
    const pun = document.getElementById('profileUsername');
    if (pun) pun.textContent = u.name;
    const pem = document.getElementById('profileEmail');
    if (pem) pem.textContent = u.email;
    const pen = document.getElementById('editProfileName');
    if (pen) pen.value = u.name;
    const pee = document.getElementById('editProfileEmail');
    if (pee) pee.value = u.email;
    const pep = document.getElementById('editProfilePhone');
    if (pep) pep.value = u.phone || '';
    const pea = document.getElementById('editProfileAddress');
    if (pea) pea.value = u.address || '';
  } else {
    document.getElementById('guestActions').style.display = 'flex';
    document.getElementById('userMenuEl').style.display = 'none';
    document.getElementById('navProfileLink').style.display = 'none';
  }
}

function handleLogout() {
  state.currentUser = null;
  localStorage.removeItem('igs_session_user');
  state.cart = [];
  updateCartUI();
  updateUserUI();
  showScreen('screen-home');
  toast('Berhasil keluar!', 'info');
}

function toggleUserMenu() {
  document.getElementById('userDropdown').classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.user-menu')) document.getElementById('userDropdown')?.classList.remove('open');
});

function showForgotPassword() { toast('Link reset password telah dikirim ke email Anda.', 'info'); }

// ===== ADMIN AUTH =====
function openAdminLogin() { openModal('adminLoginModal'); }
function showAdminRegister() { closeModal('adminLoginModal'); openModal('adminRegModal'); }

function handleAdminLogin() {
  const email = document.getElementById('adminEmail').value.trim();
  const pass = document.getElementById('adminPass').value;
  if (!email || !pass) return toast('Isi email dan password!', 'error');
  const admin = state.admins.find(a => a.email === email && a.password === pass && a.status === 'active');
  if (!admin) return toast('Kredensial admin salah atau akun belum diverifikasi!', 'error');
  state.currentAdmin = admin;
  localStorage.setItem('igs_session_admin', JSON.stringify(admin));
  closeModal('adminLoginModal');
  document.getElementById('adminLoginBtn').style.display = 'none';
  toast(`Selamat datang, Admin ${admin.name}! 🛡️`, 'success');
  showScreen('screen-admin');
  loadAdminScreen();
}

function handleAdminRegister() {
  const name = document.getElementById('adminRegName').value.trim();
  const email = document.getElementById('adminRegEmail').value.trim();
  const pass = document.getElementById('adminRegPass').value;
  const reason = document.getElementById('adminRegReason').value.trim();
  if (!name || !email || !pass) return toast('Isi semua field wajib!', 'error');
  if (state.admins.find(a => a.email === email) || state.pendingAdmins.find(a => a.email === email))
    return toast('Email sudah digunakan!', 'error');
  state.pendingAdmins.push({ id: 'pa' + Date.now(), name, email, password: pass, reason, requestedAt: new Date().toISOString() });
  savePendingAdmins();
  closeModal('adminRegModal');
  toast('Permintaan terkirim! Tunggu verifikasi dari pemilik website.', 'success');
}

function adminLogout() {
  state.currentAdmin = null;
  localStorage.removeItem('igs_session_admin');
  showScreen('screen-home');
  setAdminBtn();
  toast('Berhasil keluar dari panel admin.', 'info');
}

function setAdminBtn() {
  document.getElementById('adminLoginBtn').style.display = state.currentAdmin ? 'none' : '';
}

// ===== PRODUCTS RENDERING =====
function renderProducts(filter = state.activeFilter) {
  state.activeFilter = filter;
  const grid = document.getElementById('productGrid');
  let filtered = filter === 'Semua' ? state.products : state.products.filter(p => p.category === filter);
  if (filtered.length === 0) { grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--muted)"><i class="fa fa-box-open" style="font-size:48px;opacity:.3;display:block;margin-bottom:16px"></i>Tidak ada produk</div>'; return; }
  grid.innerHTML = filtered.map(p => {
    const finalPrice = p.discount ? Math.round(p.price * (1 - p.discount/100)) : p.price;
    const badges = [];
    if (p.isNew) badges.push('<span class="badge badge-green">Baru</span>');
    if (p.isFeatured) badges.push('<span class="badge badge-orange">Unggulan</span>');
    if (p.isHot) badges.push('<span class="badge badge-red">🔥 Hot</span>');
    if (p.discount) badges.push(`<span class="badge badge-gold">-${p.discount}%</span>`);
    const inWish = state.wishlist.includes(p.id);
    return `<div class="product-card" onclick="openProductDetail('${p.id}')">
      <div class="product-img-wrap">
        <div class="product-img-placeholder">${p.emoji || '📦'}</div>
        <div class="product-badges">${badges.join('')}</div>
        <button class="product-wishlist ${inWish?'active':''}" onclick="event.stopPropagation();toggleWishlist('${p.id}',this)"><i class="fa${inWish?'s':'r'} fa-heart"></i></button>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div style="display:flex;align-items:center;gap:4px">
          <div class="product-rating">★ ${p.rating}</div>
          <span style="color:var(--muted);font-size:12px">(${p.sold} terjual)</span>
        </div>
        <div class="product-stock" style="${p.stock < 10 ? 'color:var(--danger)' : ''}">${p.stock < 10 ? '⚠️ Sisa' : 'Stok'}: ${p.stock}</div>
        <div class="product-price-row">
          <div><span class="product-price">${formatRp(finalPrice)}</span>${p.discount ? `<span class="product-price-old">${formatRp(p.price)}</span>` : ''}</div>
          <button class="add-to-cart-btn" onclick="event.stopPropagation();addToCart('${p.id}')"><i class="fa fa-plus"></i></button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function renderFilters() {
  const cats = ['Semua', ...new Set(state.products.map(p => p.category))];
  document.getElementById('filterTabs').innerHTML = cats.map(c =>
    `<button class="filter-tab ${c===state.activeFilter?'active':''}" onclick="renderProducts('${c}');renderFilters()">${c}</button>`
  ).join('');
}

function toggleWishlist(pid, btn) {
  const idx = state.wishlist.indexOf(pid);
  if (idx >= 0) { state.wishlist.splice(idx,1); btn.classList.remove('active'); btn.innerHTML = '<i class="far fa-heart"></i>'; toast('Dihapus dari wishlist', 'info'); }
  else { state.wishlist.push(pid); btn.classList.add('active'); btn.innerHTML = '<i class="fas fa-heart"></i>'; toast('Ditambahkan ke wishlist ❤️', 'success'); }
}

// ===== PRODUCT DETAIL =====
function openProductDetail(pid) {
  const p = state.products.find(x => x.id === pid);
  if (!p) return;
  const finalPrice = p.discount ? Math.round(p.price * (1 - p.discount/100)) : p.price;
  let qty = 1;
  document.getElementById('productModalContent').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px">
      <div class="product-modal-img"><div class="placeholder-icon">${p.emoji || '📦'}</div></div>
      <div class="product-modal-info">
        <div class="product-modal-category">${p.category}</div>
        <div class="product-modal-name">${p.name}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <span style="color:var(--accent2)">★ ${p.rating}</span>
          <span style="color:var(--muted);font-size:13px">${p.sold} terjual</span>
          <span style="color:var(--muted);font-size:13px">|</span>
          <span style="font-size:13px;${p.stock<10?'color:var(--danger)':'color:var(--muted)'}">Stok: ${p.stock}</span>
        </div>
        <div class="product-modal-price">${formatRp(finalPrice)}${p.discount?`<span style="font-size:16px;color:var(--muted);text-decoration:line-through;margin-left:8px">${formatRp(p.price)}</span>`:''}</div>
        <p class="product-modal-desc">${p.desc || 'Tidak ada deskripsi.'}</p>
        <div class="qty-control">
          <button class="qty-control-btn" onclick="changeDetailQty(-1)">−</button>
          <span id="detailQty" style="font-family:Syne,sans-serif;font-weight:800;font-size:18px;min-width:40px;text-align:center">1</span>
          <button class="qty-control-btn" onclick="changeDetailQty(1)">+</button>
          <span style="color:var(--muted);font-size:13px">Max ${p.stock}</span>
        </div>
        <div style="display:flex;gap:10px">
          <button class="btn btn-primary" style="flex:1" onclick="addToCartQty('${p.id}')"><i class="fa fa-cart-plus"></i> Tambah ke Keranjang</button>
          <button class="btn btn-secondary" onclick="toggleWishlistModal('${p.id}')"><i class="far fa-heart"></i></button>
        </div>
      </div>
    </div>`;
  openModal('productModal');
  window._detailQty = 1;
  window._detailProduct = p;
}

function changeDetailQty(delta) {
  const p = window._detailProduct;
  window._detailQty = Math.max(1, Math.min(p.stock, (window._detailQty||1) + delta));
  document.getElementById('detailQty').textContent = window._detailQty;
}

function addToCartQty(pid) {
  const qty = window._detailQty || 1;
  for (let i=0;i<qty;i++) addToCart(pid, true);
  toast(`${qty} item ditambahkan ke keranjang 🛒`, 'success');
  closeModal('productModal');
  openCart();
}

function toggleWishlistModal(pid) {
  const idx = state.wishlist.indexOf(pid);
  if (idx>=0) { state.wishlist.splice(idx,1); toast('Dihapus dari wishlist','info'); }
  else { state.wishlist.push(pid); toast('Ditambahkan ke wishlist ❤️','success'); }
  renderProducts();
}

// ===== CART =====
function addToCart(pid, silent=false) {
  if (!state.currentUser) { openAuthModal(); toast('Masuk terlebih dahulu untuk berbelanja!', 'info'); return; }
  const p = state.products.find(x => x.id === pid);
  if (!p || p.stock <= 0) return toast('Stok habis!', 'error');
  const existing = state.cart.find(c => c.pid === pid);
  if (existing) {
    if (existing.qty >= p.stock) return toast('Stok tidak mencukupi!', 'error');
    existing.qty++;
  } else { state.cart.push({ pid, qty: 1 }); }
  updateCartUI();
  if (!silent) toast(`${p.name} ditambahkan ke keranjang!`, 'success');
}

function removeFromCart(pid) {
  state.cart = state.cart.filter(c => c.pid !== pid);
  updateCartUI();
}

function changeQty(pid, delta) {
  const item = state.cart.find(c => c.pid === pid);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  const p = state.products.find(x => x.id === pid);
  if (p && item.qty > p.stock) { item.qty = p.stock; toast('Batas stok!', 'error'); }
  updateCartUI();
}

function updateCartUI() {
  const total = state.cart.reduce((s,c) => s+c.qty, 0);
  ['cartCountBadge','cartCountBadge2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.textContent = total; el.style.display = total > 0 ? 'flex' : 'none'; }
  });
  renderCartItems();
  renderCartTotals();
}

function renderCartItems() {
  const el = document.getElementById('cartItems');
  if (!el) return;
  if (state.cart.length === 0) {
    el.innerHTML = `<div class="cart-empty"><i class="fa fa-shopping-bag"></i><p>Keranjang masih kosong</p><button class="btn btn-primary btn-sm" onclick="closeCart()">Mulai Belanja</button></div>`;
    return;
  }
  el.innerHTML = state.cart.map(c => {
    const p = state.products.find(x => x.id === c.pid);
    if (!p) return '';
    const price = p.discount ? Math.round(p.price*(1-p.discount/100)) : p.price;
    return `<div class="cart-item">
      <div class="cart-item-img"><div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:28px">${p.emoji||'📦'}</div></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-price">${formatRp(price)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty('${c.pid}',-1)">−</button>
          <span class="qty-display">${c.qty}</span>
          <button class="qty-btn" onclick="changeQty('${c.pid}',1)">+</button>
          <button class="cart-item-remove" onclick="removeFromCart('${c.pid}')"><i class="fa fa-trash"></i></button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function renderCartTotals() {
  const el = document.getElementById('cartTotals');
  if (!el) return;
  const subtotal = state.cart.reduce((s,c) => {
    const p = state.products.find(x => x.id === c.pid);
    if (!p) return s;
    return s + (p.discount ? Math.round(p.price*(1-p.discount/100)) : p.price) * c.qty;
  }, 0);
  let discount = 0;
  const v = state.appliedVoucher;
  if (v) {
    if (subtotal >= (v.minOrder||0)) {
      discount = v.type === 'percent' ? Math.round(subtotal*v.value/100) : v.value;
    }
  }
  const total = Math.max(0, subtotal - discount);
  el.innerHTML = `<div class="cart-total-row"><span>Subtotal</span><span>${formatRp(subtotal)}</span></div>
    ${discount ? `<div class="cart-total-row"><span>Voucher <span class="badge badge-green">${v.code}</span></span><span class="discount">-${formatRp(discount)}</span></div>` : ''}
    <div class="cart-total-row total"><span>Total</span><span>${formatRp(total)}</span></div>`;
}

function openCart() { document.getElementById('cartSidebar').classList.add('open'); document.getElementById('cartOverlay').classList.add('open'); }
function closeCart() { document.getElementById('cartSidebar').classList.remove('open'); document.getElementById('cartOverlay').classList.remove('open'); }

function applyCartVoucher() {
  const code = document.getElementById('cartVoucherInput').value.trim().toUpperCase();
  applyVoucherCode(code);
}
function applyHeroVoucher() {
  const code = document.getElementById('herVoucherInput').value.trim().toUpperCase();
  applyVoucherCode(code);
  if (state.appliedVoucher) openCart();
}

function applyVoucherCode(code) {
  const v = state.vouchers.find(x => x.code === code && x.isActive);
  if (!v) return toast('Kode voucher tidak valid!', 'error');
  if (v.used >= v.limit) return toast('Voucher sudah habis!', 'error');
  if (new Date(v.expiry) < new Date()) return toast('Voucher sudah kadaluarsa!', 'error');
  const subtotal = state.cart.reduce((s,c) => {
    const p = state.products.find(x => x.id === c.pid);
    if (!p) return s;
    return s + (p.discount ? Math.round(p.price*(1-p.discount/100)) : p.price) * c.qty;
  }, 0);
  if (subtotal < (v.minOrder||0)) return toast(`Minimum pembelian ${formatRp(v.minOrder)} untuk voucher ini!`, 'error');
  state.appliedVoucher = v;
  renderCartTotals();
  toast(`Voucher ${v.code} berhasil dipakai! Hemat ${v.type==='percent'?v.value+'%':formatRp(v.value)} 🎉`, 'success');
}

// ===== CHECKOUT =====
function openCheckout() {
  if (!state.currentUser) { closeCart(); openAuthModal(); return; }
  if (state.cart.length === 0) return toast('Keranjang kosong!', 'error');
  // Fill checkout items
  const itemsEl = document.getElementById('checkoutItems');
  itemsEl.innerHTML = state.cart.map(c => {
    const p = state.products.find(x => x.id === c.pid);
    if (!p) return '';
    const price = p.discount ? Math.round(p.price*(1-p.discount/100)) : p.price;
    return `<div class="checkout-item">
      <div class="checkout-item-img">${p.emoji||'📦'}</div>
      <div><div class="checkout-item-name">${p.name}</div><div class="checkout-item-qty">x${c.qty}</div></div>
      <div class="checkout-item-price">${formatRp(price*c.qty)}</div>
    </div>`;
  }).join('');
  // Fill summary
  const subtotal = state.cart.reduce((s,c) => {
    const p = state.products.find(x => x.id === c.pid);
    if (!p) return s;
    return s + (p.discount ? Math.round(p.price*(1-p.discount/100)) : p.price) * c.qty;
  }, 0);
  let discount = 0;
  const v = state.appliedVoucher;
  if (v) discount = v.type === 'percent' ? Math.round(subtotal*v.value/100) : v.value;
  const ongkir = 15000;
  const total = Math.max(0, subtotal - discount) + ongkir;
  document.getElementById('checkoutSummary').innerHTML = `
    <div class="checkout-row"><span>Subtotal</span><span>${formatRp(subtotal)}</span></div>
    ${discount ? `<div class="checkout-row"><span>Diskon Voucher</span><span style="color:var(--success)">-${formatRp(discount)}</span></div>` : ''}
    <div class="checkout-row"><span>Ongkir</span><span>${formatRp(ongkir)}</span></div>
    <div class="checkout-row total"><span>Total Bayar</span><span>${formatRp(total)}</span></div>`;
  // Pre-fill shipping
  if (state.currentUser) {
    document.getElementById('shipName').value = state.currentUser.name || '';
    document.getElementById('shipPhone').value = state.currentUser.phone || '';
    document.getElementById('shipAddress').value = state.currentUser.address || '';
  }
  closeCart();
  openModal('checkoutModal');
}

function selectPayment(el, method) {
  document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  state.selectedPayment = method;
}

function placeOrder() {
  const name = document.getElementById('shipName').value.trim();
  const phone = document.getElementById('shipPhone').value.trim();
  const address = document.getElementById('shipAddress').value.trim();
  if (!name || !phone || !address) return toast('Lengkapi informasi pengiriman!', 'error');
  const subtotal = state.cart.reduce((s,c) => {
    const p = state.products.find(x => x.id === c.pid);
    return s + (p ? (p.discount ? Math.round(p.price*(1-p.discount/100)) : p.price) * c.qty : 0);
  }, 0);
  let discount = 0;
  const v = state.appliedVoucher;
  if (v) discount = v.type === 'percent' ? Math.round(subtotal*v.value/100) : v.value;
  const ongkir = 15000;
  const total = Math.max(0, subtotal - discount) + ongkir;

  // Reduce stock
  state.cart.forEach(c => {
    const p = state.products.find(x => x.id === c.pid);
    if (p) p.stock = Math.max(0, p.stock - c.qty);
  });
  saveProducts();

  // Update voucher usage
  if (v) { const idx = state.vouchers.findIndex(x => x.id === v.id); if (idx>=0) state.vouchers[idx].used++; saveVouchers(); }

  const order = {
    id: 'ORD' + Date.now(),
    userId: state.currentUser.id,
    userName: state.currentUser.name,
    userEmail: state.currentUser.email,
    items: state.cart.map(c => { const p = state.products.find(x => x.id === c.pid); return { pid: c.pid, name: p?.name, emoji: p?.emoji, qty: c.qty, price: p ? (p.discount ? Math.round(p.price*(1-p.discount/100)) : p.price) : 0 }; }),
    shipping: { name, phone, address },
    payment: state.selectedPayment,
    voucher: v?.code || null,
    subtotal, discount, ongkir, total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  state.orders.push(order); saveOrders();

  // Add to user's orders
  const userIdx = state.users.findIndex(u => u.id === state.currentUser.id);
  if (userIdx >= 0) { if (!state.users[userIdx].orders) state.users[userIdx].orders = []; state.users[userIdx].orders.push(order.id); saveUsers(); }

  state.cart = [];
  state.appliedVoucher = null;
  updateCartUI();
  closeModal('checkoutModal');
  toast(`Pesanan ${order.id} berhasil dibuat! 🎉`, 'success');
  renderProducts();
  showScreen('screen-profile');
  switchProfileSection('orders');
}

// ===== PROFILE SCREEN =====
function loadProfileScreen() {
  updateUserUI();
  renderUserOrders();
  renderUserVouchers();
}

function switchProfileSection(id) {
  document.querySelectorAll('.profile-section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-'+id).classList.add('active');
  document.querySelectorAll('.profile-nav-item').forEach((n,i) => {
    n.classList.toggle('active', ['orders','account','vouchers'][i] === id);
  });
  if (id === 'orders') renderUserOrders();
  if (id === 'vouchers') renderUserVouchers();
}

function renderUserOrders() {
  const el = document.getElementById('userOrderList');
  if (!el) return;
  const userOrders = state.orders.filter(o => o.userId === state.currentUser?.id);
  if (userOrders.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)"><i class="fa fa-box-open" style="font-size:40px;opacity:.3;display:block;margin-bottom:12px"></i>Belum ada pesanan</div>';
    return;
  }
  el.innerHTML = userOrders.slice().reverse().map(o => {
    const statusMap = { pending: ['badge-gold','Menunggu Pembayaran'], processing: ['badge-purple','Diproses'], shipped: ['badge-green','Dikirim'], done: ['badge-green','Selesai'], cancelled: ['badge-red','Dibatalkan'] };
    const [bc, bs] = statusMap[o.status] || ['badge-gold','Pending'];
    return `<div class="order-card">
      <div class="order-card-header">
        <span class="order-id">#${o.id}</span>
        <span class="badge ${bc}">${bs}</span>
      </div>
      <div class="order-products">${o.items.map(item => `<div class="order-product-thumb">${item.emoji||'📦'}</div>`).join('')}</div>
      <div class="order-footer">
        <div><div class="order-total-label">${new Date(o.createdAt).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}</div>
        <div class="order-total-label">${o.items.length} produk · ${o.items.reduce((s,i)=>s+i.qty,0)} item</div></div>
        <div class="order-total-val">${formatRp(o.total)}</div>
      </div>
    </div>`;
  }).join('');
}

function renderUserVouchers() {
  const el = document.getElementById('userVoucherGrid');
  if (!el) return;
  const active = state.vouchers.filter(v => v.isActive && new Date(v.expiry) >= new Date() && v.used < v.limit);
  if (active.length === 0) { el.innerHTML = '<p style="color:var(--muted);font-size:14px">Tidak ada voucher tersedia saat ini.</p>'; return; }
  el.innerHTML = active.map(v => `<div class="voucher-card">
    <div class="voucher-card-top">
      <div>
        <div class="voucher-code">${v.code}</div>
        <div style="color:var(--muted);font-size:12px;margin-top:4px">Min. ${formatRp(v.minOrder||0)}</div>
      </div>
      <div class="voucher-discount">${v.type==='percent'?v.value+'%':formatRp(v.value)}</div>
    </div>
    <div class="voucher-card-bot">
      <div class="voucher-info-row"><span>Berlaku sampai</span><span>${new Date(v.expiry).toLocaleDateString('id-ID')}</span></div>
      <div class="voucher-info-row"><span>Sisa kuota</span><span>${v.limit-v.used}/${v.limit}</span></div>
      <button class="btn btn-primary btn-sm btn-full" onclick="useVoucherFromProfile('${v.code}')"><i class="fa fa-shopping-bag"></i> Gunakan Sekarang</button>
    </div>
  </div>`).join('');
}

function useVoucherFromProfile(code) {
  applyVoucherCode(code);
  showScreen('screen-home');
  openCart();
}

function saveProfile() {
  const name = document.getElementById('editProfileName').value.trim();
  const phone = document.getElementById('editProfilePhone').value.trim();
  const address = document.getElementById('editProfileAddress').value.trim();
  if (!name) return toast('Nama tidak boleh kosong!', 'error');
  const idx = state.users.findIndex(u => u.id === state.currentUser.id);
  if (idx >= 0) {
    state.users[idx] = { ...state.users[idx], name, phone, address };
    state.currentUser = state.users[idx];
    localStorage.setItem('igs_session_user', JSON.stringify(state.currentUser));
    saveUsers();
    updateUserUI();
    toast('Profil berhasil diperbarui!', 'success');
  }
}

function changePassword() {
  const np = document.getElementById('newPass').value;
  const cp = document.getElementById('confirmPass').value;
  if (!np) return toast('Masukkan password baru!', 'error');
  if (np.length < 8) return toast('Password minimal 8 karakter!', 'error');
  if (np !== cp) return toast('Konfirmasi password tidak cocok!', 'error');
  const idx = state.users.findIndex(u => u.id === state.currentUser.id);
  if (idx >= 0) { state.users[idx].password = np; saveUsers(); }
  document.getElementById('newPass').value = '';
  document.getElementById('confirmPass').value = '';
  toast('Password berhasil diubah!', 'success');
}

// ===== ADMIN PANEL =====
function loadAdminScreen() {
  document.getElementById('adminNameDisplay').textContent = state.currentAdmin?.name || '';
  renderDashboard();
  renderAdminProducts();
  renderAdminVouchers();
  renderAdminOrders();
  renderAdminUsers();
  renderPendingAdmins();
}

function switchAdminPage(page) {
  document.querySelectorAll('.admin-subpage').forEach(p => p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));
  event.target.classList.add('active');
  const titles = { dashboard:'Dashboard', products:'Manajemen Produk', vouchers:'Manajemen Voucher', orders:'Manajemen Pesanan', users:'Manajemen Pengguna', 'pending-admins':'Admin Pending' };
  document.getElementById('adminPageTitle').textContent = titles[page] || page;
  if (page === 'dashboard') renderDashboard();
  if (page === 'products') renderAdminProducts();
  if (page === 'vouchers') renderAdminVouchers();
  if (page === 'orders') renderAdminOrders();
  if (page === 'users') renderAdminUsers();
  if (page === 'pending-admins') renderPendingAdmins();
}

function renderDashboard() {
  document.getElementById('dashStatProducts').textContent = state.products.length;
  document.getElementById('dashStatUsers').textContent = state.users.length;
  document.getElementById('dashStatOrders').textContent = state.orders.length;
  const rev = state.orders.filter(o=>o.status!=='cancelled').reduce((s,o)=>s+o.total,0);
  document.getElementById('dashStatRevenue').textContent = formatRp(rev);
  // Hero stats
  document.getElementById('statProducts').textContent = state.products.length + '+';
  document.getElementById('statUsers').textContent = (state.users.length + 1200) + '+';
  document.getElementById('statOrders').textContent = (state.orders.length + 3400) + '+';
  // Recent products table
  const tbody = document.getElementById('dashProductTable');
  tbody.innerHTML = state.products.slice(-5).reverse().map(p => {
    const price = p.discount ? Math.round(p.price*(1-p.discount/100)) : p.price;
    return `<tr><td><div class="td-product"><div class="td-img">${p.emoji||'📦'}</div><div><div class="td-name">${p.name}</div></div></div></td>
      <td>${p.category}</td><td>${formatRp(price)}</td><td ${p.stock<10?'style="color:var(--danger)"':''}>${p.stock}</td>
      <td>${p.isNew?'<span class="badge badge-green">Baru</span>':''}${p.isFeatured?'<span class="badge badge-orange">Unggulan</span>':''}</td></tr>`;
  }).join('');
  // Pending badge
  const pb = document.getElementById('pendingBadge');
  if (pb) pb.textContent = state.pendingAdmins.length > 0 ? state.pendingAdmins.length : '';
}

function renderAdminProducts() {
  const q = (document.getElementById('searchProduct')?.value||'').toLowerCase();
  const tbody = document.getElementById('adminProductTable');
  const filtered = state.products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  tbody.innerHTML = filtered.length === 0 ? '<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--muted)">Tidak ada produk</td></tr>' :
    filtered.map(p => {
      const price = p.discount ? Math.round(p.price*(1-p.discount/100)) : p.price;
      const labels = [p.isNew?'<span class="badge badge-green">Baru</span>':'', p.isFeatured?'<span class="badge badge-orange">Unggulan</span>':'', p.isHot?'<span class="badge badge-red">Hot</span>':'', p.discount?`<span class="badge badge-gold">-${p.discount}%</span>`:''  ].filter(Boolean).join('');
      return `<tr><td><div class="td-product"><div class="td-img">${p.emoji||'📦'}</div><div><div class="td-name">${p.name}</div><div class="td-cat">${p.category}</div></div></div></td>
        <td>${p.category}</td>
        <td>${formatRp(price)}${p.discount?`<br><small style="color:var(--muted);text-decoration:line-through">${formatRp(p.price)}</small>`:''}</td>
        <td ${p.stock<10?'style="color:var(--danger);font-weight:700"':''}>${p.stock}</td>
        <td>${labels||'<span style="color:var(--muted)">—</span>'}</td>
        <td><div class="td-actions"><button class="btn btn-sm btn-secondary" onclick="editProduct('${p.id}')"><i class="fa fa-edit"></i></button><button class="btn btn-sm btn-danger" onclick="deleteProduct('${p.id}')"><i class="fa fa-trash"></i></button></div></td></tr>`;
    }).join('');
}

function renderAdminVouchers() {
  const el = document.getElementById('adminVoucherGrid');
  el.innerHTML = state.vouchers.map(v => `<div class="voucher-card">
    <div class="voucher-card-top">
      <div>
        <div class="voucher-code">${v.code}</div>
        <div style="color:var(--muted);font-size:12px;margin-top:4px">Min. ${formatRp(v.minOrder||0)}</div>
      </div>
      <div class="voucher-discount">${v.type==='percent'?v.value+'%':formatRp(v.value)}</div>
    </div>
    <div class="voucher-card-bot">
      <div class="voucher-info-row"><span>Berlaku sampai</span><span>${new Date(v.expiry).toLocaleDateString('id-ID')}</span></div>
      <div class="voucher-info-row"><span>Digunakan</span><span>${v.used}/${v.limit}</span></div>
      <div class="voucher-info-row"><span>Status</span><span>${v.isActive&&new Date(v.expiry)>=new Date()&&v.used<v.limit?'<span class="badge badge-green">Aktif</span>':'<span class="badge badge-red">Nonaktif</span>'}</span></div>
      <div class="voucher-actions">
        <button class="btn btn-sm btn-secondary" style="flex:1" onclick="toggleVoucher('${v.id}')">${v.isActive?'Nonaktifkan':'Aktifkan'}</button>
        <button class="btn btn-sm btn-secondary" onclick="editVoucher('${v.id}')"><i class="fa fa-edit"></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteVoucher('${v.id}')"><i class="fa fa-trash"></i></button>
      </div>
    </div>
  </div>`).join('');
}

function renderAdminOrders() {
  const tbody = document.getElementById('adminOrderTable');
  tbody.innerHTML = state.orders.length === 0 ? '<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--muted)">Belum ada pesanan</td></tr>' :
    state.orders.slice().reverse().map(o => {
      const statusMap = { pending:['pending','Menunggu'], processing:['pending','Diproses'], shipped:['success','Dikirim'], done:['success','Selesai'], cancelled:['cancelled','Dibatalkan'] };
      const [sc, sl] = statusMap[o.status] || ['pending','Pending'];
      return `<tr><td><span style="font-family:Syne,sans-serif;font-weight:700;font-size:13px">${o.id}</span></td>
        <td><div class="td-name">${o.userName}</div><div class="td-cat">${o.userEmail}</div></td>
        <td>${o.items.map(i=>`${i.emoji||'📦'}${i.name}`).slice(0,2).join(', ')}${o.items.length>2?'...':''}</td>
        <td style="font-weight:700">${formatRp(o.total)}</td>
        <td><div class="order-status"><div class="order-status-dot ${sc}"></div>${sl}</div></td>
        <td style="color:var(--muted);font-size:13px">${new Date(o.createdAt).toLocaleDateString('id-ID')}</td>
      </tr>`;
    }).join('');
}

function renderAdminUsers() {
  const q = (document.getElementById('searchUser')?.value||'').toLowerCase();
  const tbody = document.getElementById('adminUserTable');
  const filtered = state.users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  tbody.innerHTML = filtered.length === 0 ? '<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--muted)">Tidak ada pengguna</td></tr>' :
    filtered.map(u => `<tr>
      <td><div class="td-product"><div class="td-img" style="background:rgba(232,82,26,.15);color:var(--accent);font-weight:700">${u.name.charAt(0).toUpperCase()}</div><div class="td-name">${u.name}</div></div></td>
      <td>${u.email}</td>
      <td>${u.status==='banned'?'<span class="badge badge-red">Diblokir</span>':'<span class="badge badge-green">Aktif</span>'}</td>
      <td>${(u.orders||[]).length} pesanan</td>
      <td style="color:var(--muted);font-size:13px">${new Date(u.createdAt).toLocaleDateString('id-ID')}</td>
      <td><div class="td-actions">
        ${u.status==='banned'?`<button class="btn btn-sm btn-success" onclick="unbanUser('${u.id}')">Aktifkan</button>`:`<button class="btn btn-sm btn-danger" onclick="banUser('${u.id}')">Blokir</button>`}
        <button class="btn btn-sm btn-danger" onclick="deleteUser('${u.id}')"><i class="fa fa-trash"></i></button>
      </div></td>
    </tr>`).join('');
}

function renderPendingAdmins() {
  const el = document.getElementById('pendingAdminList');
  el.innerHTML = state.pendingAdmins.length === 0 ?
    '<p style="color:var(--muted);text-align:center;padding:32px">Tidak ada permintaan admin yang pending.</p>' :
    state.pendingAdmins.map(a => `<div class="pending-card">
      <div class="pending-info">
        <div class="pending-avatar"><i class="fa fa-user-tie"></i></div>
        <div>
          <div class="pending-name">${a.name}</div>
          <div class="pending-email">${a.email}</div>
          ${a.reason?`<div style="color:var(--muted);font-size:12px;margin-top:4px">${a.reason}</div>`:''}
          <div style="color:var(--muted);font-size:11px;margin-top:4px">${new Date(a.requestedAt).toLocaleDateString('id-ID')}</div>
        </div>
      </div>
      <div class="pending-actions">
        <button class="btn btn-sm btn-success" onclick="approveAdmin('${a.id}')"><i class="fa fa-check"></i> Setujui</button>
        <button class="btn btn-sm btn-danger" onclick="rejectAdmin('${a.id}')"><i class="fa fa-times"></i> Tolak</button>
      </div>
    </div>`).join('');
}

// ===== PRODUCT CRUD =====
function openProductForm(pid) {
  ['pName','pCategory','pPrice','pDiscount','pStock','pEmoji','pDesc'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  ['pIsNew','pIsFeatured','pIsHot'].forEach(id => { const el=document.getElementById(id); if(el) el.checked=false; });
  document.getElementById('editProductId').value = '';
  document.getElementById('productFormTitle').textContent = 'Tambah Produk';
  openModal('productFormModal');
}

function editProduct(pid) {
  const p = state.products.find(x => x.id === pid);
  if (!p) return;
  document.getElementById('editProductId').value = pid;
  document.getElementById('pName').value = p.name;
  document.getElementById('pCategory').value = p.category;
  document.getElementById('pPrice').value = p.price;
  document.getElementById('pDiscount').value = p.discount || 0;
  document.getElementById('pStock').value = p.stock;
  document.getElementById('pEmoji').value = p.emoji || '';
  document.getElementById('pDesc').value = p.desc || '';
  document.getElementById('pIsNew').checked = p.isNew;
  document.getElementById('pIsFeatured').checked = p.isFeatured;
  document.getElementById('pIsHot').checked = p.isHot;
  document.getElementById('productFormTitle').textContent = 'Edit Produk';
  openModal('productFormModal');
}

function saveProduct() {
  const name = document.getElementById('pName').value.trim();
  const category = document.getElementById('pCategory').value;
  const price = parseInt(document.getElementById('pPrice').value);
  const discount = parseInt(document.getElementById('pDiscount').value) || 0;
  const stock = parseInt(document.getElementById('pStock').value);
  const emoji = document.getElementById('pEmoji').value.trim();
  const desc = document.getElementById('pDesc').value.trim();
  const isNew = document.getElementById('pIsNew').checked;
  const isFeatured = document.getElementById('pIsFeatured').checked;
  const isHot = document.getElementById('pIsHot').checked;
  if (!name || !category || !price || stock===undefined||isNaN(stock)) return toast('Isi semua field wajib!', 'error');
  const existingId = document.getElementById('editProductId').value;
  if (existingId) {
    const idx = state.products.findIndex(p => p.id === existingId);
    if (idx >= 0) state.products[idx] = { ...state.products[idx], name, category, price, discount, stock, emoji, desc, isNew, isFeatured, isHot };
    toast('Produk berhasil diperbarui!', 'success');
  } else {
    state.products.push({ id: 'p'+Date.now(), name, category, price, discount, stock, emoji, desc, isNew, isFeatured, isHot, rating: 4.5, sold: 0 });
    toast('Produk baru berhasil ditambahkan!', 'success');
  }
  saveProducts();
  closeModal('productFormModal');
  renderAdminProducts();
  renderProducts();
  renderFilters();
  renderDashboard();
}

function deleteProduct(pid) {
  if (!confirm('Yakin hapus produk ini?')) return;
  state.products = state.products.filter(p => p.id !== pid);
  saveProducts();
  renderAdminProducts();
  renderProducts();
  renderFilters();
  renderDashboard();
  toast('Produk dihapus!', 'info');
}

// ===== VOUCHER CRUD =====
function openVoucherForm() {
  ['vCode','vValue','vMinOrder','vLimit','vExpiry'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('editVoucherId').value = '';
  document.getElementById('voucherFormTitle').textContent = 'Buat Voucher';
  openModal('voucherFormModal');
}

function editVoucher(vid) {
  const v = state.vouchers.find(x => x.id === vid);
  if (!v) return;
  document.getElementById('editVoucherId').value = vid;
  document.getElementById('vCode').value = v.code;
  document.getElementById('vType').value = v.type;
  document.getElementById('vValue').value = v.value;
  document.getElementById('vMinOrder').value = v.minOrder || 0;
  document.getElementById('vLimit').value = v.limit;
  document.getElementById('vExpiry').value = v.expiry;
  document.getElementById('voucherFormTitle').textContent = 'Edit Voucher';
  openModal('voucherFormModal');
}

function saveVoucher() {
  const code = document.getElementById('vCode').value.trim().toUpperCase();
  const type = document.getElementById('vType').value;
  const value = parseFloat(document.getElementById('vValue').value);
  const minOrder = parseInt(document.getElementById('vMinOrder').value) || 0;
  const limit = parseInt(document.getElementById('vLimit').value) || 100;
  const expiry = document.getElementById('vExpiry').value;
  if (!code || !value || !expiry) return toast('Isi semua field wajib!', 'error');
  const existingId = document.getElementById('editVoucherId').value;
  if (existingId) {
    const idx = state.vouchers.findIndex(v => v.id === existingId);
    if (idx >= 0) state.vouchers[idx] = { ...state.vouchers[idx], code, type, value, minOrder, limit, expiry };
    toast('Voucher diperbarui!', 'success');
  } else {
    if (state.vouchers.find(v => v.code === code)) return toast('Kode voucher sudah ada!', 'error');
    state.vouchers.push({ id: 'v'+Date.now(), code, type, value, minOrder, limit, used: 0, expiry, isActive: true });
    toast('Voucher baru dibuat!', 'success');
  }
  saveVouchers();
  closeModal('voucherFormModal');
  renderAdminVouchers();
}

function toggleVoucher(vid) {
  const idx = state.vouchers.findIndex(v => v.id === vid);
  if (idx >= 0) { state.vouchers[idx].isActive = !state.vouchers[idx].isActive; saveVouchers(); renderAdminVouchers(); toast('Status voucher diubah!', 'info'); }
}

function deleteVoucher(vid) {
  if (!confirm('Yakin hapus voucher ini?')) return;
  state.vouchers = state.vouchers.filter(v => v.id !== vid);
  saveVouchers();
  renderAdminVouchers();
  toast('Voucher dihapus!', 'info');
}

// ===== USER MANAGEMENT =====
function banUser(uid) {
  if (!confirm('Yakin blokir pengguna ini?')) return;
  const idx = state.users.findIndex(u => u.id === uid);
  if (idx >= 0) { state.users[idx].status = 'banned'; saveUsers(); renderAdminUsers(); toast('Pengguna diblokir!', 'info'); }
}
function unbanUser(uid) {
  const idx = state.users.findIndex(u => u.id === uid);
  if (idx >= 0) { state.users[idx].status = 'active'; saveUsers(); renderAdminUsers(); toast('Pengguna diaktifkan!', 'success'); }
}
function deleteUser(uid) {
  if (!confirm('Yakin hapus pengguna ini? Semua data akan hilang!')) return;
  state.users = state.users.filter(u => u.id !== uid);
  saveUsers();
  renderAdminUsers();
  renderDashboard();
  toast('Pengguna dihapus!', 'info');
}

// ===== PENDING ADMIN MANAGEMENT =====
function approveAdmin(aid) {
  const pa = state.pendingAdmins.find(a => a.id === aid);
  if (!pa) return;
  state.admins.push({ id: 'a'+Date.now(), name: pa.name, email: pa.email, password: pa.password, role: 'admin', status: 'active', createdAt: new Date().toISOString() });
  state.pendingAdmins = state.pendingAdmins.filter(a => a.id !== aid);
  saveAdmins(); savePendingAdmins();
  renderPendingAdmins();
  renderDashboard();
  toast(`Admin ${pa.name} disetujui!`, 'success');
}

function rejectAdmin(aid) {
  if (!confirm('Tolak permintaan admin ini?')) return;
  state.pendingAdmins = state.pendingAdmins.filter(a => a.id !== aid);
  savePendingAdmins();
  renderPendingAdmins();
  renderDashboard();
  toast('Permintaan admin ditolak!', 'info');
}

// ===== UTILS =====
function formatRp(n) {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}

function scrollToProducts() {
  document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
}
function scrollToVoucher() {
  document.getElementById('voucherSection')?.scrollIntoView({ behavior: 'smooth' });
}

// ===== MARQUEE =====
function initMarquee() {
  const items = [
    '🚚 Gratis Ongkir Min. Rp 150.000', '⚡ Flash Sale Setiap Hari', '🎁 Diskon Hingga 50%',
    '🔒 Transaksi 100% Aman', '📱 App IGS Store Tersedia', '⭐ Rating 4.9 dari 10.000+ Pembeli',
    '🎧 Headphones Premium', '👟 Sneakers Original', '💄 Beauty Products',
  ];
  const html = [...items, ...items].map(i => `<div class="marquee-item"><i class="fa fa-circle" style="font-size:4px"></i>${i}</div>`).join('');
  document.getElementById('marqueeEl').innerHTML = html;
}

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  initData();
  initMarquee();
  renderProducts();
  renderFilters();
  if (state.currentAdmin) {
    document.getElementById('adminLoginBtn').style.display = 'none';
  }
});