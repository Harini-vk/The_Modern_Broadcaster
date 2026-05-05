import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TowerControl as RadioTower, Quote, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

import API from "../api/axios";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);

    alert("Login successful");
    navigate("/"); // go to home

  } catch (err) {
    alert("Login failed");
  }
};

const handleSignup = async () => {
  try {
    await API.post("/auth/signup", {
      name,
      email,
      password
    });

    alert("Signup successful! Please login");

  } catch (err) {
    alert("Signup failed");
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isLogin) {
    await handleLogin();
  } else {
    await handleSignup();
  }
};
  

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Branding & Narrative */}
      <section className="hidden md:flex md:w-1/2 bg-primary relative flex-col justify-between p-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white mb-12">
            <RadioTower className="w-10 h-10" />
            <h1 className="font-serif text-3xl font-bold tracking-tight">The Modern Broadcaster</h1>
          </div>
          
          <div className="max-w-md space-y-6">
            <h2 className="font-serif text-5xl lg:text-6xl text-white leading-tight">
              Truth, curated for the modern mind.
            </h2>
            <p className="text-white/80 text-lg font-light leading-relaxed">
              Join an elite circle of readers who value depth over noise. Experience journalism that breathes through intentional design and uncompromising clarity.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-blue-200 fill-blue-200" />
              <span className="text-xs uppercase tracking-widest text-white/70 font-semibold">Editorial Pick</span>
            </div>
            <p className="italic text-white font-serif text-xl mb-4 leading-snug">
              "The design reflects the authority of the content. Finally, a news platform that respects my eyes."
            </p>
            <div className="flex items-center gap-3">
              <img 
                src="https://i.pravatar.cc/150?u=julian" 
                className="w-10 h-10 rounded-full border border-white/20" 
                alt="Julian Thorne"
              />
              <div className="text-sm">
                <p className="font-bold text-white">Julian Thorne</p>
                <p className="text-white/60">Digital Strategist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Interaction */}
      <section className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-surface">
        <div className="w-full max-w-md space-y-8">
          <div className="md:hidden flex items-center justify-center gap-2 mb-12">
            <RadioTower className="w-8 h-8 text-primary" />
            <h1 className="font-serif text-2xl font-bold tracking-tight text-on-surface">The Modern Broadcaster</h1>
          </div>

          <div className="flex p-1 bg-surface-container rounded-full mb-10">
            <button 
              onClick={() => setIsLogin(true)}
              className={cn(
                "flex-1 py-2.5 text-sm font-semibold rounded-full transition-all duration-300",
                isLogin ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={cn(
                "flex-1 py-2.5 text-sm font-semibold rounded-full transition-all duration-300",
                !isLogin ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              Register
            </button>
          </div>

          <div className="space-y-6">
            <header className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-on-surface">
                {isLogin ? "Welcome back." : "Create your account."}
              </h2>
              <p className="text-on-surface-variant">
                {isLogin ? "Sign in to access your personalized feed." : "Join our community of modern thinkers."}
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                {!isLogin && (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-on-surface ml-1">Name</label>
    <input
      type="text"
      placeholder="Your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-3.5 bg-surface-container-highest rounded-xl outline-none"
      required
    />
  </div>
)}
                <label className="text-sm font-semibold text-on-surface ml-1" htmlFor="email">Email address</label>
<input 
  id="email"
  type="email"
  placeholder="name@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full px-4 py-3.5 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary transition-all text-on-surface outline-none"
  required
/>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-semibold text-on-surface" htmlFor="password">Password</label>
                  {isLogin && <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot?</a>}
                </div>
                <div className="relative">
               <input 
  id="password"
  type={showPassword ? "text" : "password"}
  placeholder="••••••••"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full px-4 py-3.5 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary transition-all text-on-surface outline-none"
  required
/>
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-full font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-[0.98]"
              >
                {isLogin ? "Continue to Broadcaster" : "Create Account"}
              </button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-surface px-4 text-on-surface-variant font-medium uppercase tracking-widest">OR CONTINUE WITH</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 border border-outline-variant/30 rounded-xl hover:bg-surface-container-low transition-colors">
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                <span className="text-sm font-semibold">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-3 border border-outline-variant/30 rounded-xl hover:bg-surface-container-low transition-colors">
                <span className="text-sm font-semibold">Apple</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
