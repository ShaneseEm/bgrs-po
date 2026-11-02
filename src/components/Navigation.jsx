import React, { useState } from 'react';
import { Menu, X, Landmark, FileText, Users, Compass, Newspaper, MessageSquare, Phone } from 'lucide-react';

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
    <nav className="sticky top-0 z-40 bg-[#0d4a2c] text-white shadow-md border-b-2 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-sm text-sm font-semibold tracking-wide transition-all uppercase flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-amber-600 text-white shadow-xs font-bold' 
                      : 'text-emerald-100 hover:bg-[#125c38] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Quick Citizen Action button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#services"
              onClick={() => handleNavClick('services')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-900" />
              <span>{content.citizenPortal.formTitle.split(' ')[0]}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center justify-between w-full py-2">
            <span className="text-sm font-bold tracking-wider text-amber-300 uppercase">
              {content.meta.office}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-emerald-100 hover:text-white hover:bg-emerald-800 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#093520] border-t border-emerald-800 px-4 pt-2 pb-5 space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`block px-3 py-2.5 rounded-md text-base font-medium tracking-wide ${
                  isActive 
                    ? 'bg-amber-600 text-white font-bold' 
                    : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-3 border-t border-emerald-800 mt-2">
            <a
              href="#services"
              onClick={() => handleNavClick('services')}
              className="block w-full text-center bg-amber-500 text-slate-900 font-bold px-4 py-2.5 rounded shadow-sm text-sm"
            >
              {content.nav.services}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
