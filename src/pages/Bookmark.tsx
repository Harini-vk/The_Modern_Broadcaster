import React, { useEffect, useState } from 'react';
import { Bookmark, ExternalLink, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import API from "../api/axios";
import { Article } from "../types";

const BookmarkPage: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!localStorage.getItem("token")) {
        setLoading(false);
        return;
      }

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
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const removeBookmark = async (bookmarkId?: string) => {
    if (!bookmarkId) return;
    try {
      await API.delete(`/bookmarks/${bookmarkId}`);
      setBookmarks((prev) => prev.filter((item) => item.bookmarkId !== bookmarkId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface pt-28 px-6 max-w-screen-2xl mx-auto">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-serif font-bold mb-2">
          Saved Articles
        </h1>
        <p className="text-on-surface-variant">
          Your personal collection of saved stories.
        </p>
      </div>

      {loading && <p className="text-on-surface-variant">Loading bookmarks...</p>}

      {!loading && isLoggedIn && bookmarks.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarks.map((item) => (
            <motion.div
              key={item.bookmarkId || item.url}
              whileHover={{ scale: 1.02 }}
              className="bg-surface-container rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-primary font-medium">
                    {item.source || "News"}
                  </span>

                  <button onClick={() => removeBookmark(item.bookmarkId)}>
                    <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                  </button>
                </div>

                <h2 className="font-semibold text-lg mb-4">{item.title}</h2>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Read article <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && (!isLoggedIn || bookmarks.length === 0) && (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <Bookmark className="w-10 h-10 mb-4 text-on-surface-variant" />
          <p>
            {isLoggedIn
              ? "No bookmarks yet."
              : "Login first to save and view bookmarks."}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;