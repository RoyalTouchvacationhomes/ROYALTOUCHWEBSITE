// ===== Property Details JavaScript =====

// Image Gallery
let currentImageIndex = 0;
const images = [
    'images/property-1-main.jpg',
    'images/property-1-full-1.jpg',
    'images/property-1-full-2.jpg',
    'images/property-1-full-3.jpg',
    'images/property-1-full-4.jpg',
    'images/property-1-full-5.jpg',
    'images/property-1-full-6.jpg',
    'images/property-1-full-7.jpg',
    'images/property-1-full-8.jpg',
    'images/property-1-full-9.jpg',
    'images/property-1-full-10.jpg',
    'images/property-1-full-11.jpg'
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDateInputs();
    initializeBookingCalculator();
    initializeGallery();
    initializeAnimations();
});

// Image Gallery Functions
function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    updateMainImage();
}

function selectImage(index) {
    currentImageIndex = index;
    updateMainImage();
}

function updateMainImage() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const counter = document.querySelector('.image-counter span');
    
    // Update main image with fade effect
    mainImage.style.opacity = '0';
    setTimeout(() => {
        mainImage.src = images[currentImageIndex];
        mainImage.style.opacity = '1';
    }, 300);
    
    // Update counter
    counter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    
    // Update active thumbnail
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Lightbox Functions
function openLightbox() {
    document.getElementById('galleryLightbox').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('galleryLightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize gallery
function initializeGallery() {
    // Add click event to lightbox images
    const lightboxImages = document.querySelectorAll('.lightbox-grid img');
    lightboxImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentImageIndex = index;
            updateMainImage();
            closeLightbox();
        });
    });
    
    // Close lightbox on outside click
    document.getElementById('galleryLightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('galleryLightbox').style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        } else {
            if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });
}

// Share Property Function
function shareProperty() {
    const url = window.location.href;
    const title = 'Marina Skyline Villa - The Royal Touch';
    
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!');
        });
    }
}

// Save Property Function
function saveProperty() {
    const saveBtn = event.target.closest('.action-btn');
    const icon = saveBtn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        saveBtn.style.color = 'var(--primary-color)';
        showNotification('Property saved to favorites!');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        saveBtn.style.color = '';
        showNotification('Property removed from favorites');
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
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

// Date Input Initialization
function initializeDateInputs() {
    const checkinInput = document.querySelector('input[name="checkin"]');
    const checkoutInput = document.querySelector('input[name="checkout"]');
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    checkinInput.min = today;
    
    // Update checkout min date when checkin changes
    checkinInput.addEventListener('change', function() {
        const checkinDate = new Date(this.value);
        const minCheckout = new Date(checkinDate);
        minCheckout.setDate(minCheckout.getDate() + 1);
        checkoutInput.min = minCheckout.toISOString().split('T')[0];
        
        // Reset checkout if it's before new min date
        if (checkoutInput.value && new Date(checkoutInput.value) <= checkinDate) {
            checkoutInput.value = '';
        }
        
        calculatePrice();
    });
    
    checkoutInput.addEventListener('change', calculatePrice);
    document.querySelector('select[name="guests"]').addEventListener('change', calculatePrice);
}

// Booking Calculator
function initializeBookingCalculator() {
    const pricePerNight = 2500;
    const cleaningFee = 350;
    const serviceFeeRate = 0.12; // 12% service fee
}

function calculatePrice() {
    const checkinInput = document.querySelector('input[name="checkin"]');
    const checkoutInput = document.querySelector('input[name="checkout"]');
    const priceBreakdown = document.getElementById('priceBreakdown');
    
    if (checkinInput.value && checkoutInput.value) {
        const checkin = new Date(checkinInput.value);
        const checkout = new Date(checkoutInput.value);
        const nights = Math.floor((checkout - checkin) / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
            const pricePerNight = 2500;
            const cleaningFee = 350;
            const subtotal = pricePerNight * nights;
            const serviceFee = Math.round(subtotal * 0.12);
            const total = subtotal + cleaningFee + serviceFee;
            
            // Update price breakdown
            document.getElementById('nights').textContent = nights;
            document.getElementById('subtotal').textContent = subtotal.toLocaleString();
            document.getElementById('serviceFee').textContent = serviceFee.toLocaleString();
            document.getElementById('totalPrice').textContent = total.toLocaleString();
            
            // Show price breakdown
            priceBreakdown.style.display = 'block';
            
            // Store values for booking form
            document.getElementById('bookingDates').value = `${checkinInput.value} to ${checkoutInput.value}`;
            document.getElementById('bookingGuests').value = document.querySelector('select[name="guests"]').value;
            document.getElementById('bookingTotal').value = total;
        }
    } else {
        priceBreakdown.style.display = 'none';
    }
}

// Booking Modal Functions
function openBookingModal() {
    const checkinInput = document.querySelector('input[name="checkin"]');
    const checkoutInput = document.querySelector('input[name="checkout"]');
    const guestsSelect = document.querySelector('select[name="guests"]');
    
    // Validate dates
    if (!checkinInput.value || !checkoutInput.value) {
        showNotification('Please select check-in and check-out dates');
        return;
    }
    
    // Update summary in modal
    const checkin = new Date(checkinInput.value);
    const checkout = new Date(checkoutInput.value);
    const nights = Math.floor((checkout - checkin) / (1000 * 60 * 60 * 24));
    
    document.getElementById('summaryDates').textContent = 
        `${formatDate(checkin)} - ${formatDate(checkout)} (${nights} nights)`;
    document.getElementById('summaryGuests').textContent = 
        guestsSelect.value + ' ' + (guestsSelect.value === '1' ? 'Guest' : 'Guests');
    document.getElementById('summaryPrice').textContent = 
        document.getElementById('totalPrice').textContent;
    
    // Show modal
    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Close modal on outside click
document.getElementById('bookingModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeBookingModal();
    }
});

// Handle booking form submission
document.getElementById('bookingRequestForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Create email body
    const emailBody = `
Booking Request for ${data.property}

Guest Information:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Phone: ${data.phone}
- Nationality: ${data.nationality || 'Not specified'}

Booking Details:
- Property: ${data.property}
- Dates: ${data.dates}
- Guests: ${data.guestCount}
- Total Price: AED ${data.totalPrice}
- Purpose: ${data.purpose}

Special Requests:
${data.specialRequests || 'None'}

---
This booking request was submitted through theroyaltouchhomes.com
    `;
    
    // Create mailto link
    const subject = encodeURIComponent(`Booking Request - ${data.property} - ${data.dates}`);
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:info@theroyaltouchhomes.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show confirmation
    showNotification('Opening your email client to send booking request...');
    
    // Close modal after a delay
    setTimeout(() => {
        closeBookingModal();
        this.reset();
    }, 2000);
});

// Initialize animations
function initializeAnimations() {
    // Animate rating bars on scroll
    const ratingBars = document.querySelectorAll('.rating-fill');
    const ratingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    ratingBars.forEach(bar => ratingObserver.observe(bar));
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.property-section, .property-card');
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => elementObserver.observe(element));
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(-50%) translateY(0);
    }
    
    .property-section, .property-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .property-section.animate-in, .property-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(notificationStyles);

// Initialize smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));