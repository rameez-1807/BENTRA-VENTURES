export type EventCategory = 
  | 'All'
  | 'Corporate Galas'
  | 'Conferences'
  | 'Luxury Hospitality'
  | 'Private Events'
  | 'Exhibitions';

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Past';

export interface EventItineraryItem {
  time: string;
  activity: string;
  speakerOrLead?: string;
}

export interface VenueDetails {
  name: string;
  address: string;
  city: string;
  landmark?: string;
  capacity: number;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: Exclude<EventCategory, 'All'>;
  date: string; // YYYY-MM-DD
  endDate?: string;
  time: string;
  location: string;
  status: EventStatus;
  capacity: number;
  priceTier: string;
  featuredImage: string;
  gallery: string[];
  description: string;
  highlights: string[];
  isFeatured: boolean;
  itinerary: EventItineraryItem[];
  venueDetails: VenueDetails;
  organizer: string;
  ticketLink?: string;
}

export type HospitalityTier = 'Standard' | 'Corporate' | 'VIP' | 'Bespoke';

export interface StaffingRatios {
  eventCoordinators: number;
  serversAndButlers: number;
  securityPersonnel: number;
  executiveChefs: number;
}

export interface HospitalityPackage {
  id: string;
  name: string;
  tier: HospitalityTier;
  guestCapacity: {
    min: number;
    max: number;
    recommended: number;
  };
  amenities: string[];
  priceEstimate: {
    baseRate: number;
    perGuestRate: number;
    currency: string;
    displayStarting: string;
    unitLabel: string;
  };
  previewImage: string;
  availabilityStatus: 'Available' | 'Limited Slots' | 'Booked Out';
  description: string;
  tagline: string;
  badge?: string;
  accentColor: string;
  staffingRatios: StaffingRatios;
}

export interface EventInquiry {
  id?: string;
  clientName: string;
  email: string;
  phone: string;
  eventType: string;
  packageId?: string;
  eventDate: string;
  estimatedGuests: number;
  budgetRange: string;
  venuePreference?: string;
  specialRequests?: string;
  createdAt?: string;
  status?: 'PENDING_REVIEW' | 'CONTACTED' | 'CONFIRMED';
}

export interface EventTestimonial {
  id: string;
  clientName: string;
  role: string;
  companyOrFamily: string;
  eventTitle: string;
  eventCategory: Exclude<EventCategory, 'All'>;
  rating: number;
  quote: string;
  avatar: string;
  date: string;
}

export interface PastEventMedia {
  id: string;
  title: string;
  category: Exclude<EventCategory, 'All'>;
  imageUrl: string;
  location: string;
  date: string;
  caption: string;
  attendees: string;
}

export interface EventFilterState {
  category: EventCategory;
  status: 'All' | 'Upcoming' | 'Past';
  searchQuery: string;
  sortBy: 'date-asc' | 'date-desc' | 'capacity-desc' | 'featured';
}
