import React from 'react';
import { NewsCard } from '../components/NewsCard';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from "react";
import API from "../api/axios";
import { Article } from "../types";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
const [articles, setArticles] = useState<Article[]>([]);
const [personalizedArticles, setPersonalizedArticles] = useState<Article[]>([]);
const [trending, setTrending] = useState<Article[]>([]);
const [page, setPage] = useState(1);
const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

const topics = [
  "Tech", "Sports", "Health", "Business"
];
const fetchNews = async (pageNum = 1) => {
  try {
    const res = await API.get(`/news?page=${pageNum}&limit=10&category=all`);
    if (pageNum === 1) {
      setArticles(res.data.articles);
    } else {
      setArticles(prev => [...prev, ...res.data.articles]);
    }
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  const syncAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
  window.addEventListener("auth-changed", syncAuth);
  window.addEventListener("storage", syncAuth);

  fetchNews(1);

  const fetchPersonalized = async () => {
    try {
      if (!localStorage.getItem("token")) {
        setPersonalizedArticles([]);
        return;
      }
      const res = await API.get("/news/personalized");
      setPersonalizedArticles(res.data || []);
    } catch (err) {
      setPersonalizedArticles([]);
      console.log(err);
    }
  };

  const fetchTrending = async () => {
    try {
      const res = await API.get("/news/trending?limit=5");
      setTrending(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };
  fetchPersonalized();
  fetchTrending();
  return () => {
    window.removeEventListener("auth-changed", syncAuth);
    window.removeEventListener("storage", syncAuth);
  };
}, [isAuthenticated]);

useEffect(() => {
  const validateAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      await API.get("/auth/me");
      setIsAuthenticated(true);
    } catch {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      setIsAuthenticated(false);
      window.dispatchEvent(new Event("auth-changed"));
    }
  };

  validateAuth();
}, []);

const feedArticles = isAuthenticated ? personalizedArticles : articles;

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

      <section className="relative">
        <div className={isAuthenticated ? "space-y-12" : "space-y-12 opacity-40 pointer-events-none select-none"}>
          {feedArticles.map((article) => (
            <React.Fragment key={article.url}>
              <NewsCard article={article} />
            </React.Fragment>
          ))}
        </div>

{!isAuthenticated && (
  <div className="absolute top-52 left-1/2 -translate-x-1/2 z-20 px-4 w-full flex justify-center">
    
    <div
      className="
        bg-white/95 dark:bg-[#111827]/95
        backdrop-blur-md
        rounded-2xl
        shadow-2xl
        px-6
        py-5
        flex
        items-center
        gap-5
        max-w-2xl
        w-full
        border
        border-slate-200
        dark:border-slate-700
      "
    >
      
      <div className="flex-1">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Personalized News Awaits
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-300">
          Sign in to unlock curated stories based on your interests.
        </p>
      </div>

      <Link
        to="/auth"
        className="
          bg-blue-300
          text-black
          font-semibold
          px-5
          py-2.5
          rounded-xl
          hover:scale-105
          transition-all
          whitespace-nowrap
        "
      >
        Signup / Login
      </Link>
    </div>
  </div>
)}
      </section>

      <section className="py-8 bg-surface-container-low rounded-xl px-8 mt-12">
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
