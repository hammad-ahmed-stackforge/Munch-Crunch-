import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem, Coupon } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  couponsList: Coupon[];
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  couponsList
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);
  
  // Calculate discount
  const discountPercent = appliedCoupon ? appliedCoupon.discountPercent : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);

  // Delivery fee logic
  const freeDeliveryThreshold = 1500;
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 100;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput) return;

    const success = onApplyCoupon(couponInput.trim());
    if (!success) {
      setCouponError('Invalid coupon code or minimum order amount not met.');
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn">
      <div className="bg-[#0B0F19] border-l border-white/10 w-full max-w-md h-full flex flex-col shadow-2xl relative text-left">
        
        {/* Cart Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0B0F19]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl text-white">Your Order Cart</h2>
              <p className="text-xs text-gray-400">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Banner */}
        <div className="bg-gradient-to-r from-[#FF6B00]/20 via-[#FFB703]/20 to-[#FF6B00]/20 px-4 py-2.5 border-b border-amber-500/20 text-xs text-amber-300 flex items-center justify-between font-bold">
          {subtotal >= freeDeliveryThreshold ? (
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="w-4 h-4" /> 🎉 You qualified for FREE DELIVERY!
            </span>
          ) : (
            <span>Add Rs. {freeDeliveryThreshold - subtotal} more for FREE DELIVERY</span>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <span className="text-5xl">🛒</span>
              <p className="font-bold text-lg text-white">Your cart is empty</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore our mouthwatering menu to add burgers, pizza, or deals!
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#FF6B00] text-black font-extrabold text-xs"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-4 border border-white/10 flex items-start justify-between gap-3"
              >
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-heading font-extrabold text-sm text-white truncate">
                    {item.menuItem.name}
                  </h4>

                  {/* Size & Crust Badges */}
                  <div className="flex flex-wrap gap-1 text-[10px] text-amber-300 font-semibold">
                    {item.selectedSize && <span>Size: {item.selectedSize.name}</span>}
                    {item.selectedCrust && <span>• {item.selectedCrust.name}</span>}
                  </div>

                  {/* Add-ons list */}
                  {item.selectedAddons && item.selectedAddons.length > 0 && (
                    <p className="text-[10px] text-gray-400 truncate">
                      + {item.selectedAddons.map(a => a.name).join(', ')}
                    </p>
                  )}

                  {/* Item Price */}
                  <p className="text-xs font-black text-[#FF6B00] pt-0.5">
                    Rs. {item.itemTotal}
                  </p>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-end justify-between h-full space-y-2">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-gray-500 hover:text-red-400 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white min-w-[14px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Coupon */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#070A12] space-y-4">
            
            {/* Coupon Code Section */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-xs">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <Tag className="w-4 h-4 text-[#FF6B00]" />
                    <span>Coupon '{appliedCoupon.code}' Applied ({appliedCoupon.discountPercent}% OFF)</span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-gray-400 hover:text-red-400 text-[10px] font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon (e.g. KIPS20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/10 hover:bg-[#FF6B00] hover:text-black text-amber-300 font-bold text-xs rounded-xl transition-all"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[10px] text-red-400 mt-1">{couponError}</p>}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-gray-400 pt-2 border-t border-white/5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-bold">Rs. {subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Discount</span>
                  <span className="font-bold">- Rs. {discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-white font-bold">
                  {deliveryFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-heading font-black text-white pt-2 border-t border-white/10">
                <span>Total Amount</span>
                <span className="text-[#FF6B00] text-xl">Rs. {finalTotal}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FF8500] to-[#FFB703] text-black font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl glow-orange flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
