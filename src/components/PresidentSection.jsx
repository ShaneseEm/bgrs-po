import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X, Maximize2, Mic, MapPin, Building2, CalendarDays, FileText } from 'lucide-react';

const labels = {
  en: {
    home: 'Home',
    message: 'Message from the President',
    priorities: 'Key Priorities',
    prioritiesLead: 'Four pillars guiding the regional executive agenda.',
    biography: 'Biography',
    glance: 'At a Glance',
    office: 'Office',
    seat: 'Seat of Government',
    tenure: 'Tenure',
    record: 'Public Record',
    gallery: 'Photo Gallery',
    contactTitle: 'Write to the President',
    contactDesc: 'Citizens may submit inquiries, petitions and proposals directly to the Executive Secretariat.',
    contactCta: 'Citizen Portal',
    close: 'Close',
    prev: 'Previous photo',
    next: 'Next photo',
  },
  am: {
    home: 'መነሻ',
    message: 'የርዕሰ መስተዳድሩ መልዕክት',
    priorities: 'ቁልፍ ቅድሚያዎች',
    prioritiesLead: 'የክልሉን የአስፈፃሚ አጀንዳ የሚመሩ አራት ምሰሶዎች።',
    biography: 'የሕይወት ታሪክ',
    glance: 'በጨረፍታ',
    office: 'ጽሕፈት ቤት',
    seat: 'የመንግሥት መቀመጫ',
    tenure: 'የአገልግሎት ዘመን',
    record: 'ይፋዊ መዝገብ',
    gallery: 'የፎቶ ማህደር',
    contactTitle: 'ለርዕሰ መስተዳድሩ ይጻፉ',
    contactDesc: 'ዜጎች ጥያቄዎቻቸውን፣ አቤቱታዎቻቸውን እና ሀሳቦቻቸውን በቀጥታ ለጽሕፈት ቤቱ ማቅረብ ይችላሉ።',
    contactCta: 'የዜጎች ፖርታል',
    close: 'ዝጋ',
    prev: 'ያለፈው ፎቶ',
    next: 'ቀጣይ ፎቶ',
  },
};

function Heading({ eyebrow, title, light = false }) {
  return (
    <div className="mb-10">
      {eyebrow && <div className={`eyebrow mb-3 ${light ? 'text-[#dab26a]' : 'text-[#3a6d8c] dark:text-[#dab26a]'}`}>{eyebrow}</div>}
      <h2 className={`font-serif text-3xl lg:text-4xl leading-tight tracking-tight mb-5 ${light ? 'text-white' : 'text-[#1a4f6d] dark:text-white'}`}>{title}</h2>
      <span className="block w-16 md:w-24 h-1 bg-[#dab26a] rounded-full" />
    </div>
  );
}

export function PresidentSection({ content, currentLang = 'en', onOpenSpeeches, onNavigate }) {
  const p = content.presidentSection;
  const m = content.meta;
  const t = labels[currentLang] || labels.en;
  const photos = p.photos || [];
  const bio = p.biographyDetails || {};

  const [lightbox, setLightbox] = useState(null); // index or null

  const step = useCallback(
    (dir) => setLightbox((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, step]);

  const facts = [
    { icon: Building2, label: t.office, value: p.role },
    { icon: MapPin, label: t.seat, value: m.hq },
    { icon: CalendarDays, label: t.tenure, value: p.tenure },
    { icon: FileText, label: t.record, value: [p.decreeCount, p.speechesCount].filter(Boolean).join(' · ') },
  ].filter((f) => f.value);

  return (
    <div id="president">
      {/* ===== Profile header ===== */}
      <section className="relative bg-[#0e2f45] text-white overflow-hidden">
        <img src={p.portraitPress || photos[1]?.url} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2233] via-[#0e2f45]/95 to-[#0e2f45]/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pb-24">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-slate-400 mb-10 lg:mb-14">
            <button onClick={() => onNavigate?.('home')} className="hover:text-white transition-colors cursor-pointer">{t.home}</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#dab26a]">{content.nav.president}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="absolute -top-4 -left-4 w-2/3 h-2/3 border-2 border-[#dab26a]/70 hidden sm:block" />
                <div className="relative overflow-hidden bg-slate-800 shadow-2xl">
                  <img
                    src={p.portraitOfficial || photos[0]?.url}
                    alt={`${p.name}, ${p.role}`}
                    className="w-full aspect-[4/5] object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-[#dab26a]" />
                <span className="eyebrow text-[#dab26a]">{p.subtitle}</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-white mb-4">{p.name}</h1>
              <p className="text-base sm:text-lg text-slate-300 mb-8">{p.role}</p>

              {p.tenure && (
                <div className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-xs text-slate-200 mb-10">
                  <CalendarDays className="w-4 h-4 text-[#dab26a]" />
                  {p.tenure}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenSpeeches}
                  className="min-h-11 inline-flex items-center justify-center gap-2 bg-[#dab26a] hover:bg-white text-[#0e2f45] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <Mic className="w-4 h-4" />
                  {p.viewSpeeches}
                </button>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="min-h-11 inline-flex items-center justify-center gap-2 border-2 border-white/70 hover:bg-white hover:text-[#0e2f45] text-white px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-all active:scale-95 cursor-pointer"
                >
                  {t.contactTitle}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Message ===== */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#0a1a26]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-8">{t.message}</div>
          <blockquote>
            <p className="font-serif italic text-2xl sm:text-3xl lg:text-[2.1rem] text-[#1a4f6d] dark:text-slate-100 leading-[1.5]">
              &ldquo;{p.quote}&rdquo;
            </p>
            <footer className="mt-10 flex flex-col items-center gap-4">
              <span className="block w-16 h-1 bg-[#dab26a] rounded-full" />
              <cite className="not-italic">
                <span className="block font-serif text-lg text-slate-800 dark:text-white">{p.name}</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400 mt-1">{p.role}</span>
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ===== Key priorities ===== */}
      {p.keyPillars?.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#f8fafc] dark:bg-[#0c1f2e] border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-2">
              <Heading eyebrow={p.subtitle} title={t.priorities} />
              <p className="text-slate-500 dark:text-slate-400 max-w-sm lg:mb-10">{t.prioritiesLead}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
              {p.keyPillars.map((pillar, idx) => (
                <article key={idx} className="group bg-white dark:bg-[#0a1a26] p-8 hover:bg-[#0e2f45] transition-colors duration-500">
                  <div className="font-serif text-5xl text-[#dab26a] leading-none mb-6">0{idx + 1}</div>
                  <h3 className="font-serif text-xl text-[#1a4f6d] dark:text-white group-hover:text-white leading-snug mb-4 transition-colors">
                    {pillar.title}
                  </h3>
                  <span className="block w-8 h-[2px] bg-[#dab26a] mb-4 transition-all duration-500 group-hover:w-16" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-300 leading-relaxed transition-colors">
                    {pillar.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== Biography ===== */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#0a1a26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Heading eyebrow={p.name} title={t.biography} />
            <div className="space-y-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {bio.intro && (
                <p className="font-serif text-xl sm:text-2xl text-slate-800 dark:text-slate-100 leading-relaxed">
                  {bio.intro}
                </p>
              )}
              {p.bioExcerpt && <p>{p.bioExcerpt}</p>}
              {bio.career && <p>{bio.career}</p>}
              {bio.education && <p>{bio.education}</p>}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 bg-[#f8fafc] dark:bg-[#0c1f2e] border border-slate-200 dark:border-slate-800">
              <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-serif text-xl text-[#1a4f6d] dark:text-white">{t.glance}</span>
                <img src={m.emblem} alt="" className="w-9 h-9 object-contain" />
              </div>
              <dl className="divide-y divide-slate-200 dark:divide-slate-800">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="px-8 py-5 flex gap-4">
                    <Icon className="w-5 h-5 text-[#3a6d8c] dark:text-[#dab26a] flex-shrink-0 mt-0.5" />
                    <div>
                      <dt className="eyebrow text-[10px]! text-slate-400 mb-1">{label}</dt>
                      <dd className="text-sm text-slate-800 dark:text-slate-200 leading-snug">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== Gallery ===== */}
      {photos.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#f8fafc] dark:bg-[#0c1f2e] border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Heading eyebrow={content.meta.office} title={t.gallery} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {photos.map((photo, idx) => (
                <button
                  key={photo.id}
                  onClick={() => setLightbox(idx)}
                  className="group relative aspect-[4/5] overflow-hidden bg-slate-200 text-left cursor-pointer focus-visible:outline-3 focus-visible:outline-[#dab26a]"
                >
                  <img src={photo.url} alt={photo.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e2f45] via-[#0e2f45]/30 to-transparent" />
                  <div className="absolute top-0 left-0 w-full h-0 bg-[#004750]/40 backdrop-blur-[2px] transition-all duration-500 ease-in-out group-hover:h-full" />
                  <Maximize2 className="absolute top-4 right-4 w-4 h-4 text-white/0 group-hover:text-white transition-colors" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="eyebrow text-[9px]! text-[#dab26a]">{photo.tag}</span>
                    <div className="font-serif text-white text-lg leading-snug mt-2">{photo.title}</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-300 mt-2">
                      <MapPin className="w-3 h-3" />
                      {photo.location}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== Contact CTA ===== */}
      <section className="bg-[#1a4f6d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl sm:text-3xl mb-3">{t.contactTitle}</h2>
            <p className="text-slate-200/90">{t.contactDesc}</p>
          </div>
          <button
            onClick={() => onNavigate?.('services')}
            className="min-h-11 inline-flex items-center justify-center gap-2 bg-[#dab26a] hover:bg-white text-[#0e2f45] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95 cursor-pointer flex-shrink-0"
          >
            {t.contactCta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ===== Lightbox ===== */}
      {lightbox !== null && photos[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[lightbox].title}
          className="fixed inset-0 z-[120] bg-[#0a2233]/95 backdrop-blur-sm flex flex-col animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <div className="flex items-center justify-between px-4 sm:px-8 py-4 text-white" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs text-slate-300 tabular-nums">
              {lightbox + 1} / {photos.length}
            </span>
            <button
              onClick={() => setLightbox(null)}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 cursor-pointer"
              aria-label={t.close}
              autoFocus
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 min-h-0 flex items-center justify-center px-4 sm:px-20 relative">
            <img
              src={photos[lightbox].url}
              alt={photos[lightbox].title}
              className="max-h-full max-w-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); step(-1); }}
                  aria-label={t.prev}
                  className="absolute left-2 sm:left-6 w-11 h-11 rounded-full bg-white/5 border border-white/15 text-white flex items-center justify-center hover:bg-white/15 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); step(1); }}
                  aria-label={t.next}
                  className="absolute right-2 sm:right-6 w-11 h-11 rounded-full bg-white/5 border border-white/15 text-white flex items-center justify-center hover:bg-white/15 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          <div className="px-4 sm:px-8 py-6 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="font-serif text-white text-lg">{photos[lightbox].title}</div>
            <div className="text-sm text-slate-400 mt-1">{photos[lightbox].caption}</div>
          </div>
        </div>
      )}
    </div>
  );
}
