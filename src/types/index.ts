export type VerticalId = 
  | 'it-solutions'
  | 'fresh-fmcg'
  | 'realty-infrastructure'
  | 'facility-services'
  | 'events-hospitality'
  | 'building-materials'
  | 'ventures';

export interface Director {
  id: string;
  name: string;
  role: string;
  division: string;
  focus: string;
  quote: string;
  message: string;
  initials: string;
  accentColor: string;
  linkedin?: string;
}

export interface HeroSlide {
  id: number;
  verticalId: VerticalId;
  tag: string;
  headline: string;
  subtext: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  badge: string;
  bgGradient: string;
  accentColor: string;
  iconName: string;
  stats: { label: string; value: string };
}

export interface QuoteFormState {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  vertical: VerticalId;
  serviceDetail: string;
  notes: string;
}
