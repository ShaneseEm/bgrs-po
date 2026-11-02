import React from 'react';
import { MapPin, Phone, Mail, Clock, Shield, Globe, ExternalLink } from 'lucide-react';

export function ContactSection({ content }) {
  const m = content.meta;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>EXECUTIVE COMMUNICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif uppercase">
            {content.nav.contact}
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Details Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <img src={content.meta.emblem || "/images/emblem.png"} alt="Official Emblem" className="w-14 h-14 object-contain" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-serif">
                  Executive Headquarters & Secretariat
                </h3>
                <p className="text-xs text-emerald-800 font-semibold uppercase tracking-wider">
                  Benishangul Gumuz Regional State
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">Physical Location</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    President's Office Compound,<br />
                    Assosa City, Benishangul Gumuz Region,<br />
                    Federal Democratic Republic of Ethiopia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">Telephone & Hotlines</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-mono">
                    Hotline: 8181<br />
                    Office: +251 57 775 0012<br />
                    Protocol: +251 57 775 0145
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">Official Electronic Mail</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-mono">
                    info@bgrs-po.gov.et<br />
                    protocol@bgrs-po.gov.et<br />
                    press@bgrs-po.gov.et
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">Operating Hours</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {m.workingHours}<br />
                    Weekend: Emergency lines on standby 24/7
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 flex items-center justify-between text-xs">
              <span className="text-emerald-950 font-medium">Need in-person appointment or official protocol clearance?</span>
              <a 
                href="#services" 
                className="font-bold text-emerald-800 underline hover:text-emerald-950"
              >
                Submit protocol request →
              </a>
            </div>
          </div>

          {/* Assosa Map / Capitol Visualization (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative h-64 sm:h-72 bg-slate-900">
              <img 
                src="/images/assosa-city.jpg" 
                alt="Regional Capital City of Assosa" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-white text-xs">
                  <div className="font-bold font-serif text-sm">Assosa Regional Capital</div>
                  <div className="text-amber-300 text-[11px]">Seat of the Regional Executive Council</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Coordinates:</span>
                <span className="font-mono text-slate-600">10.0667° N, 34.5333° E</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Elevation:</span>
                <span className="text-slate-600">1,570 m (Assosa Plateau)</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Assosa,Ethiopia"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 py-2 px-4 rounded text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Open in Regional GIS / Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
