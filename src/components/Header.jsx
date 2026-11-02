import React, { useState, useEffect } from 'react';
import { PhoneCall, Clock, Search, Shield, Sun, Moon, Sparkles } from 'lucide-react';

export function Header({
  currentLang,
  setLang,
  content,
  onOpenSearch,
  isDark,
  setIsDark,
}) {
  const [currentDate, setCurrentDate] = useState('');
  const [isEthCal, setIsEthCal] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      if (isEthCal) {
        const ethYear = now.getFullYear() - 8;
        const ethMonths = currentLang === 'am'
          ? ['መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ']
          : ['Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yakatit', 'Megabit', 'Miyazya', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'];
        const ethMonth = ethMonths[Math.min(now.getMonth(), 11)];
        setCurrentDate(`${ethMonth} ${now.getDate()}, ${ethYear} E.C.`);
      } else {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(now.toLocaleDateString(currentLang === 'am' ? 'am-ET' : 'en-US', options));
      }
    };
    updateDateTime();
    const timer = setInterval(updateDateTime, 60000);
    return () => clearInterval(timer);
  }, [currentLang, isEthCal]);

  return (
    <header className="w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* 1. Official Benishangul-Gumuz Regional Flag Top Accent Strip */}
      <div className="bgrs-flag-bar w-full" />
      {/* Federal Ethiopian Tricolor Ribbon */}
      <div className="ethiopian-tricolor-bar w-full" />

      {/* 2. Top Executive Utility Bar */}
      <div className="bg-slate-900 dark:bg-black text-slate-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Date, Calendar toggle & 24/7 Hotline */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsEthCal(!isEthCal)}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer group"
              title="Click to toggle between Gregorian and Ethiopian Calendar"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
              <span className="font-medium text-slate-100">{currentDate}</span>
              <span className="text-[10px] font-bold bg-slate-800 dark:bg-slate-900 px-1.5 py-0.5 rounded text-amber-400 border border-slate-700">
                {isEthCal ? 'E.C.' : 'G.C.'}
              </span>
            </button>

            <span className="hidden md:inline text-slate-700">•</span>

            <div className="hidden sm:flex items-center gap-2 text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium tracking-wide">{content.meta.hotline}</span>
            </div>
          </div>

          {/* Right: Dark/Light Mode & Clean Bilingual Switcher (Only English and Amharic) */}
          <div className="flex items-center gap-3">
            {/* Dark / Light Mode Button */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 rounded-md bg-slate-800 dark:bg-slate-900 hover:bg-slate-700 dark:hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline text-[11px] font-medium text-amber-300">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-300" />
                  <span className="hidden md:inline text-[11px] font-medium text-slate-300">Dark</span>
                </>
              )}
            </button>

            {/* Language Switcher: Only English (EN) and Amharic (አማ) */}
            <div className="flex items-center bg-slate-800 dark:bg-slate-900 rounded-md border border-slate-700 p-0.5 shadow-inner">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-sm ring-1 ring-emerald-500/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('am')}
                className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                  currentLang === 'am'
                    ? 'bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-sm ring-1 ring-emerald-500/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                አማ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Presidential Authority & Branding Bar */}
      <div className="py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/70 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Logo, Flag & Titles */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative group flex-shrink-0 flex items-center gap-3">
              <div className="relative">
                <img
                  src="/images/bgrs-emblem-new.png"
                  alt="Official Seal of Benishangul Gumuz Regional State"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </div>
              <div className="relative hidden sm:block">
                <img
                  src="/images/bgrs-flag-new.png"
                  alt="Flag of Benishangul Gumuz Regional State"
                  className="w-13 h-8.5 sm:w-15 sm:h-10 object-cover rounded shadow-md border border-slate-300 dark:border-slate-700 group-hover:scale-105 transition-transform duration-300"
                  title="Official Flag of Benishangul Gumuz Regional State"
                />
              </div>
            </div>

            <div>
              <div className="text-[11px] sm:text-xs tracking-wider text-emerald-800 dark:text-emerald-400 font-bold uppercase mb-0.5 flex items-center justify-center md:justify-start gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{content.meta.country}</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase font-serif">
                {content.meta.region}
              </h1>
              <div className="text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-400 flex items-center justify-center md:justify-start gap-2 mt-0.5">
                <span className="font-bold tracking-wide">{content.meta.office}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 dark:text-slate-400 font-medium">{content.meta.hq}</span>
              </div>
            </div>
          </div>

          {/* Search Bar & Executive Headquarters Quick Button */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2.5 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 text-sm shadow-xs transition-all w-52 sm:w-64 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{content.nav.searchPlaceholder}</span>
            </button>

            <a
              href="#contact"
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-[#0d4a2c] to-[#146039] hover:from-[#125c38] hover:to-[#1a7a49] text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all border border-emerald-900 ring-1 ring-amber-500/20"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>{content.meta.hq}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
