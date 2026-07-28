import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Phone, 
  Menu as MenuIcon, 
  X, 
  User, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles,
  Search
} from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItemsCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenUserAccount: () => void;
  onOpenAdminPanel: () => void;
  onOpenTrackOrder: () => void;
  onNavigateToSection: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemsCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenUserAccount,
  onOpenAdminPanel,
  onOpenTrackOrder,
  onNavigateToSection,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'deals', label: 'Deals', badge: 'HOT' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'reservation', label: 'Book Table' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    onNavigateToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-[#FF6B00] via-[#FFB703] to-[#FF6B00] text-[#0B0F19] text-xs sm:text-sm font-semibold py-1.5 px-4 text-center flex items-center justify-between z-50 relative overflow-hidden">
        <div className="hidden md:flex items-center space-x-4 mx-auto text-xs font-bold">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Opposite Total Petroleum, Jail Road, Faisalabad
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Mon - Sun: 11:00 AM – 10:00 PM
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-black font-extrabold bg-white/30 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-black" /> POV: You Just Found Your New Favorite Spot 🍕
          </span>
        </div>
        <div className="md:hidden mx-auto font-bold flex items-center gap-2">
          <span>🔥 FREE DELIVERY on orders over Rs. 1500!</span>
          <a href="tel:+923054402222" className="underline font-extrabold">Call +92 305 4402222</a>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-xl bg-[#111827]/40 border-b border-white/10 ${
        isScrolled 
          ? 'py-3 shadow-2xl bg-[#0B0F19]/80' 
          : 'py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-[#FF6B00] to-[#FFB703] rounded-xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300 text-black">
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
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold tracking-wide uppercase text-white/70">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-all duration-200 flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-[#FF6B00] border-b-2 border-[#FF6B00] font-bold' 
                      : 'hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="bg-[#FF6B00] text-black font-extrabold text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-red-400 transition-all border border-white/15"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-[#0B0F19]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Order Tracker Button */}
            <button
              onClick={onOpenTrackOrder}
              className="hidden md:flex p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-amber-400 hover:text-white transition-all border border-white/15"
              title="Track Order Status"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Reservation Button */}
            <button
              onClick={() => handleNavClick('reservation')}
              className="hidden xl:flex px-5 py-2.5 rounded-full border border-white/20 text-xs font-bold uppercase hover:bg-white/5 transition-all text-white"
            >
              RESERVATION
            </button>

            {/* Cart / Order Now Button */}
            <button
              onClick={onOpenCart}
              className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FFB703] text-black text-xs sm:text-sm font-extrabold uppercase shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ORDER NOW</span>
              <span className="bg-black text-[#FFB703] text-[10px] font-black px-1.5 py-0.5 rounded-full">
                {cartItemsCount}
              </span>
            </button>

            {/* User Account Button */}
            <button
              onClick={onOpenUserAccount}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-amber-400 transition-all border border-white/15"
              title="My Account / Orders"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Admin Dashboard Trigger */}
            <button
              onClick={onOpenAdminPanel}
              className="p-2.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-amber-500/30 transition-all"
              title="Admin Control Dashboard"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white border border-white/10 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl lg:hidden flex flex-col transition-all duration-300">
          <div className="p-4 flex items-center justify-between border-b border-white/10 bg-[#0B0F19]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍕</span>
              <span className="font-heading font-black text-xl text-white">
                MUNCH <span className="text-[#FF6B00]">&</span> CRUNCH
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto space-y-3">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200 mb-4">
              <p className="font-bold text-sm text-white mb-1">📍 Munch & Crunch Faisalabad</p>
              <p>Near KIPS College, Opposite Total Petroleum, Jail Road</p>
              <p className="mt-1 text-amber-400 font-semibold">📞 +92 305 4402222</p>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left py-3.5 px-4 rounded-xl text-lg font-bold transition-all flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#FFB703] text-black'
                    : 'text-gray-200 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="bg-[#0B0F19] text-[#FF6B00] text-xs font-black px-2 py-0.5 rounded-full border border-[#FF6B00]">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  onOpenTrackOrder();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-[#FF6B00]" />
                Track Live Order Status
              </button>

              <button
                onClick={() => {
                  onOpenAdminPanel();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Dashboard Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
