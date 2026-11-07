import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { contentData } from './data/content';
import { ui } from './data/ui';
import { usePublishedNews } from './lib/news';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HeroBanner } from './components/HeroBanner';
import { StatisticsSection } from './components/StatisticsSection';
import { PresidentSection } from './components/PresidentSection';
import { InitiativesSection } from './components/InitiativesSection';
import { NewsHub, NewsCard } from './components/NewsHub';
import { AdministrationSection } from './components/AdministrationSection';
import { CitizenPortal } from './components/CitizenPortal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { NewsModal } from './components/NewsModal';
import { SectionHeading, PrimaryButton, OutlineButton, Reveal, titleCase } from './components/ui';

const SECTIONS = ['home', 'president', 'initiatives', 'news', 'administration', 'services', 'contact'];

const sectionFromHash = () => {
  const h = window.location.hash.replace(/^#\/?/, '');
  return SECTIONS.includes(h) ? h : 'home';
};



const readStored = (key, allowed, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return allowed.includes(v) ? v : fallback;
  } catch {
    return fallback;
  }
};

const store = (key, value) => {
  try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
};

export default function App() {
  const [currentLang, setCurrentLang] = useState(() => readStored('bgrs-lang', ['en', 'am'], 'en'));
  const [isDark, setIsDark] = useState(() => readStored('bgrs-theme', ['dark', 'light'], 'light') === 'dark');
  const [activeSection, setActiveSection] = useState(sectionFromHash);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const baseContent = contentData[currentLang] || contentData.en;
  const liveArticles = usePublishedNews(currentLang, baseContent.news.tabs);
  // Posts from the admin (Supabase) replace the bundled sample articles once available
  const content = useMemo(
    () => (liveArticles ? { ...baseContent, news: { ...baseContent.news, articles: liveArticles } } : baseContent),
    [baseContent, liveArticles]
  );
  const t = (ui[currentLang] || ui.en).home;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    store('bgrs-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = currentLang;
    store('bgrs-lang', currentLang);
  }, [currentLang]);

  // Browser back/forward and deep links (#/president, #/news, ...)
  useEffect(() => {
    const sync = () => {
      setActiveSection(sectionFromHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  // Per-page document title
  useEffect(() => {
    const office = titleCase(content.meta.office);
    document.title = activeSection === 'home'
      ? `${office} | ${titleCase(content.meta.region)}`
      : `${content.nav[activeSection]} | ${office}`;
  }, [activeSection, content]);

  const navigateTo = useCallback((section) => {
    if (section !== sectionFromHash()) {
      window.history.pushState(null, '', section === 'home' ? window.location.pathname : `#/${section}`);
      setActiveSection(section);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const closeArticle = useCallback(() => setSelectedArticle(null), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const openSpeech = () => {
    const speech = content.news.articles.find((a) => /speech|ንግግር/i.test(a.category));
    if (speech) setSelectedArticle(speech);
  };

  const pageProps = { content, currentLang, onNavigate: navigateTo };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-[#0a1a26] text-slate-700 dark:text-slate-100">
      <a
        href="#main"
        onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-[#dab26a] focus:text-[#0e2f45] focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
      >
        Skip to content
      </a>

      <Header
        currentLang={currentLang}
        setLang={setCurrentLang}
        content={content}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDark={isDark}
        setIsDark={setIsDark}
      />
      <Navigation content={content} activeSection={activeSection} setActiveSection={navigateTo} />

      <main id="main" className="flex-1" tabIndex={-1}>
        <div key={activeSection} className="animate-fade-in">
          {activeSection === 'home' && (
            <>
              <HeroBanner content={content} onNavigate={navigateTo} />
              <StatisticsSection content={content} />

              {/* President's message */}
              <section className="py-16 sm:py-24 bg-white dark:bg-[#0a1a26]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  <Reveal variant="left" className="lg:col-span-5 relative">
                    <div className="absolute -top-4 -left-4 w-2/3 h-2/3 border-2 border-[#dab26a]/60 hidden sm:block" />
                    <div className="relative overflow-hidden bg-slate-200 group">
                      <img
                        src="/images/president-home-portrait.jpg"
                        alt={content.presidentSection.name}
                        loading="lazy"
                        className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#0e2f45]/85 to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 p-6">
                        <div className="font-serif text-white text-xl">{content.presidentSection.name}</div>
                        <div className="text-[#dab26a] text-xs font-semibold mt-1">{content.presidentSection.role}</div>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal variant="right" delay={150} className="lg:col-span-7">
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
                      <PrimaryButton onClick={() => navigateTo('president')}>{content.nav.president}</PrimaryButton>
                      <OutlineButton onClick={() => navigateTo('services')}>{content.nav.services}</OutlineButton>
                    </div>
                  </Reveal>
                </div>
              </section>

              {/* Latest news */}
              <section className="py-16 sm:py-24 bg-[#f8fafc] dark:bg-[#0c1f2e] border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                    <SectionHeading eyebrow={t.mediaEyebrow} title={content.news.title} className="mb-0!" />
                    <OutlineButton onClick={() => navigateTo('news')}>{t.viewAllNews}</OutlineButton>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {content.news.articles.slice(0, 3).map((a, i) => (
                      <Reveal key={a.id} delay={i * 120} className="flex">
                        <NewsCard article={a} onSelect={setSelectedArticle} readLabel={content.news.readArticle} className="w-full" />
                      </Reveal>
                    ))}
                  </div>
                </div>
              </section>

              {/* Explore the office */}
              <section className="py-16 sm:py-24 bg-white dark:bg-[#0a1a26]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <SectionHeading eyebrow={content.meta.office} title={t.exploreTitle} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                      { id: 'initiatives', image: '/images/gerd-dam.jpg' },
                      { id: 'administration', image: '/images/assosa-city.jpg' },
                      { id: 'services', image: '/images/culture.jpg' },
                      { id: 'contact', image: '/images/assosa-airport.jpg' },
                    ].map((card, i) => (
                      <Reveal key={card.id} variant="zoom" delay={i * 100}>
                      <button
                        onClick={() => navigateTo(card.id)}
                        className="group relative w-full aspect-[4/5] overflow-hidden bg-slate-200 text-left cursor-pointer focus-visible:outline-3 focus-visible:outline-[#dab26a]"
                      >
                        <img src={card.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e2f45] via-[#0e2f45]/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full h-0 bg-[#004750]/40 backdrop-blur-[2px] transition-all duration-500 ease-in-out group-hover:h-full" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                          <span className="block w-8 h-[2px] bg-[#dab26a] mb-4 transition-all duration-500 group-hover:w-16" />
                          <div className="font-serif text-white text-xl leading-snug mb-2">{content.nav[card.id]}</div>
                          <div className="text-xs text-slate-200/90 mb-4">{t.explore[card.id]}</div>
                          <span className="inline-flex items-center gap-2 eyebrow text-[#dab26a]">
                            {t.learnMore} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </button>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {activeSection === 'president' && <PresidentSection {...pageProps} onOpenSpeeches={openSpeech} />}
          {activeSection === 'initiatives' && <InitiativesSection {...pageProps} />}
          {activeSection === 'news' && <NewsHub {...pageProps} onSelectNews={setSelectedArticle} />}
          {activeSection === 'administration' && <AdministrationSection {...pageProps} />}
          {activeSection === 'services' && <CitizenPortal {...pageProps} />}
          {activeSection === 'contact' && <ContactSection {...pageProps} />}
        </div>
      </main>

      <Footer content={content} currentLang={currentLang} setActiveSection={navigateTo} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={closeSearch}
        content={content}
        currentLang={currentLang}
        onSelectNews={setSelectedArticle}
        onNavigate={navigateTo}
      />
      <NewsModal article={selectedArticle} onClose={closeArticle} currentLang={currentLang} />
    </div>
  );
}
