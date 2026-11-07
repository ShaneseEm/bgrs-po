import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';

const links = ['home', 'president', 'initiatives', 'news', 'administration', 'services', 'contact'];

export function Footer({ content, setActiveSection }) {
  const m = content.meta;

  return (
    <footer className="bg-[#0e2f45] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <button onClick={() => setActiveSection('home')} className="flex items-center gap-3 text-left cursor-pointer">
          <img src={m.emblem} alt="" className="w-11 h-11 object-contain" />
          <span>
            <span className="block font-serif text-white text-[15px] leading-tight">{m.office}</span>
            <span className="block eyebrow text-[9px]! text-[#dab26a] mt-1">{m.region}</span>
          </span>
        </button>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[13px]">
            {links.map((id) => (
              <li key={id}>
                <button onClick={() => setActiveSection(id)} className="hover:text-[#dab26a] transition-colors cursor-pointer">
                  {content.nav[id]}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 text-center sm:text-left">
          <span>{content.footer.copyright}</span>
          <div className="flex items-center gap-5">
            <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" />
              {m.email}
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 hover:text-[#dab26a] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="bgrs-flag-bar w-full" />
      </div>
    </footer>
  );
}
