export type ActiveSection = 'home' | 'about' | 'industries' | 'coverage' | 'pricing' | 'contact';

export interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  category: 'fleet-logistics' | 'industrial-retail' | 'utilities-health';
  description: string;
  iconName: string;
  imageUrl: string;
}

export interface ReasonItem {
  id: number;
  badge: string;
  title: string;
  description: string;
  icon: string;
}

export interface PartnerLogo {
  name: string;
  logoText: string;
  color: string;
}
