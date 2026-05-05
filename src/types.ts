export interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  source: string;
  publishedAt: string;

  // Optional fields (for UI flexibility)
  category?: string;
  readTime?: string;
}