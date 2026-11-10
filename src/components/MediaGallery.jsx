import React, { useState } from 'react';
import { useDialog } from './ui';

/* Always-visible media section: videos and photos collected from every article */
export function MediaGallery({ articles, lang, page = false }) {
  const am = lang === 'am';
  const [open, setOpen] = useState(null);
  useDialog(open !== null, () => setOpen(null));

  const seen = new Set();
  const uniq = (list, key) => list.filter((x) => !seen.has(key(x)) && seen.add(key(x)));
  const videos = uniq(articles.flatMap((a) => a.videos || []), (v) => v.id || v.url);
  seen.clear();
  const photos = uniq(articles.flatMap((a) => a.gallery || []), (g) => g.src);
  if (!videos.length && !photos.length) return page ? <p className="text-center text-slate-500 py-24 max-w-7xl mx-auto">{am ? 'ምንም ሚዲያ የለም።' : 'No photos or videos yet.'}</p> : null;

  const step = (d) => setOpen((i) => (i + d + photos.length) % photos.length);

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 ${page ? 'pt-12 lg:pt-16 min-h-[60vh]' : ''}`} aria-label={am ? 'የፎቶና ቪዲዮ ማዕከል' : 'Photo and video gallery'}>
      <div className="pb-4 mb-8 border-b-4 border-[#1a4f6d] dark:border-[#dab26a]">
        <div className="eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-2">{am ? 'ሚዲያ' : 'Media'}</div>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#1a4f6d] dark:text-white leading-tight tracking-tight">{am ? 'የፎቶና ቪዲዮ ማዕከል' : 'Video & Photo Gallery'}</h2>
      </div>

      {videos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {videos.map((v) =>
            v.type === 'youtube' ? (
              <figure key={v.id}>
                <div className="aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <figcaption className="text-sm text-slate-500 dark:text-slate-400 mt-2">{v.title}</figcaption>
              </figure>
            ) : (
              <a key={v.url} href={v.url} target="_blank" rel="noreferrer" className="aspect-video flex items-center justify-center text-center p-6 bg-[#0e2f45] text-white font-serif text-lg hover:bg-[#1a4f6d] transition-colors">
                {v.label}
              </a>
            )
          )}
        </div>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((g, i) => (
            <button key={g.src} onClick={() => setOpen(i)} className="group relative overflow-hidden bg-slate-200 aspect-[4/3] cursor-pointer focus-visible:outline-3 focus-visible:outline-[#dab26a]" aria-label={g.caption}>
              <img src={g.src} alt={g.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a2233]/85 to-transparent text-left text-xs text-white px-3 pt-8 pb-2">{g.caption}</span>
            </button>
          ))}
        </div>
      )}

      {open !== null && (
        <div className="fixed inset-0 z-[130] bg-[#0a2233]/95 flex items-center justify-center p-4 animate-fade-in" onClick={() => setOpen(null)}>
          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={photos[open].src} alt={photos[open].caption} className="w-full max-h-[80vh] object-contain" />
            <figcaption className="text-white text-center text-sm mt-3">{photos[open].caption} · {open + 1}/{photos.length}</figcaption>
          </figure>
          <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white text-2xl cursor-pointer hover:bg-white/20" aria-label="Previous">‹</button>
          <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white text-2xl cursor-pointer hover:bg-white/20" aria-label="Next">›</button>
          <button onClick={() => setOpen(null)} className="absolute top-3 right-3 w-11 h-11 rounded-full bg-white/10 text-white text-xl cursor-pointer hover:bg-white/20" aria-label="Close">✕</button>
        </div>
      )}
    </section>
  );
}
