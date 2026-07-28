import React from 'react';
import { Sparkles, Heart, Award, Target, Eye, Quote, Clock, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const milestones = [
    { year: '2021', title: 'The First Spark', desc: 'Started as a passionate cloud kitchen near Jail Road serving hot zinger burgers.' },
    { year: '2023', title: 'Grand Opening', desc: 'Launched our flagship luxury dark-theme outlet opposite Total Petroleum Faisalabad.' },
    { year: '2025', title: 'KIPS Favorite', desc: 'Crossed 50,000+ satisfied student & family orders with 4.9 rating on Google.' },
    { year: '2026', title: 'Online Live Ordering', desc: 'Introduced real-time order tracking and instant online deal bookings.' }
  ];

  return (
    <section id="about" className="py-24 bg-[#0B0F19] relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Story & Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column - Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#FF6B00]" />
              <span>Our Culinary Journey</span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Crafting <span className="text-gradient">Fast Food Perfection</span> in Faisalabad
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Founded right in the heart of Jail Road near KIPS College, <strong className="text-white">Munch & Crunch</strong> was born out of a simple passion: to break away from ordinary fast food and deliver international gourmet quality at prices everyone can enjoy.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed">
              Every burger patty is freshly smashed, every zinger chicken fillet is hand-breaded in secret spices, and every pizza dough is proved daily for 18 hours to achieve that divine golden crisp.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#FF6B00] font-bold text-sm">
                  <Target className="w-4 h-4" />
                  <span>Our Mission</span>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed">
                  To serve fresh, crispy, hygiene-certified meals with rapid delivery and warm Pakistani hospitality.
                </p>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#FFB703] font-bold text-sm">
                  <Eye className="w-4 h-4" />
                  <span>Our Vision</span>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed">
                  To become the most beloved luxury fast food restaurant brand across Punjab, Pakistan.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column - Image Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Munch and Crunch Interior"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />

              {/* Floating Stat Badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Located At</p>
                  <p className="text-sm font-bold text-white">Jail Road, Faisalabad</p>
                </div>
                <div className="bg-[#FF6B00] text-black text-xs font-black px-3 py-1.5 rounded-xl">
                  4.9 ★ Rating
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Owner Message Box */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-amber-500/30 relative overflow-hidden mb-20">
          <Quote className="absolute -top-4 -right-4 w-32 h-32 text-amber-500/10 pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
            <span className="text-[#FF6B00] font-bold text-xs uppercase tracking-widest">Message from Founder</span>
            <p className="font-heading font-medium text-lg sm:text-2xl text-gray-200 italic leading-relaxed">
              "We built Munch & Crunch with one rule: never serve anything to our customers that we wouldn't proudly serve to our own family. Thank you Faisalabad for making us your new favorite spot!"
            </p>
            <div className="pt-2">
              <p className="font-heading font-black text-white text-base">M. Hammad & Team</p>
              <p className="text-xs text-amber-400 font-semibold">Founders, Munch & Crunch Faisalabad</p>
            </div>
          </div>
        </div>

        {/* Timeline Milestones */}
        <div>
          <h3 className="font-heading font-black text-2xl text-white text-center mb-10">
            Our Journey <span className="text-[#FF6B00]">Timeline</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 space-y-2 relative">
                <span className="text-3xl font-black text-gradient">{m.year}</span>
                <h4 className="font-heading font-bold text-white text-base">{m.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
