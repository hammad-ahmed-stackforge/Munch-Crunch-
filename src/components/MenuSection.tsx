import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Star, 
  Heart, 
  ShoppingBag, 
  SlidersHorizontal, 
  Sparkles, 
  Clock, 
  Plus, 
  Info,
  Check
} from 'lucide-react';
import { MenuItem, CategoryType } from '../types';

interface MenuSectionProps {
  menuItems: MenuItem[];
  wishlistIds: string[];
  onToggleWishlist: (itemId: string) => void;
  onOpenCustomizeModal: (item: MenuItem) => void;
  onQuickAddToCart: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  wishlistIds,
  onToggleWishlist,
  onOpenCustomizeModal,
  onQuickAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [spicyOnly, setSpicyOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);

  const categories: CategoryType[] = [
    'All',
    'Pizza',
    'Burger',
    'Zinger',
    'Fries',
    'Wraps',
    'BBQ',
    'Shawarma',
    'Drinks',
    'Desserts'
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpicy = !spicyOnly || item.isSpicy;
      const matchesPopular = !popularOnly || item.isPopular;

      return matchesCategory && matchesSearch && matchesSpicy && matchesPopular;
    });
  }, [menuItems, selectedCategory, searchQuery, spicyOnly, popularOnly]);

  return (
    <section id="menu" className="py-20 relative bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4 text-[#FF6B00]" />
            <span>Prepared Fresh Daily</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Our Mouthwatering <span className="text-gradient">Menu</span>
          </h2>
          <p className="mt-3 text-gray-300 text-base sm:text-lg">
            Explore our handcrafted gourmet pizzas, extra-crispy zinger burgers, loaded fries, authentic shawarma, and sweet desserts.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-6 mb-12">
          
          {/* Top Search & Toggles Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search pizza, zinger, fries, wrap..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Badges */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1">
              <button
                onClick={() => setSpicyOnly(!spicyOnly)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  spicyOnly
                    ? 'bg-red-500/20 text-red-400 border-red-500/50'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/20'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-red-500" />
                <span>Spicy Only</span>
              </button>

              <button
                onClick={() => setPopularOnly(!popularOnly)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  popularOnly
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/20'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Bestsellers</span>
              </button>
            </div>

          </div>

          {/* Category Tabs Scrollbar */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-2 border-b border-white/10">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF6B00] to-[#FFB703] text-black shadow-lg scale-105'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl p-8 border border-white/10 max-w-md mx-auto">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-lg font-bold text-white">No Menu Items Found</h3>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or category filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSpicyOnly(false);
                setPopularOnly(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#FF6B00] text-black font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const isWishlisted = wishlistIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-[#FF6B00]/40 transition-all duration-300 hover:-translate-y-1.5 group hover:shadow-2xl hover:shadow-[#FF6B00]/15"
                >
                  <div>
                    {/* Card Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-900">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-black/30" />

                      {/* Wishlist Button */}
                      <button
                        onClick={() => onToggleWishlist(item.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                          isWishlisted
                            ? 'bg-red-500 text-white shadow-lg'
                            : 'bg-black/50 text-gray-300 hover:text-red-400 hover:bg-black/70'
                        }`}
                        title="Add to Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                      </button>

                      {/* Discount or Popular Badge */}
                      {item.discountBadge && (
                        <div className="absolute top-3 left-3 bg-[#FF6B00] text-black font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-md">
                          {item.discountBadge}
                        </div>
                      )}

                      {/* Spicy Indicator */}
                      {item.isSpicy && (
                        <div className="absolute bottom-3 left-3 bg-red-600/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-white" /> Spicy
                        </div>
                      )}

                      {/* Rating Badge */}
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-500/30">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{item.rating}</span>
                        <span className="text-gray-400 text-[10px]">({item.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="text-amber-400 font-semibold">{item.category}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" /> {item.preparationTime}
                        </span>
                      </div>

                      <h3 className="font-heading font-extrabold text-lg text-white group-hover:text-[#FF6B00] transition-colors leading-snug">
                        {item.name}
                      </h3>

                      <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom - Price & Customization Action */}
                  <div className="p-5 pt-0 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        {item.originalPrice && (
                          <span className="text-xs text-gray-400 line-through mr-1.5">
                            Rs. {item.originalPrice}
                          </span>
                        )}
                        <span className="font-heading font-black text-xl text-[#FF6B00]">
                          Rs. {item.price}
                        </span>
                      </div>

                      {item.sizes || item.crusts || item.addons ? (
                        <button
                          onClick={() => onOpenCustomizeModal(item)}
                          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#FF6B00] hover:text-black text-amber-300 font-bold text-xs transition-all flex items-center gap-1 border border-white/10"
                        >
                          <span>Customize</span>
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => onQuickAddToCart(item)}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FFB703] text-black font-extrabold text-xs hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
