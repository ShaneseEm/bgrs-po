import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, FileText, Briefcase, Download, ShieldAlert, Sparkles } from 'lucide-react';

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
    <section id="services" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
            <span>{cp.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif uppercase">
            {cp.title}
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            {cp.intro}
          </p>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 4 Quick Citizen Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cp.quickServices.map((service, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-900 hover:text-white hover:border-amber-400 group transition-all duration-300 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center mb-4 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-white font-serif mb-2 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 group-hover:text-emerald-100 leading-relaxed transition-colors">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 group-hover:border-emerald-800">
                <span className="text-[11px] font-bold text-amber-700 group-hover:text-amber-300 flex items-center gap-1">
                  Access Service Online →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Feedback & Petition Form */}
        <div className="bg-slate-900 text-white rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Form Intro Sidebar */}
            <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-br from-emerald-950 to-slate-900 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                  Direct Citizen Channel
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-serif text-white leading-tight">
                  {cp.formTitle}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {cp.formDesc}
                </p>

                <div className="space-y-3 pt-6 border-t border-emerald-900/60 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Every submission is reviewed by the Secretariat.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Receive official tracking reference number immediately.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Responses routed within 5 business working days.</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div className="bg-emerald-900/50 border border-emerald-700/60 p-4 rounded-lg text-xs">
                  <span className="font-bold text-amber-300 block mb-1">Confidentiality Guarantee:</span>
                  Public petitions and grievance submissions are handled under strict confidentiality protocols.
                </div>
              </div>
            </div>

            {/* Form Controls Column */}
            <div className="lg:col-span-7 p-8 sm:p-10 bg-slate-900">
              {submittedRef ? (
                <div className="bg-emerald-900/40 border-2 border-emerald-500 rounded-xl p-8 text-center space-y-4 my-8">
                  <div className="w-16 h-16 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-serif text-white">Submission Successful!</h4>
                  <p className="text-sm text-emerald-200">
                    {f.successMsg}
                  </p>
                  <div className="font-mono text-xl font-bold bg-slate-950 text-amber-400 py-2.5 px-6 rounded-md inline-block border border-amber-500/40 tracking-wider">
                    {submittedRef}
                  </div>
                  <p className="text-xs text-slate-400">
                    Please retain this reference number for all subsequent inquiries at the Assosa Secretariat.
                  </p>
                  <button
                    onClick={() => setSubmittedRef(null)}
                    className="mt-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded transition-colors"
                  >
                    Submit Another Communication
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">{f.fullName} *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                        placeholder="e.g. Abebe Bekele"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">{f.email} *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                        placeholder="citizen@domain.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">{f.phone}</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                        placeholder="+251 9..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">{f.zone}</label>
                      <select 
                        value={formData.zone}
                        onChange={(e) => setFormData({...formData, zone: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                      >
                        <option value="Assosa Zone">Assosa Zone</option>
                        <option value="Metekel Zone">Metekel Zone</option>
                        <option value="Kamashi Zone">Kamashi Zone</option>
                        <option value="Mao-Komo Special">Mao-Komo Special Woreda</option>
                        <option value="Federal / Diaspora">Federal / Diaspora</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">{f.category}</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                      >
                        <option value="Public Feedback">Public Feedback</option>
                        <option value="Petition / Grievance">Petition / Grievance</option>
                        <option value="Development Request">Development Request</option>
                        <option value="Investment Inquiry">Investment Inquiry</option>
                        <option value="Media Inquiry">Media Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">{f.subject} *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                      placeholder="Brief summary of your inquiry..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">{f.message} *</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                      placeholder="Provide full details, context, and requested action..."
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider py-3.5 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? f.submitting : f.submit}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
