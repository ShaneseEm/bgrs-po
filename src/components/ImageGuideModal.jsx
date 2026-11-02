import React, { useState } from 'react';
import { X, Image, Upload, Check, Folder, Info, Sparkles, FileCheck } from 'lucide-react';

export function ImageGuideModal({ isOpen, onClose, currentLang }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('slots');

  const imageSlots = [
    {
      id: 'president',
      filename: 'president-portrait.svg (or .jpg / .png)',
      path: 'public/images/president-portrait.svg',
      purpose: 'Official Portrait of the President (H.E. Ashadli Hassan)',
      dimensions: '600 x 750 px (Portrait 4:5 ratio)',
      currentPreview: '/images/president-portrait.svg',
      tip: 'High-resolution official formal attire portrait.'
    },
    {
      id: 'emblem',
      filename: 'emblem.svg (or .png)',
      path: 'public/images/emblem.svg',
      purpose: 'Benishangul Gumuz Regional State Official Seal / Emblem',
      dimensions: '500 x 500 px (Square 1:1, transparent background)',
      currentPreview: '/images/emblem.svg',
      tip: 'Official government shield and eagle crest.'
    },
    {
      id: 'gerd',
      filename: 'gerd-banner.svg (or .jpg / .png)',
      path: 'public/images/gerd-banner.svg',
      purpose: 'Grand Ethiopian Renaissance Dam (GERD - Guba Woreda)',
      dimensions: '1200 x 600 px (Landscape 2:1 or 16:9)',
      currentPreview: '/images/gerd-banner.svg',
      tip: 'Panoramic shot of the dam wall, reservoir, or spillways.'
    },
    {
      id: 'hq',
      filename: 'assosa-hq.svg (or .jpg / .png)',
      path: 'public/images/assosa-hq.svg',
      purpose: "President's Executive Office Headquarters in Assosa",
      dimensions: '1200 x 800 px (3:2 ratio)',
      currentPreview: '/images/assosa-hq.svg',
      tip: 'Exterior or grand entrance of the Assosa state house.'
    },
    {
      id: 'agriculture',
      filename: 'agriculture.svg (or .jpg / .png)',
      path: 'public/images/agriculture.svg',
      purpose: 'Regional Agriculture, Bamboo, Green Legacy & Farmland',
      dimensions: '800 x 500 px',
      currentPreview: '/images/agriculture.svg',
      tip: 'Commercial farming in Metekel or bamboo forestry in Kamashi.'
    },
    {
      id: 'mining',
      filename: 'mining.svg (or .jpg / .png)',
      path: 'public/images/mining.svg',
      purpose: 'Gold Reserves, Artisanal Cooperatives & Mineral Wealth',
      dimensions: '800 x 500 px',
      currentPreview: '/images/mining.svg',
      tip: 'Gold extraction, mining sites, or mineral laboratories.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold font-serif text-base text-white">
                {currentLang === 'am' ? 'የምስሎች ማስተካከያ እና የመተኪያ መመሪያ' : 'Official Image Replacement Guide'}
              </h3>
              <p className="text-xs text-amber-300">
                {currentLang === 'am' 
                  ? 'የራስዎን ፎቶዎች በድረ-ገፁ ላይ እንዴት መተካት እንደሚችሉ' 
                  : 'How to easily replace placeholder graphics with your real photographs'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3.5 flex items-start gap-3 text-xs text-amber-950">
          <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Simple File Replacement:</span> To swap any picture, simply save your image file into the project folder <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-amber-900">public/images/</code> with the corresponding filename listed below. All changes will reflect immediately!
          </div>
        </div>

        {/* Image Slots List */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {imageSlots.map((slot) => (
              <div 
                key={slot.id} 
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-4 hover:border-emerald-600 transition-all shadow-xs"
              >
                {/* Visual Preview */}
                <div className="w-28 h-28 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-200 flex items-center justify-center">
                  <img 
                    src={slot.currentPreview} 
                    alt={slot.purpose} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded inline-block mb-1">
                      Target File
                    </span>
                    <h4 className="font-mono text-xs font-bold text-slate-900 break-all">
                      {slot.filename}
                    </h4>
                    <p className="text-xs text-slate-600 font-serif mt-1 font-semibold">
                      {slot.purpose}
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-500 mt-2 space-y-0.5 border-t border-slate-200 pt-1.5">
                    <div><span className="font-semibold text-slate-700">Recommended Size:</span> {slot.dimensions}</div>
                    <div className="text-amber-700 font-medium italic">{slot.tip}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick command summary */}
          <div className="bg-slate-900 text-slate-200 rounded-xl p-5 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-amber-400 flex items-center gap-2">
              <Folder className="w-4 h-4" />
              <span>Project Directory Destination:</span>
            </div>
            <p className="font-mono bg-slate-950 p-2.5 rounded border border-slate-800 text-emerald-400 break-all select-all">
              c:\Users\Admin\Documents\bgrs-po\public\images\
            </p>
            <p className="text-slate-400 text-[11px]">
              Whenever you share your photos or provide them in chat, they can be directly placed here and the website will automatically display them!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-end z-10">
          <button
            onClick={onClose}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded transition-colors"
          >
            Understood, Close Guide
          </button>
        </div>

      </div>
    </div>
  );
}
