import React, { useState, useEffect } from 'react';
import { NewsCard } from '../components/NewsCard';
import { Sidebar } from '../components/Sidebar';
import { cn } from '../lib/utils';
import API from "../api/axios";
import { useLocation } from "react-router-dom";
import { Article } from "../types";

import { useNavigate } from "react-router-dom";



const CATEGORIES = [
  "All",  "General", "Business", "Entertainment", "Technology", "Health", "Science", "Sports"
];

const Explore = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const location = useLocation();
const params = new URLSearchParams(location.search);
const categoryFromURL = params.get("category");
const searchFromURL = params.get("search");
const formatCategory = (cat: string | null | undefined): string =>
  cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : "All";

const [activeCategory, setActiveCategory] = useState(
  formatCategory(categoryFromURL)
);

  const fetchNews = async (selectedCategory = activeCategory) => {
    try {
      setLoading(true);

      if (searchFromURL) {
        const res = await API.get(`/news/search?q=${encodeURIComponent(searchFromURL)}`);
        setArticles(res.data || []);
        return;
      }

      const categoryParam =
        selectedCategory === "All"
          ? "general"
          : selectedCategory.toLowerCase();

      const res = await API.get(
        `/news?page=1&limit=10&category=${categoryParam}`
      );

      setArticles(res.data.articles);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const selectedCategory = categoryFromURL || "all";

  setActiveCategory(formatCategory(selectedCategory));
  fetchNews(selectedCategory);

}, [location.search]);

  return (
    <div className="max-w-7xl mx-auto w-full">
      <header className="mb-12">
        <h1 className="text-5xl font-medium">
          {searchFromURL ? `Search: "${searchFromURL}"` : "Explore News"}
        </h1>
      </header>

      <section className={cn("mb-12 overflow-x-auto", searchFromURL ? "opacity-40 pointer-events-none" : "")}>
        <div className="flex gap-2">
          {CATEGORIES.map(category => (
            <button
              type="button"
              key={category}
              onClick={() => {
  const categoryParam =
    category === "All" ? "all" : category.toLowerCase();

  navigate(`/explore?category=${categoryParam}`);
}}
              className={cn(
                "px-6 py-2 rounded-full",
                activeCategory === category
                  ? "bg-blue-300 text-black"
                  : "bg-gray-200 text-black"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          {loading ? (
            <p>Loading...</p>
          ) : articles.length > 0 ? (
            articles.map((article, index) => (
              <NewsCard key={article.url || index} article={article} />
            ))
          ) : (
            <p>{searchFromURL ? "No matching articles found." : "No news found"}</p>
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