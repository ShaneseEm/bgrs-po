import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Navigation as NavIcon, ExternalLink, ArrowRight } from 'lucide-react';
import { Reveal, SectionHeading } from './ui';
import { ui } from '../data/ui';

// Assosa, Benishangul Gumuz
const LAT = 10.0667;
const LON = 34.5333;
const MAP_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${LON - 0.06}%2C${LAT - 0.03}%2C${LON + 0.06}%2C${LAT + 0.03}&layer=mapnik&marker=${LAT}%2C${LON}`;
const MAP_LINK = `https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LON}#map=14/${LAT}/${LON}`;
const DIRECTIONS = `https://www.openstreetmap.org/directions?to=${LAT}%2C${LON}`;

// Office hours: Mon–Fri 08:30–17:30, East Africa Time (UTC+3)
const OPEN_MIN = 8 * 60 + 30;
const CLOSE_MIN = 17 * 60 + 30;

function eatNow() {
  const d = new Date(Date.now() + 3 * 3600 * 1000);
  return { day: (d.getUTCDay() + 6) % 7, minutes: d.getUTCHours() * 60 + d.getUTCMinutes() }; // day: 0 = Monday
}

function useOfficeStatus() {
  const [now, setNow] = useState(eatNow);
  useEffect(() => {
    const id = setInterval(() => setNow(eatNow()), 60_000);
    return () => clearInterval(id);
  }, []);
  return { ...now, open: now.day < 5 && now.minutes >= OPEN_MIN && now.minutes < CLOSE_MIN };
}

export function ContactSection({ content, currentLang, onNavigate }) {
  const m = content.meta;
  const t = (ui[currentLang] || ui.en).contact;
  const status = useOfficeStatus();

  const channels = [
    { icon: MapPin, title: t.address, lines: [{ text: content.footer.address }] },
    {
      icon: Phone,
      title: t.phone,
      lines: t.phones.map((text) => ({ text, href: `tel:${text.split(/[:：፦]\s*/).pop().replace(/\s/g, '')}` })),
    },
    {
      icon: Mail,
      title: t.email,
      lines: [m.email, 'press@bgrs-po.gov.et', 'cabinet@bgrs-po.gov.et'].map((e) => ({ text: e, href: `mailto:${e}` })),
    },
  ];

  const actions = [
    { icon: Phone, label: t.call, href: 'tel:8181' },
    { icon: Mail, label: t.emailUs, href: `mailto:${m.email}` },
    { icon: NavIcon, label: t.directions, href: DIRECTIONS, external: true },
  ];

  return (
    <div id="contact">
      {/* ===== Map hero ===== */}
      <section className="relative bg-slate-200 dark:bg-slate-900">
        <div className="absolute inset-0">
          <iframe title={`${t.location}: ${m.hq}`} src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full" />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0e2f45]/70 via-[#0e2f45]/20 to-transparent hidden lg:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[300px] lg:pt-16 pb-10 lg:pb-16 min-h-[620px] flex items-end lg:items-center pointer-events-none">
          <div className="pointer-events-auto w-full max-w-lg bg-white dark:bg-[#0a1a26] shadow-2xl animate-rise">
            <div className="p-8 sm:p-10">
              <h1 className="font-serif text-4xl lg:text-5xl text-[#0e2f45] dark:text-white leading-tight mb-4">{content.nav.contact}</h1>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{t.lead}</p>

              <div
                className={`inline-flex items-center gap-3 px-4 py-2.5 mb-8 border ${
                  status.open ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-900' : 'border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700'
                }`}
                role="status"
              >
                <span className={`w-2.5 h-2.5 rounded-full ${status.open ? 'bg-green-500 animate-pulse-ring' : 'bg-slate-400'}`} />
                <span className="text-sm">
                  <span className="font-semibold text-slate-800 dark:text-white">{status.open ? t.openNow : t.closedNow}</span>
                  <span className="text-slate-500 dark:text-slate-400"> · {status.open ? t.closesAt : t.opensAt}</span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {actions.map(({ icon: Icon, label, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex flex-col items-center gap-2 py-4 px-2 border border-slate-200 dark:border-slate-700 hover:bg-[#1a4f6d] hover:border-[#1a4f6d] hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    <Icon className="w-5 h-5 text-[#1a4f6d] dark:text-[#dab26a] group-hover:text-[#dab26a] group-hover:scale-110 transition-all" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-white leading-tight">{label}</span>
                  </a>
                ))}
              </div>
            </div>
            <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-8 sm:px-10 py-4 border-t border-slate-100 dark:border-slate-800 text-sm text-[#1a4f6d] dark:text-[#dab26a] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" />{m.hq}</span>
              <span className="inline-flex items-center gap-1.5">{t.openMap}<ExternalLink className="w-3.5 h-3.5" /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== Channels + hours ===== */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#0a1a26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={m.office} title={t.channels} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7 lg:self-start space-y-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
              {channels.map(({ icon: Icon, title, lines }, i) => (
                <Reveal key={title} variant="left" delay={i * 120} className="bg-white dark:bg-[#0a1a26] p-6 sm:p-8 flex gap-6 group">
                  <span className="w-12 h-12 shrink-0 rounded-full bg-[#1a4f6d]/10 dark:bg-white/5 text-[#1a4f6d] dark:text-[#dab26a] flex items-center justify-center transition-all duration-500 group-hover:bg-[#1a4f6d] group-hover:text-[#dab26a]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="eyebrow font-sans text-slate-800 dark:text-slate-100 mb-3">{title}</h3>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                      {lines.map(({ text, href }) => (
                        <li key={text}>
                          {href ? (
                            <a href={href} className="hover:text-[#1a4f6d] dark:hover:text-white hover:underline underline-offset-4 break-all">{text}</a>
                          ) : (
                            text
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal variant="right" className="lg:col-span-5">
              <div className="bg-[#0e2f45] text-white p-8 lg:p-10 h-full flex flex-col">
                <h3 className="font-serif text-2xl mb-6">{t.hours}</h3>
                <ul className="divide-y divide-white/10 mb-8">
                  {t.days.map((day, i) => {
                    const isToday = i === status.day;
                    return (
                      <li key={day} className={`flex items-center justify-between py-3 text-sm ${isToday ? 'text-[#dab26a] font-semibold' : 'text-slate-300'}`}>
                        <span className="flex items-center gap-2">
                          {day}
                          {isToday && <span className="eyebrow bg-[#dab26a] text-[#0e2f45] px-2 py-0.5">{t.today}</span>}
                        </span>
                        <span className="tabular-nums">{i < 5 ? '8:30 – 17:30' : t.closedDay}</span>
                      </li>
                    );
                  })}
                </ul>
                <p className="text-sm text-slate-400 mb-8">{t.closed}</p>
                <button
                  onClick={() => onNavigate('services')}
                  className="group mt-auto inline-flex items-center justify-between gap-4 bg-[#dab26a] hover:bg-white text-[#0e2f45] px-6 py-4 text-[15px] font-semibold transition-colors cursor-pointer"
                >
                  <span className="text-left">
                    <span className="block">{t.writeTitle}</span>
                    <span className="block text-sm font-normal opacity-80">{content.nav.services}</span>
                  </span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

