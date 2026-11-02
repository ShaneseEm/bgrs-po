import React from 'react';
import { Search, Shield, Sun, Moon, Sparkles } from 'lucide-react';

export function Header({
  currentLang,
  setLang,
  content,
  onOpenSearch,
  isDark,
  setIsDark,
}) {
  return (
    <header className="w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* 1. Official Regional Flag Accent Ribbon */}
      <div className="bgrs-flag-bar w-full" />
      {/* Federal Ethiopian Tricolor Ribbon */}
      <div className="ethiopian-tricolor-bar w-full" />

      {/* 2. Main Presidential Authority & Branding Bar */}
      <div className="py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/60 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo, Flag & Titles */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative group flex-shrink-0 flex items-center gap-3">
              <img
                src="/images/bgrs-emblem-new.png"
                alt="Official Seal of Benishangul Gumuz Regional State"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
              <img
                src="/images/bgrs-flag-new.png"
                alt="Flag of Benishangul Gumuz Regional State"
                className="w-13 h-8.5 sm:w-15 sm:h-10 object-cover rounded shadow-md border border-slate-300 dark:border-slate-700 group-hover:scale-105 transition-transform duration-300 hidden sm:block"
                title="Official Flag of Benishangul Gumuz Regional State"
              />
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

          {/* Search, Dark/Light Mode, & Bilingual Switcher (EN / አማ) */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 w-full md:w-auto">
            
            {/* Search Pill */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2.5 bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-xs sm:text-sm shadow-xs transition-all w-48 sm:w-60 cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{content.nav.searchPlaceholder}</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-all cursor-pointer shadow-xs"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Language Switcher: strictly EN / አማ */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-300 dark:border-slate-700 p-0.5 shadow-inner">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('am')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currentLang === 'am'
                    ? 'bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                አማ
              </button>
            </div>

            {/* Executive HQ Button */}
            <a
              href="#contact"
              className="hidden xl:flex items-center gap-1.5 bg-gradient-to-r from-[#0d4a2c] to-[#146039] hover:from-[#125c38] hover:to-[#1a7a49] text-white px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all border border-emerald-950"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Assosa HQ</span>
            </a>

          </div>
        </div>
      </div>
    </header>
  );
}
