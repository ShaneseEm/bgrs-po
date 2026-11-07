import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, Clock } from 'lucide-react';
import { PageHeader, SectionHeading, PrimaryButton } from './ui';
import { ui } from '../data/ui';

const inputClass =
  'w-full bg-white dark:bg-[#0a1a26] border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#1a4f6d] focus:ring-2 focus:ring-[#1a4f6d]/15 dark:focus:border-[#dab26a] transition-colors';

function Field({ id, label, required, requiredLabel, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-[#1a4f6d] dark:text-slate-200 mb-2">
        {label}
        {required && <span className="text-[#b0823a] ml-1" aria-label={requiredLabel}>*</span>}
      </label>
      {children}
    </div>
  );
}

export function CitizenPortal({ content, currentLang, onNavigate }) {
  const cp = content.citizenPortal;
  const f = cp.fields;
  const m = content.meta;
  const t = (ui[currentLang] || ui.en).portal;

  const empty = { fullName: '', email: '', phone: '', zone: t.zones[0], category: t.categories[0], subject: '', message: '' };
  const [form, setForm] = useState(empty);
  const [sent, setSent] = useState(false);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = [
      `${f.fullName}: ${form.fullName}`,
      `${f.email}: ${form.email}`,
      form.phone && `${f.phone}: ${form.phone}`,
      `${f.zone}: ${form.zone}`,
      `${f.category}: ${form.category}`,
      '',
      form.message,
    ].filter((line) => line !== false && line !== undefined && line !== null).join('\n');
    window.location.href = `mailto:${m.email}?subject=${encodeURIComponent(`[${form.category}] ${form.subject}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div id="services">
      <PageHeader
        content={content}
        onNavigate={onNavigate}
        eyebrow={cp.subtitle}
        title={cp.title}
        description={cp.intro}
        image="/images/culture.jpg"
      />

      {/* Services */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#0a1a26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={cp.subtitle} title={t.servicesTitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            {cp.quickServices.map((s, idx) => (
              <article key={s.title} className="group bg-white dark:bg-[#0a1a26] p-8 hover:bg-[#0e2f45] transition-colors duration-500">
                <div className="font-serif text-4xl text-[#dab26a] leading-none mb-6">0{idx + 1}</div>
                <h3 className="font-serif text-xl text-[#1a4f6d] dark:text-white group-hover:text-white leading-snug mb-4 transition-colors">{s.title}</h3>
                <span className="block w-8 h-[2px] bg-[#dab26a] mb-4 transition-all duration-500 group-hover:w-16" />
                <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-300 leading-relaxed transition-colors">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Message form */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] dark:bg-[#0c1f2e] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={t.formEyebrow} title={cp.formTitle} />
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">{cp.formDesc}</p>

            <div className="bg-white dark:bg-[#0a1a26] border border-slate-200 dark:border-slate-800">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 eyebrow text-[10px]! text-[#3a6d8c] dark:text-[#dab26a]">
                {t.directContact}
              </div>
              <ul className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                <li className="px-6 py-4 flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-[#1a4f6d] dark:text-[#dab26a] flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-200">{m.hotline}</span>
                </li>
                <li className="px-6 py-4 flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-[#1a4f6d] dark:text-[#dab26a] flex-shrink-0" />
                  <a href={`mailto:${m.email}`} className="text-[#1a4f6d] dark:text-slate-200 hover:underline underline-offset-4">{m.email}</a>
                </li>
                <li className="px-6 py-4 flex items-start gap-3">
                  <Clock className="w-4 h-4 mt-0.5 text-[#1a4f6d] dark:text-[#dab26a] flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-200">{m.workingHours}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#0a1a26] border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10">
              {sent ? (
                <div className="text-center py-10" role="status">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#1a4f6d]/10 text-[#1a4f6d] dark:text-[#dab26a] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1a4f6d] dark:text-white mb-4">{t.sentTitle}</h3>
                  <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8">
                    {t.sentBody}{' '}
                    <a href={`mailto:${m.email}`} className="text-[#1a4f6d] dark:text-[#dab26a] font-semibold underline underline-offset-4">{m.email}</a>
                  </p>
                  <button
                    onClick={() => { setForm(empty); setSent(false); }}
                    className="min-h-11 inline-flex items-center justify-center border-2 border-[#1a4f6d] dark:border-slate-500 text-[#1a4f6d] dark:text-slate-100 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#1a4f6d] hover:text-white transition-all cursor-pointer"
                  >
                    {t.another}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field id="cp-name" label={f.fullName} required requiredLabel={t.required}>
                      <input id="cp-name" type="text" required autoComplete="name" value={form.fullName} onChange={set('fullName')} className={inputClass} />
                    </Field>
                    <Field id="cp-email" label={f.email} required requiredLabel={t.required}>
                      <input id="cp-email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} className={inputClass} />
                    </Field>
                    <Field id="cp-phone" label={f.phone}>
                      <input id="cp-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} className={inputClass} placeholder="+251" />
                    </Field>
                    <Field id="cp-zone" label={f.zone}>
                      <select id="cp-zone" value={form.zone} onChange={set('zone')} className={inputClass}>
                        {t.zones.map((z) => <option key={z}>{z}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field id="cp-category" label={f.category}>
                    <select id="cp-category" value={form.category} onChange={set('category')} className={inputClass}>
                      {t.categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field id="cp-subject" label={f.subject} required requiredLabel={t.required}>
                    <input id="cp-subject" type="text" required maxLength={150} value={form.subject} onChange={set('subject')} className={inputClass} />
                  </Field>
                  <Field id="cp-message" label={f.message} required requiredLabel={t.required}>
                    <textarea id="cp-message" required rows={6} value={form.message} onChange={set('message')} className={`${inputClass} resize-y`} />
                  </Field>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">{t.note}</p>
                    <PrimaryButton type="submit" icon={false}>
                      <Send className="w-4 h-4" />
                      {f.submit}
                    </PrimaryButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
