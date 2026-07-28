import React from 'react';
import { ShoppingBag, Utensils, Star, Flame, Sparkles, ChevronDown, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { MenuItem } from '../types';

interface HeroSectionProps {
  onOrderNow: () => void;
  onViewMenu: () => void;
  featuredItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOrderNow,
  onViewMenu,
  featuredItems,
  onAddToCart
}) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 lg:py-24 bg-[#0B0F19]">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FF6B00] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#FFB703] rounded-full blur-[120px] opacity-5 pointer-events-none" />

      {/* Dark Luxury Hero Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=80"
          alt="Munch and Crunch Hero Fast Food"
          className="w-full h-full object-cover object-center filter brightness-[0.2] contrast-125 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Typography & CTAs */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold uppercase tracking-widest">
            <span className="text-sm">🍕</span>
            <span>POV: You Just Found Your New Favorite Spot</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-white">
            Taste That You'll <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFD166]">
              Never Forget
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            Fresh Ingredients <span className="text-[#FF6B00] font-bold">•</span> Crispy Bites <span className="text-[#FF6B00] font-bold">•</span> Delicious Meals <span className="text-[#FF6B00] font-bold">•</span> Affordable Prices
          </p>

          {/* Quick Location & Delivery Highlights */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-gray-300">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <span>📍 Opp. Total Petroleum, Jail Road, Faisalabad</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#FFB703]" />
              <span>Hot Delivery in 25 Mins</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onOrderNow}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6B00] via-[#FF8500] to-[#FFB703] text-black font-extrabold text-base uppercase tracking-wider shadow-2xl glow-orange hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Order Online Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onViewMenu}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-base uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Utensils className="w-5 h-5 text-[#FFB703]" />
              <span>Explore Menu</span>
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-[#0B0F19]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-[#0B0F19]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-[#0B0F19]" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-bold text-white ml-1">4.9/5</span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">10,000+ Happy Foodies in Faisalabad</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Showcase Container */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          <div className="w-[340px] sm:w-[380px] h-[380px] bg-gradient-to-b from-[#111827] to-[#0B0F19] rounded-3xl border border-white/10 shadow-2xl p-6 relative flex flex-col items-center justify-center overflow-hidden group">
            
            {/* Background Glow Ring */}
            <div className="w-48 h-48 bg-gradient-to-tr from-[#FF6B00] to-[#FFB703] rounded-full opacity-20 blur-xl absolute pointer-events-none" />

            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
              alt="Ultimate Zinger Burger"
              className="w-56 h-56 object-cover rounded-full shadow-[0_0_50px_rgba(255,107,0,0.3)] border-2 border-white/10 group-hover:scale-105 transition-transform duration-500 relative z-10"
              referrerPolicy="no-referrer"
            />

            {/* Showcase Overlay Badge */}
            <div className="mt-6 text-center z-10">
              <span className="bg-[#FF6B00] text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                SIGNATURE BESTSELLER
              </span>
              <h3 className="font-bold text-lg text-white mt-1">Ultimate Zinger Stack</h3>
              <p className="text-xs text-[#FFB703] font-extrabold">Rs. 690</p>
            </div>

            {/* Floating Info Tag */}
            <div className="absolute top-4 left-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Crispy & Fresh</span>
            </div>

            <div className="absolute bottom-4 right-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-bold">
              ★ 4.9 Rating
            </div>
          </div>

        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400 hover:text-amber-400 transition-colors cursor-pointer" onClick={onViewMenu}>
        <span className="text-[10px] uppercase tracking-widest font-bold mb-1">Scroll to Explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>

    </section>
  );
};
