import React, { useState, useEffect } from 'react';
import { PhoneCall, Clock, Search, Shield, Sun, Moon } from 'lucide-react';

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
          ? ['ምስከረም', 'ጥቁምት', 'ሕዳር', 'ታህሳስ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ']
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
    <header className="w-full bg-white border-b border-slate-200">
      {/* Flag Bar */}
      <div className="bgrs-flag-bar w-full" />
      {/* Ethiopian Tricolor */}
      <div className="ethiopian-tricolor-bar w-full" />

      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Date, Calendar toggle, Hotline */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsEthCal(!isEthCal)}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer group"
              title="Toggle Ethiopian/Gregorian calendar"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium text-slate-100">{currentDate}</span>
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 border border-slate-700">
                {isEthCal ? 'E.C.' : 'G.C.'}
              </span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{content.meta.hotline}</span>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              title="Toggle Dark / Light mode"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 rounded border border-slate-700 p-0.5">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  currentLang === 'en' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('am')}
                className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  currentLang === 'am' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                አማ
              </button>
              <button
                onClick={() => setLang('be')}
                className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  currentLang === 'be' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Bet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Authority Bar */}
      <div className="py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Titles */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative group flex-shrink-0 flex items-center gap-3">
              <img
                src="/images/bgrs-emblem-new.png"
                alt="Official Seal of Benishangul Gumuz Regional State"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
              <img
                src="/images/bgrs-flag-new.png"
                alt="Flag of Benishangul Gumuz Regional State"
                className="w-12 h-8 sm:w-14 sm:h-9 object-cover rounded shadow-sm border border-slate-300 hover:scale-105 transition-transform duration-300 hidden sm:block"
                title="Official Flag of Benishangul Gumuz Regional State"
              />
            </div>
            <div>
              <div className="text-[11px] sm:text-xs tracking-wider text-emerald-800 font-bold uppercase mb-0.5">
                {content.meta.country}
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-tight uppercase font-serif">
                {content.meta.region}
              </h1>
              <div className="text-xs sm:text-sm font-semibold text-amber-700 flex items-center justify-center md:justify-start gap-2">
                <span>{content.meta.office}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 font-normal">{content.meta.hq}</span>
              </div>
            </div>
          </div>

          {/* Search & HQ Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full border border-slate-300 text-sm shadow-xs transition-all w-48 sm:w-64 cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 truncate">{content.nav.searchPlaceholder}</span>
            </button>
            <a
              href="#contact"
              className="hidden lg:flex items-center gap-2 bg-[#0d4a2c] hover:bg-[#125c38] text-white px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm transition-all border border-emerald-950"
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
