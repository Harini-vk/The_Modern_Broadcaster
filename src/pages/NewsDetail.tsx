import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Bookmark, User } from 'lucide-react';
import { ARTICLES } from '../types';
import { NewsCard } from '../components/NewsCard';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = ARTICLES.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <Link to="/" className="text-primary hover:underline">Back to Home</Link>
      </div>
    );
  }

  const relatedArticles = ARTICLES.filter(a => a.id !== id).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Link */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex justify-center mb-6">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
            {article.category}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight text-on-surface mb-8 text-center max-w-4xl mx-auto">
          {article.title}
        </h1>
        
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
              {article.authorImageUrl ? (
                <img src={article.authorImageUrl} alt={article.author} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-5 h-5 text-on-surface-variant" />
                </div>
              )}
            </div>
            <span className="font-bold text-on-surface text-sm">{article.author}</span>
          </div>
          <span className="opacity-30">•</span>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <span>{article.publishedAt}</span>
            <span className="opacity-30">•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <figure className="mb-16 -mx-6 md:-mx-12">
        <div className="aspect-[21/9] overflow-hidden rounded-xl md:rounded-2xl shadow-2xl">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        {article.imageCaption && (
          <figcaption className="text-center mt-6 text-sm text-on-surface-variant italic px-6 max-w-2xl mx-auto">
            {article.imageCaption}
          </figcaption>
        )}
      </figure>

      {/* Content */}
      <div className="news-content max-w-2xl mx-auto">
        <ReactMarkdown>{article.content || ''}</ReactMarkdown>
      </div>

      {/* Footer Actions */}
      <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap gap-2">
          {article.tags?.map(tag => (
            <span key={tag} className="bg-surface-container-low px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-on-surface-variant">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-on-surface-variant">Share this story:</span>
          <button className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Author Bio (Optional) */}
      {article.authorBio && (
        <div className="max-w-2xl mx-auto mt-16 p-8 rounded-2xl bg-surface-container-low flex gap-6 items-start">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-surface-container">
            {article.authorImageUrl ? (
              <img src={article.authorImageUrl} alt={article.author} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-8 h-8 text-on-surface-variant" />
              </div>
            )}
          </div>
          <div>
            <h4 className="font-bold text-on-surface mb-2">{article.author}</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {article.authorBio}
            </p>
            <div className="flex gap-4 mt-4">
              <button className="text-xs font-bold text-primary hover:underline">Follow</button>
              <button className="text-xs font-bold text-on-surface-variant hover:underline">@{article.author.toLowerCase().replace(' ', '_')}_tech</button>
            </div>
          </div>
        </div>
      )}

      {/* Related Stories */}
      <section className="mt-24 pt-16 border-t border-outline-variant">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-3xl font-bold font-serif text-on-surface">Related Stories</h3>
          <Link to="/explore" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
            See All <span className="text-lg">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedArticles.map(related => (
            <NewsCard key={related.id} article={related} layout="vertical" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;
