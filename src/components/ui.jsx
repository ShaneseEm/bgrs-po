import React, { useEffect } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

/* Navy page banner used at the top of every inner page */
export function PageHeader({ content, onNavigate, eyebrow, title, description, image }) {
  return (
    <section className="relative bg-[#0e2f45] text-white overflow-hidden">
      {image && <img src={image} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-20" />}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a2233] via-[#0e2f45]/95 to-[#0e2f45]/75" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pb-20">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-slate-400 mb-10 lg:mb-14">
          <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
            {content.nav.home}
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#dab26a]" aria-current="page">{title}</span>
        </nav>
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-[#dab26a]" />
              <span className="eyebrow text-[#dab26a]">{eyebrow}</span>
            </div>
          )}
          <h1 className="font-serif text-4xl sm:text-5xl leading-[1.1] text-white mb-5">{title}</h1>
          {description && <p className="text-base sm:text-lg text-slate-300 leading-relaxed">{description}</p>}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, className = '' }) {
  return (
    <div className={`mb-10 ${className}`}>
      {eyebrow && <div className="eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-3">{eyebrow}</div>}
      <h2 className="font-serif text-3xl lg:text-4xl text-[#1a4f6d] dark:text-white leading-tight tracking-tight mb-5">{title}</h2>
      <span className="block w-16 md:w-24 h-1 bg-[#dab26a] rounded-full" />
    </div>
  );
}

export function PrimaryButton({ children, onClick, type = 'button', disabled, icon = true, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`min-h-11 inline-flex items-center justify-center gap-2 bg-[#1a4f6d] hover:bg-[#0e2f45] text-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl transition-all active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {children}
      {icon && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}

export function OutlineButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="min-h-11 inline-flex items-center justify-center border-2 border-[#1a4f6d] dark:border-slate-500 text-[#1a4f6d] dark:text-slate-100 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#1a4f6d] hover:text-white dark:hover:bg-white dark:hover:text-[#0e2f45] transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
    >
      {children}
    </button>
  );
}

/* Esc-to-close + background scroll lock for any overlay */
export function useDialog(open, onClose) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
}
