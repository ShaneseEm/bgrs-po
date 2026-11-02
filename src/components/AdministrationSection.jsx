import React, { useState } from 'react';
import { Users, Building, MapPin, Mail, ArrowUpRight, Shield, Layers } from 'lucide-react';

export function AdministrationSection({ content }) {
  const admin = content.administration;
  const [selectedZone, setSelectedZone] = useState(admin.zones[0]);

  return (
    <section id="administration" className="py-16 sm:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>{admin.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif uppercase">
            {admin.title}
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            {admin.description}
          </p>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 1. Zonal Administrations Grid */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-slate-900 font-serif mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <span>Administrative Zones & Special Woredas</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admin.zones.map((zone, idx) => {
              const isSelected = selectedZone.name === zone.name;
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedZone(zone)}
                  className={`p-6 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-900 text-white border-amber-400 shadow-xl ring-2 ring-amber-400/50' 
                      : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-600 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Zone Seat: {zone.capital}
                    </span>
                    <Layers className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                  </div>

                  <h4 className={`text-lg font-bold font-serif mb-2 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {zone.name}
                  </h4>

                  <p className={`text-xs leading-relaxed mb-4 ${isSelected ? 'text-emerald-100' : 'text-slate-600'}`}>
                    {zone.desc}
                  </p>

                  <div className={`pt-3 border-t text-[11px] font-semibold ${
                    isSelected ? 'border-emerald-800 text-amber-300' : 'border-slate-100 text-emerald-800'
                  }`}>
                    {zone.woredas}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Key Sectoral Bureaus Directory */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                Regional Sectoral Bureaus Directory
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Executive departments operating under the direct coordination of the President's Office
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              6 Core Executive Portfolios
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {admin.bureaus.map((bureau, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-lg border border-slate-100 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-4 h-4 text-emerald-700" />
                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
                      {bureau.head}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-serif mb-2">
                    {bureau.name}
                  </h4>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono truncate">{bureau.email}</span>
                  <a 
                    href={`mailto:${bureau.email}`}
                    className="text-emerald-700 hover:text-emerald-900 font-bold p-1 rounded hover:bg-emerald-100"
                    title={`Email ${bureau.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
