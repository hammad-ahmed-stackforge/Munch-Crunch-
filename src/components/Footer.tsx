import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  Send, 
  ShieldCheck, 
  Sparkles,
  Heart
} from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenAdminPanel: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection, onOpenAdminPanel }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#111827]/40 text-white pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      
      {/* Glow Orbs */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10 text-left">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#FF6B00] to-[#FFB703] rounded-xl flex items-center justify-center font-bold text-xl text-black">
                M
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tight uppercase text-white">
                  MUNCH <span className="text-[#FF6B00]">&</span> CRUNCH
                </span>
                <span className="text-[10px] text-[#FFB703] font-medium tracking-[0.2em] uppercase">
                  LUXURY FAST FOOD
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              POV: You Just Found Your New Favorite Spot 🍕. Serving freshly baked pizzas, crispy zinger burgers, loaded animal fries, and delicious wraps in Faisalabad.
            </p>

            <div className="space-y-2 text-xs text-gray-300 pt-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>Near KIPS College, Opp. Total Petroleum, Jail Road, Faisalabad</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFB703] shrink-0" />
                <a href="tel:+923054402222" className="text-amber-300 font-bold hover:underline">+92 305 4402222</a>
              </p>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {['Home', 'Deals', 'Menu', 'About', 'Gallery', 'Reviews', 'Reservation', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigateToSection(item.toLowerCase() === 'about' ? 'about' : item.toLowerCase() === 'book table' ? 'reservation' : item.toLowerCase())}
                    className="hover:text-amber-300 transition-colors uppercase tracking-wider text-[11px]"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Opening Hours */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <p className="flex items-center gap-1.5 text-white font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>7 Days A Week</span>
              </p>
              <p>Monday – Sunday</p>
              <p className="text-amber-300 font-bold">11:00 AM – 10:00 PM</p>
              <p className="text-[11px] text-emerald-400 font-medium pt-1">
                🟢 Open for dine-in, takeaway & fast delivery
              </p>
            </div>
          </div>

          {/* Col 5: Newsletter & Admin Access */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">
              Stay Connected
            </h4>
            <p className="text-xs text-gray-400">
              Subscribe for exclusive coupon codes & student discount alerts.
            </p>

            {subscribed ? (
              <p className="text-xs text-emerald-400 font-bold bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/30">
                🎉 Subscribed! Check code KIPS20 for 20% off.
              </p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FFB703] text-black font-extrabold text-xs uppercase hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}

            {/* Social Icons */}
            <div className="pt-3 flex items-center gap-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/50 hover:text-white text-xs transition-all">
                FB
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/50 hover:text-white text-xs transition-all">
                IG
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/50 hover:text-white text-xs transition-all">
                TK
              </a>
              <a href="https://wa.me/923054402222" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-emerald-600/20 flex items-center justify-center border border-emerald-500/30 text-emerald-400 hover:text-white hover:bg-emerald-600 text-xs transition-all">
                WA
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Munch & Crunch Faisalabad. Luxury Fast Food.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdminPanel}
              className="text-amber-400 hover:underline flex items-center gap-1 text-[11px] font-bold"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Control Dashboard
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
