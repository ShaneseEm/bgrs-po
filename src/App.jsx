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

            {/* Presidential Welcome Spotlight (Classic Translucent Glass & Smooth Animations) */}
            <section className="relative py-14 sm:py-20 bg-gradient-to-b from-slate-50 via-emerald-950/5 to-slate-100 dark:from-slate-950 dark:via-emerald-950/15 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 overflow-hidden transition-colors duration-500">
              {/* Ambient Glassmorphic Glow Orbs */}
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/75 dark:bg-slate-900/65 backdrop-blur-xl rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/60 dark:border-slate-700/60 shadow-2xl shadow-emerald-950/10 dark:shadow-black/50 transition-all duration-500 hover:border-amber-400/40">
                  
                  {/* Portrait Column with Shimmer, Glass Frame & Lift Transition */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative group/portrait rounded-2xl overflow-hidden border-2 border-amber-500/70 shadow-2xl max-w-[320px] w-full bg-slate-950/90 backdrop-blur-md transition-all duration-500 hover:shadow-amber-500/30 hover:-translate-y-1.5 hover:scale-[1.02]">
                      {/* Image with smooth zoom transition */}
                      <img 
                        src="/images/president-home-portrait.jpg" 
                        alt="H.E. Ashadli Hassan" 
                        className="w-full h-92 object-cover object-top transition-transform duration-700 ease-out group-hover/portrait:scale-108"
                      />

                      {/* Interactive Light-Sweep / Shimmer Overlay */}
                      <div className="absolute inset-0 -translate-x-full group-hover/portrait:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                      {/* Executive Keynote Badge with Pulsing Live Indicator */}
                      <div className="absolute top-3.5 left-3.5 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/50 flex items-center gap-2 shadow-lg">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <img src="/images/bgrs-flag-new.png" alt="BGRS Flag" className="w-4 h-2.5 object-cover rounded-xs" />
                        <span className="text-[10px] font-bold text-amber-300 tracking-wider uppercase">
                          Executive Keynote
                        </span>
                      </div>

                      {/* Frosted Bottom Banner */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-4 sm:p-5 text-center">
                        <div className="text-white font-bold text-base sm:text-lg tracking-wide">{content.presidentSection.name}</div>
                        <div className="text-amber-400 text-xs sm:text-sm font-semibold tracking-wide mt-0.5">{content.presidentSection.role}</div>
                      </div>
                    </div>
                  </div>

                  {/* Overview Column with Frosted Glass Quote & Action Transitions */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="inline-flex items-center gap-2 bg-emerald-50/80 dark:bg-emerald-950/60 backdrop-blur-md text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs transition-transform duration-300 hover:scale-105">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                      <span>{content.presidentSection.subtitle}</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                      {content.presidentSection.name}
                    </h2>

                    {/* Classic Frosted Glass Quote Box */}
                    <div className="relative bg-white/80 dark:bg-slate-800/60 backdrop-blur-md p-6 rounded-2xl border-l-4 border-amber-500 border-y border-r border-slate-200/60 dark:border-slate-700/60 shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-400 group/quote">
                      <Quote className="absolute right-4 bottom-3 w-12 h-12 text-amber-500/10 group-hover/quote:text-amber-500/20 transition-colors pointer-events-none" />
                      <p className="italic text-slate-800 dark:text-slate-100 text-base sm:text-xl leading-relaxed font-sans relative z-10">
                        "{content.presidentSection.quote}"
                      </p>
                    </div>

                    <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                      {content.presidentSection.bioExcerpt}
                    </p>

                    {/* Action Buttons with Micro-interactions */}
                    <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => navigateTo('president')}
                        className="bg-gradient-to-r from-[#0d4a2c] via-[#146039] to-[#0d4a2c] hover:from-[#125c38] hover:to-[#1a7a49] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md shadow-emerald-950/20 hover:shadow-xl hover:shadow-emerald-700/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer border border-emerald-600/40"
                      >
                        <span>{content.nav.president} Overview & Priorities</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>

                      <button
                        onClick={() => navigateTo('services')}
                        className="bg-white/80 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 backdrop-blur-md px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-slate-300/80 dark:border-slate-700/80"
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
                    <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1">
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
                          <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
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
