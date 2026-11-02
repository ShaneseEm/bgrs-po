import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, Clock, Search, Shield, Sun, Moon, Type
} from 'lucide-react';

export function Header({ 
  currentLang, 
  setLang, 
  content, 
  onOpenSearch, 
  fontSize,
  setFontSize,
  isHighContrast,
  setIsHighContrast
}) {
  const [currentDate, setCurrentDate] = useState('');
  const [isEthCal, setIsEthCal] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      if (isEthCal) {
        // Ethiopian calendar approximation (7-8 years behind Gregorian)
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
    <header className="w-full bg-white border-b border-slate-200">
      {/* 1. Official Benishangul-Gumuz Regional Flag Top Accent Strip */}
      <div className="bgrs-flag-bar w-full" />
      {/* Federal Ethiopian Tricolor Ribbon */}
      <div className="ethiopian-tricolor-bar w-full" />

      {/* 2. Top Utility & Accessibility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Date & Calendar toggle + Hotline */}
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => setIsEthCal(!isEthCal)}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer group"
              title="Click to toggle between Gregorian and Ethiopian Calendar"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium text-slate-100">{currentDate}</span>
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 border border-slate-700">
                {isEthCal ? 'E.C.' : 'G.C.'}
              </span>
            </button>

            <span className="hidden md:inline text-slate-700">•</span>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{content.meta.hotline}</span>
            </div>
          </div>

          {/* Right: Accessibility Controls & Language Switcher */}
          <div className="flex items-center gap-3">
            {/* Font Size Adjuster */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              <Type className="w-3 h-3 text-slate-400 mr-1" />
              <button 
                onClick={() => setFontSize(Math.max(14, fontSize - 1))}
                className="hover:text-amber-400 px-1 font-bold transition-colors cursor-pointer"
                title="Decrease font size"
              >
                A-
              </button>
              <span className="text-slate-600">|</span>
              <button 
                onClick={() => setFontSize(Math.min(20, fontSize + 1))}
                className="hover:text-amber-400 px-1 font-bold transition-colors cursor-pointer"
                title="Increase font size"
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={() => setIsHighContrast(!isHighContrast)}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              title="Toggle High Contrast Mode"
            >
              {isHighContrast ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 rounded border border-slate-700 p-0.5">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  currentLang === 'en' 
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('am')}
                className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  currentLang === 'am' 
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                አማ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Presidential Authority Bar */}
      <div className="py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Official Emblem + Flag + Bilingual Titles */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative group flex-shrink-0 flex items-center gap-3">
              {/* Official BGRS Seal / Logo */}
              <img 
                src="/images/bgrs-official-emblem.png" 
                alt="Official Seal of Benishangul Gumuz Regional State" 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
              {/* Official BGRS Waving Flag */}
              <img 
                src="/images/bgrs-official-flag.png" 
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

          {/* Search Trigger & Regional HQ Badge */}
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
