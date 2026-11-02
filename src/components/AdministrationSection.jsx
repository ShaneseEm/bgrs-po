import React, { useState } from 'react';
import { Users, Building, MapPin, Mail, ArrowUpRight, Shield, Layers } from 'lucide-react';

export function AdministrationSection({ content }) {
  const admin = content.administration;
  const [selectedZone, setSelectedZone] = useState(admin.zones[0]);

  return (
    <section id="administration" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/60 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>{admin.subtitle}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-sans uppercase">
            {admin.title}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            {admin.description}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-500 mx-auto mt-2.5 rounded-full"></div>
        </div>

        {/* 1. Zonal Administrations Grid */}
        <div className="mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-500" />
            <span>Administrative Zones & Special Woredas</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {admin.zones.map((zone, idx) => {
              const isSelected = selectedZone.name === zone.name;
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedZone(zone)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-gradient-to-br from-emerald-900 to-emerald-950 text-white border-amber-400 shadow-xl ring-2 ring-amber-400/50' 
                      : 'bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-600 dark:hover:border-emerald-500 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      Zone Seat: {zone.capital}
                    </span>
                    <Layers className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                  </div>

                  <h4 className={`text-lg font-bold font-sans mb-2 ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {zone.name}
                  </h4>

                  <p className={`text-xs leading-relaxed mb-4 ${isSelected ? 'text-emerald-100' : 'text-slate-600 dark:text-slate-400'}`}>
                    {zone.desc}
                  </p>

                  <div className={`pt-3 border-t text-[11px] font-semibold ${
                    isSelected ? 'border-emerald-800 text-amber-300' : 'border-slate-100 dark:border-slate-700 text-emerald-800 dark:text-emerald-400'
                  }`}>
                    {zone.woredas}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Key Sectoral Bureaus Directory */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/90 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sans">
                Regional Sectoral Bureaus Directory
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Executive departments operating under the direct coordination of the President's Office
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              6 Core Executive Portfolios
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {admin.bureaus.map((bureau, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900/60 hover:bg-emerald-50/50 dark:hover:bg-slate-900 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                      {bureau.head}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans mb-2">
                    {bureau.name}
                  </h4>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-mono truncate">{bureau.email}</span>
                  <a 
                    href={`mailto:${bureau.email}`}
                    className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-bold p-1 rounded hover:bg-emerald-100 dark:hover:bg-slate-800"
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
