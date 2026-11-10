import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ArrowRight } from 'lucide-react';
import { titleCase } from './ui';

export function Navigation({ content, activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: content.nav.home },
    { id: 'president', label: content.nav.president },
    { id: 'initiatives', label: content.nav.initiatives },
    { id: 'news', label: content.nav.news },
    { id: 'administration', label: content.nav.administration },
    { id: 'services', label: content.nav.services },
    { id: 'contact', label: content.nav.contact },
  ];

  const go = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  const Brand = ({ compact = false }) => (
    <button onClick={() => go('home')} className="flex items-center gap-3 text-left cursor-pointer min-w-0">
      <img
        src="/images/bgrs-emblem-new.png"
        alt="Emblem of Benishangul Gumuz Regional State"
        className={`${compact ? 'w-10 h-10' : 'w-12 h-12 sm:w-16 sm:h-16'} object-contain flex-shrink-0 transition-all`}
      />
      <span className="min-w-0">
        <span className={`block font-serif text-[#1a4f6d] dark:text-white leading-tight ${compact ? 'whitespace-nowrap text-sm' : 'truncate text-base sm:text-xl'}`}>
          {titleCase(content.meta.office)}
        </span>
        <span className={`block eyebrow text-slate-500 dark:text-slate-400 mt-0.5 ${compact ? 'whitespace-nowrap' : 'truncate'}`}>
          {content.meta.region}
        </span>
      </span>
    </button>
  );

  return (
    <>
      {/* Brand row */}
      <div className="bg-white dark:bg-[#0a1a26] border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <Brand />
          <div className="flex items-center gap-4">
            <img
              src="/images/bgrs-flag-new.png"
              alt="Flag of Benishangul Gumuz Regional State"
              className="hidden md:block w-14 h-9 object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
            />
            <button
              onClick={() => go('services')}
              className="hidden md:inline-flex items-center gap-2 bg-[#1a4f6d] hover:bg-[#0e2f45] text-white px-5 py-3 text-[15px] font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {content.nav.services}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-11 h-11 inline-flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#1a4f6d] dark:text-white shadow-md active:scale-95 cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sticky link row (desktop) */}
      <nav
        className={`hidden lg:block sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-[#0a1a26]/90 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm'
            : 'bg-white dark:bg-[#0a1a26] border-slate-100 dark:border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          <div className={`hidden xl:block transition-all duration-300 overflow-hidden ${scrolled ? 'max-w-md opacity-100 py-2 shrink-0' : 'max-w-0 opacity-0'}`}>
            <Brand compact />
          </div>
          <ul className={`flex items-stretch flex-1 justify-center xl:justify-start ${scrolled ? "" : "xl:-ml-4"}`}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className={`group relative whitespace-nowrap px-2.5 xl:px-4 py-4 text-sm xl:text-[15px] font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[#1a4f6d] dark:text-[#dab26a]'
                        : 'text-slate-500 dark:text-slate-400 hover:text-[#1a4f6d] dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-2.5 right-2.5 xl:left-4 xl:right-4 bottom-0 h-[3px] bg-[#dab26a] origin-left transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 opacity-50 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <img
            src="/images/bgrs-flag-new.png"
            alt="Flag of Benishangul Gumuz Regional State"
            className={`w-12 h-8 object-cover border border-slate-200 dark:border-slate-700 shadow-sm shrink-0 transition-all duration-300 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none w-0 border-0'}`}
          />
        </div>
      </nav>

      {/* Mobile sticky mini bar */}
      <div
        className={`lg:hidden fixed top-0 inset-x-0 z-40 bg-white/95 dark:bg-[#0a1a26]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 ${
          scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-2 flex items-center justify-between gap-3">
          <Brand compact />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-[#1a4f6d] dark:text-white cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-[#0e2f45]/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <aside className="absolute top-0 right-0 bottom-0 w-80 max-w-full bg-white dark:bg-[#0a1a26] shadow-2xl flex flex-col overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <span className="eyebrow text-[#1a4f6d] dark:text-[#dab26a]">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ul className="flex-1 py-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => go(item.id)}
                      className={`w-full flex items-center justify-between px-5 py-4 text-sm font-semibold border-l-[3px] transition-colors cursor-pointer ${
                        isActive
                          ? 'border-[#dab26a] bg-slate-50 dark:bg-slate-800/50 text-[#1a4f6d] dark:text-white'
                          : 'border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {item.label}
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="p-5 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => go('services')}
                className="w-full bg-[#1a4f6d] hover:bg-[#0e2f45] text-white py-3.5 text-[15px] font-semibold cursor-pointer"
              >
                {content.nav.services}
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
