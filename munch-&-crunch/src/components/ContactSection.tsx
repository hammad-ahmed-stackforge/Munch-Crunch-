import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageSquare, Send, CheckCircle2, Share2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <MapPin className="w-4 h-4 text-[#FF6B00]" />
            <span>Visit Us In Person</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Find Us & <span className="text-gradient">Get In Touch</span>
          </h2>
          <p className="mt-3 text-gray-300 text-base sm:text-lg">
            Located conveniently on Jail Road, Faisalabad right opposite Total Petroleum and near KIPS College.
          </p>
        </div>

        {/* Contact Info Cards + Map + Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info & Map Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Quick Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#FF6B00] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm">Restaurant Address</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Near KIPS College, Opposite Total Petroleum, Jail Road, Faisalabad, Punjab
                </p>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#FFB703] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm">Phone & WhatsApp</h4>
                <p className="text-xs text-amber-300 font-bold">
                  +92 305 4402222
                </p>
                <div className="flex gap-2 pt-1">
                  <a
                    href="https://wa.me/923054402222"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-emerald-600/30 text-emerald-400 text-[10px] font-bold border border-emerald-500/40 hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    💬 WhatsApp Chat
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-blue-600/30 text-blue-400 text-[10px] font-bold border border-blue-500/40 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    Facebook Page
                  </a>
                </div>
              </div>

            </div>

            {/* Google Maps Embed */}
            <div className="glass-card rounded-3xl overflow-hidden border border-white/10 h-72 shadow-xl relative">
              <iframe
                title="Munch and Crunch Location Map Faisalabad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.025642!2d73.0791!3d31.4187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242a000000001%3A0x1!2sJail+Rd%2C+Faisalabad!5e0!3m2!1sen!2spk!4v1680000000000!5m2!1sen!2spk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Quick Contact Form Column */}
          <div className="lg:col-span-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl text-left">
              <h3 className="font-heading font-black text-2xl text-white mb-2">Send Us A Message</h3>
              <p className="text-xs text-gray-400 mb-6">Have a question about catering, party orders, or feedback? Drop us a line.</p>

              {submitted && (
                <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Thank you! Your message has been sent to Munch & Crunch team.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bilal Ahmad"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">Email or Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. bilal@gmail.com or 0300 1234567"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">Message Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Event Booking, Party Catering Query"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FFB703] text-black font-extrabold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message Now</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
