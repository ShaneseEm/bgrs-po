import React from 'react';
import { TrendingUp } from 'lucide-react';
import { PageHeader } from './ui';

export function InitiativesSection({ content, onNavigate }) {
  const init = content.initiatives;

  return (
    <div id="initiatives">
      <PageHeader
        content={content}
        onNavigate={onNavigate}
        title={content.nav.initiatives}
        description={init.description}
        image="/images/gerd-dam.jpg"
      />

      <section className="py-16 sm:py-24 bg-white dark:bg-[#0a1a26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">
          {init.items.map((item, idx) => {
            const flip = idx % 2 === 1;
            return (
              <article key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                <div className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
                  <div className="relative">
                    <div className={`absolute -top-4 ${flip ? '-right-4' : '-left-4'} w-2/3 h-2/3 border-2 border-[#dab26a]/60 hidden sm:block`} />
                    <div className="relative overflow-hidden bg-slate-200 group">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute bottom-0 left-0 bg-[#0e2f45] text-[#dab26a] font-serif text-3xl px-6 py-4 leading-none">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
                  <div className="eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-4">{item.category}</div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1a4f6d] dark:text-white leading-tight mb-6">
                    {item.title}
                  </h2>
                  <span className="block w-16 h-1 bg-[#dab26a] rounded-full mb-6" />
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">{item.desc}</p>
                  {item.metrics && (
                    <div className="inline-flex items-center gap-3 border-l-4 border-[#1a4f6d] dark:border-[#dab26a] bg-[#f8fafc] dark:bg-[#0c1f2e] px-5 py-4">
                      <TrendingUp className="w-5 h-5 text-[#1a4f6d] dark:text-[#dab26a] flex-shrink-0" />
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.metrics}</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
