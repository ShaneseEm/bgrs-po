import React from 'react';
import { MapPin, Mail, Building2 } from 'lucide-react';
import { PageHeader, SectionHeading } from './ui';
import { ui } from '../data/ui';

export function AdministrationSection({ content, currentLang, onNavigate }) {
  const admin = content.administration;
  const t = (ui[currentLang] || ui.en).admin;

  return (
    <div id="administration">
      <PageHeader
        content={content}
        onNavigate={onNavigate}
        eyebrow={admin.subtitle}
        title={admin.title}
        description={admin.description}
        image="/images/assosa-city.jpg"
      />

      {/* Zones */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#0a1a26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={admin.subtitle} title={t.zonesTitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {admin.zones.map((zone) => {
              const [count, list] = (zone.woredas || '').split('•').map((s) => s.trim());
              return (
                <article key={zone.name} className="group bg-white dark:bg-[#0a1a26] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                    <img src={zone.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e2f45]/80 to-transparent" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-1.5 text-xs text-white">
                      <MapPin className="w-3.5 h-3.5 text-[#dab26a]" />
                      {t.zoneSeat}: {zone.capital}
                    </div>
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col flex-1">
                    <h3 className="font-serif text-2xl text-[#1a4f6d] dark:text-white mb-3">{zone.name}</h3>
                    <span className="block w-8 h-[2px] bg-[#dab26a] mb-4 transition-all duration-500 group-hover:w-16" />
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{zone.desc}</p>
                    {count && (
                      <div className="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800">
                        <div className="eyebrow text-[10px]! text-[#3a6d8c] dark:text-[#dab26a] mb-2">{count}</div>
                        {list && <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{list}</p>}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bureaus */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] dark:bg-[#0c1f2e] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <SectionHeading eyebrow={content.meta.region} title={t.bureausTitle} />
            <p className="text-slate-500 dark:text-slate-400 max-w-sm lg:mb-10">{t.bureausLead}</p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            {admin.bureaus.map((b) => (
              <li key={b.email} className="bg-white dark:bg-[#0a1a26] p-6 lg:p-8 flex flex-col">
                <Building2 className="w-6 h-6 text-[#3a6d8c] dark:text-[#dab26a] mb-5" />
                <h3 className="font-serif text-lg text-[#1a4f6d] dark:text-white leading-snug mb-2">{b.name}</h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-6">{b.head}</div>
                <a
                  href={`mailto:${b.email}`}
                  className="mt-auto inline-flex items-center gap-2 text-sm text-[#1a4f6d] dark:text-[#dab26a] hover:underline underline-offset-4 break-all"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {b.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
