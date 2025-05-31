// ===== Booking System JavaScript =====

// Global variables
let currentStep = 1;
let selectedProperty = null;
let checkInDate = null;
let checkOutDate = null;
let guestCount = 2;
let bookingData = {};

// Calendar variables
let currentMonth = new Date();
let selectedStartDate = null;
let selectedEndDate = null;

// Initialize booking system
document.addEventListener('DOMContentLoaded', function() {
    // Update all navigation buttons to open booking system
    updateNavigationButtons();
    
    // Initialize calendar
    renderCalendar();
    
    // Load properties into selection grid
    loadProperties();
});

// Update all "Book Now" buttons to open booking modal
function updateNavigationButtons() {
    // Get all elements with nav-cta class or href="#book"
    const bookNowButtons = document.querySelectorAll('.nav-cta, a[href="#book"], a[href="#book-now"]');
    
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openBookingSystem();
        });
    });
}

// Open booking system
function openBookingSystem() {
    document.getElementById('bookingSystemModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset to step 1
    currentStep = 1;
    updateStepDisplay();
}

// Close booking system
function closeBookingSystem() {
    document.getElementById('bookingSystemModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset form
    resetBookingForm();
}

// Reset booking form
function resetBookingForm() {
    currentStep = 1;
    selectedProperty = null;
    checkInDate = null;
    checkOutDate = null;
    guestCount = 2;
    bookingData = {};
    selectedStartDate = null;
    selectedEndDate = null;
    
    // Clear form inputs
    document.getElementById('guestInfoForm').reset();
    document.getElementById('checkInDate').value = '';
    document.getElementById('checkOutDate').value = '';
    document.getElementById('guestCount').textContent = '2';
    
    // Clear selections
    document.querySelectorAll('.property-select-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Hide pricing preview
    document.getElementById('pricingPreview').style.display = 'none';
}

// Load properties into selection grid
function loadProperties() {
    const grid = document.querySelector('.property-selection-grid');
    
    grid.innerHTML = propertiesData.map(property => `
        <div class="property-select-card" data-property-id="${property.id}" onclick="selectProperty(${property.id})">
            <img src="${property.images.main}" alt="${property.title}" class="property-select-image">
            <div class="property-select-info">
                <h4>${property.title}</h4>
                <p><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <div class="property-select-features">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                    <span><i class="fas fa-users"></i> ${property.guests} Guests</span>
                </div>
                <div class="property-select-price">AED ${property.price.toLocaleString()}/night</div>
            </div>
        </div>
    `).join('');
}

// Select property
function selectProperty(propertyId) {
    selectedProperty = propertiesData.find(p => p.id === propertyId);
    
    // Update UI
    document.querySelectorAll('.property-select-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    document.querySelector(`[data-property-id="${propertyId}"]`).classList.add('selected');
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
    
    // Update property info in date selection
    document.getElementById('selectedPropertyImage').src = selectedProperty.images.main;
    document.getElementById('selectedPropertyName').textContent = selectedProperty.title;
    document.getElementById('selectedPropertyLocation').textContent = selectedProperty.location;
    document.getElementById('maxGuests').textContent = selectedProperty.guests;
}

// Calendar functions
function renderCalendar() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    let html = '';
    
    // Day labels
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayLabels.forEach(day => {
        html += `<div class="calendar-day day-label">${day}</div>`;
    });
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month">${daysInPrevMonth - i}</div>`;
    }
    
    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = formatDateForComparison(date);
        let classes = 'calendar-day';
        
        // Disable past dates
        if (date < today) {
            classes += ' disabled';
        }
        
        // Highlight selected dates
        if (selectedStartDate && formatDateForComparison(selectedStartDate) === dateStr) {
            classes += ' check-in selected';
        } else if (selectedEndDate && formatDateForComparison(selectedEndDate) === dateStr) {
            classes += ' check-out selected';
        } else if (selectedStartDate && selectedEndDate && date > selectedStartDate && date < selectedEndDate) {
            classes += ' in-range';
        }
        
        html += `<div class="${classes}" onclick="selectDate(${year}, ${month}, ${day})">${day}</div>`;
    }
    
    // Next month days
    const remainingDays = 42 - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingDays; day++) {
        html += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    document.getElementById('calendar').innerHTML = html;
}

// Navigate calendar
function previousMonth() {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
}

// Select date
function selectDate(year, month, day) {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return;
    
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        // First selection or reset
        selectedStartDate = date;
        selectedEndDate = null;
        document.getElementById('checkInDate').value = formatDate(date);
        document.getElementById('checkOutDate').value = '';
    } else {
        // Second selection
        if (date > selectedStartDate) {
            selectedEndDate = date;
            document.getElementById('checkOutDate').value = formatDate(date);
            
            // Check minimum stay
            const nights = Math.floor((selectedEndDate - selectedStartDate) / (1000 * 60 * 60 * 24));
            if (nights < selectedProperty.minimumStay) {
                showNotification(`Minimum stay is ${selectedProperty.minimumStay} nights`);
                selectedEndDate = null;
                document.getElementById('checkOutDate').value = '';
            } else {
                // Calculate and show pricing
                calculatePricing();
                document.getElementById('nextBtn').disabled = false;
            }
        } else {
            // If clicked date is before start date, reset
            selectedStartDate = date;
            selectedEndDate = null;
            document.getElementById('checkInDate').value = formatDate(date);
            document.getElementById('checkOutDate').value = '';
        }
    }
    
    renderCalendar();
}

// Format date for display
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format date for comparison
function formatDateForComparison(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

// Guest counter
function incrementGuests() {
    if (guestCount < selectedProperty.guests) {
        guestCount++;
        document.getElementById('guestCount').textContent = guestCount;
    }
}

function decrementGuests() {
    if (guestCount > 1) {
        guestCount--;
        document.getElementById('guestCount').textContent = guestCount;
    }
}

// Calculate pricing
function calculatePricing() {
    if (!selectedProperty || !selectedStartDate || !selectedEndDate) return;
    
    const nights = Math.floor((selectedEndDate - selectedStartDate) / (1000 * 60 * 60 * 24));
    const subtotal = selectedProperty.price * nights;
    const cleaningFee = 350;
    const serviceFee = Math.round(subtotal * 0.12);
    const total = subtotal + cleaningFee + serviceFee;
    
    // Update pricing display
    document.getElementById('nightlyRate').textContent = selectedProperty.price.toLocaleString();
    document.getElementById('numNights').textContent = nights;
    document.getElementById('subtotal').textContent = subtotal.toLocaleString();
    document.getElementById('serviceFee').textContent = serviceFee.toLocaleString();
    document.getElementById('totalPrice').textContent = total.toLocaleString();
    
    // Show pricing preview
    document.getElementById('pricingPreview').style.display = 'block';
    
    // Store booking data
    bookingData.nights = nights;
    bookingData.subtotal = subtotal;
    bookingData.serviceFee = serviceFee;
    bookingData.total = total;
}

// Navigation between steps
function nextStep() {
    if (currentStep === 3) {
        // Validate guest form
        const form = document.getElementById('guestInfoForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Collect form data
        const formData = new FormData(form);
        bookingData.guest = Object.fromEntries(formData);
        
        // Update review section
        updateReviewSection();
    }
    
    if (currentStep < 4) {
        currentStep++;
        updateStepDisplay();
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

// Update step display
function updateStepDisplay() {
    // Update steps
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index + 1 < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
    
    // Update content
    document.querySelectorAll('.booking-step-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`step${currentStep}`).classList.add('active');
    
    // Update buttons
    document.getElementById('prevBtn').style.display = currentStep === 1 ? 'none' : 'block';
    document.getElementById('nextBtn').style.display = currentStep === 4 ? 'none' : 'block';
    document.getElementById('submitBtn').style.display = currentStep === 4 ? 'block' : 'none';
    
    // Reset next button state for step 2
    if (currentStep === 2 && (!selectedStartDate || !selectedEndDate)) {
        document.getElementById('nextBtn').disabled = true;
    }
}

// Update review section
function updateReviewSection() {
    // Property details
    document.getElementById('reviewPropertyImage').src = selectedProperty.images.main;
    document.getElementById('reviewPropertyName').textContent = selectedProperty.title;
    document.getElementById('reviewPropertyLocation').textContent = selectedProperty.location;
    document.getElementById('reviewPropertyFeatures').textContent = 
        `${selectedProperty.bedrooms} Beds • ${selectedProperty.bathrooms} Baths • ${selectedProperty.guests} Guests`;
    
    // Booking details
    document.getElementById('reviewCheckIn').textContent = formatDate(selectedStartDate);
    document.getElementById('reviewCheckOut').textContent = formatDate(selectedEndDate);
    document.getElementById('reviewNights').textContent = `${bookingData.nights} nights`;
    document.getElementById('reviewGuests').textContent = `${guestCount} guests`;
    
    // Guest information
    document.getElementById('reviewGuestName').textContent = 
        `${bookingData.guest.firstName} ${bookingData.guest.lastName}`;
    document.getElementById('reviewEmail').textContent = bookingData.guest.email;
    document.getElementById('reviewPhone').textContent = bookingData.guest.phone;
    document.getElementById('reviewCountry').textContent = bookingData.guest.country;
    
    // Pricing
    document.getElementById('finalSubtotal').textContent = bookingData.subtotal.toLocaleString();
    document.getElementById('finalServiceFee').textContent = bookingData.serviceFee.toLocaleString();
    document.getElementById('finalTotal').textContent = bookingData.total.toLocaleString();
}

// Submit booking
function submitBooking() {
    // Generate booking reference
    const bookingRef = 'TRT' + Date.now().toString().slice(-8);
    
    // Prepare email content
    const emailBody = `
NEW BOOKING REQUEST - ${bookingRef}

PROPERTY DETAILS:
- Property: ${selectedProperty.title}
- Location: ${selectedProperty.location}
- Property ID: ${selectedProperty.id}

BOOKING DETAILS:
- Check-in: ${formatDate(selectedStartDate)}
- Check-out: ${formatDate(selectedEndDate)}
- Number of Nights: ${bookingData.nights}
- Number of Guests: ${guestCount}

GUEST INFORMATION:
- Name: ${bookingData.guest.firstName} ${bookingData.guest.lastName}
- Email: ${bookingData.guest.email}
- Phone: ${bookingData.guest.phone}
- Country: ${bookingData.guest.country}
- Purpose of Visit: ${bookingData.guest.purpose}

SPECIAL REQUESTS:
${bookingData.guest.specialRequests || 'None'}

PRICING SUMMARY:
- Accommodation: AED ${bookingData.subtotal.toLocaleString()}
- Cleaning Fee: AED 350
- Service Fee: AED ${bookingData.serviceFee.toLocaleString()}
- TOTAL: AED ${bookingData.total.toLocaleString()}

MARKETING PREFERENCES:
- Subscribe to newsletter: ${bookingData.guest.subscribe ? 'Yes' : 'No'}

---
This booking was submitted through theroyaltouchhomes.com
Booking Reference: ${bookingRef}
Submission Time: ${new Date().toLocaleString()}
    `;
    
    // Create mailto link
    const subject = encodeURIComponent(`New Booking Request - ${bookingRef} - ${selectedProperty.title}`);
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:info@theroyaltouchhomes.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success modal
    document.getElementById('bookingReference').textContent = bookingRef;
    document.getElementById('bookingSuccessModal').classList.add('active');
    
    // Close booking modal
    closeBookingSystem();
}

// Close success modal
function closeSuccessModal() {
    document.getElementById('bookingSuccessModal').classList.remove('active');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'booking-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .booking-notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: var(--shadow-lg);
        z-index: 10001;
        transition: transform 0.3s ease;
    }
    
    .booking-notification.show {
        transform: translateX(-50%) translateY(0);
    }
`;
document.head.appendChild(notificationStyles);

// Close modal on outside click
document.getElementById('bookingSystemModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeBookingSystem();
    }
});