import React, { useState } from 'react';
import { Menu, X, Landmark, Users, Compass, Newspaper, MessageSquare, Phone, ChevronRight } from 'lucide-react';

export function Navigation({ content, activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: content.nav.home },
    { id: 'president', label: content.nav.president },
    { id: 'initiatives', label: content.nav.initiatives },
    { id: 'news', label: content.nav.news },
    { id: 'administration', label: content.nav.administration },
    { id: 'services', label: content.nav.services },
    { id: 'contact', label: content.nav.contact },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#062415]/85 dark:bg-[#021309]/85 backdrop-blur-md text-white shadow-lg shadow-emerald-950/20 border-b border-amber-500/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Desktop Navigation Links - Single Line Guaranteed (whitespace-nowrap), Classic Glassmorphism & Smooth Animations */}
          <div className="hidden lg:flex items-center space-x-1.5 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-lg text-xs xl:text-sm uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer select-none ${
                    isActive 
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/30 ring-1 ring-amber-300/60 scale-[1.02]' 
                      : 'text-emerald-100/90 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Quick Citizen Action button - Single Line with Classic Gold Glow */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => handleNavClick('services')}
              className="whitespace-nowrap bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-4 py-2 rounded-lg text-xs xl:text-sm font-black uppercase tracking-wider shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer ring-1 ring-amber-300/40"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>{content.nav.services}</span>
            </button>
          </div>

          {/* Mobile menu button & Title */}
          <div className="lg:hidden flex items-center justify-between w-full py-2">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-amber-300 uppercase truncate max-w-[240px]">
              {content.meta.office}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800 dark:hover:bg-emerald-950 focus:outline-hidden transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer with Classic Glassmorphic Styling */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#062415]/95 dark:bg-[#021309]/95 backdrop-blur-xl border-t border-amber-500/30 px-4 pt-3 pb-5 space-y-2 shadow-2xl animate-fade-in">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 text-left cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' 
                    : 'text-emerald-100/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              </button>
            );
          })}
          <div className="pt-2 border-t border-emerald-800/60 mt-2">
            <button
              onClick={() => handleNavClick('services')}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 py-3 rounded-lg text-sm font-black uppercase tracking-wider shadow-md shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>{content.nav.services}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
