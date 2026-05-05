import React, { useState, useEffect } from 'react';
import { NewsCard } from '../components/NewsCard';
import { Sidebar } from '../components/Sidebar';
import { cn } from '../lib/utils';
import API from "../api/axios";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";



const CATEGORIES = [
  "All",  "General", "Business", "Entertainment", "Technology", "Health", "Science", "Sports"
];

const Explore = () => {

  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const location = useLocation();
const params = new URLSearchParams(location.search);
const categoryFromURL = params.get("category");
const formatCategory = (cat: string | null | undefined): string =>
  cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : "All";

const [activeCategory, setActiveCategory] = useState(
  formatCategory(categoryFromURL)
);

  const fetchNews = async (pageNum = 1, selectedCategory = activeCategory) => {
    try {
      setLoading(true);

      const categoryParam =
        selectedCategory === "All"
          ? "general"
          : selectedCategory.toLowerCase();

      const res = await API.get(
        `/news?page=${pageNum}&limit=10&category=${categoryParam}`
      );

      setArticles(res.data.articles);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const selectedCategory = categoryFromURL || "general";

  setActiveCategory(formatCategory(selectedCategory));
  fetchNews(1, selectedCategory);

}, [location.search]);

  return (
    <div className="max-w-7xl mx-auto w-full">
      <header className="mb-12">
        <h1 className="text-5xl font-medium">Explore News</h1>
      </header>

      <section className="mb-12 overflow-x-auto">
        <div className="flex gap-2">
          {CATEGORIES.map(category => (
            <button
              type="button"
              key={category}
              onClick={() => {
  const categoryParam =
    category === "All" ? "general" : category.toLowerCase();

  navigate(`/explore?category=${categoryParam}`);
}}
              className={cn(
                "px-6 py-2 rounded-full",
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-200"
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
              <NewsCard key={index} article={article} />
            ))
          ) : (
            <p>No news found</p>
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