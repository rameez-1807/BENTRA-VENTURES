import { 
  EventItem, 
  HospitalityPackage, 
  EventInquiry, 
  EventFilterState, 
  EventCategory,
  EventTestimonial,
  PastEventMedia
} from '../types/events';
import { 
  INITIAL_EVENTS, 
  HOSPITALITY_PACKAGES, 
  EVENT_TESTIMONIALS, 
  PAST_EVENT_MEDIA 
} from '../data/eventsData';

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://bentra-ventures.onrender.com');

class EventsService {
  private fallbackEvents: EventItem[] = [...INITIAL_EVENTS];
  private fallbackPackages: HospitalityPackage[] = [...HOSPITALITY_PACKAGES];
  private fallbackInquiries: EventInquiry[] = [];

  /**
   * Fetch all events with optional filtering, search, and sorting.
   */
  async getEvents(filters?: Partial<EventFilterState>): Promise<{ events: EventItem[]; total: number; source: 'api' | 'fallback' }> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.category && filters.category !== 'All') queryParams.append('category', filters.category);
      if (filters?.status && filters.status !== 'All') queryParams.append('status', filters.status);
      if (filters?.searchQuery) queryParams.append('search', filters.searchQuery);
      if (filters?.sortBy) queryParams.append('sort', filters.sortBy);

      const url = `${API_BASE}/api/events?${queryParams.toString()}`;
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(3000)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.events && Array.isArray(data.events) && data.events.length > 0) {
          return { events: data.events, total: data.total || data.events.length, source: 'api' };
        }
      }
    } catch {
      // Graceful fallback to client-side data
    }

    // Client-side filtering fallback
    let result = [...this.fallbackEvents];

    if (filters) {
      if (filters.category && filters.category !== 'All') {
        result = result.filter(e => e.category === filters.category);
      }

      if (filters.status && filters.status !== 'All') {
        result = result.filter(e => e.status === filters.status);
      }

      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase().trim();
        result = result.filter(e => 
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.highlights.some(h => h.toLowerCase().includes(q))
        );
      }

      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'date-asc':
            result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            break;
          case 'date-desc':
            result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            break;
          case 'capacity-desc':
            result.sort((a, b) => b.capacity - a.capacity);
            break;
          case 'featured':
            result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
            break;
        }
      }
    }

    return { events: result, total: result.length, source: 'fallback' };
  }

  /**
   * Fetch single event by slug or ID
   */
  async getEventBySlug(slug: string): Promise<EventItem | null> {
    try {
      const response = await fetch(`${API_BASE}/api/events/${slug}`, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(3000)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.event) return data.event;
      }
    } catch {
      // Fallback
    }

    return this.fallbackEvents.find(e => e.slug === slug || e.id === slug) || null;
  }

  /**
   * Fetch hospitality packages
   */
  async getHospitalityPackages(): Promise<HospitalityPackage[]> {
    try {
      const response = await fetch(`${API_BASE}/api/hospitality-packages`, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(3000)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.packages && Array.isArray(data.packages) && data.packages.length > 0) {
          return data.packages;
        }
      }
    } catch {
      // Fallback
    }

    return this.fallbackPackages;
  }

  /**
   * Submit an event inquiry / booking request
   */
  async submitEventInquiry(inquiry: Omit<EventInquiry, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; inquiry: EventInquiry; storage: 'api' | 'fallback'; message: string }> {
    const generatedId = `BVE-${Date.now().toString().slice(-6)}`;
    const fullInquiry: EventInquiry = {
      ...inquiry,
      id: generatedId,
      createdAt: new Date().toISOString(),
      status: 'PENDING_REVIEW'
    };

    try {
      const response = await fetch(`${API_BASE}/api/event-inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullInquiry),
        signal: AbortSignal.timeout(5000)
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          inquiry: data.inquiry || fullInquiry,
          storage: 'api',
          message: 'Your inquiry has been logged in the Brentra Enterprise System. Our Chief Event Architect will contact you shortly.'
        };
      }
    } catch {
      // Fallback in-memory and localStorage
    }

    this.fallbackInquiries.unshift(fullInquiry);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const existing = JSON.parse(localStorage.getItem('bv_event_inquiries') || '[]');
        existing.unshift(fullInquiry);
        localStorage.setItem('bv_event_inquiries', JSON.stringify(existing.slice(0, 50)));
      }
    } catch {
      // Ignore localStorage issues
    }

    return {
      success: true,
      inquiry: fullInquiry,
      storage: 'fallback',
      message: 'Inquiry registered locally. Our event desk has also prepared a pre-filled WhatsApp confirmation.'
    };
  }

  /**
   * Fetch testimonials
   */
  getTestimonials(category?: EventCategory): EventTestimonial[] {
    if (!category || category === 'All') return EVENT_TESTIMONIALS;
    return EVENT_TESTIMONIALS.filter(t => t.eventCategory === category);
  }

  /**
   * Fetch past event media wall items
   */
  getPastMedia(category?: EventCategory): PastEventMedia[] {
    if (!category || category === 'All') return PAST_EVENT_MEDIA;
    return PAST_EVENT_MEDIA.filter(m => m.category === category);
  }

  /**
   * Generate WhatsApp link with full booking parameters pre-filled
   */
  generateWhatsAppUrl(inquiry: Partial<EventInquiry>, customNote?: string): string {
    const lines = [
      `*BRENTRA LUXURY EVENTS & HOSPITALITY DESK*`,
      `---------------------------------------`,
      `*Client:* ${inquiry.clientName || 'Valued Guest'}`,
      `*Phone:* ${inquiry.phone || 'Not specified'}`,
      `*Email:* ${inquiry.email || 'Not specified'}`,
      `*Event Type / Package:* ${inquiry.eventType || 'Custom Gala'}`,
      `*Event Date:* ${inquiry.eventDate || 'To be scheduled'}`,
      `*Expected Guests:* ${inquiry.estimatedGuests || 500} Attendees`,
      `*Proposed Venue:* ${inquiry.venuePreference || 'Patna / Bihar Venue'}`,
      `*Budget Bracket:* ${inquiry.budgetRange || 'Flexible'}`,
      `*Special Notes:* ${inquiry.specialRequests || customNote || 'Please provide date availability and architectural layout blueprints.'}`
    ];
    const encoded = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/919065296294?text=${encoded}`;
  }
}

export const eventsService = new EventsService();

