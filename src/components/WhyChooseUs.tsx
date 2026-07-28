import React from 'react';
import { 
  Sparkles, 
  Truck, 
  Flame, 
  DollarSign, 
  Award, 
  Users, 
  ShieldCheck,
  Heart
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-7 h-7 text-[#FF6B00]" />,
      title: 'Fresh Ingredients',
      description: '100% halal certified meat, organic vegetables, and premium real mozzarella cheese sourced daily.'
    },
    {
      icon: <Truck className="w-7 h-7 text-[#FFB703]" />,
      title: 'Lightning Fast Delivery',
      description: 'Hot thermal insulated delivery right to your doorstep across Jail Road & Faisalabad within 25-30 minutes.'
    },
    {
      icon: <Flame className="w-7 h-7 text-[#FF6B00]" />,
      title: 'Unmatched Taste & Crunch',
      description: 'Secret house marinades, double fried zinger crunch, and wood-fire styled pizza recipes.'
    },
    {
      icon: <DollarSign className="w-7 h-7 text-amber-400" />,
      title: 'Affordable Student Deals',
      description: 'Unbeatable value combos designed specifically for KIPS College students and family gatherings.'
    },
    {
      icon: <Award className="w-7 h-7 text-[#FFB703]" />,
      title: 'Master Fast Food Chefs',
      description: 'Culinary experts with 10+ years of experience crafting international fast food recipes.'
    },
    {
      icon: <Users className="w-7 h-7 text-[#FF6B00]" />,
      title: 'Luxury Family Environment',
      description: 'Air-conditioned dark luxury dining area with comfortable booths and hygienic open kitchen.'
    }
  ];

  return (
    <section className="py-20 bg-[#0B0F19] relative overflow-hidden border-t border-b border-white/5">
      
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6B00]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
            <span>The Munch & Crunch Promise</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Why We Are <span className="text-gradient">Faisalabad's #1 Spot</span>
          </h2>
          <p className="mt-3 text-gray-300 text-base sm:text-lg">
            We don't just make fast food — we craft unforgettable culinary experiences with uncompromising quality.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-8 border border-white/10 hover:border-[#FF6B00]/40 transition-all duration-300 hover:-translate-y-2 group hover:shadow-2xl hover:shadow-[#FF6B00]/15"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B00]/20 to-[#FFB703]/10 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF6B00] group-hover:text-black transition-all duration-300">
                {feature.icon}
              </div>

              <h3 className="font-heading font-extrabold text-xl text-white mb-3 group-hover:text-[#FFB703] transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
