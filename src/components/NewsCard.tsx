import React from 'react';
import { Article } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface NewsCardProps {
  article: Article;
  layout?: 'horizontal' | 'vertical';
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, layout = 'horizontal' }) => {
  const isHorizontal = layout === 'horizontal';

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
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
        isHorizontal ? "md:w-3/5" : ""
      )}>
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
            {article.category}
          </span>
          <span className="text-on-surface-variant text-xs font-medium">
            {article.readTime}
          </span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-on-surface group-hover:text-primary transition-colors mb-4">
          {article.title}
        </h2>
        
        <p className="text-on-surface-variant line-clamp-3 mb-6 text-lg leading-relaxed">
          {article.excerpt}
        </p>
        
        <div className="flex items-center gap-3 text-sm text-on-surface-variant">
          <span className="font-bold text-on-surface">{article.author}</span>
          <span className="opacity-30">•</span>
          <span>{article.publishedAt}</span>
        </div>
      </div>
    </motion.article>
  );
};
