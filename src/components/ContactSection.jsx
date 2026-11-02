import React from 'react';
import { MapPin, Phone, Mail, Clock, Shield, Globe, ExternalLink } from 'lucide-react';

export function ContactSection({ content }) {
  const m = content.meta;

  return (
    <section id="contact" className="py-12 sm:py-16 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
            <Phone className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>EXECUTIVE COMMUNICATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-sans uppercase">
            {content.nav.contact}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-500 mx-auto mt-2.5 rounded-full"></div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Details Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800/90 p-6 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-700 shadow-xl space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-700 pb-6">
              <img src="/images/bgrs-emblem-new.png" alt="Official BGRS Emblem" className="w-16 h-16 object-contain" />
              <img src="/images/bgrs-flag-new.png" alt="Official BGRS Flag" className="w-13 h-8.5 object-cover rounded shadow-sm border border-slate-200 dark:border-slate-700 hidden sm:block" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans">
                  Executive Headquarters & Secretariat
                </h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-400 font-semibold uppercase tracking-wider mt-0.5">
                  Benishangul Gumuz Regional State
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200 dark:border-emerald-800">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wide mb-1">Physical Location</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    President's Office Compound,<br />
                    Assosa City, Benishangul Gumuz Region,<br />
                    Federal Democratic Republic of Ethiopia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-200 dark:border-amber-800">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wide mb-1">Telephone Exchanges</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Hotline: 8181 (Toll-Free)<br />
                    Main Switchboard: +251 57 775 0012<br />
                    Media Relations: +251 57 775 0045
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200 dark:border-emerald-800">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wide mb-1">Official Correspondence</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-mono">
                    info@bgrs-po.gov.et<br />
                    press@bgrs-po.gov.et<br />
                    cabinet@bgrs-po.gov.et
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5 border border-slate-300 dark:border-slate-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wide mb-1">Office Hours</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Monday – Friday: 8:30 AM – 5:30 PM<br />
                    Lunch Recess: 12:30 PM – 1:30 PM<br />
                    Closed on Public & State Holidays
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Official Secretariat of the Benishangul Gumuz Government</span>
              </span>
              <a
                href="#services"
                className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 uppercase tracking-wider flex items-center gap-1"
              >
                <span>Direct Citizen Message</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Regional Administrative Map Representation (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>Regional Capital</span>
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                  9°00'N 34°32'E
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold font-sans mb-2">
                Assosa Executive Complex
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-6 font-light">
                Positioned in the historic regional capital of Assosa, the President's Office commands administrative oversight across Assosa, Metekel, and Kamashi zones, directly bordering the Blue Nile basin.
              </p>

              {/* Photo representation of the capital / complex */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-lg mb-6">
                <img 
                  src="/images/assosa-city.jpg" 
                  alt="Assosa City Regional Capital" 
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 text-[11px] font-bold text-amber-300">
                  Assosa City Panorama • Regional Center
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Assosa Hidase Airport:</span>
                <span className="font-semibold text-white">12 km East of Compound</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">GERD Guba Site:</span>
                <span className="font-semibold text-white">~180 km North-East</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Addis Ababa Federal Liaison:</span>
                <span className="font-semibold text-white">660 km via B40 Highway</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
