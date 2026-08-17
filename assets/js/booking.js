// Sole Craft Booking Wizard Handler

document.addEventListener('DOMContentLoaded', () => {
  // Check if booking elements exist
  const bookingForm = document.getElementById('booking-wizard-form');
  if (!bookingForm) {
    // If we are on booking-success.html, load summary instead
    if (window.location.pathname.includes('booking-success.html')) {
      renderBookingSuccess();
    }
    return;
  }

  // State Variables
  let currentStep = 1;
  const totalSteps = 7;
  const bookingState = {
    serviceId: '',
    serviceName: '',
    shoeType: '',
    imageUrl: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    price: 0
  };

  // Load Services from LocalStorage to populate dropdown/grid
  const services = JSON.parse(localStorage.getItem('sc_services')) || [];
  const serviceSelect = document.getElementById('step-service-select');
  
  if (serviceSelect) {
    serviceSelect.innerHTML = '<option value="">-- Choose a Service --</option>';
    services.forEach(s => {
      serviceSelect.innerHTML += `<option value="${s.id}" data-price="${s.price}" data-name="${s.name}">${s.name} (Starting ₹${s.price})</option>`;
    });
  }

  // Pre-fill service if passed as URL parameter (?service=sole-replacement)
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedService = urlParams.get('service');
  if (preselectedService && serviceSelect) {
    serviceSelect.value = preselectedService;
    const option = serviceSelect.querySelector(`option[value="${preselectedService}"]`);
    if (option) {
      bookingState.serviceId = preselectedService;
      bookingState.serviceName = option.dataset.name;
      bookingState.price = parseInt(option.dataset.price);
    }
  }

  // Image Upload Preview Handler
  const imageInput = document.getElementById('step-image-upload');
  const imagePreview = document.getElementById('step-image-preview');
  if (imageInput && imagePreview) {
    imageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          imagePreview.innerHTML = `<img src="${event.target.result}" class="max-h-40 rounded-lg mx-auto shadow-md object-cover">`;
          bookingState.imageUrl = event.target.result; // Store base64 data
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Date constraints (can't select past dates)
  const dateInput = document.getElementById('step-date-input');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Wizard Navigation
  const prevBtn = document.getElementById('prev-step-btn');
  const nextBtn = document.getElementById('next-step-btn');
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
          saveStepData(currentStep);
          currentStep++;
          updateWizardUI();
        } else {
          // Confirm booking (Step 7 submission)
          submitBooking();
        }
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateWizardUI();
      }
    });
  }

  // Select Shoe Type Button Group handlers
  const shoeButtons = document.querySelectorAll('.shoe-type-btn');
  shoeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      shoeButtons.forEach(b => b.classList.remove('border-gold', 'bg-[#8C6239]', 'bg-opacity-10', 'text-gold'));
      btn.classList.add('border-gold', 'bg-[#8C6239]', 'bg-opacity-10', 'text-gold');
      bookingState.shoeType = btn.dataset.shoeType;
    });
  });

  // Select Time slot handlers
  const timeButtons = document.querySelectorAll('.time-slot-btn');
  timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      timeButtons.forEach(b => b.classList.remove('border-gold', 'bg-[#8C6239]', 'bg-opacity-10', 'text-gold'));
      btn.classList.add('border-gold', 'bg-[#8C6239]', 'bg-opacity-10', 'text-gold');
      bookingState.time = btn.dataset.time;
    });
  });

  function validateStep(step) {
    switch(step) {
      case 1:
        const sVal = serviceSelect ? serviceSelect.value : '';
        if (!sVal) {
          showToast('Please select a repair service.', 'error');
          return false;
        }
        break;
      case 2:
        if (!bookingState.shoeType) {
          showToast('Please select your shoe type.', 'error');
          return false;
        }
        break;
      case 3:
        // Optional image upload, but good to have
        break;
      case 4:
        const dVal = dateInput ? dateInput.value : '';
        if (!dVal) {
          showToast('Please select a convenient date.', 'error');
          return false;
        }
        break;
      case 5:
        if (!bookingState.time) {
          showToast('Please select a preferred time slot.', 'error');
          return false;
        }
        break;
      case 6:
        const nameVal = document.getElementById('cust-name').value.trim();
        const emailVal = document.getElementById('cust-email').value.trim();
        const phoneVal = document.getElementById('cust-phone').value.trim();
        const addressVal = document.getElementById('cust-address').value.trim();
        
        if (!nameVal || !emailVal || !phoneVal || !addressVal) {
          showToast('Please fill all required customer fields.', 'error');
          return false;
        }
        // Basic Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          showToast('Please enter a valid email address.', 'error');
          return false;
        }
        break;
    }
    return true;
  }

  function saveStepData(step) {
    if (step === 1 && serviceSelect) {
      const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
      bookingState.serviceId = serviceSelect.value;
      bookingState.serviceName = selectedOption.dataset.name;
      bookingState.price = parseInt(selectedOption.dataset.price);
    }
    if (step === 4 && dateInput) {
      bookingState.date = dateInput.value;
    }
    if (step === 6) {
      bookingState.name = document.getElementById('cust-name').value.trim();
      bookingState.email = document.getElementById('cust-email').value.trim();
      bookingState.phone = document.getElementById('cust-phone').value.trim();
      bookingState.address = document.getElementById('cust-address').value.trim();
      bookingState.notes = document.getElementById('cust-notes').value.trim();
    }
    
    // Render Review Step (Step 7)
    if (step === 6) {
      document.getElementById('review-service').innerText = bookingState.serviceName;
      document.getElementById('review-shoe-type').innerText = bookingState.shoeType;
      document.getElementById('review-date').innerText = bookingState.date;
      document.getElementById('review-time').innerText = bookingState.time;
      document.getElementById('review-price').innerText = `₹${bookingState.price}`;
      document.getElementById('review-customer').innerText = `${bookingState.name} (${bookingState.phone})`;
      
      const reviewImg = document.getElementById('review-image-container');
      if (reviewImg) {
        if (bookingState.imageUrl) {
          reviewImg.innerHTML = `<img src="${bookingState.imageUrl}" class="w-full max-h-36 object-cover rounded-lg">`;
        } else {
          reviewImg.innerHTML = `<div class="bg-gray-800 rounded-lg h-36 flex items-center justify-center text-gray-500 text-xs">No Image Uploaded</div>`;
        }
      }
    }
  }

  function updateWizardUI() {
    // Hide all step sections
    for (let i = 1; i <= totalSteps; i++) {
      const stepEl = document.getElementById(`step-${i}`);
      if (stepEl) {
        stepEl.classList.add('hidden');
      }
      
      // Update progress badges
      const badge = document.getElementById(`badge-step-${i}`);
      if (badge) {
        if (i < currentStep) {
          badge.classList.remove('bg-gray-300', 'bg-gold', 'text-text-primary');
          badge.classList.add('bg-green-600', 'text-white');
          badge.innerHTML = '<i class="bi bi-check"></i>';
        } else if (i === currentStep) {
          badge.classList.remove('bg-gray-300', 'bg-green-600', 'text-white');
          badge.classList.add('bg-gold', 'text-black');
          badge.innerHTML = i;
        } else {
          badge.classList.remove('bg-gold', 'bg-green-600', 'text-white', 'text-black');
          badge.classList.add('bg-gray-300', 'text-gray-600');
          badge.innerHTML = i;
        }
      }
    }

    // Show active step
    const activeStepEl = document.getElementById(`step-${currentStep}`);
    if (activeStepEl) {
      activeStepEl.classList.remove('hidden');
    }

    // Handle button labels
    if (currentStep === 1) {
      prevBtn.classList.add('invisible');
    } else {
      prevBtn.classList.remove('invisible');
    }

    if (currentStep === totalSteps) {
      nextBtn.innerHTML = 'Confirm Booking <i class="bi bi-check2-circle ml-2"></i>';
      nextBtn.classList.add('bg-green-600', 'hover:bg-green-700');
      nextBtn.classList.remove('bg-gold', 'hover:bg-gold-hover');
    } else {
      nextBtn.innerHTML = 'Next Step <i class="bi bi-arrow-right ml-2"></i>';
      nextBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
      nextBtn.classList.add('bg-gold', 'hover:bg-gold-hover');
    }
  }

  function submitBooking() {
    const bookingId = `SC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: bookingId,
      customerName: bookingState.name,
      email: bookingState.email,
      service: bookingState.serviceName,
      shoeType: bookingState.shoeType,
      date: bookingState.date,
      time: bookingState.time,
      price: bookingState.price,
      status: 'Pending',
      notes: bookingState.notes,
      imageUrl: bookingState.imageUrl
    };

    // Save to bookings list in localStorage
    const bookings = JSON.parse(localStorage.getItem('sc_bookings')) || [];
    bookings.unshift(newBooking);
    localStorage.setItem('sc_bookings', JSON.stringify(bookings));

    // Save latest booking ID separately to display in success
    localStorage.setItem('sc_latest_booking_id', bookingId);

    showToast('Your shoe repair is booked successfully!', 'success');
    
    // Redirect after brief delay
    setTimeout(() => {
      window.location.href = 'booking-success.html';
    }, 1000);
  }

  // Run initial state update
  updateWizardUI();
});

// Render Booking Success ticket
function renderBookingSuccess() {
  const latestId = localStorage.getItem('sc_latest_booking_id');
  if (!latestId) return;

  const bookings = JSON.parse(localStorage.getItem('sc_bookings')) || [];
  const latestBooking = bookings.find(b => b.id === latestId);

  if (latestBooking) {
    document.getElementById('success-id').innerText = latestBooking.id;
    document.getElementById('success-service').innerText = latestBooking.service;
    document.getElementById('success-shoe-type').innerText = latestBooking.shoeType;
    document.getElementById('success-date').innerText = latestBooking.date;
    document.getElementById('success-time').innerText = latestBooking.time;
    document.getElementById('success-price').innerText = `₹${latestBooking.price}`;
    document.getElementById('success-name').innerText = latestBooking.customerName;
  }
}
