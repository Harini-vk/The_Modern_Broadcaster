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

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/news/${article.id}`)}
      className={cn(
        "group cursor-pointer flex gap-8 items-start transition-all",
        isHorizontal ? "flex-col md:flex-row" : "flex-col"
      )}
    >
      <div className={cn(
        "overflow-hidden rounded-xl bg-surface-container-low relative",
        isHorizontal ? "w-full md:w-2/5 aspect-[4/3]" : "w-full aspect-video"
      )}>
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className={cn(
        "w-full",
        isHorizontal ? "md:w-3/5" : "mt-4"
      )}>
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
            {article.category}
          </span>
          {!isHorizontal && (
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
          {article.excerpt}
        </p>
        
        <div className="flex items-center gap-3 text-xs text-on-surface-variant">
          <span className="font-bold text-on-surface">{article.author}</span>
          {isHorizontal && (
            <>
              <span className="opacity-30">•</span>
              <span>{article.publishedAt}</span>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
};
