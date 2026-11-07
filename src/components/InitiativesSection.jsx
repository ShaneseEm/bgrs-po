import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, ChevronDown } from 'lucide-react';
import { Reveal } from './ui';
import { ui } from '../data/ui';

export function InitiativesSection({ content, currentLang }) {
  const init = content.initiatives;
  const items = init.items;
  const t = (ui[currentLang] || ui.en).initiatives;
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  // The step crossing the middle of the viewport becomes active
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.index))),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [items.length]);

  const scrollToStory = () => document.getElementById('initiative-story')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div id="initiatives">
      {/* ===== Full-bleed hero ===== */}
      <section className="relative h-[min(88vh,760px)] min-h-[560px] overflow-hidden bg-[#0e2f45] text-white">
        <img src="/images/gerd-dam.jpg" alt="" className="absolute inset-0 w-full h-full object-cover animate-kenburns" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2233] via-[#0a2233]/55 to-[#0a2233]/20" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a2233]/80 to-transparent" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col pt-8 pb-10">
          <div className="mt-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7 animate-rise">
              <div className="eyebrow text-[#dab26a] mb-5">{init.subtitle}</div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mb-6">{content.nav.initiatives}</h1>
              <p className="text-lg text-slate-200 leading-relaxed max-w-2xl">{init.description}</p>
            </div>
            <ol
              aria-label={t.programmes}
              className="hidden sm:grid lg:col-span-5 grid-cols-2 gap-px bg-white/15 border border-white/15 backdrop-blur-sm animate-rise"
              style={{ animationDelay: '200ms' }}
            >
              {items.map((item, i) => (
                <li key={item.id}>
                  <button
                    onClick={() => stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    className="group w-full h-full text-left bg-[#0a2233]/60 hover:bg-[#dab26a] p-4 transition-colors duration-300 cursor-pointer"
                  >
                    <span className="block font-serif text-2xl text-[#dab26a] group-hover:text-[#0e2f45] transition-colors">0{i + 1}</span>
                    <span className="block text-sm text-slate-200 group-hover:text-[#0e2f45] mt-1 line-clamp-2 transition-colors">{item.category}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <button onClick={scrollToStory} className="mx-auto mt-10 flex flex-col items-center gap-1 text-sm text-slate-300 hover:text-white cursor-pointer">
            {t.scroll}
            <ChevronDown className="w-5 h-5 animate-scroll-cue" />
          </button>
        </div>
      </section>

      {/* ===== Scroll story ===== */}
      <section id="initiative-story" className="bg-white dark:bg-[#0a1a26] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Sticky image stack (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-16 h-[calc(100vh-4rem)] py-12 flex items-center">
              <div className="relative w-full aspect-[4/5] max-h-full overflow-hidden bg-slate-200 shadow-2xl">
                {items.map((item, i) => (
                  <img
                    key={item.id}
                    src={item.image}
                    alt={i === active ? item.title : ''}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
                      i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                    }`}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0e2f45]/85 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <span key={active} className="font-serif text-6xl leading-none text-[#dab26a] animate-rise">0{active + 1}</span>
                  <span className="text-sm text-slate-200 tabular-nums">{active + 1} / {items.length}</span>
                </div>
                <div className="absolute top-0 inset-x-0 h-1 bg-white/25">
                  <div className="h-full bg-[#dab26a] transition-all duration-700" style={{ width: `${((active + 1) / items.length) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="py-12 lg:py-[18vh]">
            {items.map((item, i) => (
              <article
                key={item.id}
                ref={(el) => (stepRefs.current[i] = el)}
                data-index={i}
                className={`lg:min-h-[70vh] flex flex-col justify-center py-10 lg:py-0 transition-opacity duration-700 ${
                  i === active ? 'lg:opacity-100' : 'lg:opacity-30'
                }`}
              >
                <Reveal>
                  <img src={item.image} alt="" loading="lazy" className="lg:hidden w-full aspect-[16/10] object-cover mb-8" />
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-serif text-5xl leading-none text-transparent [-webkit-text-stroke:1px_#dab26a]">0{i + 1}</span>
                    <span className="eyebrow text-[#3a6d8c] dark:text-[#dab26a]">{item.category}</span>
                  </div>
                  <h2 className="font-serif text-3xl lg:text-4xl text-[#1a4f6d] dark:text-white leading-tight mb-6">{item.title}</h2>
                  <span className={`block h-1 bg-[#dab26a] rounded-full mb-6 transition-all duration-700 ${i === active ? 'w-24' : 'w-12'}`} />
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">{item.desc}</p>
                  {item.metrics && (
                    <div className="inline-flex items-center gap-3 border-l-4 border-[#1a4f6d] dark:border-[#dab26a] bg-[#f8fafc] dark:bg-[#0c1f2e] px-5 py-4">
                      <TrendingUp className="w-5 h-5 text-[#1a4f6d] dark:text-[#dab26a] flex-shrink-0" />
                      <span className="font-semibold text-slate-800 dark:text-slate-100">{item.metrics}</span>
                    </div>
                  )}
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
