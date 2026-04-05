import React from 'react';
import { ARTICLES } from '../types';
import { NewsCard } from '../components/NewsCard';
import { ChevronDown } from 'lucide-react';

const Home: React.FC = () => {
  const featuredArticles = ARTICLES.slice(0, 4);
  const topics = [
    "Quantum Computing", "Renewable Energy", "European Travel", 
    "Architecture", "Space Exploration"
  ];

  return (
    <div className="max-w-5xl mx-auto w-full">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-2">
          For You
        </h1>
        <p className="text-on-surface-variant">
          Top stories based on your interests and reading history.
        </p>
      </header>

      <div className="space-y-12">
        {featuredArticles.map((article, index) => (
          <React.Fragment key={article.id}>
            <NewsCard article={article} />
            {index === 2 && (
              <section className="py-8 bg-surface-container-low rounded-xl px-8">
                <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-4">
                  Recommended for You
                </h3>
                <div className="flex flex-wrap gap-3">
                  {topics.map(topic => (
                    <button 
                      key={topic}
                      className="bg-orange-100 text-orange-900 px-5 py-2 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <button className="bg-surface-container-high text-primary px-8 py-3 rounded-full font-bold hover:bg-surface-container-highest transition-colors flex items-center gap-2">
          Show more stories
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Home;
