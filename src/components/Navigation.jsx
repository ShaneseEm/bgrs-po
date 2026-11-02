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
    <nav className="sticky top-0 z-40 bg-[#0d4a2c] dark:bg-[#072415] text-white shadow-md border-b-2 border-amber-500 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13">
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-md text-xs tracking-wider transition-all uppercase font-bold cursor-pointer ${
                    isActive 
                      ? 'bg-amber-500 text-slate-950 shadow-sm' 
                      : 'text-emerald-100 hover:bg-[#146039] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Quick Citizen Action button */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => handleNavClick('services')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#093520] dark:bg-[#04140b] border-t border-emerald-800 px-4 pt-3 pb-5 space-y-1.5 shadow-2xl animate-fade-in">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all text-left cursor-pointer ${
                  isActive 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                    : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />
              </button>
            );
          })}
          <div className="pt-2 border-t border-emerald-800/80 mt-2">
            <button
              onClick={() => handleNavClick('services')}
              className="w-full bg-amber-400 text-slate-950 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer"
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
