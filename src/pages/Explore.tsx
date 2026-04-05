import React, { useState } from 'react';
import { ARTICLES, CATEGORIES } from '../types';
import { NewsCard } from '../components/NewsCard';
import { Sidebar } from '../components/Sidebar';
import { cn } from '../lib/utils';

const Explore: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredArticles = activeCategory === 'All' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto w-full">
      <header className="mb-12">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase mb-4">
          Live Feed
        </div>
        <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-on-surface leading-tight max-w-3xl">
          Global insights from the heart of modern <span className="italic text-primary">PulseNews</span>.
        </h1>
      </header>

      <section className="mb-12 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max pb-2">
          {CATEGORIES.slice(0, 6).map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-full transition-all duration-200 font-medium",
                activeCategory === category 
                  ? "bg-primary text-white shadow-sm" 
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <NewsCard key={article.id} article={article} />
            ))
          ) : (
            <div className="py-20 text-center text-on-surface-variant">
              No stories found in this category.
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Explore;
