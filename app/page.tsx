"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const hasInitialized = useRef(false);

  // Check system preference on mount
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    
    const prefersDark = localStorage.getItem("theme") === "dark" || 
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsDark(prefersDark);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !showSearch) {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === "Escape" && showSearch) {
        setShowSearch(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showSearch]);

  // Focus search input when opened
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Window control handlers (macOS style)
  const handleClose = () => {
    setIsVisible(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    setIsVisible(true);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ur" : "en");
  };

  const content = {
    en: {
      greeting: "hey, i'm sarim",
      subtitle: "Computer Science Student",
      currently: "currently;",
      previouslyBuilt: "previously built at:",
      building: "building:",
      connect: "Connect",
      searchPlaceholder: "Search...",
    },
    ur: {
      greeting: "ہیلو، میں سارم ہوں",
      subtitle: "کمپیوٹر سائنس کا طالب علم",
      currently: "ابھی؛",
      previouslyBuilt: "پہلے کام کیا:",
      building: "بنا رہا ہوں:",
      connect: "رابطہ",
      searchPlaceholder: "تلاش کریں...",
    },
  };

  const t = content[language];

  return (
    <div className={`${isDark ? "dark" : ""}`}>
      {/* Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/40 via-blue-200/20 to-transparent dark:from-cyan-900/20 dark:via-blue-900/40 dark:to-black"></div>
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[1000px] bg-gradient-to-b from-cyan-400/20 to-transparent rotate-[30deg] blur-3xl opacity-60 dark:opacity-30"></div>
        <div className="absolute top-[-10%] right-[10%] w-[400px] h-[800px] bg-gradient-to-b from-blue-400/20 to-transparent rotate-[-15deg] blur-3xl opacity-50 dark:opacity-20"></div>
        
        {/* Bubbles */}
        <div className="bubble w-16 h-16 left-[10%]" style={{ animationDelay: "0s", animationDuration: "8s" }}></div>
        <div className="bubble w-8 h-8 left-[25%]" style={{ animationDelay: "2s", animationDuration: "12s" }}></div>
        <div className="bubble w-12 h-12 left-[40%]" style={{ animationDelay: "5s", animationDuration: "10s" }}></div>
        <div className="bubble w-20 h-20 left-[75%]" style={{ animationDelay: "1s", animationDuration: "15s" }}></div>
        <div className="bubble w-6 h-6 left-[90%]" style={{ animationDelay: "3s", animationDuration: "9s" }}></div>

        {/* Cityscape silhouette */}
        <div className="absolute bottom-0 w-full h-48 opacity-10 dark:opacity-30">
          <div 
            className="w-full h-full bg-slate-900"
            style={{ clipPath: "polygon(0% 100%, 5% 80%, 10% 90%, 15% 70%, 20% 85%, 25% 60%, 30% 80%, 35% 50%, 40% 75%, 45% 60%, 50% 90%, 55% 65%, 60% 80%, 65% 55%, 70% 85%, 75% 60%, 80% 90%, 85% 70%, 90% 80%, 95% 65%, 100% 100%)" }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="bg-[#e0f7fa] dark:bg-[#021019] text-slate-800 dark:text-slate-200 min-h-screen relative overflow-x-hidden font-body transition-colors duration-500">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 sm:p-12 pb-32">
          
          {/* Main Window Panel */}
          {isVisible && !isMinimized && (
            <div className={`w-full glass-panel bg-white/25 dark:bg-black/40 shadow-2xl animate-float backdrop-blur-xl border border-white/40 dark:border-white/10 ring-1 ring-white/20 dark:ring-white/5 transition-all duration-300 ${isFullScreen ? "fixed inset-0 rounded-none max-w-none p-8 sm:p-16 z-40" : "max-w-3xl rounded-3xl p-8 sm:p-16"}`}>
              
              {/* Window Controls */}
              <div className="flex justify-between items-start mb-12">
                <div className="flex gap-2">
                  <button 
                    onClick={handleClose}
                    className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)] hover:bg-red-500 transition-colors cursor-pointer group relative"
                    title="Close"
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] text-red-900 opacity-0 group-hover:opacity-100">×</span>
                  </button>
                  <button 
                    onClick={handleMinimize}
                    className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)] hover:bg-yellow-500 transition-colors cursor-pointer group relative"
                    title="Minimize"
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] text-yellow-900 opacity-0 group-hover:opacity-100">−</span>
                  </button>
                  <button 
                    onClick={handleFullScreen}
                    className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] hover:bg-green-500 transition-colors cursor-pointer group relative"
                    title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-[6px] text-green-900 opacity-0 group-hover:opacity-100">⤢</span>
                  </button>
                </div>

                {/* Language Toggle */}
                <button 
                  onClick={toggleLanguage}
                  className="relative inline-flex items-center cursor-pointer glass-panel bg-white/20 dark:bg-black/30 rounded-full p-1 border border-white/20 h-8 w-20"
                >
                  <span className={`absolute left-2 text-[10px] font-display font-bold transition-colors ${language === "en" ? "text-cyan-500" : "text-gray-500 dark:text-gray-400"}`}>EN</span>
                  <span className={`absolute right-2 text-[10px] transition-colors ${language === "ur" ? "text-cyan-500" : "text-gray-500 dark:text-gray-400"}`}>اردو</span>
                  <div className={`w-6 h-6 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-md transition-transform ${language === "ur" ? "translate-x-11" : "translate-x-0"}`}></div>
                </button>
              </div>

              {/* Header */}
              <div className="mb-12">
                <h1 className="font-display text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-300 dark:to-blue-400 drop-shadow-sm tracking-tighter mb-2">
                  {t.greeting}<span className="text-cyan-500 cursor-blink">_</span>
                </h1>
                <p className="text-sm font-display text-cyan-500 uppercase tracking-widest opacity-80">{t.subtitle}</p>
              </div>

              {/* Content */}
              <div className="space-y-10 font-body text-lg sm:text-xl leading-relaxed">
                
                {/* Currently Section */}
                <div className="group">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{t.currently}</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="pl-1">
                      studying cs at 
                      <a className="inline-flex items-center px-2 py-1 mx-1 rounded-lg bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-all border border-purple-200 dark:border-purple-700/50 align-middle" href="https://www.uwo.ca" target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Western_University_logo.svg/1200px-Western_University_logo.svg.png" alt="Western" className="w-4 h-4 mr-2" />
                        Western
                      </a>
                      university
                    </li>
                    <li className="pl-1">
                      building at 
                      <a className="inline-flex items-center px-2 py-1 mx-1 rounded-lg bg-orange-100/50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:scale-105 transition-all border border-orange-200 dark:border-orange-700/50 align-middle" href="https://www.tangerine.ca" target="_blank">
                        <i className="fas fa-chart-line mr-2 text-xs"></i> Tangerine / Scotiabank
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Previously Built Section */}
                <div className="group">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{t.previouslyBuilt}</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="pl-1">
                      <a className="inline-flex items-center px-2 py-1 mx-1 rounded-lg bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:scale-105 transition-all border border-blue-200 dark:border-blue-700/50 align-middle" href="https://www.hp.com" target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/2048px-HP_logo_2012.svg.png" alt="HP" className="w-4 h-4 mr-2" />
                        HP
                      </a>
                    </li>
                    <li className="pl-1">
                      <a className="inline-flex items-center px-2 py-1 mx-1 rounded-lg bg-slate-200/50 dark:bg-slate-700/30 text-slate-700 dark:text-slate-300 hover:scale-105 transition-all border border-slate-300 dark:border-slate-600/50 align-middle" href="https://www.kongsberggeospatial.com" target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Kongsberg_logo.svg" alt="Kongsberg" className="w-4 h-4 mr-2" />
                        Kongsberg
                      </a>
                    </li>
                    <li className="pl-1">
                      <a className="inline-flex items-center px-2 py-1 mx-1 rounded-lg bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:scale-105 transition-all border border-green-200 dark:border-green-700/50 align-middle" href="https://www.intrado.com" target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Intrado_logo.png" alt="Intrado" className="w-4 h-4 mr-2" />
                        Intrado
                      </a>
                    </li>
                    <li className="pl-1">
                      <a className="inline-flex items-center px-2 py-1 mx-1 rounded-lg bg-red-100/50 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:scale-105 transition-all border border-red-200 dark:border-red-700/50 align-middle" href="https://kevares.com" target="_blank">
                        <img src="https://media.licdn.com/dms/image/D4E0BAQFdXUTtMSg7hg/company-logo_200_200/0/1695652257464" alt="Kevares" className="w-4 h-4 mr-2" />
                        Kevares
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Building Section */}
                <div className="group">
                  <p className="text-gray-700 dark:text-gray-300">{t.building}</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                    <li><a className="hover:text-cyan-500 transition-colors font-medium" href="https://v0-scotia-swipe-subscription-app.vercel.app" target="_blank">ScotiaSwipe - Tinder for bank subscriptions</a></li>
                    <li><a className="hover:text-cyan-500 transition-colors font-medium" href="https://devpost.com/software/tinderdb" target="_blank">TinderDB - Database cleanup tool</a></li>
                    <li><a className="hover:text-cyan-500 transition-colors font-medium" href="https://v0-clout-print-ui-build.vercel.app" target="_blank">CloutPrint - Merch for the Cluely arc</a></li>
                  </ul>
                </div>

                {/* Connect Section */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-700/50">
                  <p className="text-gray-600 dark:text-gray-400 text-base mb-4 font-display uppercase tracking-widest text-xs">{t.connect}</p>
                  <div className="flex flex-wrap gap-4">
                    <a className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60 border border-white/40 dark:border-white/10 transition-all backdrop-blur-sm" href="mailto:sarimkhan.1k@gmail.com">
                      <i className="far fa-envelope text-gray-600 dark:text-gray-300 group-hover:text-red-500 transition-colors"></i>
                      <span className="text-sm font-medium">Email</span>
                    </a>
                    <a className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60 border border-white/40 dark:border-white/10 transition-all backdrop-blur-sm" href="https://www.linkedin.com/in/sarim-khan-14297b249" target="_blank">
                      <i className="fab fa-linkedin-in text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors"></i>
                      <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                    <a className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60 border border-white/40 dark:border-white/10 transition-all backdrop-blur-sm" href="https://github.com/SarimNK" target="_blank">
                      <i className="fab fa-github text-gray-600 dark:text-gray-300 group-hover:text-purple-500 transition-colors"></i>
                      <span className="text-sm font-medium">GitHub</span>
                    </a>
                    <a className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60 border border-white/40 dark:border-white/10 transition-all backdrop-blur-sm" href="https://x.com/sarimnkhan" target="_blank">
                      <i className="fa-brands fa-x-twitter text-gray-600 dark:text-gray-300 group-hover:text-blue-400 transition-colors"></i>
                      <span className="text-sm font-medium">46 Followers</span>
                    </a>
                    <a className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60 border border-white/40 dark:border-white/10 transition-all backdrop-blur-sm" href="https://substack.com/@sarim" target="_blank">
                      <i className="fas fa-newspaper text-gray-600 dark:text-gray-300 group-hover:text-orange-500 transition-colors"></i>
                      <span className="text-sm font-medium">Substack</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Search Hint */}
              <div className="absolute bottom-4 right-6 text-xs text-gray-400 dark:text-gray-500 font-mono hidden sm:block opacity-60">
                press <span className="border border-gray-400 dark:border-gray-600 px-1.5 py-0.5 rounded text-[10px] mx-1">/</span> to search
              </div>
            </div>
          )}

          {/* Floating Decorative Bubbles */}
          <div className="absolute top-[20%] right-[5%] z-0 hidden lg:block animate-float" style={{ animationDelay: "1s" }}>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-sm shadow-[0_0_30px_rgba(0,234,255,0.2)]"></div>
            <div className="absolute inset-2 rounded-full border border-white/10"></div>
          </div>
          <div className="absolute bottom-[20%] left-[5%] z-0 hidden lg:block animate-float" style={{ animationDelay: "3s" }}>
            <div className="w-24 h-24 rounded-full bg-gradient-to-tl from-cyan-400/10 to-transparent border border-white/10 backdrop-blur-sm shadow-[0_0_30px_rgba(0,140,153,0.2)]"></div>
          </div>
        </div>

        {/* Taskbar - macOS Dock Style (Square Icon) */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <button 
            onClick={handleRestore}
            className="p-3 rounded-2xl glass-panel bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/30 shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 text-white shadow-lg border-2 border-white/50">
              <i className="fas fa-window-maximize text-xl"></i>
            </div>
          </button>
        </div>

        {/* Search Modal */}
        {showSearch && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setShowSearch(false); }}
          >
            <div className="w-full max-w-lg bg-white/90 dark:bg-slate-900 border border-white/20 dark:border-slate-700 rounded-2xl p-4 shadow-2xl transform transition-all scale-100">
              <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
                <i className="fas fa-search text-gray-400"></i>
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder={t.searchPlaceholder}
                  className="bg-transparent border-none outline-none w-full text-lg text-slate-800 dark:text-white placeholder-gray-400 focus:ring-0"
                />
                <button 
                  onClick={() => setShowSearch(false)}
                  className="text-xs text-gray-400 border border-gray-600 px-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  ESC
                </button>
              </div>
              <div className="text-xs text-gray-500 pt-2 px-1">
                Navigation &gt; Home
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600&family=Orbitron:wght@400;500;700&display=swap');
        
        .font-display {
          font-family: 'Orbitron', sans-serif;
        }
        .font-body {
          font-family: 'Exo 2', sans-serif;
        }
        
        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 50;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }
        
        .glass-panel {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        
        .dark .glass-panel {
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .bubble {
          position: absolute;
          bottom: -100px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2);
          animation: rise 10s infinite ease-in;
          z-index: 0;
        }
        
        @keyframes rise {
          0% {
            bottom: -100px;
            transform: translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            bottom: 1080px;
            transform: translateX(-50px);
            opacity: 0;
          }
        }
        
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
