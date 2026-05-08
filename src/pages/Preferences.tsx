import React, { useState, useEffect } from 'react';
import { Settings, Check, ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const CATEGORIES = [
  "Business",
  "Entertainment",
  "General",
  "Health",
  "Science",
  "Sports",
  "Technology",
  "Culture"
];
import API from "../api/axios";
import { cn } from '../lib/utils';
import { useTheme } from '../components/ThemeProvider';


const Preferences: React.FC = () => {
  const [interests, setInterests] = useState(['Technology', 'Business']);
  // const [readingMode, setReadingMode] = useState('Light');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  

const toggleInterest = async (category: string) => {
  const cat = category.toLowerCase(); // ✅ normalize

  let updated;

  if (interests.includes(cat)) {
    updated = interests.filter(c => c !== cat);
  } else {
    updated = [...interests, cat];
  }

  setInterests(updated);

  try {
    await API.post("/preferences", {
      preferences: updated
    });
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");

      console.log("USER DATA 👉", res.data); // 👈 ADD THIS

      setUser(res.data);
      setInterests(res.data.preferences || []);
    } catch (err) {
      console.log(err);
    }
  };


  

  fetchUser();
}, []);

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-on-surface tracking-tight mb-2">Account Preferences</h1>
        <p className="text-on-surface-variant text-lg">Manage your digital identity and tailored news experience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <section className="lg:col-span-1">
          <div className="bg-surface-container-low p-6 rounded-xl border border-slate-700/30">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-blue-50">
                <img 
// want the image to be dynamic based on the user name
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=0D8ABC&color=fff&size=128`}
                  className="w-full h-full object-cover" 
                  alt="User Avatar"
                />
              </div>
              <h2 className="text-2xl font-bold font-serif">{user?.name || "unknown"}</h2>
              <p className="text-on-surface-variant text-sm mb-6">   </p>
              
              <div className="w-full space-y-4 text-left">
                <div>
                  <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Email Address</label>
                  <p className="text-on-surface font-medium">{user?.email || "unknown@editorial.com"}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Location</label>
                  <p className="text-on-surface font-medium">{user?.location || "London, UK"}</p>
                </div>
              </div>

              <button className="mt-8 w-full py-3 bg-primary text-black rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow active:scale-95">
                Edit Profile
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  sessionStorage.removeItem("token");
                  window.dispatchEvent(new Event("auth-changed"));
                  navigate("/auth");
                }}
                className="mt-4 w-full py-3 text-primary font-semibold hover:bg-surface-container-high rounded-full transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </section>

        <section className="lg:col-span-2 space-y-12">
          <div className="bg-surface-container-low p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" />
              Content Interests
            </h3>
            <p className="text-on-surface-variant mb-8">
              Select the topics you want to see prioritized in your daily broadcast. Our AI will curate your feed based on these selections.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {CATEGORIES.filter(c => c !== 'All').map(category => (
                <button
                  key={category}
                  onClick={() => toggleInterest(category)}
                  className={cn(
                    "px-6 py-3 rounded-full border-2 transition-all flex items-center gap-2",
                      interests.includes(category.toLowerCase())
                      ? "border-primary bg-primary text-white"
                      : "border-outline-variant/30 text-on-surface hover:border-primary hover:bg-primary/5"
                  )}
                >
                  {interests.includes(category.toLowerCase()) && <Check className="w-4 h-4" />}
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-6 rounded-xl border border-slate-700/30">
              <h4 className="font-bold text-lg mb-2">Newsletter Frequency</h4>
              <p className="text-sm text-on-surface-variant mb-4">Choose how often you receive our curated editorial digests.</p>
              <div className="relative">
                <select className="w-full bg-surface-container border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary appearance-none outline-none">
                  <option>Daily Morning (07:00 AM)</option>
                  <option>Weekly Roundup</option>
                  <option>Breaking News Only</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border border-slate-700/30">
              <h4 className="font-bold text-lg mb-2">Reading Mode</h4>
              <p className="text-sm text-on-surface-variant mb-4">Optimize the reading interface for your device or environment.</p>
              <div className="flex bg-surface-container p-1 rounded-lg">
{['light', 'dark'].map(mode => (
  <button
    key={mode}
    onClick={() => {
      if (theme !== mode) {
        toggleTheme();
      }
    }}
    className={cn(
      "flex-1 py-2 rounded-lg font-medium text-sm transition-all capitalize",
      theme === mode
        ? "bg-white dark:bg-slate-700 shadow-sm text-sky-950"
        : "text-on-surface-variant hover:text-sky-950"
    )}
  >
    {mode}
  </button>
))}
              </div>
            </div>
          </div>

          <div className="bg-surface-container p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Privacy & Security</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Two-Factor Authentication</p>
                  <p className="text-xs text-on-surface-variant">Add an extra layer of security to your account.</p>
                </div>
                <button className="w-12 h-6 bg-primary rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Data Personalization</p>
                  <p className="text-xs text-on-surface-variant">Allow us to tailor articles based on your reading history.</p>
                </div>
                <button className="w-12 h-6 bg-surface-container-highest rounded-full relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button className="px-8 py-3 text-on-surface-variant font-semibold hover:bg-surface-container-high rounded-full transition-colors">
              Discard Changes
            </button>
            <button className="px-8 py-3 bg-primary text-black font-semibold rounded-full shadow-md hover:shadow-lg transition-all active:scale-95">
              Save Preferences
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Preferences;
