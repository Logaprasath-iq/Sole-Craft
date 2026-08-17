// Sole Craft Admin Dashboard Operations

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Admin metrics if elements exist
  initAdminDashboard();
  renderBookingsTable();
  renderServicesAdminTable();
  renderUsersAdminTable();
  renderMessagesAdminInbox();
  
  // Modals event listeners
  setupModals();
});

// Update metrics and charts on admin home
function initAdminDashboard() {
  const totalBEl = document.getElementById('admin-stat-total-bookings');
  if (!totalBEl) return; // Not on admin dashboard main page

  const bookings = JSON.parse(localStorage.getItem('sc_bookings')) || [];
  const users = JSON.parse(localStorage.getItem('sc_users')) || [];
  
  // Counts
  const totalBookings = bookings.length;
  const pendingRepairs = bookings.filter(b => b.status === 'Pending').length;
  const completedRepairs = bookings.filter(b => b.status === 'Completed').length;
  
  // Calculate Revenue (Sum price of Confirmed and Completed)
  const revenue = bookings
    .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
    .reduce((sum, b) => sum + parseInt(b.price || 0), 0);

  // Set values
  totalBEl.innerText = totalBookings;
  document.getElementById('admin-stat-pending').innerText = pendingRepairs;
  document.getElementById('admin-stat-completed').innerText = completedRepairs;
  document.getElementById('admin-stat-revenue').innerText = `₹${revenue.toLocaleString('en-IN')}`;
  document.getElementById('admin-stat-customers').innerText = users.length;

  // Render Charts
  drawAdminCharts(bookings);
}

// Draw custom canvas charts
function drawAdminCharts(bookings) {
  const chart1 = document.getElementById('chart-bookings-monthly');
  const chart2 = document.getElementById('chart-revenue-popular');
  
  if (chart1) {
    const ctx = chart1.getContext('2d');
    ctx.clearRect(0, 0, chart1.width, chart1.height);
    
    // Draw Bar Chart representing monthly volume
    const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const counts = [12, 18, 15, 22, 28, bookings.length + 5];
    const maxVal = Math.max(...counts) + 5;
    
    ctx.strokeStyle = '#333';
    ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#FAF7F0' : '#1C1C1C';
    ctx.font = '10px sans-serif';
    
    const barWidth = 35;
    const spacing = 15;
    const startX = 40;
    const bottomY = chart1.height - 30;
    
    // Draw grid lines and labels
    for(let i=0; i<months.length; i++) {
      const x = startX + i * (barWidth + spacing);
      const val = counts[i];
      const barHeight = (val / maxVal) * (chart1.height - 60);
      
      // Draw bar
      const gradient = ctx.createLinearGradient(x, bottomY - barHeight, x, bottomY);
      gradient.addColorStop(0, '#D4AF37'); // Gold
      gradient.addColorStop(1, '#8C6239'); // Cognac
      ctx.fillStyle = gradient;
      
      // Rounded bar look
      ctx.fillRect(x, bottomY - barHeight, barWidth, barHeight);
      
      // Draw Value text
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#FAF7F0' : '#1C1C1C';
      ctx.fillText(val, x + barWidth/2 - 5, bottomY - barHeight - 5);
      
      // Draw Month text
      ctx.fillText(months[i], x + barWidth/2 - 10, bottomY + 15);
    }
  }

  if (chart2) {
    const ctx = chart2.getContext('2d');
    ctx.clearRect(0, 0, chart2.width, chart2.height);
    
    // Draw Line Chart representing revenue trend
    const points = [14000, 18500, 22000, 31000, 29000, 42000];
    const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const maxVal = Math.max(...points) + 5000;
    
    const bottomY = chart2.height - 30;
    const startX = 45;
    const spacing = 45;
    
    ctx.beginPath();
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    
    for (let i = 0; i < points.length; i++) {
      const x = startX + i * spacing;
      const y = bottomY - (points[i] / maxVal) * (chart2.height - 60);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    
    // Draw circles and texts
    for (let i = 0; i < points.length; i++) {
      const x = startX + i * spacing;
      const y = bottomY - (points[i] / maxVal) * (chart2.height - 60);
      
      ctx.fillStyle = '#8C6239';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#FAF7F0' : '#1C1C1C';
      ctx.font = '9px sans-serif';
      ctx.fillText(`₹${Math.round(points[i]/1000)}k`, x - 10, y - 10);
      ctx.fillText(months[i], x - 8, bottomY + 15);
    }
  }
}

// Render Bookings list table
function renderBookingsTable() {
  const tbody = document.getElementById('admin-bookings-tbody');
  if (!tbody) return;

  const bookings = JSON.parse(localStorage.getItem('sc_bookings')) || [];
  
  tbody.innerHTML = '';
  if (bookings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-gray-500">No bookings available.</td></tr>`;
    return;
  }

  bookings.forEach(b => {
    const statusColor = b.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : b.status === 'Confirmed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    tbody.innerHTML += `
      <tr class="border-b border-gray-200 dark:border-gray-800 text-sm">
        <td class="py-3 px-4 font-mono text-xs">${b.id}</td>
        <td class="py-3 px-4 font-medium">${b.customerName}</td>
        <td class="py-3 px-4">${b.service}</td>
        <td class="py-3 px-4">${b.date}</td>
        <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor}">${b.status}</span></td>
        <td class="py-3 px-4 font-semibold">₹${b.price}</td>
        <td class="py-3 px-4">
          <div class="flex gap-2">
            <button onclick="changeBookingStatus('${b.id}', 'Confirmed')" class="text-blue-500 hover:text-blue-700 title="Confirm"><i class="bi bi-check-circle"></i></button>
            <button onclick="changeBookingStatus('${b.id}', 'Completed')" class="text-green-500 hover:text-green-700" title="Complete"><i class="bi bi-check2-all"></i></button>
            <button onclick="deleteBookingRecord('${b.id}')" class="text-red-500 hover:text-red-700" title="Delete"><i class="bi bi-trash"></i></button>
          </div>
        </td>
      </tr>
    `;
  });
}

// Booking actions helpers global
window.changeBookingStatus = function(id, newStatus) {
  let bookings = JSON.parse(localStorage.getItem('sc_bookings')) || [];
  const idx = bookings.findIndex(b => b.id === id);
  if (idx !== -1) {
    bookings[idx].status = newStatus;
    localStorage.setItem('sc_bookings', JSON.stringify(bookings));
    showToast(`Booking ${id} set to ${newStatus}!`, 'success');
    renderBookingsTable();
    initAdminDashboard();
  }
};

window.deleteBookingRecord = function(id) {
  if (confirm(`Are you sure you want to delete Booking ${id}?`)) {
    let bookings = JSON.parse(localStorage.getItem('sc_bookings')) || [];
    bookings = bookings.filter(b => b.id !== id);
    localStorage.setItem('sc_bookings', JSON.stringify(bookings));
    showToast(`Booking ${id} deleted.`, 'info');
    renderBookingsTable();
    initAdminDashboard();
  }
};

// Render Services admin table
function renderServicesAdminTable() {
  const tbody = document.getElementById('admin-services-tbody');
  if (!tbody) return;

  const services = JSON.parse(localStorage.getItem('sc_services')) || [];
  tbody.innerHTML = '';

  services.forEach(s => {
    tbody.innerHTML += `
      <tr class="border-b border-gray-200 dark:border-gray-800 text-sm">
        <td class="py-3 px-4"><i class="bi ${s.icon} text-lg text-gold mr-2"></i> ${s.name}</td>
        <td class="py-3 px-4 line-clamp-1 max-w-[200px]">${s.desc}</td>
        <td class="py-3 px-4">${s.time}</td>
        <td class="py-3 px-4 font-semibold">₹${s.price}</td>
        <td class="py-3 px-4">
          <div class="flex gap-2">
            <button onclick="editServiceModal('${s.id}')" class="text-blue-500 hover:text-blue-700"><i class="bi bi-pencil"></i></button>
            <button onclick="deleteServiceRecord('${s.id}')" class="text-red-500 hover:text-red-700"><i class="bi bi-trash"></i></button>
          </div>
        </td>
      </tr>
    `;
  });
}

// Add/Edit Service Modals helpers
window.editServiceModal = function(id) {
  const services = JSON.parse(localStorage.getItem('sc_services')) || [];
  const s = services.find(x => x.id === id);
  if (!s) return;

  document.getElementById('service-modal-title').innerText = 'Edit Service';
  document.getElementById('service-id-hidden').value = s.id;
  document.getElementById('service-name-input').value = s.name;
  document.getElementById('service-desc-input').value = s.desc;
  document.getElementById('service-price-input').value = s.price;
  document.getElementById('service-time-input').value = s.time;
  document.getElementById('service-icon-input').value = s.icon;
  
  openModal('service-crud-modal');
};

window.deleteServiceRecord = function(id) {
  if(confirm('Are you sure you want to delete this service?')) {
    let services = JSON.parse(localStorage.getItem('sc_services')) || [];
    services = services.filter(x => x.id !== id);
    localStorage.setItem('sc_services', JSON.stringify(services));
    showToast('Service deleted.', 'info');
    renderServicesAdminTable();
  }
};

// Add Service Modal trigger
const addServiceBtn = document.getElementById('add-service-btn');
if (addServiceBtn) {
  addServiceBtn.addEventListener('click', () => {
    document.getElementById('service-modal-title').innerText = 'Add New Service';
    document.getElementById('service-id-hidden').value = '';
    document.getElementById('service-name-input').value = '';
    document.getElementById('service-desc-input').value = '';
    document.getElementById('service-price-input').value = '299';
    document.getElementById('service-time-input').value = '1-2 Days';
    document.getElementById('service-icon-input').value = 'bi-brush';
    openModal('service-crud-modal');
  });
}

// Save Service Form submit
const saveServiceForm = document.getElementById('service-crud-form');
if (saveServiceForm) {
  saveServiceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('service-id-hidden').value;
    const name = document.getElementById('service-name-input').value.trim();
    const desc = document.getElementById('service-desc-input').value.trim();
    const price = parseInt(document.getElementById('service-price-input').value);
    const time = document.getElementById('service-time-input').value.trim();
    const icon = document.getElementById('service-icon-input').value.trim();
    
    let services = JSON.parse(localStorage.getItem('sc_services')) || [];
    
    if (id) {
      // Edit
      const idx = services.findIndex(s => s.id === id);
      if (idx !== -1) {
        services[idx] = { ...services[idx], name, desc, price, time, icon };
        showToast('Service updated successfully!', 'success');
      }
    } else {
      // Add
      const newId = name.toLowerCase().replace(/\s+/g, '-');
      services.push({ id: newId, name, desc, price, time, icon, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop' });
      showToast('New Service added!', 'success');
    }
    
    localStorage.setItem('sc_services', JSON.stringify(services));
    closeModal('service-crud-modal');
    renderServicesAdminTable();
  });
}

// Render Users admin list
function renderUsersAdminTable() {
  const tbody = document.getElementById('admin-users-tbody');
  if (!tbody) return;

  const users = JSON.parse(localStorage.getItem('sc_users')) || [];
  tbody.innerHTML = '';

  users.forEach(u => {
    tbody.innerHTML += `
      <tr class="border-b border-gray-200 dark:border-gray-800 text-sm">
        <td class="py-3 px-4 font-medium">${u.name}</td>
        <td class="py-3 px-4">${u.email}</td>
        <td class="py-3 px-4">${u.phone}</td>
        <td class="py-3 px-4 text-gray-500">${u.date || '2026-08-01'}</td>
        <td class="py-3 px-4">
          <button onclick="deleteUserRecord('${u.email}')" class="text-red-500 hover:text-red-700"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `;
  });
}

window.deleteUserRecord = function(email) {
  if (confirm(`Are you sure you want to delete user ${email}?`)) {
    let users = JSON.parse(localStorage.getItem('sc_users')) || [];
    users = users.filter(u => u.email !== email);
    localStorage.setItem('sc_users', JSON.stringify(users));
    showToast('User account deleted.', 'info');
    renderUsersAdminTable();
    initAdminDashboard();
  }
};

// Render Messages Inbox
function renderMessagesAdminInbox() {
  const list = document.getElementById('admin-messages-list');
  if (!list) return;

  const msgs = JSON.parse(localStorage.getItem('sc_messages')) || [];
  list.innerHTML = '';

  if (msgs.length === 0) {
    list.innerHTML = `<div class="text-center py-6 text-gray-500 text-sm">Inbox is empty.</div>`;
    return;
  }

  msgs.forEach(m => {
    const isUnread = m.status === 'Unread';
    list.innerHTML += `
      <div onclick="openMessageDetail(${m.id})" class="p-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 cursor-pointer flex justify-between items-start ${isUnread ? 'bg-[#8C6239] bg-opacity-5 font-semibold' : ''}">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-sm text-text-primary">${m.name}</span>
            <span class="text-xs text-gray-500">${m.date}</span>
          </div>
          <div class="text-sm text-gold">${m.subject}</div>
          <div class="text-xs text-gray-500 line-clamp-1 mt-1">${m.message}</div>
        </div>
        ${isUnread ? '<span class="w-2.5 h-2.5 bg-gold rounded-full"></span>' : '<span class="text-xs text-green-500">Read</span>'}
      </div>
    `;
  });
}

// View Message details helper
window.openMessageDetail = function(id) {
  const msgs = JSON.parse(localStorage.getItem('sc_messages')) || [];
  const mIndex = msgs.findIndex(x => x.id === id);
  if (mIndex === -1) return;

  const m = msgs[mIndex];
  
  // Mark as read
  if (m.status === 'Unread') {
    msgs[mIndex].status = 'Read';
    localStorage.setItem('sc_messages', JSON.stringify(msgs));
    renderMessagesAdminInbox();
  }

  // Inject detail modal content
  document.getElementById('msg-detail-name').innerText = m.name;
  document.getElementById('msg-detail-email').innerText = m.email;
  document.getElementById('msg-detail-subject').innerText = m.subject;
  document.getElementById('msg-detail-body').innerText = m.message;
  document.getElementById('msg-id-hidden').value = m.id;
  
  openModal('message-detail-modal');
};

// Reply Message form
const replyMsgForm = document.getElementById('message-reply-form');
if (replyMsgForm) {
  replyMsgForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById('msg-id-hidden').value);
    const replyText = document.getElementById('msg-reply-input').value.trim();

    if (!replyText) {
      showToast('Please type a response.', 'error');
      return;
    }

    let msgs = JSON.parse(localStorage.getItem('sc_messages')) || [];
    const idx = msgs.findIndex(m => m.id === id);
    if (idx !== -1) {
      msgs[idx].status = 'Replied';
      localStorage.setItem('sc_messages', JSON.stringify(msgs));
      showToast('Reply sent successfully (Demo Notification)!', 'success');
      closeModal('message-detail-modal');
      renderMessagesAdminInbox();
    }
  });
}

// Modal Toggle utilities
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  }
}

function setupModals() {
  const closes = document.querySelectorAll('.modal-close');
  closes.forEach(c => {
    c.addEventListener('click', () => {
      const modal = c.closest('.modal-container') || c.closest('.fixed');
      if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
      }
    });
  });
}
window.closeCustomModal = closeModal;
