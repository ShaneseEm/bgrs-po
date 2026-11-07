import React, { useState } from 'react';
import { MapPin, Mail, ArrowUpRight, Users, Building2, Landmark } from 'lucide-react';
import { Breadcrumb, Reveal, SectionHeading } from './ui';
import { ui } from '../data/ui';

function Node({ children, className = '', wrapClass = '', delay = 0, onClick }) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <div className={`reveal reveal-zoom ${wrapClass}`} style={{ transitionDelay: `${delay}ms` }}>
      <Tag
        onClick={onClick}
        className={`relative w-full bg-white/5 backdrop-blur-sm border border-white/15 px-4 py-3 text-center ${
          onClick ? 'hover:bg-[#dab26a] hover:text-[#0e2f45] hover:border-[#dab26a] hover:-translate-y-1 transition-all duration-300 cursor-pointer group' : ''
        } ${className}`}
      >
        {children}
      </Tag>
    </div>
  );
}

export function AdministrationSection({ content, currentLang, onNavigate }) {
  const admin = content.administration;
  const p = content.presidentSection;
  const t = (ui[currentLang] || ui.en).admin;
  const [zoneIdx, setZoneIdx] = useState(0);
  const zone = admin.zones[zoneIdx];

  const openZone = (i) => {
    setZoneIdx(i);
    document.getElementById('zones')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const parseWoredas = (z) => {
    const [count, list] = (z.woredas || '').split('•').map((s) => s.trim());
    return { count, list: list ? list.split(',').map((s) => s.trim()) : [] };
  };
  const zoneWoredas = parseWoredas(zone);

  return (
    <div id="administration">
      {/* ===== Hero with governance chart ===== */}
      <section className="relative bg-[#0e2f45] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#dab26a_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pb-24">
          <Breadcrumb content={content} onNavigate={onNavigate} current={content.nav.administration} light />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-12">
            <div className="lg:col-span-5 animate-rise">
              <div className="eyebrow text-[#dab26a] mb-5">{admin.subtitle}</div>
              <h1 className="font-serif text-4xl lg:text-5xl leading-tight mb-6">{admin.title}</h1>
              <p className="text-lg text-slate-300 leading-relaxed">{admin.description}</p>
            </div>

            {/* Org chart */}
            <Reveal className="lg:col-span-7" aria-label={t.structureTitle} role="img">
              <div className="flex flex-col items-center">
                <Node className="flex items-center gap-3 !px-5 border-[#dab26a]/60">
                  <img src="/images/president-home-portrait.jpg" alt="" className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#dab26a]" />
                  <span className="text-left">
                    <span className="block eyebrow text-[#dab26a]">{t.president}</span>
                    <span className="block font-serif text-lg leading-tight">{p.name}</span>
                  </span>
                </Node>
                <span className="draw-y block w-px h-8 bg-[#dab26a]/70" />
                <Node delay={250} className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-[#dab26a]" />
                  <span className="font-semibold">{t.council}</span>
                </Node>
                <span className="draw-y block w-px h-8 bg-[#dab26a]/70" style={{ transitionDelay: '400ms' }} />

                <div className="relative w-full">
                  <span className="draw-x hidden sm:block absolute top-0 left-[12.5%] right-[12.5%] h-px bg-[#dab26a]/70" style={{ transitionDelay: '550ms' }} />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-0">
                    {admin.zones.map((z, i) => (
                      <div key={z.name} className="flex flex-col items-center">
                        <span className="draw-y hidden sm:block w-px h-6 bg-[#dab26a]/70" style={{ transitionDelay: `${700 + i * 100}ms` }} />
                        <Node delay={800 + i * 120} onClick={() => openZone(i)} wrapClass="w-full mt-3 sm:mt-0">
                          <MapPin className="w-4 h-4 mx-auto mb-1.5 text-[#dab26a] group-hover:text-[#0e2f45]" />
                          <span className="block font-semibold text-sm leading-tight">{z.name}</span>
                          <span className="block text-xs text-slate-400 group-hover:text-[#0e2f45]/70 mt-1">{z.capital}</span>
                        </Node>
                      </div>
                    ))}
                    <div className="flex flex-col items-center">
                      <span className="draw-y hidden sm:block w-px h-6 bg-[#dab26a]/70" style={{ transitionDelay: '1000ms' }} />
                      <Node
                        delay={1160}
                        onClick={() => document.getElementById('bureaus')?.scrollIntoView({ behavior: 'smooth' })}
                        wrapClass="w-full mt-3 sm:mt-0"
                      >
                        <Building2 className="w-4 h-4 mx-auto mb-1.5 text-[#dab26a] group-hover:text-[#0e2f45]" />
                        <span className="block font-semibold text-sm leading-tight">{t.bureausNode}</span>
                        <span className="block text-xs text-slate-400 group-hover:text-[#0e2f45]/70 mt-1">{admin.bureaus.length}</span>
                      </Node>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Zone explorer ===== */}
      <section id="zones" className="py-16 sm:py-24 bg-white dark:bg-[#0a1a26] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={content.meta.region} title={t.zonesTitle} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div role="tablist" aria-label={t.zonesTitle} className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto">
              {admin.zones.map((z, i) => (
                <button
                  key={z.name}
                  role="tab"
                  aria-selected={zoneIdx === i}
                  onClick={() => setZoneIdx(i)}
                  className={`relative text-left shrink-0 min-w-[220px] lg:min-w-0 p-5 border transition-all duration-500 cursor-pointer overflow-hidden ${
                    zoneIdx === i
                      ? 'border-[#1a4f6d] bg-[#1a4f6d] text-white shadow-xl lg:translate-x-3'
                      : 'border-slate-200 dark:border-slate-800 hover:border-[#1a4f6d] dark:hover:border-slate-500'
                  }`}
                >
                  <span className={`block font-serif text-3xl leading-none mb-3 ${zoneIdx === i ? 'text-[#dab26a]' : 'text-slate-300 dark:text-slate-600'}`}>0{i + 1}</span>
                  <span className={`block font-serif text-xl ${zoneIdx === i ? 'text-white' : 'text-[#1a4f6d] dark:text-white'}`}>{z.name}</span>
                  <span className={`flex items-center gap-1.5 text-sm mt-1 ${zoneIdx === i ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                    <MapPin className="w-3.5 h-3.5" /> {z.capital}
                  </span>
                </button>
              ))}
            </div>

            <div role="tabpanel" className="lg:col-span-8 border border-slate-200 dark:border-slate-800 bg-[#f8fafc] dark:bg-[#0c1f2e]">
              <div className="relative aspect-[16/8] overflow-hidden bg-slate-200">
                {admin.zones.map((z, i) => (
                  <img
                    key={z.name}
                    src={z.image}
                    alt={i === zoneIdx ? z.name : ''}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${i === zoneIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e2f45]/80 to-transparent" />
                <div key={zoneIdx} className="absolute bottom-5 left-6 text-white animate-rise">
                  <div className="eyebrow text-[#dab26a] mb-1">{t.zoneSeat}: {zone.capital}</div>
                  <div className="font-serif text-3xl">{zone.name}</div>
                </div>
              </div>
              <div key={`b${zoneIdx}`} className="p-6 lg:p-8 animate-rise">
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{zone.desc}</p>
                {zoneWoredas.count && (
                  <>
                    <div className="eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-3">{zoneWoredas.count}</div>
                    <ul className="flex flex-wrap gap-2">
                      {zoneWoredas.list.map((w, i) => (
                        <li
                          key={w}
                          className="animate-rise text-sm bg-white dark:bg-[#0a1a26] border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-slate-700 dark:text-slate-200"
                          style={{ animationDelay: `${150 + i * 60}ms` }}
                        >
                          {w}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bureau directory ===== */}
      <section id="bureaus" className="py-16 sm:py-24 bg-[#f8fafc] dark:bg-[#0c1f2e] border-t border-slate-200 dark:border-slate-800 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionHeading eyebrow={content.meta.region} title={t.bureausTitle} />
            <p className="text-slate-500 dark:text-slate-400 max-w-xs md:mb-10">{t.bureausLead}</p>
          </div>
          <ul className="border-t border-slate-300 dark:border-slate-700">
            {admin.bureaus.map((b, i) => (
              <Reveal as="li" key={b.email} delay={i * 70} className="border-b border-slate-300 dark:border-slate-700">
                <a href={`mailto:${b.email}`} className="group relative flex items-center gap-5 sm:gap-8 py-6 px-2 sm:px-4 overflow-hidden">
                  <span className="absolute inset-0 bg-[#1a4f6d] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                  <span className="relative font-serif text-2xl text-slate-300 dark:text-slate-600 group-hover:text-[#dab26a] transition-colors w-10 shrink-0">0{i + 1}</span>
                  <span className="relative flex-1 min-w-0">
                    <span className="block font-serif text-xl text-[#1a4f6d] dark:text-white group-hover:text-white transition-colors">{b.name}</span>
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-200 mt-1 transition-colors">
                      <span className="inline-flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{b.head}</span>
                      <span className="inline-flex items-center gap-1.5 break-all"><Mail className="w-3.5 h-3.5" />{b.email}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="relative w-6 h-6 text-slate-300 group-hover:text-[#dab26a] group-hover:rotate-45 transition-all duration-500 shrink-0" />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
