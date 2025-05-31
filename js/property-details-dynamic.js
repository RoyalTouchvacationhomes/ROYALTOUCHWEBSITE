// ===== Dynamic Property Loading for Property Details Page =====
// Add this to the beginning of property-details.js or create as separate file

// Load property from URL
function loadPropertyFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    if (!propertyId) {
        // Default to property 1 if no ID specified
        loadPropertyData(1);
        return;
    }
    
    loadPropertyData(parseInt(propertyId));
}

// Load property data
function loadPropertyData(propertyId) {
    // Get property from data (in real app, this would be an API call)
    currentProperty = getPropertyById(propertyId);
    
    if (!currentProperty) {
        // Handle property not found
        window.location.href = 'properties.html';
        return;
    }
    
    // Update page content
    updatePageContent();
    updateImages();
    updateSimilarProperties();
}

// Update all page content with property data
function updatePageContent() {
    // Update page title
    document.title = `${currentProperty.title} - The Royal Touch Vacation Homes`;
    
    // Update breadcrumb
    document.querySelector('.breadcrumb-item.active').textContent = currentProperty.title;
    
    // Update property header
    document.querySelector('.property-title').textContent = currentProperty.title;
    document.querySelector('.property-subtitle').innerHTML = 
        `<i class="fas fa-map-marker-alt"></i> ${currentProperty.location}, Dubai, United Arab Emirates`;
    
    // Update badges
    const badgesContainer = document.querySelector('.property-badges');
    badgesContainer.innerHTML = `
        <span class="badge badge-featured">
            <i class="fas fa-star"></i> ${currentProperty.badge}
        </span>
        ${currentProperty.rating >= 4.8 ? '<span class="badge badge-superhost"><i class="fas fa-award"></i> Superhost</span>' : ''}
        <span class="badge badge-verified">
            <i class="fas fa-check-circle"></i> Verified
        </span>
    `;
    
    // Update quick stats
    document.querySelector('.quick-stats').innerHTML = `
        <div class="stat">
            <i class="fas fa-users"></i>
            <span>${currentProperty.guests} Guests</span>
        </div>
        <div class="stat">
            <i class="fas fa-bed"></i>
            <span>${currentProperty.bedrooms} Bedrooms</span>
        </div>
        <div class="stat">
            <i class="fas fa-bath"></i>
            <span>${currentProperty.bathrooms} Bathrooms</span>
        </div>
        <div class="stat">
            <i class="fas fa-home"></i>
            <span>${currentProperty.size} m²</span>
        </div>
    `;
    
    // Update description
    document.querySelector('.description-content').innerHTML = `
        <p>${currentProperty.description}</p>
        <p>This property offers exceptional amenities and is professionally managed by The Royal Touch team, 
        ensuring your stay is comfortable and memorable. Our 24/7 guest support is always available to 
        assist with any needs during your stay.</p>
        <p>Located in ${currentProperty.location}, you'll have easy access to Dubai's best attractions, 
        dining, and entertainment options. Whether you're here for business or leisure, this property 
        provides the perfect home away from home.</p>
    `;
    
    // Update amenities
    updateAmenities();
    
    // Update pricing
    document.querySelector('.price-amount .amount').textContent = currentProperty.price.toLocaleString();
    document.querySelector('.rating-mini span:nth-child(2)').textContent = currentProperty.rating;
    document.querySelector('.rating-mini a').textContent = `(${currentProperty.reviews} reviews)`;
    
    // Update reviews section
    document.querySelector('.overall-rating .rating-number').textContent = currentProperty.rating;
    document.querySelector('.overall-rating p').textContent = `Based on ${currentProperty.reviews} reviews`;
    
    // Update booking form hidden inputs
    document.querySelector('input[name="property"]').value = currentProperty.title;
    document.querySelector('input[name="propertyId"]').value = currentProperty.id;
    
    // Update minimum stay info
    const minStayNote = document.createElement('p');
    minStayNote.className = 'min-stay-note';
    minStayNote.innerHTML = `<i class="fas fa-info-circle"></i> Minimum stay: ${currentProperty.minimumStay} nights`;
    document.querySelector('.booking-form').appendChild(minStayNote);
}

// Update amenities based on property
function updateAmenities() {
    const amenitiesGrid = document.querySelector('.amenities-grid');
    
    // Define amenity categories and icons
    const amenityCategories = {
        'Bedroom & Laundry': {
            icon: 'fas fa-bed',
            items: []
        },
        'Entertainment': {
            icon: 'fas fa-tv',
            items: []
        },
        'Kitchen & Dining': {
            icon: 'fas fa-utensils',
            items: []
        },
        'Internet & Office': {
            icon: 'fas fa-wifi',
            items: []
        },
        'Facilities': {
            icon: 'fas fa-swimming-pool',
            items: []
        },
        'Safety & Security': {
            icon: 'fas fa-shield-alt',
            items: []
        }
    };
    
    // Map property amenities to categories
    const amenityMapping = {
        'pool': { category: 'Facilities', name: 'Private pool' },
        'gym': { category: 'Facilities', name: 'Gym access' },
        'parking': { category: 'Facilities', name: 'Free parking' },
        'wifi': { category: 'Internet & Office', name: 'High-speed WiFi' },
        'kitchen': { category: 'Kitchen & Dining', name: 'Fully equipped kitchen' },
        'ac': { category: 'Bedroom & Laundry', name: 'Air conditioning' },
        'washer': { category: 'Bedroom & Laundry', name: 'Washer & Dryer' },
        'balcony': { category: 'Facilities', name: 'Private balcony' },
        'security': { category: 'Safety & Security', name: '24/7 Security' },
        'beach': { category: 'Facilities', name: 'Beach access' },
        'bbq': { category: 'Kitchen & Dining', name: 'BBQ area' },
        'garden': { category: 'Facilities', name: 'Private garden' },
        'workspace': { category: 'Internet & Office', name: 'Dedicated workspace' },
        'jacuzzi': { category: 'Facilities', name: 'Jacuzzi' },
        'cinema': { category: 'Entertainment', name: 'Home cinema' },
        'staff': { category: 'Facilities', name: 'Staff quarters' },
        'concierge': { category: 'Facilities', name: 'Concierge service' },
        'marina': { category: 'Facilities', name: 'Marina access' },
        'playground': { category: 'Facilities', name: 'Children\'s playground' }
    };
    
    // Add standard amenities
    amenityCategories['Bedroom & Laundry'].items.push('Premium bedding', 'Walk-in closets');
    amenityCategories['Entertainment'].items.push('Smart TV', 'Netflix & Prime');
    amenityCategories['Kitchen & Dining'].items.push('Coffee machine', 'Dishwasher');
    amenityCategories['Internet & Office'].items.push('Printer available');
    amenityCategories['Safety & Security'].items.push('Safe box', 'Smoke detectors');
    
    // Add property-specific amenities
    currentProperty.amenities.forEach(amenity => {
        if (amenityMapping[amenity]) {
            const mapping = amenityMapping[amenity];
            amenityCategories[mapping.category].items.push(mapping.name);
        }
    });
    
    // Build amenities HTML
    let amenitiesHTML = '';
    for (const [category, data] of Object.entries(amenityCategories)) {
        if (data.items.length > 0) {
            amenitiesHTML += `
                <div class="amenity-category">
                    <h3><i class="${data.icon}"></i> ${category}</h3>
                    <ul>
                        ${data.items.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    }
    
    amenitiesGrid.innerHTML = amenitiesHTML;
}

// Update images
function updateImages() {
    // Set main image
    images = [currentProperty.images.main, ...currentProperty.images.gallery];
    document.getElementById('mainImage').src = images[0];
    document.querySelector('.image-counter span').textContent = `1 / ${images.length}`;
    
    // Update thumbnails
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    thumbnailContainer.innerHTML = images.slice(0, 6).map((img, index) => `
        <img src="${img}" alt="Property view ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" 
             onclick="selectImage(${index})">
    `).join('');
    
    // Update lightbox gallery
    const lightboxGrid = document.querySelector('.lightbox-grid');
    lightboxGrid.innerHTML = images.map((img, index) => `
        <img src="${img}" alt="Property view ${index + 1}" onclick="selectLightboxImage(${index})">
    `).join('');
}

// Update similar properties
function updateSimilarProperties() {
    const similarContainer = document.querySelector('.properties-carousel');
    
    // Get similar properties (same location or price range)
    const similarProperties = propertiesData.filter(prop => 
        prop.id !== currentProperty.id && 
        (prop.location === currentProperty.location || 
         Math.abs(prop.price - currentProperty.price) < 1000)
    ).slice(0, 3);
    
    similarContainer.innerHTML = similarProperties.map(property => `
        <div class="property-card">
            <div class="property-image">
                <img src="${property.images.main}" alt="${property.title}">
                <div class="property-badge">${property.badge}</div>
            </div>
            <div class="property-content">
                <h3>${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i> ${property.location}
                </p>
                <div class="property-features">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>
                    <span><i class="fas fa-users"></i> ${property.guests} Guests</span>
                </div>
                <div class="property-price">
                    <span class="price-amount">AED ${property.price.toLocaleString()}</span>
                    <span class="price-period">/ night</span>
                </div>
                <a href="property-details.html?id=${property.id}" class="btn btn-outline">View Details</a>
            </div>
        </div>
    `).join('');
}

// Select lightbox image
function selectLightboxImage(index) {
    currentImageIndex = index;
    updateMainImage();
    closeLightbox();
}

// Update booking calculator for dynamic property
function calculatePrice() {
    const checkinInput = document.querySelector('input[name="checkin"]');
    const checkoutInput = document.querySelector('input[name="checkout"]');
    const priceBreakdown = document.getElementById('priceBreakdown');
    
    if (checkinInput.value && checkoutInput.value && currentProperty) {
        const checkin = new Date(checkinInput.value);
        const checkout = new Date(checkoutInput.value);
        const nights = Math.floor((checkout - checkin) / (1000 * 60 * 60 * 24));
        
        if (nights >= currentProperty.minimumStay) {
            const pricePerNight = currentProperty.price;
            const cleaningFee = 350;
            const subtotal = pricePerNight * nights;
            const serviceFee = Math.round(subtotal * 0.12);
            const total = subtotal + cleaningFee + serviceFee;
            
            // Update price breakdown
            document.querySelector('.price-row:first-child span:first-child').innerHTML = 
                `AED ${pricePerNight.toLocaleString()} × <span id="nights">${nights}</span> nights`;
            document.getElementById('subtotal').textContent = subtotal.toLocaleString();
            document.getElementById('serviceFee').textContent = serviceFee.toLocaleString();
            document.getElementById('totalPrice').textContent = total.toLocaleString();
            
            // Show price breakdown
            priceBreakdown.style.display = 'block';
            
            // Store values for booking form
            document.getElementById('bookingDates').value = `${checkinInput.value} to ${checkoutInput.value}`;
            document.getElementById('bookingGuests').value = document.querySelector('select[name="guests"]').value;
            document.getElementById('bookingTotal').value = total;
        } else {
            showNotification(`Minimum stay is ${currentProperty.minimumStay} nights`);
            priceBreakdown.style.display = 'none';
        }
    } else {
        priceBreakdown.style.display = 'none';
    }
}

// Add CSS for minimum stay note
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .min-stay-note {
        background: var(--light-bg);
        padding: 0.75rem;
        border-radius: 8px;
        font-size: 0.85rem;
        color: var(--text-dark);
        margin-top: 1rem;
        text-align: center;
    }
    
    .min-stay-note i {
        color: var(--secondary-color);
        margin-right: 0.5rem;
    }
`;
document.head.appendChild(dynamicStyles);