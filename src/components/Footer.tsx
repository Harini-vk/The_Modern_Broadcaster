import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container border-t border-outline-variant mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="text-lg font-bold font-serif text-on-surface mb-2">
            Pulse<span className="text-primary">News</span>
          </div>
          <p className="text-on-surface-variant text-sm">
            © 2024 PulseNews Editorial Group. All rights reserved.
          </p>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-8">
          {['About Us', 'Terms of Service', 'Privacy Policy', 'Contact', 'Archive'].map((link) => (
            <Link 
              key={link}
              to="#" 
              className="text-on-surface-variant text-sm hover:underline decoration-primary transition-opacity opacity-80 hover:opacity-100"
            >
              {link}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
