import React, { useState } from 'react';
import { Menu, X, Landmark, Users, Compass, Newspaper, MessageSquare, Phone, ChevronRight } from 'lucide-react';

export function Navigation({ content, activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: content.nav.home, icon: Landmark, href: '#home' },
    { id: 'president', label: content.nav.president, icon: Landmark, href: '#president' },
    { id: 'initiatives', label: content.nav.initiatives, icon: Compass, href: '#initiatives' },
    { id: 'news', label: content.nav.news, icon: Newspaper, href: '#news' },
    { id: 'administration', label: content.nav.administration, icon: Users, href: '#administration' },
    { id: 'services', label: content.nav.services, icon: MessageSquare, href: '#services' },
    { id: 'contact', label: content.nav.contact, icon: Phone, href: '#contact' },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#0d4a2c]/95 dark:bg-[#072415]/95 backdrop-blur-md text-white shadow-lg border-b-2 border-amber-500 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-md text-xs tracking-wider transition-all uppercase font-bold flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md ring-1 ring-amber-300/40' 
                      : 'text-emerald-100 hover:bg-[#146039] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Quick Citizen Action button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#services"
              onClick={() => handleNavClick('services')}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-4 py-1.5 rounded-md text-xs font-black uppercase tracking-wider shadow-md hover:shadow-amber-500/30 transition-all flex items-center gap-1.5 ring-1 ring-amber-300/50"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
              <span>{content.nav.services}</span>
            </a>
          </div>

          {/* Mobile menu button & Title */}
          <div className="lg:hidden flex items-center justify-between w-full py-2">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-amber-300 uppercase truncate max-w-[240px]">
              {content.meta.office}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800 dark:hover:bg-emerald-950 focus:outline-hidden transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#093520] dark:bg-[#04140b] border-t border-emerald-800 px-4 pt-3 pb-6 space-y-1.5 shadow-2xl animate-fade-in">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                  isActive 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                    : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />
              </a>
            );
          })}
          <div className="pt-3 border-t border-emerald-800/80 mt-2">
            <a
              href="#services"
              onClick={() => handleNavClick('services')}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>{content.nav.services}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
