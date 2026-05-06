import React from 'react';
import { NewsCard } from '../components/NewsCard';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from "react";
import API from "../api/axios";
import { Article } from "../types";

const Home: React.FC = () => {
const [articles, setArticles] = useState<Article[]>([]);
const [trending, setTrending] = useState<Article[]>([]);
const [page, setPage] = useState(1);

const topics = [
  "Tech", "Sports", "Health", "Business"
];
const fetchNews = async (pageNum = 1) => {
  try {
    const res = await API.get(`/news?page=${pageNum}&limit=10`);
    setArticles(prev => [...prev, ...res.data.articles]);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchNews(1);
  const fetchTrending = async () => {
    try {
      const res = await API.get("/news/trending?limit=5");
      setTrending(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };
  fetchTrending();
}, []);

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
        {articles.map((article, index) => (
          <React.Fragment key={article.url}>
            <NewsCard article={article} />
            {index === 2 && (
              <section className="py-8 bg-surface-container-low rounded-xl px-8">
                <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-4">
                  Recommended for You
                </h3>
                <div className="flex flex-wrap gap-3">
                  {topics.map(topic => (
                    <button
                    onClick={() => {
  const nextPage = page + 1;
  setPage(nextPage);
  fetchNews(nextPage);
}} 
                      key={topic}
                      className="bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary/20 transition-colors"
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

      {trending.length > 0 && (
        <section className="mt-20 bg-surface-container-low rounded-xl p-8">
          <h3 className="text-xl font-bold mb-4">Trending Now</h3>
          <div className="space-y-4">
            {trending.map((item) => (
              <div key={item.url} className="flex items-center justify-between border-b border-outline-variant/40 pb-3 last:border-b-0">
                <p className="text-sm md:text-base font-medium text-on-surface pr-4">{item.title}</p>
                <span className="text-xs text-primary font-semibold whitespace-nowrap">
                  {item.views || 0} views
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-16 flex justify-center">
        <button
          onClick={() => {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchNews(nextPage);
          }}
          className="bg-surface-container-high text-primary px-8 py-3 rounded-full font-bold hover:bg-surface-container-highest transition-colors flex items-center gap-2"
        >
          Show more stories
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Home;
