import React, { useState } from 'react';
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

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [activeSection, setActiveSection] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const content = contentData[currentLang] || contentData.en;

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isHighContrast ? 'contrast-125 bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'
      }`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* 1. Official Header with Regional Emblem, Flag & Utility Bar */}
      <Header
        currentLang={currentLang}
        setLang={setCurrentLang}
        content={content}
        onOpenSearch={() => setIsSearchOpen(true)}
        fontSize={fontSize}
        setFontSize={setFontSize}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
      />

      {/* 2. Main Executive Sticky Navigation */}
      <Navigation
        content={content}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* 3. Main Content Views */}
      <main id="home" className="flex-1">
        {/* Hero Banner with Slides & Live Ticker */}
        <HeroBanner 
          content={content}
          onSelectNews={(art) => setSelectedArticle(art)}
        />

        {/* President Profile & Executive Vision */}
        <PresidentSection 
          content={content}
          onOpenSpeeches={() => {
            const speech = content.news.articles.find(a => a.category === 'Speeches' || a.category === 'ንግግሮች');
            if (speech) setSelectedArticle(speech);
          }}
        />

        {/* Live Regional Statistics (GERD, Territory, Seedlings, Zones) */}
        <StatisticsSection 
          content={content}
        />

        {/* Strategic Flagship Initiatives (GERD Corridor, Gold, Agriculture, Peace) */}
        <InitiativesSection 
          content={content}
        />

        {/* Newsroom & Media Secretariat (Modeled after PMO Ethiopia) */}
        <NewsHub 
          content={content}
          currentLang={currentLang}
        />

        {/* Regional Executive Council & Zonal Administrations */}
        <AdministrationSection 
          content={content}
        />

        {/* Citizen Engagement & "Message the President's Office" */}
        <CitizenPortal 
          content={content}
        />

        {/* Contact & Executive Headquarters Map */}
        <ContactSection 
          content={content}
        />
      </main>

      {/* 4. Executive Footer with Federal Links & Emergency Directory */}
      <Footer 
        content={content}
      />

      {/* Search & News Reader Modals */}
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
