import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Article } from '../types';
import { NewsCard } from '../components/NewsCard';
import API from "../api/axios";
import toast from 'react-hot-toast';


const FALLBACK_IMAGE = 'https://via.placeholder.com/1200x600?text=No+Image';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const stateArticle = (location.state as { article?: Article } | null)?.article;
  const hasToken = !!localStorage.getItem("token");

  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, location.search]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!hasToken) return;
      try {
        const res = await API.get("/bookmarks");
        setBookmarks(
          (res.data || []).map((item: any) => ({
            ...item,
            bookmarkId: item._id
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookmarks();
  }, [hasToken]);

  const article = useMemo(() => {
    if (stateArticle) return stateArticle;
    return null;
  }, [stateArticle]);

  useEffect(() => {
    const recordView = async () => {
      if (!article) return;
      try {
        await API.post("/news/engagement", {
          url: article.url,
          title: article.title,
          image: article.image,
          source: article.source,
          category: article.category
        });
      } catch (error) {
        console.log(error);
      }
    };

    recordView();
  }, [article]);

  const relatedArticles = useMemo(() => {
    if (!article?.url) return [];
    return bookmarks.filter((item) => item.url && item.url !== article.url).slice(0, 3);
  }, [article, bookmarks]);

  const saved = !!article?.url && bookmarks.some((item) => item.url === article.url);



  const handleBookmark = async () => {
    if (!article) return;
    if (!hasToken) {
     toast.error("Please login to save bookmarks.");
      return;
    }

    try {
      if (saved) {
        const target = bookmarks.find((item) => item.url === article.url);
        if (!target?.bookmarkId) return;
        await API.delete(`/bookmarks/${target.bookmarkId}`);
        setBookmarks((prev) => prev.filter((item) => item.url !== article.url));
      } else {
        const res = await API.post("/bookmarks", {
          title: article.title,
          url: article.url,
          image: article.image,
          source: article.source
        });
        setBookmarks((prev) => [...prev, { ...article, bookmarkId: res.data._id }]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    if (!article?.url) return;

    if (navigator.share) {
      await navigator.share({
        title: article.title,
        text: article.description,
        url: article.url,
      });
      return;
    }

    await navigator.clipboard.writeText(article.url);
    toast.success('Article link copied to clipboard.');
  };

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-2xl font-bold mb-3">Article not found</h2>
        <p className="text-on-surface-variant mb-6 max-w-lg">
          Open an article from the home feed to view full details. This page now relies on live API articles instead of the old static dataset.
        </p>
        <Link to="/" className="text-primary hover:underline font-medium">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <header className="mb-12">
        <div className="flex justify-center mb-6">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
            {article.category || article.source || 'News'}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight text-on-surface mb-8 text-center max-w-4xl mx-auto">
          {article.title}
        </h1>
        <div className="flex items-center justify-center gap-2 text-sm text-on-surface-variant">
          <span>{article.source || 'Unknown source'}</span>
          <span className="opacity-30">•</span>
          <span>{new Date(article.publishedAt).toLocaleString()}</span>
        </div>
      </header>

      <figure className="mb-12 -mx-6 md:-mx-12">
        <div className="aspect-[21/9] overflow-hidden rounded-xl md:rounded-2xl shadow-2xl">
          <img
            src={article.image || FALLBACK_IMAGE}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </figure>

      <div className="news-content max-w-2xl mx-auto">
        <ReactMarkdown>{article.description || 'No description available.'}</ReactMarkdown>
        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 text-primary hover:underline font-semibold"
          >
            Read original article
          </a>
        )}
      </div>

      <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-outline-variant flex items-center justify-end gap-4">
        <span className="text-xs font-medium text-on-surface-variant">Share this story:</span>
        <button
          onClick={handleShare}
          className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant"
        >
          <Share2 className="w-5 h-5" />
        </button>
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-full transition cursor-pointer ${
            saved ? 'bg-blue-100 text-blue-500' : 'hover:bg-surface-container text-on-surface-variant'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${saved ? 'fill-blue-500' : ''}`} />
        </button>
      </div>

      {relatedArticles.length > 0 && (
        <section className="mt-24 pt-16 border-t border-outline-variant">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold font-serif text-on-surface">Related Stories</h3>
            <Link to="/bookmarks" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
              See Saved <span className="text-lg">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((related) => (
              <NewsCard key={related.url} article={related} layout="vertical" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default NewsDetail;
