// Sole Craft Shared Utilities & Global State

// Initialize mock data in LocalStorage if not present
const INITIAL_SERVICES = [
  { id: 'sole-replacement', name: 'Sole Replacement', desc: 'Premium Vibram or leather outsole replacement to restore structural integrity and traction.', price: 599, time: '2-3 Days', icon: 'bi-layer-backward', image: 'assets/images/img1.jpg' },
  { id: 'heel-repair', name: 'Heel Repair', desc: 'Fix worn out, broken, or unbalanced heels on formal shoes and boots.', price: 299, time: '1 Day', icon: 'bi-bounding-box', image: 'assets/images/img2.jpg' },
  { id: 'leather-restoration', name: 'Leather Restoration', desc: 'Rehydrate, color restore, and repair scratches on premium leather footwear.', price: 1199, time: '4-5 Days', icon: 'bi-brush', image: 'assets/images/img3.jpg' },
  { id: 'shoe-stitching', name: 'Shoe Stitching', desc: 'Industrial strength stitching for soles, uppers, and decorative elements.', price: 199, time: '1 Day', icon: 'bi-scissors', image: 'assets/images/service4.jpg' },
  { id: 'shoe-polishing', name: 'Shoe Polishing', desc: 'Premium multi-coat wax and cream polish for an exquisite mirror shine.', price: 149, time: '1-2 Hours', icon: 'bi-brightness-high', image: 'assets/images/service5.jpg' },
  { id: 'deep-cleaning', name: 'Deep Cleaning', desc: 'Full sterilization, stain removal, and conditioning inside and out.', price: 399, time: '2 Days', icon: 'bi-droplet-half', image: 'assets/images/service6.jpg' },
  { id: 'shoe-stretching', name: 'Shoe Stretching', desc: 'Professional widening or lengthening of tight leather shoes and boots.', price: 249, time: '1-2 Days', icon: 'bi-arrows-angle-expand', image: 'assets/images/service7.jpg' },
  { id: 'sneaker-restoration', name: 'Sneaker Restoration', desc: 'Yellowed sole un-whitening, deep mesh cleaning, and fabric repair.', price: 999, time: '3 Days', icon: 'bi-heart', image: 'assets/images/img4.jpg' },
  { id: 'color-restoration', name: 'Color Restoration', desc: 'Dyeing, color matching, and custom color treatments for worn footwear.', price: 1299, time: '4 Days', icon: 'bi-palette', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop' },
  { id: 'custom-shoe-repair', name: 'Custom Shoe Repair', desc: 'Bespoke customization, hardware changes, and non-standard reconstructions.', price: 1499, time: '5-7 Days', icon: 'bi-gem', image: 'assets/images/service10.jpg' },
  { id: 'odor-removal', name: 'Odor & Sanitization', desc: 'Deep ozone sterilization, advanced antimicrobial wash, and luxury scent infusion.', price: 399, time: '1 Day', icon: 'bi-wind', image: 'assets/images/service11.jpg' },
  { id: 'bespoke-dyeing', name: 'Bespoke Custom Dyeing', desc: 'Hand-painted leather patina finishes, professional color restoration, and detailing.', price: 1999, time: '5 Days', icon: 'bi-magic', image: 'assets/images/service12.jpg' }
];

const INITIAL_BLOGS = [
  { id: 1, title: '5 Essential Leather Shoe Care Tips for Winter', category: 'Leather Care', author: 'Arthur Cobble', date: 'Aug 12, 2026', readTime: '5 min read', desc: 'Winter salt, slush and snow can ruin premium leather. Read our comprehensive guide on protecting your favorite formal shoes.', image:'assets/images/img9.jpg', views: 1240 },
  { id: 2, title: 'The Art of Welting: Goodyear Welt vs Blake Stitch', category: 'Repair Tips', author: 'Jonathan Sole', date: 'Jul 28, 2026', readTime: '8 min read', desc: 'Understand the difference between different shoe construction methods and how they impact repairability.', image: 'assets/images/img10.jpg', views: 890 },
  { id: 3, title: 'How to Clean Suede Sneakers Without Damage', category: 'Sneaker Care', author: 'Mark Clean', date: 'Jun 15, 2026', readTime: '6 min read', desc: 'Suede is notoriously sensitive to water. Learn the dry-brushing and eraser techniques experts use to clean suede shoes safely.', image: 'assets/images/img11.jpg', views: 2450 },
  { id: 4, title: 'The Ultimate Guide to Vibram Rubber Outsoles', category: 'Repair Tips', author: 'Jonathan Sole', date: 'May 10, 2026', readTime: '7 min read', desc: 'Why Vibram soles offer superior durability and grip for custom boots, hiking footwear, and premium dress shoes.', image:'assets/images/img12.jpg', views: 710 },
  { id: 5, title: 'Removing Toughest Salt Stains from Leather Boots', category: 'Leather Care', author: 'Arthur Cobble', date: 'Apr 21, 2026', readTime: '4 min read', desc: 'Step-by-step methods using organic white vinegar dilutions to draw out deep calcium salt stains from dress leathers.', image: 'assets/images/img13.jpg', views: 980 },
  { id: 6, title: 'Why Craftsmanship Matters in the Fast Fashion Era', category: 'Repair Tips', author: 'Arthur Cobble', date: 'Mar 15, 2026', readTime: '6 min read', desc: 'Exploring the ecological and comfort benefits of choosing repairable footwear over cheap disposable alternatives.', image: 'assets/images/img14.jpg', views: 1100 },
  { id: 7, title: 'Reshaping and Stretching Tight Leather Shoes', category: 'Repair Tips', author: 'Mark Clean', date: 'Feb 12, 2026', readTime: '5 min read', desc: 'How industrial shoe stretchers combined with conditioning oils safely expand footwear widths up to one full size.', image: 'assets/images/img15.jpg', views: 630 },
  { id: 8, title: 'Patent Leather Care: Shine and Scratch Correction', category: 'Leather Care', author: 'Arthur Cobble', date: 'Jan 08, 2026', readTime: '4 min read', desc: 'Understanding patent leather coatings and specialized procedures to remove haze, fingerprints, and shallow marks.', image: 'assets/images/img16.jpg', views: 820 },
  { id: 9, title: 'History of Oxford Shoes: Classic & Modern Designs', category: 'Repair Tips', author: 'Jonathan Sole', date: 'Dec 05, 2025', readTime: '8 min read', desc: 'From the halls of Oxford University to modern business wear. A deep dive into Oxford shoe designs, brogues, and wingtips.', image: 'assets/images/img17.jpg', views: 1540 }
];

const INITIAL_BOOKINGS = [
  { id: 'SC-9871', customerName: 'Rohan Sharma', email: 'rohan@example.com', service: 'Sole Replacement', shoeType: 'Boots', date: '2026-08-20', time: '11:00 AM', price: 599, status: 'Confirmed', notes: 'Double stitched if possible.' },
  { id: 'SC-4235', customerName: 'Jane Smith', email: 'jane@example.com', service: 'Leather Restoration', shoeType: 'Formal Shoes', date: '2026-08-22', time: '02:30 PM', price: 1199, status: 'Pending', notes: 'A bit worn out near toe cap.' },
  { id: 'SC-1049', customerName: 'Alex Mercer', email: 'alex@example.com', service: 'Sneaker Restoration', shoeType: 'Sneakers', date: '2026-08-15', time: '10:00 AM', price: 999, status: 'Completed', notes: 'Remove yellow stains.' }
];

const INITIAL_MESSAGES = [
  { id: 1, name: 'Vikram Singh', email: 'vikram@example.com', subject: 'Custom Gold Buckle Replacement', message: 'Hello, I have an expensive pair of luxury loafers that need new gold buckles. Can you source them?', status: 'Unread', date: '2026-08-16' },
  { id: 2, name: 'Sarah Connor', email: 'sarah@example.com', subject: 'Corporate Shoe Polish Contract', message: 'Do you offer bulk discounts for corporate employee shoe care programs?', status: 'Read', date: '2026-08-14' }
];

const INITIAL_USERS = [
  { email: 'user@example.com', name: 'John Doe', password: 'password', phone: '9876543210', date: '2026-07-01' },
  { email: 'admin@example.com', name: 'Admin Sole Craft', password: 'admin', phone: '9998887776', date: '2026-06-15' }
];

function initDatabase() {
  const currentServices = JSON.parse(localStorage.getItem('sc_services')) || [];
  if (currentServices.length < 12) {
    localStorage.setItem('sc_services', JSON.stringify(INITIAL_SERVICES));
  }
  
  const currentBlogs = JSON.parse(localStorage.getItem('sc_blogs')) || [];
  if (currentBlogs.length < 9) {
    localStorage.setItem('sc_blogs', JSON.stringify(INITIAL_BLOGS));
  }

  if (!localStorage.getItem('sc_bookings')) {
    localStorage.setItem('sc_bookings', JSON.stringify(INITIAL_BOOKINGS));
  }
  if (!localStorage.getItem('sc_messages')) {
    localStorage.setItem('sc_messages', JSON.stringify(INITIAL_MESSAGES));
  }
  if (!localStorage.getItem('sc_users')) {
    localStorage.setItem('sc_users', JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem('sc_favorites')) {
    localStorage.setItem('sc_favorites', JSON.stringify([]));
  }
}

initDatabase();

// Page Loader Control
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
  
  // Page entry animation triggers
  const fadeElements = document.querySelectorAll('.page-transition');
  fadeElements.forEach((el, idx) => {
    el.style.animationDelay = `${idx * 0.1}s`;
  });
});

// Sticky Header & Active Navigation link
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('glass-panel', 'py-3');
        header.classList.remove('py-5', 'bg-transparent');
      } else {
        header.classList.remove('glass-panel', 'py-3');
        header.classList.add('py-5', 'bg-transparent');
      }
    });
  }

  // Highlight current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('text-gold', 'font-semibold');
      link.classList.remove('text-text-primary');
    }
  });

  // Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });
  }

  // Theme Management
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('sc_theme') || 'dark'; // Defaulting to premium dark theme
  
  if (storedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('sc_theme', currentTheme);
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    const isDark = document.documentElement.classList.contains('dark');
    themeToggle.innerHTML = isDark 
      ? '<i class="bi bi-sun-fill text-xl text-[#E6C387]"></i>' 
      : '<i class="bi bi-moon-fill text-xl text-[#8C6239]"></i>';
  }

  // RTL/Language Management
  const langToggle = document.getElementById('lang-toggle');
  const storedLang = localStorage.getItem('sc_lang') || 'en';
  
  applyLanguage(storedLang);

  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const nextLang = document.documentElement.getAttribute('dir') === 'rtl' ? 'en' : 'ar';
      localStorage.setItem('sc_lang', nextLang);
      applyLanguage(nextLang);
    });
  }

  function applyLanguage(lang) {
    const langText = document.getElementById('lang-text');
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
      if (langText) langText.innerText = 'LTR';
      translatePageToRtl();
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
      if (langText) langText.innerText = 'RTL';
      translatePageToLtr();
    }
  }

  function translatePageToRtl() {
    // Basic structural flips if needed
  }
  function translatePageToLtr() {}

  // Favorites (Heart Toggle)
  document.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.fav-toggle-btn');
    if (favBtn) {
      e.preventDefault();
      const serviceId = favBtn.dataset.serviceId;
      toggleFavorite(serviceId, favBtn);
    }
  });

  // Global Search Modal Toggle
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchModal.classList.remove('hidden');
      searchModal.classList.add('flex');
      searchInput.focus();
    });
  }

  if (searchClose && searchModal) {
    searchClose.addEventListener('click', () => {
      searchModal.classList.remove('flex');
      searchModal.classList.add('hidden');
    });
  }

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        searchResults.innerHTML = '';
        return;
      }
      
      let html = '';
      
      // Search Services
      const services = JSON.parse(localStorage.getItem('sc_services')) || [];
      const matchingServices = services.filter(s => s.name.toLowerCase().includes(query) || s.desc.toLowerCase().includes(query));
      if (matchingServices.length > 0) {
        html += `<h4 class="text-[#8C6239] dark:text-[#E6C387] font-serif border-b border-gray-700 pb-1 mb-2 mt-4 text-sm font-semibold">Services</h4>`;
        matchingServices.forEach(s => {
          html += `
            <a href="service-details.html?service=${s.id}" class="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition duration-200">
              <div>
                <div class="font-medium text-sm text-text-primary">${s.name}</div>
                <div class="text-xs text-gray-500 line-clamp-1">${s.desc}</div>
              </div>
              <span class="text-xs font-semibold text-gold">₹${s.price}+</span>
            </a>
          `;
        });
      }

      // Search Blogs
      const blogs = JSON.parse(localStorage.getItem('sc_blogs')) || [];
      const matchingBlogs = blogs.filter(b => b.title.toLowerCase().includes(query) || b.desc.toLowerCase().includes(query));
      if (matchingBlogs.length > 0) {
        html += `<h4 class="text-[#8C6239] dark:text-[#E6C387] font-serif border-b border-gray-700 pb-1 mb-2 mt-4 text-sm font-semibold">Blog Posts</h4>`;
        matchingBlogs.forEach(b => {
          html += `
            <a href="blog-details.html?post=${b.id}" class="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition duration-200">
              <div>
                <div class="font-medium text-sm text-text-primary">${b.title}</div>
                <div class="text-xs text-gray-500 line-clamp-1">${b.desc}</div>
              </div>
              <span class="text-xs text-gray-400">${b.category}</span>
            </a>
          `;
        });
      }

      if (!html) {
        html = `<div class="text-center py-6 text-gray-500 text-sm">No results found for "${query}"</div>`;
      }
      
      searchResults.innerHTML = html;
    });
  }

  // Magnetic Button effect simulation
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const bound = btn.getBoundingClientRect();
      const x = e.clientX - bound.left - bound.width / 2;
      const y = e.clientY - bound.top - bound.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
});

// Toast System
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `glass-panel flex items-center gap-3 px-5 py-3 rounded-lg shadow-xl translate-y-5 opacity-0 transition duration-300 transform border-l-4 ${
    type === 'success' ? 'border-green-500' : type === 'error' ? 'border-red-500' : 'border-gold'
  }`;
  
  const icon = type === 'success' ? 'bi-check-circle-fill text-green-500' : type === 'error' ? 'bi-exclamation-triangle-fill text-red-500' : 'bi-info-circle-fill text-gold';
  
  toast.innerHTML = `
    <i class="bi ${icon} text-lg"></i>
    <span class="text-sm font-medium text-text-primary">${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Animate toast entry
  setTimeout(() => {
    toast.classList.remove('translate-y-5', 'opacity-0');
  }, 50);

  // Remove toast
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-[-10px]');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm';
  document.body.appendChild(container);
  return container;
}

// Favorite service handler
function toggleFavorite(serviceId, btnEl) {
  let favs = JSON.parse(localStorage.getItem('sc_favorites')) || [];
  const index = favs.indexOf(serviceId);
  if (index === -1) {
    favs.push(serviceId);
    if (btnEl) btnEl.innerHTML = '<i class="bi bi-heart-fill text-red-500"></i>';
    showToast('Added to Saved Services!', 'success');
  } else {
    favs.splice(index, 1);
    if (btnEl) btnEl.innerHTML = '<i class="bi bi-heart"></i>';
    showToast('Removed from Saved Services.', 'info');
  }
  localStorage.setItem('sc_favorites', JSON.stringify(favs));
}

// Helper to check login status
function getLoggedInUser() {
  const email = localStorage.getItem('sc_logged_in_user');
  if (!email) return null;
  const users = JSON.parse(localStorage.getItem('sc_users')) || [];
  return users.find(u => u.email === email);
}

// Global Nav Search Bar Element creation helper
function injectSearchModal() {
  if (document.getElementById('search-modal')) return;
  const modalHtml = `
    <div id="search-modal" class="hidden fixed inset-0 z-[9999] bg-black bg-opacity-70 backdrop-blur-md items-center justify-center p-4">
      <div class="glass-panel w-full max-w-lg rounded-xl overflow-hidden shadow-2xl p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-serif font-bold text-text-primary">Search Sole Craft</h3>
          <button id="search-close" class="text-gray-500 hover:text-text-primary"><i class="bi bi-x-lg text-xl"></i></button>
        </div>
        <div class="relative">
          <input type="text" id="search-input" placeholder="Type services, blog articles..." class="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-text-primary focus:outline-none focus:border-gold transition-all text-sm">
          <i class="bi bi-search absolute right-4 top-3 text-gray-500"></i>
        </div>
        <div id="search-results" class="mt-4 max-h-60 overflow-y-auto space-y-1"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}
injectSearchModal();
