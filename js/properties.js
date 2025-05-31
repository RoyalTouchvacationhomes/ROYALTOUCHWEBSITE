// ===== Properties Page JavaScript =====

// Global variables
let currentProperties = [];
let filteredProperties = [];
let displayedCount = 6;
const itemsPerPage = 6;
let currentView = 'grid';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProperties();
    handleURLParams();
    setupEventListeners();
});

// Initialize properties
function initializeProperties() {
    currentProperties = [...propertiesData];
    filteredProperties = [...propertiesData];
    displayProperties();
    updateResultsCount();
}

// Handle URL parameters (for search from homepage)
function handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if coming from search
    if (urlParams.has('search')) {
        const searchQuery = urlParams.get('query');
        if (searchQuery) {
            document.getElementById('searchInput').value = searchQuery;
            performSearch();
        }
    }
    
    // Check if filtering by location
    if (urlParams.has('location')) {
        document.getElementById('locationFilter').value = urlParams.get('location');
        filterProperties();
    }
}

// Display properties
function displayProperties(reset = true) {
    const grid = document.getElementById('propertiesGrid');
    const noResults = document.getElementById('noResults');
    
    if (reset) {
        displayedCount = itemsPerPage;
    }
    
    const propertiesToShow = filteredProperties.slice(0, displayedCount);
    
    if (propertiesToShow.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        document.getElementById('loadMoreBtn').style.display = 'none';
        return;
    }
    
    grid.style.display = '';
    noResults.style.display = 'none';
    
    // Clear and rebuild grid
    grid.innerHTML = '';
    grid.className = currentView === 'grid' ? 'properties-grid' : 'properties-list';
    
    propertiesToShow.forEach((property, index) => {
        const propertyCard = createPropertyCard(property, index);
        grid.appendChild(propertyCard);
    });
    
    // Show/hide load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (displayedCount >= filteredProperties.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
    
    // Add animation
    animatePropertyCards();
}

// Create property card
function createPropertyCard(property, index) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', index * 50);
    
    card.innerHTML = `
        <div class="property-image">
            <img src="${property.images.main}" alt="${property.title}" loading="lazy">
            <div class="property-badge">${property.badge}</div>
            ${property.instantBooking ? '<div class="instant-booking-badge">Instant Booking</div>' : ''}
            <div class="property-overlay">
                <a href="property-details.html?id=${property.id}" class="property-link">View Details</a>
            </div>
            <button class="favorite-btn" onclick="toggleFavorite(${property.id}, event)">
                <i class="${isFavorite(property.id) ? 'fas' : 'far'} fa-heart"></i>
            </button>
        </div>
        <div class="property-content">
            <div class="property-header">
                <h3 class="property-title">${property.title}</h3>
                <div class="property-rating">
                    <i class="fas fa-star"></i>
                    <span>${property.rating}</span>
                    <span class="reviews">(${property.reviews})</span>
                </div>
            </div>
            <p class="property-location">
                <i class="fas fa-map-marker-alt"></i> ${property.location}
            </p>
            <div class="property-features">
                <span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                <span><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>
                <span><i class="fas fa-users"></i> ${property.guests} Guests</span>
                <span><i class="fas fa-home"></i> ${property.size} m²</span>
            </div>
            <div class="property-footer">
                <div class="property-price">
                    <span class="price-amount">${property.currency} ${property.price.toLocaleString()}</span>
                    <span class="price-period">/ night</span>
                </div>
                <a href="property-details.html?id=${property.id}" class="btn-view-details">
                    View Details <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;
    
    // Make entire card clickable
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.favorite-btn') && !e.target.closest('.property-link') && !e.target.closest('.btn-view-details')) {
            window.location.href = `property-details.html?id=${property.id}`;
        }
    });
    
    return card;
}

// Search functionality
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredProperties = [...currentProperties];
    } else {
        filteredProperties = currentProperties.filter(property => 
            property.title.toLowerCase().includes(searchTerm) ||
            property.location.toLowerCase().includes(searchTerm) ||
            property.description.toLowerCase().includes(searchTerm)
        );
    }
    
    applyAllFilters();
    displayProperties();
    updateResultsCount();
}

// Filter properties
function filterProperties() {
    const filters = {
        location: document.getElementById('locationFilter').value,
        bedrooms: document.getElementById('bedroomsFilter').value,
        guests: document.getElementById('guestsFilter').value,
        minPrice: document.getElementById('minPrice').value,
        maxPrice: document.getElementById('maxPrice').value,
        amenities: getSelectedAmenities()
    };
    
    // Start with search results if any
    const searchTerm = document.getElementById('searchInput').value;
    let baseProperties = searchTerm ? searchProperties(searchTerm) : [...propertiesData];
    
    filteredProperties = filterPropertiesData(baseProperties, filters);
    
    // Apply current sort
    const sortBy = document.getElementById('sortBy').value;
    filteredProperties = sortPropertiesData(filteredProperties, sortBy);
    
    displayProperties();
    updateResultsCount();
}

// Apply all filters (used after search)
function applyAllFilters() {
    const filters = {
        location: document.getElementById('locationFilter').value,
        bedrooms: document.getElementById('bedroomsFilter').value,
        guests: document.getElementById('guestsFilter').value,
        minPrice: document.getElementById('minPrice').value,
        maxPrice: document.getElementById('maxPrice').value,
        amenities: getSelectedAmenities()
    };
    
    filteredProperties = filterPropertiesData(filteredProperties, filters);
    
    // Apply current sort
    const sortBy = document.getElementById('sortBy').value;
    filteredProperties = sortPropertiesData(filteredProperties, sortBy);
}

// Get selected amenities
function getSelectedAmenities() {
    const checkboxes = document.querySelectorAll('.amenities-checkboxes input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// Sort properties
function sortProperties() {
    const sortBy = document.getElementById('sortBy').value;
    filteredProperties = sortPropertiesData(filteredProperties, sortBy);
    displayProperties();
}

// Clear all filters
function clearFilters() {
    document.getElementById('locationFilter').value = '';
    document.getElementById('bedroomsFilter').value = '';
    document.getElementById('guestsFilter').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('searchInput').value = '';
    
    // Clear amenity checkboxes
    document.querySelectorAll('.amenities-checkboxes input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    // Reset to all properties
    filteredProperties = [...propertiesData];
    displayProperties();
    updateResultsCount();
}

// Load more properties
function loadMore() {
    displayedCount += itemsPerPage;
    displayProperties(false);
}

// Update results count
function updateResultsCount() {
    const count = filteredProperties.length;
    const showing = Math.min(displayedCount, count);
    document.getElementById('resultsCount').textContent = 
        `Showing ${showing} of ${count} ${count === 1 ? 'property' : 'properties'}`;
}

// Set view mode
function setView(view) {
    currentView = view;
    
    // Update button states
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.view-btn').classList.add('active');
    
    displayProperties();
}

// Favorites functionality
function toggleFavorite(propertyId, event) {
    event.stopPropagation();
    
    let favorites = getFavorites();
    const index = favorites.indexOf(propertyId);
    
    if (index === -1) {
        favorites.push(propertyId);
        showNotification('Added to favorites!');
    } else {
        favorites.splice(index, 1);
        showNotification('Removed from favorites');
    }
    
    localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
    
    // Update heart icon
    const heart = event.target.closest('.favorite-btn').querySelector('i');
    heart.classList.toggle('fas');
    heart.classList.toggle('far');
}

function getFavorites() {
    const stored = localStorage.getItem('favoriteProperties');
    return stored ? JSON.parse(stored) : [];
}

function isFavorite(propertyId) {
    return getFavorites().includes(propertyId);
}

// Show notification
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

// Animate property cards
function animatePropertyCards() {
    const cards = document.querySelectorAll('.property-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search on enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Price range validation
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    minPrice.addEventListener('change', function() {
        if (maxPrice.value && parseInt(this.value) > parseInt(maxPrice.value)) {
            this.value = maxPrice.value;
        }
        filterProperties();
    });
    
    maxPrice.addEventListener('change', function() {
        if (minPrice.value && parseInt(this.value) < parseInt(minPrice.value)) {
            this.value = minPrice.value;
        }
        filterProperties();
    });
    
    // Newsletter form
    document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        showNotification(`Thank you for subscribing with ${email}!`);
        this.reset();
    });
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
`;
document.head.appendChild(notificationStyles);