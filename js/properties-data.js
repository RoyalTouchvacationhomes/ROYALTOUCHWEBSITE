// ===== Properties Database =====
// This serves as our "backend" data store

const propertiesData = [
    {
        id: 1,
        title: "Marina Skyline Villa",
        location: "Dubai Marina",
        description: "Experience luxury living at its finest in this stunning 4-bedroom villa located in the heart of Dubai Marina. This exquisite property offers breathtaking panoramic views of the marina and the Arabian Gulf.",
        price: 2500,
        currency: "AED",
        bedrooms: 4,
        bathrooms: 3,
        guests: 8,
        size: 350,
        featured: true,
        rating: 4.9,
        reviews: 127,
        images: {
            main: "images/property-1.jpg",
            gallery: [
                "images/property-1-1.jpg",
                "images/property-1-2.jpg",
                "images/property-1-3.jpg",
                "images/property-1-4.jpg"
            ]
        },
        amenities: ["pool", "gym", "parking", "wifi", "kitchen", "ac", "washer", "balcony", "security"],
        coordinates: { lat: 25.0805, lng: 55.1403 },
        badge: "Featured",
        availability: true,
        instantBooking: false,
        minimumStay: 2,
        addedDate: "2024-01-15"
    },
    {
        id: 2,
        title: "Palm Jumeirah Beach House",
        location: "Palm Jumeirah",
        description: "Luxurious beachfront villa on the iconic Palm Jumeirah. Wake up to stunning sea views and enjoy direct beach access from this magnificent 5-bedroom property.",
        price: 3800,
        currency: "AED",
        bedrooms: 5,
        bathrooms: 4,
        guests: 10,
        size: 450,
        featured: true,
        rating: 4.8,
        reviews: 89,
        images: {
            main: "images/property-2.jpg",
            gallery: [
                "images/property-2-1.jpg",
                "images/property-2-2.jpg",
                "images/property-2-3.jpg",
                "images/property-2-4.jpg"
            ]
        },
        amenities: ["pool", "beach", "parking", "wifi", "kitchen", "ac", "gym", "bbq", "garden"],
        coordinates: { lat: 25.1124, lng: 55.1390 },
        badge: "Popular",
        availability: true,
        instantBooking: true,
        minimumStay: 3,
        addedDate: "2024-02-01"
    },
    {
        id: 3,
        title: "Downtown Luxury Apartment",
        location: "Downtown Dubai",
        description: "Modern 3-bedroom apartment in the heart of Downtown Dubai with spectacular Burj Khalifa views. Perfect for those who want to be in the center of it all.",
        price: 1800,
        currency: "AED",
        bedrooms: 3,
        bathrooms: 2,
        guests: 6,
        size: 180,
        featured: false,
        rating: 4.7,
        reviews: 156,
        images: {
            main: "images/property-3.jpg",
            gallery: [
                "images/property-3-1.jpg",
                "images/property-3-2.jpg",
                "images/property-3-3.jpg"
            ]
        },
        amenities: ["parking", "wifi", "kitchen", "ac", "gym", "security", "balcony"],
        coordinates: { lat: 25.1972, lng: 55.2744 },
        badge: "New",
        availability: true,
        instantBooking: true,
        minimumStay: 2,
        addedDate: "2024-03-10"
    },
    {
        id: 4,
        title: "JBR Beachfront Penthouse",
        location: "JBR",
        description: "Stunning penthouse with panoramic sea views and private terrace. This 4-bedroom luxury apartment offers the ultimate beachfront living experience.",
        price: 3200,
        currency: "AED",
        bedrooms: 4,
        bathrooms: 3,
        guests: 8,
        size: 320,
        featured: true,
        rating: 5.0,
        reviews: 42,
        images: {
            main: "images/property-4.jpg",
            gallery: [
                "images/property-4-1.jpg",
                "images/property-4-2.jpg",
                "images/property-4-3.jpg",
                "images/property-4-4.jpg"
            ]
        },
        amenities: ["beach", "pool", "gym", "parking", "wifi", "kitchen", "ac", "balcony", "bbq"],
        coordinates: { lat: 25.0751, lng: 55.1336 },
        badge: "Luxury",
        availability: true,
        instantBooking: false,
        minimumStay: 3,
        addedDate: "2024-01-20"
    },
    {
        id: 5,
        title: "Business Bay Executive Suite",
        location: "Business Bay",
        description: "Sophisticated 2-bedroom suite perfect for business travelers. Located in the heart of Business Bay with easy access to DIFC and Downtown.",
        price: 1500,
        currency: "AED",
        bedrooms: 2,
        bathrooms: 2,
        guests: 4,
        size: 120,
        featured: false,
        rating: 4.6,
        reviews: 78,
        images: {
            main: "images/property-5.jpg",
            gallery: [
                "images/property-5-1.jpg",
                "images/property-5-2.jpg",
                "images/property-5-3.jpg"
            ]
        },
        amenities: ["parking", "wifi", "kitchen", "ac", "gym", "workspace", "security"],
        coordinates: { lat: 25.1850, lng: 55.2650 },
        badge: "Business",
        availability: true,
        instantBooking: true,
        minimumStay: 1,
        addedDate: "2024-02-15"
    },
    {
        id: 6,
        title: "Marina Waterfront Studio",
        location: "Dubai Marina",
        description: "Cozy studio apartment with marina views. Perfect for couples or solo travelers looking for a stylish base in Dubai Marina.",
        price: 800,
        currency: "AED",
        bedrooms: 1,
        bathrooms: 1,
        guests: 2,
        size: 65,
        featured: false,
        rating: 4.5,
        reviews: 234,
        images: {
            main: "images/property-6.jpg",
            gallery: [
                "images/property-6-1.jpg",
                "images/property-6-2.jpg"
            ]
        },
        amenities: ["wifi", "kitchen", "ac", "gym", "parking", "security"],
        coordinates: { lat: 25.0797, lng: 55.1412 },
        badge: "Value",
        availability: true,
        instantBooking: true,
        minimumStay: 1,
        addedDate: "2024-03-01"
    },
    {
        id: 7,
        title: "Palm Jumeirah Garden Villa",
        location: "Palm Jumeirah",
        description: "Beautiful 4-bedroom villa with private garden and pool. Family-friendly property with spacious living areas and outdoor entertainment space.",
        price: 2800,
        currency: "AED",
        bedrooms: 4,
        bathrooms: 3,
        guests: 8,
        size: 380,
        featured: false,
        rating: 4.8,
        reviews: 65,
        images: {
            main: "images/property-7.jpg",
            gallery: [
                "images/property-7-1.jpg",
                "images/property-7-2.jpg",
                "images/property-7-3.jpg"
            ]
        },
        amenities: ["pool", "garden", "parking", "wifi", "kitchen", "ac", "bbq", "playground"],
        coordinates: { lat: 25.1180, lng: 55.1350 },
        badge: "Family",
        availability: true,
        instantBooking: false,
        minimumStay: 3,
        addedDate: "2024-02-20"
    },
    {
        id: 8,
        title: "Downtown Studio Loft",
        location: "Downtown Dubai",
        description: "Modern loft-style studio in Downtown Dubai. Walking distance to Dubai Mall and Burj Khalifa with all amenities at your doorstep.",
        price: 1200,
        currency: "AED",
        bedrooms: 1,
        bathrooms: 1,
        guests: 2,
        size: 75,
        featured: false,
        rating: 4.4,
        reviews: 189,
        images: {
            main: "images/property-8.jpg",
            gallery: [
                "images/property-8-1.jpg",
                "images/property-8-2.jpg"
            ]
        },
        amenities: ["wifi", "kitchen", "ac", "gym", "parking", "security", "workspace"],
        coordinates: { lat: 25.1960, lng: 55.2730 },
        badge: "Central",
        availability: true,
        instantBooking: true,
        minimumStay: 1,
        addedDate: "2024-03-05"
    },
    {
        id: 9,
        title: "JBR Marina View Apartment",
        location: "JBR",
        description: "Spacious 3-bedroom apartment with stunning marina views. Prime location with beach access and walk to restaurants and shops.",
        price: 2200,
        currency: "AED",
        bedrooms: 3,
        bathrooms: 2,
        guests: 6,
        size: 200,
        featured: false,
        rating: 4.7,
        reviews: 112,
        images: {
            main: "images/property-9.jpg",
            gallery: [
                "images/property-9-1.jpg",
                "images/property-9-2.jpg",
                "images/property-9-3.jpg"
            ]
        },
        amenities: ["beach", "pool", "parking", "wifi", "kitchen", "ac", "balcony"],
        coordinates: { lat: 25.0760, lng: 55.1340 },
        badge: "Beach",
        availability: true,
        instantBooking: false,
        minimumStay: 2,
        addedDate: "2024-01-25"
    },
    {
        id: 10,
        title: "Business Bay Penthouse Suite",
        location: "Business Bay",
        description: "Luxurious penthouse with private pool and 360-degree views of Dubai skyline. Ultimate luxury living in the heart of the city.",
        price: 4500,
        currency: "AED",
        bedrooms: 5,
        bathrooms: 5,
        guests: 10,
        size: 500,
        featured: true,
        rating: 5.0,
        reviews: 28,
        images: {
            main: "images/property-10.jpg",
            gallery: [
                "images/property-10-1.jpg",
                "images/property-10-2.jpg",
                "images/property-10-3.jpg",
                "images/property-10-4.jpg"
            ]
        },
        amenities: ["pool", "gym", "parking", "wifi", "kitchen", "ac", "jacuzzi", "cinema", "security"],
        coordinates: { lat: 25.1870, lng: 55.2680 },
        badge: "Premium",
        availability: true,
        instantBooking: false,
        minimumStay: 3,
        addedDate: "2024-03-15"
    },
    {
        id: 11,
        title: "Marina Yacht Club Residence",
        location: "Dubai Marina",
        description: "Exclusive 2-bedroom apartment in Marina Yacht Club. Premium amenities with yacht berth access and five-star facilities.",
        price: 2000,
        currency: "AED",
        bedrooms: 2,
        bathrooms: 2,
        guests: 4,
        size: 140,
        featured: false,
        rating: 4.9,
        reviews: 87,
        images: {
            main: "images/property-11.jpg",
            gallery: [
                "images/property-11-1.jpg",
                "images/property-11-2.jpg",
                "images/property-11-3.jpg"
            ]
        },
        amenities: ["pool", "gym", "parking", "wifi", "kitchen", "ac", "concierge", "marina"],
        coordinates: { lat: 25.0775, lng: 55.1425 },
        badge: "Exclusive",
        availability: true,
        instantBooking: true,
        minimumStay: 2,
        addedDate: "2024-02-25"
    },
    {
        id: 12,
        title: "Palm Jumeirah Royal Villa",
        location: "Palm Jumeirah",
        description: "Ultra-luxury 6-bedroom villa on Palm Jumeirah with private beach. Entertainment areas, cinema room, and staff quarters included.",
        price: 6000,
        currency: "AED",
        bedrooms: 6,
        bathrooms: 7,
        guests: 12,
        size: 800,
        featured: true,
        rating: 5.0,
        reviews: 15,
        images: {
            main: "images/property-12.jpg",
            gallery: [
                "images/property-12-1.jpg",
                "images/property-12-2.jpg",
                "images/property-12-3.jpg",
                "images/property-12-4.jpg",
                "images/property-12-5.jpg"
            ]
        },
        amenities: ["beach", "pool", "gym", "parking", "wifi", "kitchen", "ac", "cinema", "staff", "garden", "bbq"],
        coordinates: { lat: 25.1150, lng: 55.1380 },
        badge: "Ultra Luxury",
        availability: true,
        instantBooking: false,
        minimumStay: 5,
        addedDate: "2024-03-18"
    }
];

// Function to get property by ID
function getPropertyById(id) {
    return propertiesData.find(property => property.id === parseInt(id));
}

// Function to get featured properties
function getFeaturedProperties() {
    return propertiesData.filter(property => property.featured);
}

// Function to search properties
function searchProperties(query) {
    const searchTerm = query.toLowerCase();
    return propertiesData.filter(property => 
        property.title.toLowerCase().includes(searchTerm) ||
        property.location.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm)
    );
}

// Function to filter properties
function filterPropertiesData(filters) {
    return propertiesData.filter(property => {
        // Location filter
        if (filters.location && property.location !== filters.location) return false;
        
        // Bedrooms filter
        if (filters.bedrooms) {
            if (filters.bedrooms === '5+' && property.bedrooms < 5) return false;
            if (filters.bedrooms !== '5+' && property.bedrooms !== parseInt(filters.bedrooms)) return false;
        }
        
        // Guests filter
        if (filters.guests) {
            if (filters.guests === '10+' && property.guests < 10) return false;
            if (filters.guests !== '10+' && property.guests > parseInt(filters.guests)) return false;
        }
        
        // Price range filter
        if (filters.minPrice && property.price < filters.minPrice) return false;
        if (filters.maxPrice && property.price > filters.maxPrice) return false;
        
        // Amenities filter
        if (filters.amenities && filters.amenities.length > 0) {
            const hasAllAmenities = filters.amenities.every(amenity => 
                property.amenities.includes(amenity)
            );
            if (!hasAllAmenities) return false;
        }
        
        return true;
    });
}

// Function to sort properties
function sortPropertiesData(properties, sortBy) {
    const sorted = [...properties];
    
    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'newest':
            return sorted.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'featured':
        default:
            return sorted.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return 0;
            });
    }
}