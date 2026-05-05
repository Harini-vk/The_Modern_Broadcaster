import React from 'react';
import { Bookmark } from 'lucide-react';
import { motion } from 'motion/react';

const dummyBookmarks = [
  {
    id: 1,
    title: "The Future of Quantum Computing",
    category: "Technology",
    image: "https://source.unsplash.com/400x300/?technology",
    description: "Exploring the next frontier of computing power..."
  },
  {
    id: 2,
    title: "Urban Vertical Forests",
    category: "Environment",
    image: "https://source.unsplash.com/400x300/?forest",
    description: "How cities are becoming greener..."
  },
  {
    id: 3,
    title: "AI in Finance Markets",
    category: "Economy",
    image: "https://source.unsplash.com/400x300/?finance",
    description: "Artificial intelligence reshaping trading..."
  },
];

const BookmarkPage: React.FC = () => {
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

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyBookmarks.map((item) => (
          <motion.div
            key={item.id}
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
                  {item.category}
                </span>

                <Bookmark className="w-4 h-4 fill-primary text-primary cursor-pointer" />
              </div>

              <h2 className="font-semibold text-lg mb-2">
                {item.title}
              </h2>

              <p className="text-sm text-on-surface-variant">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state (optional later) */}
      {dummyBookmarks.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <Bookmark className="w-10 h-10 mb-4 text-on-surface-variant" />
          <p>No bookmarks yet</p>
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;