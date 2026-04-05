export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  authorImageUrl?: string;
}

export type Category = 'All' | 'Technology' | 'Environment' | 'Economy' | 'Culture' | 'Sports' | 'Business' | 'Stocks' | 'Crime';

export const CATEGORIES: Category[] = [
  'All',
  'Technology',
  'Environment',
  'Economy',
  'Culture',
  'Sports',
  'Business',
  'Stocks',
  'Crime'
];

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The New Silk Road: How Silicon Valley is Redefining Global Infrastructure',
    excerpt: 'As traditional trade routes face unprecedented strain, a new era of digital-first logistics is emerging from the heart of the tech capital, promising to bridge the gap between continents with AI-driven efficiency.',
    category: 'Technology',
    readTime: '8 min read',
    author: 'Financial Echo',
    publishedAt: '2 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    authorImageUrl: 'https://i.pravatar.cc/150?u=1'
  },
  {
    id: '2',
    title: 'Breath of Fresh Air: The Unexpected Renaissance of Urban Forests',
    excerpt: 'Metropolises across the globe are tearing up pavement to make way for micro-forests, signaling a drastic shift in urban planning that prioritizes biodiversity and mental health over concrete expansion.',
    category: 'Environment',
    readTime: '5 min read',
    author: 'The Green Journal',
    publishedAt: '4 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Beyond the Dollar: The Quiet Rise of Localized Barter Systems',
    excerpt: 'In small pockets of Western Europe, communities are returning to ancient trade methods powered by modern blockchain security, challenging the hegemony of traditional central banks.',
    category: 'Economy',
    readTime: '12 min read',
    author: 'Global Ledger',
    publishedAt: '6 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'The Analog Revival: Why Gen Z is Ditching the Cloud for Physical Media',
    excerpt: 'In an era of infinite streaming, the tangible connection of vinyl records and film photography is making an explosive comeback among the most digital-native generation yet.',
    category: 'Culture',
    readTime: '6 min read',
    author: 'Modern Muse',
    publishedAt: 'Yesterday',
    imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    title: 'Market Volatility Hits Record Highs Amidst Global Policy Shifts',
    excerpt: 'Investors are bracing for a turbulent quarter as major central banks signal aggressive interest rate adjustments to combat persistent inflationary pressures across emerging markets.',
    category: 'Stocks',
    readTime: '10 min read',
    author: 'Wall St. Journal',
    publishedAt: '4 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1611974717483-582851855bfa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    title: 'Technological Integration Redefines the Modern Athletic Experience',
    excerpt: 'From AI-driven performance tracking to immersive mixed reality viewing for fans, the intersection of sports and software is creating a new paradigm for global competition.',
    category: 'Sports',
    readTime: '7 min read',
    author: 'Sports Tech Daily',
    publishedAt: '7 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800'
  }
];

export const TRENDING: Article[] = [
  {
    id: 't1',
    title: 'Cryptocurrency regulations reach critical legislative milestone in Europe.',
    category: 'Business',
    excerpt: '',
    readTime: '',
    author: '',
    publishedAt: '',
    imageUrl: ''
  },
  {
    id: 't2',
    title: 'New sustainable energy initiative proposed for coastal metropolitan regions.',
    category: 'Environment',
    excerpt: '',
    readTime: '',
    author: '',
    publishedAt: '',
    imageUrl: ''
  },
  {
    id: 't3',
    title: 'Global supply chain disruptions expected to ease by third quarter.',
    category: 'Business',
    excerpt: '',
    readTime: '',
    author: '',
    publishedAt: '',
    imageUrl: ''
  }
];
