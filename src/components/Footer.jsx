import React from 'react';
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { titleCase } from './ui';
import { ui } from '../data/ui';

const federalPortals = [
  { label: 'Office of the Prime Minister', href: 'https://www.pmo.gov.et' },
  { label: 'Ethiopian News Agency', href: 'https://www.ena.et' },
  { label: 'National Bank of Ethiopia', href: 'https://nbe.gov.et' },
];

function Column({ title, children }) {
  return (
    <div>
      <h2 className="eyebrow font-sans text-[#dab26a] mb-4">{title}</h2>
      {children}
    </div>
  );
}

export function Footer({ content, currentLang, setActiveSection }) {
  const m = content.meta;
  const f = content.footer;
  const t = (ui[currentLang] || ui.en).contact;

  return (
    <footer className="bg-[#0e2f45] text-slate-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        <div>
          <button onClick={() => setActiveSection('home')} className="flex items-center lg:flex-col lg:items-start gap-3 text-left cursor-pointer">
            <img src={m.emblem} alt="" className="w-12 h-12 object-contain shrink-0" />
            <span>
              <span className="block font-serif text-white text-base leading-tight">{titleCase(m.office)}</span>
              <span className="block eyebrow text-slate-400 mt-1">{m.region}</span>
            </span>
          </button>
        </div>

        <div>
          <Column title={f.contactHq}>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                <span>{f.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                <a href="tel:8181" className="hover:text-white transition-colors">
                  {m.hotline.split('|').map((part) => (
                    <span key={part} className="block">{part.trim()}</span>
                  ))}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                <a href={`mailto:${m.email}`} className="hover:text-white transition-colors">{m.email}</a>
              </li>
            </ul>
          </Column>
        </div>

        <div>
          <Column title={t.hours}>
            <p className="flex items-start gap-3">
              <Clock className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
              <span>
                {m.workingHours}
                <span className="block text-slate-400 mt-1">{t.closed}</span>
              </span>
            </p>
          </Column>
        </div>

        <div>
          <Column title={f.federalLinks}>
            <ul className="space-y-3">
              {federalPortals.map((p) => (
                <li key={p.href}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 hover:text-white transition-colors">
                    {p.label}
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#dab26a] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </Column>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4 text-[13px] text-slate-400">
          <span>{f.copyright}</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 shrink-0 inline-flex items-center justify-center rounded-full border border-white/15 hover:border-[#dab26a] hover:text-[#dab26a] transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
        <div className="bgrs-flag-bar w-full" />
      </div>
    </footer>
  );
}
