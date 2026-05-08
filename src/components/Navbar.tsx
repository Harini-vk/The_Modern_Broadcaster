import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, useScroll, useSpring } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { Bookmark } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
    window.addEventListener("auth-changed", syncAuth);
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("auth-changed", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const submitSearch = () => {
    const query = searchText.trim();
    if (!query) return;
    navigate(`/explore?search=${encodeURIComponent(query)}`);
  };

  const isAuthPage = location.pathname === '/auth';

  if (isAuthPage) return null;

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "glass shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <div className="max-w-screen-2xl mx-auto px-6 flex justify-between items-center">
        <Link to="/explore?category=all" className="text-2xl font-bold font-serif tracking-tight text-on-surface flex items-center gap-1">
          Pulse<span className="text-primary">News</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {['General', 'Business', 'Technology', 'Entertainment'].map((cat) => {
const categoryMap: Record<string, string> = {
  General: "general",
  Business: "business",
  Technology: "technology",
  Entertainment: "entertainment"
};
  return (
    <Link 
      key={cat}
      to={`/explore?category=${categoryMap[cat]}`}
      className={cn(
        "text-sm font-medium transition-colors relative py-1",
        "text-on-surface-variant hover:text-primary"
      )}
    >
      {cat}
    </Link>
  );
})}


        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 mr-2">
            <Link 
              to="/personalized" 
              className={cn(
                "text-sm font-medium transition-colors relative py-1",
                location.pathname === '/personalized' 
                  ? "text-primary font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" 
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              Personalized
            </Link>
            <Link 
              to="/explore" 
              className={cn(
                "text-sm font-medium transition-colors relative py-1",
                location.pathname === '/explore' 
                  ? "text-primary font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" 
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              Explore
            </Link>
            {isAuthenticated && (
              <Link 
            to="/bookmarks" 
            className={cn(
              "flex items-center gap-1 text-sm font-medium transition-colors relative py-1",
              location.pathname === '/bookmarks'
                ? "text-primary font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            <Bookmark className="w-4 h-4" />
            Bookmarks
          </Link>
            )}
          </div>

          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  submitSearch();
                }
              }}
              className="bg-surface-container-highest border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary w-64 transition-all outline-none text-on-surface"
            />
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {isAuthenticated ? (
            <Link 
              to="/preferences" 
              className="p-2 rounded-full hover:bg-surface-container transition-colors"
            >
              <User className="w-5 h-5 text-on-surface" />
            </Link>
          ) : (
            <Link
              to="/auth"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          )}
          <button className="md:hidden p-2 text-on-surface">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
