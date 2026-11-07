import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { PageHeader, SectionHeading, PrimaryButton } from './ui';
import { ui } from '../data/ui';

// Assosa, Benishangul Gumuz
const LAT = 10.0667;
const LON = 34.5333;
const MAP_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${LON - 0.045}%2C${LAT - 0.03}%2C${LON + 0.045}%2C${LAT + 0.03}&layer=mapnik&marker=${LAT}%2C${LON}`;
const MAP_LINK = `https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LON}#map=14/${LAT}/${LON}`;

export function ContactSection({ content, currentLang, onNavigate }) {
  const m = content.meta;
  const t = (ui[currentLang] || ui.en).contact;

  const blocks = [
    { icon: MapPin, title: t.address, lines: [content.footer.address] },
    { icon: Phone, title: t.phone, lines: t.phones, tel: true },
    { icon: Mail, title: t.email, lines: [m.email, 'press@bgrs-po.gov.et', 'cabinet@bgrs-po.gov.et'], mail: true },
    { icon: Clock, title: t.hours, lines: [m.workingHours, t.closed] },
  ];

  return (
    <div id="contact">
      <PageHeader content={content} onNavigate={onNavigate} eyebrow={t.eyebrow} title={content.nav.contact} description={t.lead} image="/images/assosa-city.jpg" />

      <section className="py-16 sm:py-24 bg-white dark:bg-[#0a1a26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={m.office} title={m.hq} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 mb-16">
            {blocks.map(({ icon: Icon, title, lines, tel, mail }) => (
              <div key={title} className="bg-white dark:bg-[#0a1a26] p-8">
                <Icon className="w-6 h-6 text-[#3a6d8c] dark:text-[#dab26a] mb-5" />
                <h3 className="eyebrow font-sans text-slate-800 dark:text-slate-100 mb-3">{title}</h3>
                <span className="block w-8 h-[2px] bg-[#dab26a] mb-4" />
                <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lines.map((line) => {
                    if (mail) return <li key={line}><a href={`mailto:${line}`} className="hover:text-[#1a4f6d] dark:hover:text-white hover:underline underline-offset-4 break-all">{line}</a></li>;
                    if (tel) {
                      const num = line.split(/[:：፦]\s*/).pop().replace(/\s/g, '');
                      return <li key={line}><a href={`tel:${num}`} className="hover:text-[#1a4f6d] dark:hover:text-white hover:underline underline-offset-4">{line}</a></li>;
                    }
                    return <li key={line}>{line}</li>;
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
            <div className="lg:col-span-8">
              <div className="relative border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 h-[360px] lg:h-full lg:min-h-[420px]">
                <iframe
                  title={`${t.location}: ${m.hq}`}
                  src={MAP_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#1a4f6d] dark:text-[#dab26a] hover:underline underline-offset-4">
                {t.openMap}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="lg:col-span-4 bg-[#0e2f45] text-white p-8 lg:p-10 flex flex-col justify-center">
              <img src={m.emblem} alt="" className="w-14 h-14 object-contain mb-6" />
              <h3 className="font-serif text-2xl mb-4">{t.writeTitle}</h3>
              <p className="text-slate-300 leading-relaxed mb-8">{t.writeBody}</p>
              <PrimaryButton onClick={() => onNavigate('services')} className="bg-[#dab26a]! text-[#0e2f45]! hover:bg-white! self-start">
                {content.nav.services}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
