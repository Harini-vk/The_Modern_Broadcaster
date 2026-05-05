import React from 'react';
import { Article } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

interface NewsCardProps {
  article: Article;
  layout?: 'horizontal' | 'vertical';
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, layout = 'horizontal' }) => {
  const isHorizontal = layout === 'horizontal';
  const navigate = useNavigate();

  const fallback = "https://via.placeholder.com/400x200?text=No+Image";

  const handleClick = () => {
    navigate(`/news/${encodeURIComponent(article.url)}`, {
  state: { article }
});
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter") handleClick();
      }}
      className={cn(
        "group cursor-pointer flex gap-8 items-start transition-all hover:scale-[1.01]",
        isHorizontal ? "flex-col md:flex-row" : "flex-col"
      )}
    >
      {/* IMAGE */}
      <div className={cn(
        "overflow-hidden rounded-xl bg-surface-container-low relative",
        isHorizontal ? "w-full md:w-2/5 aspect-[4/3]" : "w-full aspect-video"
      )}>
        <img 
          src={article.image || fallback}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = fallback;
          }}
        />
      </div>

      {/* CONTENT */}
      <div className={cn(
        "w-full",
        isHorizontal ? "md:w-3/5" : "mt-4"
      )}>
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
            {article.category || article.source || "News"}
          </span>

          {!isHorizontal && article.readTime && (
            <span className="text-on-surface-variant text-[10px] font-medium">
              {article.readTime}
            </span>
          )}
        </div>

        <h2 className={cn(
          "font-bold leading-tight text-on-surface group-hover:text-primary transition-colors mb-3",
          isHorizontal ? "text-2xl md:text-3xl" : "text-xl"
        )}>
          {article.title}
        </h2>

        <p className={cn(
          "text-on-surface-variant line-clamp-3 mb-4 leading-relaxed",
          isHorizontal ? "text-lg" : "text-sm"
        )}>
          {article.description || "No description available"}
        </p>

        <div className="flex items-center gap-3 text-xs text-on-surface-variant">
          <span className="font-bold text-on-surface">
            {article.source}
          </span>

          {isHorizontal && (
            <>
              <span className="opacity-30">•</span>
              <span>
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString()
                  : "Unknown date"}
              </span>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
};