import React from 'react';
import { Search, Sun, Moon, Phone, Mail } from 'lucide-react';

/* Slim utility bar — federal identity, contact, search, theme & language */
export function Header({ currentLang, setLang, content, onOpenSearch, isDark, setIsDark }) {
  return (
    <header className="w-full bg-[#0e2f45] text-slate-300">
      <div className="ethiopian-tricolor-bar w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4 text-[11px]">
        <div className="flex items-center gap-5 min-w-0">
          <span className="eyebrow text-[10px]! text-[#dab26a] truncate">{content.meta.country}</span>
          <a href={`mailto:${content.meta.email}`} className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5 text-[#dab26a]" />
            {content.meta.email}
          </a>
          <span className="hidden lg:flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#dab26a]" />
            {content.meta.hq}
          </span>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onOpenSearch}
            className="p-2 hover:text-white transition-colors cursor-pointer"
            aria-label={content.nav.searchPlaceholder}
            title={content.nav.searchPlaceholder}
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle dark mode"
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-[#dab26a]" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <span className="w-px h-4 bg-white/15 mx-1.5" />
          {[
            { code: 'en', label: 'EN' },
            { code: 'am', label: 'አማ' },
          ].map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`px-2 py-1 font-bold tracking-wider transition-colors cursor-pointer ${
                currentLang === l.code ? 'text-[#dab26a]' : 'text-slate-400 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
