import React from 'react';
import { TrendingUp, Mail } from 'lucide-react';
import { TRENDING } from '../types';

export const Sidebar: React.FC = () => {
  return (
    <aside className="space-y-12">
      <div className="bg-surface-container-low p-8 rounded-2xl">
        <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Trending Now
        </h3>
        
        <ul className="space-y-8">
          {TRENDING.map((item, index) => (
            <li key={item.id}>
              <a href="#" className="group block">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
                  0{index + 1}
                </span>
                <p className="text-on-surface font-serif text-lg font-medium group-hover:underline leading-snug">
                  {item.title}
                </p>
              </a>
            </li>
          ))}
        </ul>
        
        <div className="mt-10 p-6 rounded-xl bg-primary text-white">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Subscribe to Newsletters
          </h4>
          <p className="text-sm opacity-90 mb-4">
            Get the most important editorial pieces delivered directly to your inbox daily.
          </p>
          <button className="w-full py-2.5 bg-white text-primary font-bold rounded-full text-sm hover:bg-white/90 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    </aside>
  );
};
