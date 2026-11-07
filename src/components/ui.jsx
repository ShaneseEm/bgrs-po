import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* Fires once when the element scrolls into view */
export function useInView({ threshold = 0.15, once = true, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once, rootMargin]);
  return [ref, inView];
}

/* Scroll-reveal wrapper: variant = up | left | right | zoom */
export function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal reveal-${variant} ${inView ? 'is-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Counts the leading number of a string up from 0, e.g. "5,150+ MW" */
export function CountUp({ value, duration = 1600 }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const match = String(value).match(/[\d,.]+/);
  const target = match ? parseFloat(match[0].replace(/,/g, '')) : null;
  const decimals = match && match[0].includes('.') ? match[0].split('.')[1].length : 0;
  const [n, setN] = useState(target === null ? null : 0);

  useEffect(() => {
    if (!inView || target === null) return;
    if (prefersReducedMotion()) return setN(target);
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setN(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  if (target === null) return <span ref={ref}>{value}</span>;
  const formatted = n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span ref={ref}>{String(value).replace(match[0], formatted)}</span>;
}

export function SectionHeading({ eyebrow, title, className = '', light = false }) {
  return (
    <Reveal className={`mb-10 ${className}`}>
      {eyebrow && <div className={`eyebrow mb-3 ${light ? 'text-[#dab26a]' : 'text-[#3a6d8c] dark:text-[#dab26a]'}`}>{eyebrow}</div>}
      <h2 className={`font-serif text-3xl lg:text-4xl leading-tight tracking-tight mb-5 ${light ? 'text-white' : 'text-[#1a4f6d] dark:text-white'}`}>{title}</h2>
      <span className="gold-rule-grow block w-16 md:w-24 h-1 bg-[#dab26a] rounded-full" />
    </Reveal>
  );
}

export function PrimaryButton({ children, onClick, type = 'button', disabled, icon = true, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group min-h-11 inline-flex items-center justify-center gap-2 bg-[#1a4f6d] hover:bg-[#0e2f45] text-white px-7 py-3.5 text-[15px] font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {children}
      {icon && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
    </button>
  );
}

export function OutlineButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="min-h-11 inline-flex items-center justify-center border-2 border-[#1a4f6d] dark:border-slate-500 text-[#1a4f6d] dark:text-slate-100 px-7 py-3 text-[15px] font-semibold hover:bg-[#1a4f6d] hover:text-white dark:hover:bg-white dark:hover:text-[#0e2f45] transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
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

/* "OFFICE OF THE REGIONAL PRESIDENT" → "Office of the Regional President" (no-op for Ge'ez script) */
const SMALL_WORDS = new Set(['of', 'the', 'and', 'for', 'in', 'on', 'at', 'to', '&']);
export const titleCase = (s = '') =>
  s
    .toLowerCase()
    .split(' ')
    .map((w, i) => (i > 0 && SMALL_WORDS.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
