import React from 'react';
import { Flame, Clock, CheckCircle2, ShoppingBag, Sparkles } from 'lucide-react';
import { DealItem } from '../types';

interface DealsSectionProps {
  deals: DealItem[];
  onClaimDeal: (deal: DealItem) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({ deals, onClaimDeal }) => {
  return (
    <section id="deals" className="py-20 relative bg-[#0B0F19] overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#FF6B00]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#FFB703]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FF6B00]/20 to-[#FFB703]/20 border border-[#FF6B00]/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Flame className="w-4 h-4 text-[#FF6B00] animate-bounce" />
            <span>Limited Time Exclusive Offers</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Today's <span className="text-gradient">Hot Deals</span> & Combos
          </h2>
          <p className="mt-3 text-gray-300 text-base sm:text-lg">
            Unbeatable fast food combos crafted for maximum flavor and huge savings. Freshly made on order!
          </p>
        </div>

        {/* Deals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => {
            const savingsAmount = deal.originalPrice - deal.price;

            return (
              <div
                key={deal.id}
                className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-[#FF6B00]/50 transition-all duration-300 hover:-translate-y-2 group hover:shadow-2xl hover:shadow-[#FF6B00]/20"
              >
                <div>
                  {/* Card Image Header with Badges */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-black/40" />

                    {/* Top Discount Badge */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#FF6B00] to-[#FFB703] text-black font-extrabold text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 fill-black" />
                      <span>{deal.discountBadge}</span>
                    </div>

                    {/* Savings Tag */}
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-500/30">
                      Save Rs. {savingsAmount}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="font-heading font-extrabold text-xl text-white group-hover:text-[#FF6B00] transition-colors">
                        {deal.name}
                      </h3>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                        {deal.description}
                      </p>
                    </div>

                    {/* Included Items Checklist */}
                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Combo Includes:</p>
                      {deal.itemsList.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer - Pricing & Action */}
                <div className="p-5 pt-0 border-t border-white/5 space-y-3">
                  <div className="flex items-baseline justify-between pt-3">
                    <div>
                      <span className="text-xs text-gray-400 line-through mr-2">
                        Rs. {deal.originalPrice}
                      </span>
                      <span className="font-heading font-black text-2xl text-[#FF6B00]">
                        Rs. {deal.price}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                      <Clock className="w-3 h-3 text-amber-400" /> Hot Deal
                    </span>
                  </div>

                  <button
                    onClick={() => onClaimDeal(deal)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FFB703] text-black font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Claim Deal & Order</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
