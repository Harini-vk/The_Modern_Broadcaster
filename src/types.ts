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
  content?: string;
  tags?: string[];
  authorBio?: string;
  imageCaption?: string;
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
    title: 'The Future of Quantum Computing: Beyond the Digital Frontier',
    excerpt: 'The silicon revolution that powered the last half-century is reaching its physical limits. As transistors shrink to the size of a few atoms, the strange laws of quantum mechanics begin to interfere with their operation.',
    category: 'Technology',
    readTime: '5 min read',
    author: 'Julian Thorne',
    publishedAt: 'Oct 24, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
    authorImageUrl: 'https://i.pravatar.cc/150?u=julian',
    imageCaption: 'Experimental quantum processor utilizing trapped-ion technology for advanced neural simulations. Credits: Quantum Lab 4.',
    tags: ['QUANTUM', 'FUTURETECH', 'COMPUTING'],
    authorBio: 'Senior Technology Correspondent for PulseNews. Formerly an engineer at CERN, Julian covers the intersection of deep tech, physics, and global security.',
    content: `The silicon revolution that powered the last half-century is reaching its physical limits. As transistors shrink to the size of a few atoms, the strange laws of quantum mechanics begin to interfere with their operation. Yet, in this very challenge lies the seed of the next great leap in human computation.

Quantum computing isn't just about making computers faster; it's about fundamentally redefining how information is processed. While a classical bit can be either 0 or 1, a quantum bit, or qubit, can exist in multiple states simultaneously through a phenomenon known as superposition.

## The Entanglement Edge

Beyond superposition, "entanglement" allows qubits that are separated by vast distances to be perfectly correlated. This connectivity creates a computational fabric capable of solving problems that would take today's most powerful supercomputers thousands of years to crack.

> "We are no longer just coding logic; we are choreographing the very building blocks of the universe to answer questions we didn't even know how to ask."
> — Dr. Sarah Chen, Lead Researcher at Q-Alpha

Industries from pharmacology to cybersecurity are bracing for the "Quantum Decryption Event." Within the next decade, researchers estimate that a sufficiently powerful quantum machine could render current encryption standards obsolete. Conversely, it could also help us discover carbon-capture materials and life-saving drugs in a fraction of the current time.

## The Challenge of Coherence

However, the road to "Quantum Supremacy" is paved with thermal noise and environmental interference. Qubits are notoriously fragile, requiring temperatures colder than deep space to maintain stability. Any slight vibration can cause "decoherence," leading to calculation errors.`
  },
  {
    id: '2',
    title: 'The New Guardians: How AI is Protecting the Cloud',
    excerpt: 'Exploring the rise of autonomous defensive measures in global data centers.',
    category: 'Security',
    readTime: '6 min read',
    author: 'Elena Vance',
    publishedAt: 'Oct 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    authorImageUrl: 'https://i.pravatar.cc/150?u=elena',
    content: 'Full content for AI security article...'
  },
  {
    id: '3',
    title: 'Orbiting Data: The Rise of Satellite Servers',
    excerpt: 'Why the future of the internet might be floating 2,000 kilometers above us.',
    category: 'Space',
    readTime: '7 min read',
    author: 'Marcus Sol',
    publishedAt: 'Oct 22, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    authorImageUrl: 'https://i.pravatar.cc/150?u=marcus',
    content: 'Full content for satellite servers article...'
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
