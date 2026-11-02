import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, FileText, Briefcase, Download, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

export function CitizenPortal({ content }) {
  const cp = content.citizenPortal;
  const f = cp.fields;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    zone: 'Assosa Zone',
    category: 'Public Feedback',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const randomRef = 'BGRS-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedRef(randomRef);
      setIsSubmitting(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        zone: 'Assosa Zone',
        category: 'Public Feedback',
        subject: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <section id="services" className="py-12 sm:py-16 bg-white dark:bg-slate-950 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{cp.subtitle}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-serif uppercase">
            {cp.title}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            {cp.intro}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-500 mx-auto mt-2.5 rounded-full"></div>
        </div>

        {/* 4 Quick Citizen Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cp.quickServices.map((service, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-emerald-900 dark:hover:bg-emerald-950 hover:text-white hover:border-amber-400 group transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center mb-4 transition-all">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-white font-serif mb-2 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 group-hover:text-emerald-100 leading-relaxed transition-colors">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 group-hover:border-emerald-800">
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 group-hover:text-amber-300 flex items-center gap-1.5">
                  <span>Access Service Online</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Feedback & Petition Form */}
        <div className="bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Form Intro Sidebar */}
            <div className="lg:col-span-5 p-8 sm:p-12 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Direct Citizen Channel</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-serif text-white leading-tight">
                  {cp.formTitle}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  {cp.formDesc}
                </p>

                <div className="space-y-3 pt-6 border-t border-emerald-900/60 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Every submission is reviewed by the Secretariat.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Receive official tracking reference number immediately.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Responses routed within 5 business working days.</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div className="bg-emerald-900/40 border border-emerald-700/50 p-4 rounded-xl text-xs">
                  <span className="font-bold text-amber-300 block mb-1">Confidentiality Guarantee:</span>
                  Public petitions and grievance submissions are handled under strict confidentiality protocols by the Regional Ombudsman.
                </div>
              </div>
            </div>

            {/* Form Controls Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 bg-slate-900/90">
              {submittedRef ? (
                <div className="bg-emerald-900/40 border-2 border-emerald-500 rounded-2xl p-8 text-center space-y-4 my-8">
                  <div className="w-16 h-16 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-serif text-white">Submission Successful!</h4>
                  <p className="text-sm text-emerald-200">
                    {f.successMsg}
                  </p>
                  <div className="font-mono text-xl font-bold bg-slate-950 text-amber-400 py-3 px-6 rounded-xl inline-block border border-amber-500/40 tracking-wider">
                    {submittedRef}
                  </div>
                  <p className="text-xs text-slate-400">
                    Please retain this official tracking code for inquiries with the Regional Cabinet Office.
                  </p>
                  <button
                    onClick={() => setSubmittedRef(null)}
                    className="mt-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        {f.fullName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                        placeholder="Abebe Kebede / H.E. / Citizen"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        {f.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                        placeholder="citizen@domain.et"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        {f.phone}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                        placeholder="+251 91 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        {f.zone}
                      </label>
                      <select
                        value={formData.zone}
                        onChange={(e) => setFormData({...formData, zone: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                      >
                        <option value="Assosa Zone">Assosa Zone (አሶሳ ዞን)</option>
                        <option value="Metekel Zone">Metekel Zone (መተከል ዞን)</option>
                        <option value="Kamashi Zone">Kamashi Zone (ካማሺ ዞን)</option>
                        <option value="Mao-Komo Special Woreda">Mao-Komo Special Woreda (ማኦ-ኮሞ)</option>
                        <option value="Pawe Special Woreda">Pawe Special Woreda (ፓዌ)</option>
                        <option value="Federal / Diaspora">Federal / Diaspora</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      {f.subject} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                      placeholder="Brief title of feedback or memorandum"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      {f.message} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-4 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                      placeholder="Detail your message, inquiry, or regional feedback..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ring-1 ring-amber-300/40"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>{isSubmitting ? f.submitting : f.submit}</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
