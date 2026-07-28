import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  HeroSection 
} from './components/HeroSection';
import { 
  DealsSection 
} from './components/DealsSection';
import { 
  MenuSection 
} from './components/MenuSection';
import { 
  ProductCustomizationModal 
} from './components/ProductCustomizationModal';
import { 
  WhyChooseUs 
} from './components/WhyChooseUs';
import { 
  AboutSection 
} from './components/AboutSection';
import { 
  GallerySection 
} from './components/GallerySection';
import { 
  ReviewsSection 
} from './components/ReviewsSection';
import { 
  ReservationSection 
} from './components/ReservationSection';
import { 
  ContactSection 
} from './components/ContactSection';
import { 
  Footer 
} from './components/Footer';
import { 
  CartDrawer 
} from './components/CartDrawer';
import { 
  CheckoutModal 
} from './components/CheckoutModal';
import { 
  OrderTrackerModal 
} from './components/OrderTrackerModal';
import { 
  UserAccountModal 
} from './components/UserAccountModal';
import { 
  AdminPanel 
} from './components/AdminPanel';

import { 
  INITIAL_MENU_ITEMS, 
  INITIAL_DEALS, 
  INITIAL_GALLERY, 
  INITIAL_REVIEWS, 
  INITIAL_COUPONS, 
  INITIAL_ORDERS, 
  INITIAL_RESERVATIONS 
} from './data/initialData';

import { 
  MenuItem, 
  CartItem, 
  DealItem, 
  Order, 
  Reservation, 
  Review, 
  Coupon, 
  OrderStatus 
} from './types';

import { MessageCircle, ArrowUp, ShoppingBag } from 'lucide-react';

export default function App() {
  // Application Core State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('mnc_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [deals, setDeals] = useState<DealItem[]>(INITIAL_DEALS);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mnc_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('mnc_wishlist');
    return saved ? JSON.parse(saved) : ['z1', 'p1'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mnc_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('mnc_reservations');
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('mnc_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Modals & Drawers Control
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderTrackerOpen, setOrderTrackerOpen] = useState(false);
  const [userAccountOpen, setUserAccountOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  // Customization Modal State
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Active Section Spy
  const [activeSection, setActiveSection] = useState('hero');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Persist State to LocalStorage
  useEffect(() => {
    localStorage.setItem('mnc_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('mnc_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('mnc_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('mnc_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mnc_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('mnc_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Scroll listener for active section spy & back to top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sections = ['hero', 'deals', 'menu', 'about', 'gallery', 'reviews', 'reservation', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Audio Sound Effect on Add to Cart
  const playAddToCartSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Ignore if web audio blocked
    }
  };

  // Cart Operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => 
        item.menuItem.id === newItem.menuItem.id &&
        item.selectedSize?.id === newItem.selectedSize?.id &&
        item.selectedCrust?.id === newItem.selectedCrust?.id
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        updated[existingIdx].itemTotal = updated[existingIdx].quantity * updated[existingIdx].itemPrice;
        return updated;
      }

      return [...prev, newItem];
    });

    playAddToCartSound();
    setCartOpen(true);
  };

  const handleQuickAddToCart = (item: MenuItem) => {
    const singlePrice = item.price;
    const newCartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity: 1,
      itemPrice: singlePrice,
      itemTotal: singlePrice
    };
    handleAddToCart(newCartItem);
  };

  const handleClaimDeal = (deal: DealItem) => {
    // Convert Deal into Cart Item
    const dealMenuItem: MenuItem = {
      id: deal.id,
      name: deal.name,
      category: 'Pizza',
      description: deal.description,
      price: deal.price,
      originalPrice: deal.originalPrice,
      image: deal.image,
      rating: 5.0,
      reviewsCount: 1,
      preparationTime: '20 mins'
    };

    handleQuickAddToCart(dealMenuItem);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }

    setCartItems(prev => prev.map(item => {
      if (item.id === cartItemId) {
        return {
          ...item,
          quantity: newQty,
          itemTotal: newQty * item.itemPrice
        };
      }
      return item;
    }));
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  // Wishlist Toggle
  const handleToggleWishlist = (itemId: string) => {
    setWishlistIds(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  // Coupon Application
  const handleApplyCoupon = (code: string): boolean => {
    const found = INITIAL_COUPONS.find(c => c.code === code);
    const currentSubtotal = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);

    if (found && currentSubtotal >= found.minAmount) {
      setAppliedCoupon(found);
      return true;
    }
    return false;
  };

  // Order Placement Handler
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setAppliedCoupon(null);
    setCheckoutOpen(false);
    setOrderTrackerOpen(true);
  };

  // Navigation Smooth Scroll
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const wishlistMenuItems = menuItems.filter(item => wishlistIds.includes(item.id));
  const cartItemsCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col selection:bg-[#FF6B00] selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Navbar
        cartItemsCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setUserAccountOpen(true)}
        onOpenUserAccount={() => setUserAccountOpen(true)}
        onOpenAdminPanel={() => setAdminPanelOpen(true)}
        onOpenTrackOrder={() => setOrderTrackerOpen(true)}
        onNavigateToSection={scrollToSection}
        activeSection={activeSection}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <HeroSection
          onOrderNow={() => scrollToSection('deals')}
          onViewMenu={() => scrollToSection('menu')}
          featuredItems={menuItems}
          onAddToCart={handleQuickAddToCart}
        />

        {/* 2. Today's Deals Section */}
        <DealsSection
          deals={deals}
          onClaimDeal={handleClaimDeal}
        />

        {/* 3. Interactive Menu Section */}
        <MenuSection
          menuItems={menuItems}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onOpenCustomizeModal={(item) => setCustomizingItem(item)}
          onQuickAddToCart={handleQuickAddToCart}
        />

        {/* 4. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 5. About Munch & Crunch Section */}
        <AboutSection />

        {/* 6. Gallery Section */}
        <GallerySection galleryItems={INITIAL_GALLERY} />

        {/* 7. Customer Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={(newRev) => setReviews([newRev, ...reviews])}
        />

        {/* 8. Table Reservation Section */}
        <ReservationSection
          onAddReservation={(newRes) => setReservations([newRes, ...reservations])}
        />

        {/* 9. Contact & Location Section */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer
        onNavigateToSection={scrollToSection}
        onOpenAdminPanel={() => setAdminPanelOpen(true)}
      />

      {/* Floating Action Elements */}
      {/* 1. Floating Immersive Cart Button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-8 right-8 z-50 group flex items-center justify-center focus:outline-none"
        title="Open Order Cart"
      >
        <div className="absolute inset-0 bg-[#FF6B00] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative w-16 h-16 rounded-full bg-[#FF6B00] flex items-center justify-center shadow-2xl overflow-hidden hover:scale-105 active:scale-95 transition-all text-black font-bold">
          <ShoppingBag className="w-6 h-6 text-black" />
          {cartItemsCount > 0 && (
            <span className="absolute top-3 right-3 w-4 h-4 bg-white text-black text-[9px] font-black rounded-full flex items-center justify-center shadow">
              {cartItemsCount}
            </span>
          )}
        </div>
      </button>

      {/* 2. Floating Direct WhatsApp Contact */}
      <a
        href="https://wa.me/923054402222"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-28 right-8 z-40 p-3.5 rounded-full bg-emerald-500 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border border-emerald-400/40 group"
        title="Direct WhatsApp Order"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
      </a>

      {/* 3. Floating Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-40 right-8 z-40 p-3 rounded-full bg-white/10 hover:bg-[#FF6B00] text-gray-300 hover:text-black border border-white/20 backdrop-blur-md transition-all shadow-xl"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Modals & Drawers */}
      {/* 1. Customization Modal */}
      <ProductCustomizationModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 2. Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={() => setAppliedCoupon(null)}
        couponsList={INITIAL_COUPONS}
      />

      {/* 3. Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        appliedCoupon={appliedCoupon}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* 4. Live Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={orderTrackerOpen}
        onClose={() => setOrderTrackerOpen(false)}
        orders={orders}
      />

      {/* 5. User Account & Wishlist Modal */}
      <UserAccountModal
        isOpen={userAccountOpen}
        onClose={() => setUserAccountOpen(false)}
        wishlistItems={wishlistMenuItems}
        onRemoveWishlist={handleToggleWishlist}
        orders={orders}
        onOpenTrackOrder={(orderNum) => setOrderTrackerOpen(true)}
        onAddToCart={handleQuickAddToCart}
      />

      {/* 6. Comprehensive Admin Panel */}
      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        menuItems={menuItems}
        onAddMenuItem={(item) => setMenuItems([item, ...menuItems])}
        onUpdateMenuItem={(item) => setMenuItems(menuItems.map(m => m.id === item.id ? item : m))}
        onDeleteMenuItem={(id) => setMenuItems(menuItems.filter(m => m.id !== id))}
        orders={orders}
        onUpdateOrderStatus={(orderId, newStatus) => {
          setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        }}
        reservations={reservations}
        onUpdateReservationStatus={(resId, newStatus) => {
          setReservations(reservations.map(r => r.id === resId ? { ...r, status: newStatus } : r));
        }}
        reviews={reviews}
        deals={deals}
      />

    </div>
  );
}
