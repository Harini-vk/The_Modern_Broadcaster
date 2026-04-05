import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container border-t border-outline-variant mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="text-lg font-bold font-serif text-on-surface mb-2">
            The Modern Broadcaster
          </div>
          <p className="text-on-surface-variant text-sm">
            © 2024 The Modern Broadcaster. All rights reserved.
          </p>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-8">
          <Link to="#" className="text-on-surface-variant text-sm hover:underline decoration-primary transition-opacity opacity-80 hover:opacity-100">
            About
          </Link>
          <Link to="#" className="text-on-surface-variant text-sm hover:underline decoration-primary transition-opacity opacity-80 hover:opacity-100">
            Privacy Policy
          </Link>
          <Link to="#" className="text-on-surface-variant text-sm hover:underline decoration-primary transition-opacity opacity-80 hover:opacity-100">
            Terms of Service
          </Link>
          <Link to="#" className="text-on-surface-variant text-sm hover:underline decoration-primary transition-opacity opacity-80 hover:opacity-100">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};
