import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Auth = lazy(() => import('./pages/Auth'));
const Bookmark = lazy(() => import('./pages/Bookmark'));
const Preferences = lazy(() => import('./pages/Preferences'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface transition-colors duration-300">
      <Navbar />
      <main className={isAuthPage ? "flex-grow" : "flex-grow pt-24 pb-12 px-6"}>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <AnimatePresence mode="wait">
            <motion.div
              key="page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};


export default function App() {
  return (
    <ThemeProvider>
        <Toaster
    position="top-right"
    toastOptions={{
      style: {
        background: "#111827",
        color: "#fff",
        border: "1px solid #374151",
      },
      success: {
        iconTheme: {
          primary: "#93c5fd",
          secondary: "#000",
        },
      },
      error: {
        iconTheme: {
          primary: "#ef4444",
          secondary: "#fff",
        },
      },
    }}
  />

      <Router>
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/personalized" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/bookmarks" element={<Bookmark/>} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/news/:id" element={<NewsDetail />} />
          </Routes>
        </PageWrapper>
      </Router>
    </ThemeProvider>
  );
}
