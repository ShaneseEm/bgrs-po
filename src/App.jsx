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
import { ArrowRight, Calendar } from 'lucide-react';

function SectionHeading({ eyebrow, title, className = '' }) {
  return (
    <div className={`mb-10 ${className}`}>
      {eyebrow && <div className="eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-3">{eyebrow}</div>}
      <h2 className="font-serif text-3xl lg:text-4xl text-[#1a4f6d] dark:text-white leading-tight tracking-tight mb-5">{title}</h2>
      <span className="block w-16 md:w-24 h-1 bg-[#dab26a] rounded-full" />
    </div>
  );
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="min-h-11 inline-flex items-center justify-center gap-2 bg-[#1a4f6d] hover:bg-[#0e2f45] text-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl transition-all active:scale-95 cursor-pointer"
    >
      {children}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}

function OutlineButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="min-h-11 inline-flex items-center justify-center border-2 border-[#1a4f6d] dark:border-slate-500 text-[#1a4f6d] dark:text-slate-100 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#1a4f6d] hover:text-white dark:hover:bg-white dark:hover:text-[#0e2f45] transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
    >
      {children}
    </button>
  );
}

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
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-white dark:bg-[#0a1a26] text-slate-700 dark:text-slate-100">
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
            <HeroBanner content={content} onNavigate={navigateTo} />

            <StatisticsSection content={content} />

            {/* President's message */}
            <section className="py-16 sm:py-24 bg-white dark:bg-[#0a1a26]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-5 relative">
                  <div className="absolute -top-4 -left-4 w-2/3 h-2/3 border-2 border-[#dab26a]/60 hidden sm:block" />
                  <div className="relative overflow-hidden bg-slate-200 group">
                    <img
                      src="/images/president-home-portrait.jpg"
                      alt={content.presidentSection.name}
                      className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#0e2f45]/85 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <div className="font-serif text-white text-xl">{content.presidentSection.name}</div>
                      <div className="text-[#dab26a] text-xs font-semibold mt-1">{content.presidentSection.role}</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <SectionHeading eyebrow={content.presidentSection.subtitle} title={content.presidentSection.title} />
                  <blockquote className="flex gap-5 mb-8">
                    <span className="self-stretch w-[4px] bg-[#1a4f6d] dark:bg-[#dab26a] flex-shrink-0" />
                    <p className="font-serif italic text-xl sm:text-2xl text-slate-700 dark:text-slate-100 leading-relaxed">
                      &ldquo;{content.presidentSection.quote}&rdquo;
                    </p>
                  </blockquote>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
                    {content.presidentSection.bioExcerpt}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <PrimaryButton onClick={() => navigateTo('president')}>
                      {content.nav.president}
                    </PrimaryButton>
                    <OutlineButton onClick={() => navigateTo('services')}>
                      {content.nav.services}
                    </OutlineButton>
                  </div>
                </div>
              </div>
            </section>

            {/* Latest news */}
            <section className="py-16 sm:py-24 bg-[#f8fafc] dark:bg-[#0c1f2e] border-y border-slate-200 dark:border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                  <SectionHeading eyebrow="Media Secretariat" title={content.news.title} className="!mb-0" />
                  <OutlineButton onClick={() => navigateTo('news')}>View all news</OutlineButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  {content.news.articles.slice(0, 3).map((article) => (
                    <article
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="group bg-white dark:bg-[#0a1a26] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-0 left-0 w-full h-0 bg-[#004750]/30 backdrop-blur-[2px] transition-all duration-500 ease-in-out group-hover:h-full" />
                        <span className="absolute top-4 left-4 bg-[#1a4f6d] text-white eyebrow !text-[9px] px-3 py-1.5">
                          {article.category}
                        </span>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                          <Calendar className="w-3.5 h-3.5 text-[#dab26a]" />
                          {article.date}
                        </div>
                        <h3 className="font-serif text-xl text-[#1a4f6d] dark:text-white leading-snug mb-3 group-hover:text-[#3a6d8c] dark:group-hover:text-[#dab26a] transition-colors line-clamp-3">
                          {article.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6">{article.summary}</p>
                        <span className="mt-auto inline-flex items-center gap-2 text-[10px] font-black text-[#1a4f6d] dark:text-[#dab26a] uppercase tracking-[0.2em] group-hover:text-[#dab26a] transition-colors">
                          {content.news.readArticle}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Explore the office */}
            <section className="py-16 sm:py-24 bg-white dark:bg-[#0a1a26]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading eyebrow={content.meta.office} title="Explore the Office" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    { id: 'initiatives', label: content.nav.initiatives, desc: 'GERD, gold & agro-mechanization', image: '/images/gerd-dam.jpg' },
                    { id: 'administration', label: content.nav.administration, desc: 'Assosa, Metekel & Kamashi zones', image: '/images/assosa-city.jpg' },
                    { id: 'services', label: content.nav.services, desc: 'Online inquiries & petitions', image: '/images/culture.jpg' },
                    { id: 'contact', label: content.nav.contact, desc: 'Executive Secretariat, Assosa', image: '/images/assosa-airport.jpg' },
                  ].map((card) => (
                    <button
                      key={card.id}
                      onClick={() => navigateTo(card.id)}
                      className="group relative aspect-[4/5] overflow-hidden bg-slate-200 text-left cursor-pointer"
                    >
                      <img src={card.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e2f45] via-[#0e2f45]/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 w-full h-0 bg-[#004750]/40 backdrop-blur-[2px] transition-all duration-500 ease-in-out group-hover:h-full" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <span className="block w-8 h-[2px] bg-[#dab26a] mb-4 transition-all duration-500 group-hover:w-16" />
                        <div className="font-serif text-white text-xl leading-snug mb-2">{card.label}</div>
                        <div className="text-xs text-slate-200/90 mb-4">{card.desc}</div>
                        <span className="inline-flex items-center gap-2 eyebrow !text-[10px] text-[#dab26a]">
                          Learn more <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </button>
                  ))}
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
