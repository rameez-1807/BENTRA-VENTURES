export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
  durationMins?: number;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  name: string;
  tagline: string;
  rating: number;
  reviewsCount: number;
  durationMins: number;
  price: number;
  originalPrice: number;
  discountPct: number;
  image: string;
  badge?: string; // e.g. "Bestseller", "Trending", "UC Certified"
  description: string;
  included: string[];
  excluded: string[];
  addOns: ServiceAddon[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  shortName: string;
  iconName: string;
  startingPrice: number;
  description: string;
  bannerImage: string;
  servicesCount: number;
}

export interface CartItem {
  service: ServiceItem;
  quantity: number;
  selectedAddons: ServiceAddon[];
}

export interface Technician {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  jobsCompleted: number;
  specialization: string;
  verified: boolean;
  vehicleNo?: string;
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'pro_assigned' 
  | 'on_the_way' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled';

export interface BookingAddress {
  fullName: string;
  phone: string;
  alternatePhone?: string;
  locality: string;
  flatHouseNo: string;
  landmark: string;
  city: string;
  pincode: string;
}

export interface BookingOrder {
  id: string;
  createdAt: string;
  customer: BookingAddress;
  items: {
    serviceId: string;
    serviceName: string;
    price: number;
    quantity: number;
    addons: ServiceAddon[];
  }[];
  slotDate: string;
  slotTime: string;
  paymentMethod: 'cash_after_service' | 'upi_online' | 'card_online';
  paymentStatus: 'paid' | 'pending';
  subtotal: number;
  serviceFee: number;
  discount: number;
  promoCode?: string;
  totalAmount: number;
  status: BookingStatus;
  technician?: Technician;
  customerNotes?: string;
  otpCode: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  locality: string;
  serviceName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBooking: boolean;
}
