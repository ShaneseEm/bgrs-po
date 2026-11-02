import React, { useState, useEffect } from 'react';
import { contentData } from './data/content';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HeroBanner } from './components/HeroBanner';
import { PresidentSection } from './components/PresidentSection';
import { StatisticsSection } from './components/StatisticsSection';
import { InitiativesSection } from './components/InitiativesSection';
import { NewsHub } from './components/NewsHub';
import { AdministrationSection } from './components/AdministrationSection';
import { CitizenPortal } from './components/CitizenPortal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { NewsModal } from './components/NewsModal';
import { ArrowRight, Sparkles, Quote, Calendar, Compass, Users, MessageSquare, Phone } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [activeSection, setActiveSection] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('bgrs-theme') === 'dark'; } catch { return false; }
  });

  const content = contentData[currentLang] || contentData.en;

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try { localStorage.setItem('bgrs-theme', isDark ? 'dark' : 'light'); } catch {}
  }, [isDark]);

  const navigateTo = (section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* 1. Clean Header with Regional Emblem, Flag & Language Switcher */}
      <Header
        currentLang={currentLang}
        setLang={setCurrentLang}
        content={content}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* 2. Executive Navigation (Switches active page view) */}
      <Navigation
        content={content}
        activeSection={activeSection}
        setActiveSection={navigateTo}
      />

      {/* 3. Dynamic Page Views (Not stacking everything on Home!) */}
      <main className="flex-1">
        {/* ================= HOME VIEW ================= */}
        {activeSection === 'home' && (
          <div className="animate-fade-in">
            {/* Interactive 3D Hero Showcase */}
            <HeroBanner 
              content={content}
              onSelectNews={(art) => setSelectedArticle(art)}
            />

            {/* Regional Statistics Banner */}
            <StatisticsSection 
              content={content}
            />

            {/* Presidential Welcome Spotlight (Clean & Non-Bulky) */}
            <section className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
                  
                  {/* Portrait Column */}
                  <div className="lg:col-span-4 flex justify-center">
                    <div className="relative rounded-xl overflow-hidden border border-amber-500/60 shadow-lg max-w-[280px]">
                      <img 
                        src="/images/president-official.png" 
                        alt="H.E. Ashadli Hassan" 
                        className="w-full h-80 object-cover object-top"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-3 text-center">
                        <div className="text-white font-bold text-sm">{content.presidentSection.name}</div>
                        <div className="text-amber-400 text-xs">{content.presidentSection.role}</div>
                      </div>
                    </div>
                  </div>

                  {/* Overview Column */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{content.presidentSection.subtitle}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      {content.presidentSection.name}
                    </h2>

                    <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl border-l-4 border-amber-500 border-y border-r border-slate-200 dark:border-slate-700">
                      <p className="italic text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                        "{content.presidentSection.quote}"
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {content.presidentSection.bioExcerpt}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => navigateTo('president')}
                        className="bg-emerald-800 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <span>{content.nav.president} Overview & Priorities</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => navigateTo('services')}
                        className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <span>{content.nav.services}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Latest News Highlights (3 Top Stories) */}
            <section className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      Media Secretariat
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                      {content.news.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => navigateTo('news')}
                    className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <span>View All Press Releases</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {content.news.articles.slice(0, 3).map((article) => (
                    <div
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-44 overflow-hidden bg-slate-900">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-slate-950/80 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/40">
                            {article.category}
                          </div>
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-amber-500" />
                            <span>{article.date}</span>
                          </div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                            {article.summary}
                          </p>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-1">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>{content.news.readArticle}</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Strategic Access Row */}
            <section className="py-10 bg-white dark:bg-slate-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { id: 'initiatives', label: content.nav.initiatives, icon: Compass, desc: 'GERD, Gold & Agro-mechanization' },
                    { id: 'administration', label: content.nav.administration, icon: Users, desc: 'Assosa, Metekel & Kamashi Zones' },
                    { id: 'services', label: content.nav.services, icon: MessageSquare, desc: 'Online citizen inquiries & petitions' },
                    { id: 'contact', label: content.nav.contact, icon: Phone, desc: 'Executive Secretariat in Assosa' },
                  ].map((card) => {
                    const Icon = card.icon;
                    return (
                      <button
                        key={card.id}
                        onClick={() => navigateTo(card.id)}
                        className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-amber-400 dark:hover:border-amber-400 text-left transition-all group cursor-pointer shadow-xs hover:shadow-md"
                      >
                        <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mb-3 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {card.label}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {card.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= THE PRESIDENT PAGE ================= */}
        {activeSection === 'president' && (
          <div className="animate-fade-in">
            <PresidentSection 
              content={content}
              onOpenSpeeches={() => {
                const speech = content.news.articles.find(a => a.category.toLowerCase().includes('speech') || a.category.includes('ንግግር'));
                if (speech) setSelectedArticle(speech);
              }}
            />
          </div>
        )}

        {/* ================= INITIATIVES PAGE ================= */}
        {activeSection === 'initiatives' && (
          <div className="animate-fade-in">
            <InitiativesSection 
              content={content}
            />
          </div>
        )}

        {/* ================= NEWS & MEDIA PAGE ================= */}
        {activeSection === 'news' && (
          <div className="animate-fade-in">
            <NewsHub 
              content={content}
              currentLang={currentLang}
            />
          </div>
        )}

        {/* ================= ADMINISTRATION PAGE ================= */}
        {activeSection === 'administration' && (
          <div className="animate-fade-in">
            <AdministrationSection 
              content={content}
            />
          </div>
        )}

        {/* ================= CITIZEN SERVICES PAGE ================= */}
        {activeSection === 'services' && (
          <div className="animate-fade-in">
            <CitizenPortal 
              content={content}
            />
          </div>
        )}

        {/* ================= CONTACT PAGE ================= */}
        {activeSection === 'contact' && (
          <div className="animate-fade-in">
            <ContactSection 
              content={content}
            />
          </div>
        )}
      </main>

      {/* 4. Streamlined Ministerial Footer */}
      <Footer 
        content={content}
        setActiveSection={navigateTo}
      />

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        content={content}
        currentLang={currentLang}
        onSelectNews={(art) => setSelectedArticle(art)}
      />

      <NewsModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        currentLang={currentLang}
      />
    </div>
  );
}
