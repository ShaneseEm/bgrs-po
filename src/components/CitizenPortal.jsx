import React, { useRef, useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, Clock, MessageSquare, Briefcase, ScrollText, FileSignature, ArrowLeft, ArrowRight } from 'lucide-react';
import { Reveal, PrimaryButton } from './ui';
import { ui } from '../data/ui';

const SERVICE_ICONS = [MessageSquare, Briefcase, ScrollText, FileSignature];

const inputClass =
  'w-full bg-white dark:bg-[#0a1a26] border border-slate-300 dark:border-slate-700 px-4 py-3 text-base text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#1a4f6d] focus:ring-4 focus:ring-[#1a4f6d]/10 dark:focus:border-[#dab26a] transition-all';

function Field({ id, label, required, requiredLabel, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#1a4f6d] dark:text-slate-200 mb-2">
        {label}
        {required && <span className="text-[#b0823a] ml-1" aria-label={requiredLabel}>*</span>}
      </label>
      {children}
    </div>
  );
}

export function CitizenPortal({ content, currentLang }) {
  const cp = content.citizenPortal;
  const f = cp.fields;
  const m = content.meta;
  const t = (ui[currentLang] || ui.en).portal;

  const empty = { fullName: '', email: '', phone: '', zone: t.zones[0], category: t.categories[0], subject: '', message: '' };
  const [form, setForm] = useState(empty);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState('next');
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const goStep = (to) => {
    setDir(to > step ? 'next' : 'back');
    setStep(to);
  };

  const pickService = (idx) => {
    setForm((prev) => ({ ...prev, category: t.categories[t.serviceCategory[idx]] ?? prev.category }));
    setSent(false);
    document.getElementById('request')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 2) {
      if (formRef.current?.reportValidity()) goStep(step + 1);
      return;
    }
    const body = [
      `${f.fullName}: ${form.fullName}`,
      `${f.email}: ${form.email}`,
      form.phone ? `${f.phone}: ${form.phone}` : null,
      `${f.zone}: ${form.zone}`,
      `${f.category}: ${form.category}`,
      '',
      form.message,
    ].filter((l) => l !== false && l != null).join('\n');
    window.location.href = `mailto:${m.email}?subject=${encodeURIComponent(`[${form.category}] ${form.subject}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const reset = () => {
    setForm(empty);
    setStep(0);
    setDir('back');
    setSent(false);
  };

  const review = [
    [f.fullName, form.fullName, 0],
    [f.email, form.email, 0],
    [f.phone, form.phone || '—', 0],
    [f.zone, form.zone, 0],
    [f.category, form.category, 1],
    [f.subject, form.subject, 1],
    [f.message, form.message, 1],
  ];

  return (
    <div id="services">
      {/* ===== Service desk hero ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fbf7ee] via-white to-[#eef5f9] dark:from-[#0c1f2e] dark:via-[#0a1a26] dark:to-[#0c1f2e]">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#dab26a]/15 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-[#1a4f6d]/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 lg:pt-20 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 animate-rise">
              <div className="eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-5">{cp.subtitle}</div>
              <h1 className="font-serif text-4xl lg:text-5xl text-[#0e2f45] dark:text-white leading-tight mb-6">{t.heroTitle}</h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">{cp.intro}</p>
              <PrimaryButton onClick={() => document.getElementById('request')?.scrollIntoView({ behavior: 'smooth' })}>{t.start}</PrimaryButton>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cp.quickServices.map((s, i) => {
                const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
                return (
                  <Reveal key={s.title} variant="zoom" delay={i * 110}>
                    <button
                      onClick={() => pickService(i)}
                      className="group w-full h-full flex flex-col items-start text-left bg-white dark:bg-[#0a1a26] border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 hover:border-[#dab26a] transition-all duration-500 cursor-pointer"
                    >
                      <span className="w-12 h-12 rounded-full bg-[#1a4f6d]/10 dark:bg-white/5 text-[#1a4f6d] dark:text-[#dab26a] flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-[#1a4f6d] group-hover:text-[#dab26a] group-hover:rotate-[-8deg] group-hover:scale-110">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="block font-serif text-xl text-[#1a4f6d] dark:text-white leading-snug mb-2">{s.title}</span>
                      <span className="block text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{s.desc}</span>
                      <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#1a4f6d] dark:text-[#dab26a]">
                        {t.start}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Request wizard ===== */}
      <section id="request" className="py-16 sm:py-24 bg-white dark:bg-[#0a1a26] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal variant="left" className="lg:col-span-4">
            <div className="eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-3">{t.formEyebrow}</div>
            <h2 className="font-serif text-3xl lg:text-4xl text-[#1a4f6d] dark:text-white leading-tight mb-5">{cp.formTitle}</h2>
            <span className="block w-16 h-1 bg-[#dab26a] rounded-full mb-6" />
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-10">{cp.formDesc}</p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3"><Phone className="w-4 h-4 mt-0.5 text-[#1a4f6d] dark:text-[#dab26a] shrink-0" /><span className="text-slate-700 dark:text-slate-200">{m.hotline}</span></li>
              <li className="flex items-start gap-3"><Mail className="w-4 h-4 mt-0.5 text-[#1a4f6d] dark:text-[#dab26a] shrink-0" /><a href={`mailto:${m.email}`} className="text-[#1a4f6d] dark:text-slate-200 hover:underline underline-offset-4">{m.email}</a></li>
              <li className="flex items-start gap-3"><Clock className="w-4 h-4 mt-0.5 text-[#1a4f6d] dark:text-[#dab26a] shrink-0" /><span className="text-slate-700 dark:text-slate-200">{m.workingHours}</span></li>
            </ul>
          </Reveal>

          <Reveal variant="right" className="lg:col-span-8">
            <div className="border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-[#0a1a26]">
              {/* Progress */}
              <div className="px-6 sm:px-10 pt-8">
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="font-semibold text-[#1a4f6d] dark:text-white">{sent ? t.sentTitle : t.steps[step]}</span>
                  {!sent && <span className="text-slate-400 tabular-nums">{t.stepOf(step + 1, 3)}</span>}
                </div>
                <ol className="grid grid-cols-3 gap-2" aria-hidden>
                  {t.steps.map((label, i) => (
                    <li key={label} className="h-1.5 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <span className={`block h-full bg-[#dab26a] origin-left transition-transform duration-700 ${sent || i <= step ? 'scale-x-100' : 'scale-x-0'}`} />
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-6 sm:p-10 overflow-hidden">
                {sent ? (
                  <div className="text-center py-8 animate-rise" role="status">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#1a4f6d]/10 text-[#1a4f6d] dark:text-[#dab26a] flex items-center justify-center animate-pulse-ring">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#1a4f6d] dark:text-white mb-4">{t.sentTitle}</h3>
                    <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8">
                      {t.sentBody}{' '}
                      <a href={`mailto:${m.email}`} className="text-[#1a4f6d] dark:text-[#dab26a] font-semibold underline underline-offset-4">{m.email}</a>
                    </p>
                    <button onClick={reset} className="min-h-11 inline-flex items-center justify-center border-2 border-[#1a4f6d] dark:border-slate-500 text-[#1a4f6d] dark:text-slate-100 px-7 py-3 text-[15px] font-semibold hover:bg-[#1a4f6d] hover:text-white transition-all cursor-pointer">
                      {t.another}
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate={false}>
                    <div key={step} className={dir === 'next' ? 'animate-step-next' : 'animate-step-back'}>
                      {step === 0 && (
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
                      )}

                      {step === 1 && (
                        <div className="space-y-5">
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
                        </div>
                      )}

                      {step === 2 && (
                        <dl className="divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
                          {review.map(([label, value, s]) => (
                            <div key={label} className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                              <dt className="sm:col-span-4 text-sm text-slate-500 dark:text-slate-400">{label}</dt>
                              <dd className="sm:col-span-7 text-slate-800 dark:text-slate-100 whitespace-pre-line break-words">{value}</dd>
                              <dd className="sm:col-span-1 sm:text-right">
                                <button type="button" onClick={() => goStep(s)} className="text-sm text-[#1a4f6d] dark:text-[#dab26a] hover:underline underline-offset-4 cursor-pointer">{t.edit}</button>
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 pt-8">
                      {step > 0 ? (
                        <button type="button" onClick={() => goStep(step - 1)} className="group inline-flex items-center gap-2 text-[15px] font-semibold text-slate-600 dark:text-slate-300 hover:text-[#1a4f6d] dark:hover:text-white cursor-pointer">
                          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                          {t.back}
                        </button>
                      ) : (
                        <span className="text-sm text-slate-400 hidden sm:block">* {t.required}</span>
                      )}
                      {step < 2 ? (
                        <PrimaryButton type="submit">{t.next}</PrimaryButton>
                      ) : (
                        <div className="flex flex-col sm:items-end gap-2">
                          <PrimaryButton type="submit" icon={false}>
                            <Send className="w-4 h-4" />
                            {f.submit}
                          </PrimaryButton>
                          <span className="text-xs text-slate-500 dark:text-slate-400 max-w-xs sm:text-right">{t.note}</span>
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
