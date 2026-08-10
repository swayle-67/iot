export interface SearchItem {
  title: string;
  path: string;
  keywords: string[];
}

export const SEARCH_INDEX: SearchItem[] = [
  { title: 'Home', path: '/', keywords: ['home', 'sim', 'connectivity', 'one sim'] },
  { title: 'About Us', path: '/about', keywords: ['about', 'company', 'mvno', 'years', 'history'] },
  { title: 'Industries', path: '/industries', keywords: ['fleet', 'logistics', 'pos', 'mining', 'healthcare', 'telematics', 'agriculture'] },
  { title: 'Coverage', path: '/coverage', keywords: ['coverage', 'countries', 'networks', 'roaming', 'sadc'] },
  { title: 'Pricing', path: '/pricing', keywords: ['pricing', 'plans', 'cost', 'data', 'quote'] },
  { title: 'Contact Us', path: '/contact', keywords: ['contact', 'consultation', 'support', 'noc'] },
];