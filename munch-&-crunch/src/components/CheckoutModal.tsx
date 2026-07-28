import React, { useState } from 'react';
import { X, CheckCircle2, Truck, ShieldCheck, MapPin, Phone, User, FileText, ArrowRight } from 'lucide-react';
import { CartItem, Order, Coupon } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  onPlaceOrder: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedCoupon,
  onPlaceOrder
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Faisalabad');
  const [instructions, setInstructions] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);
  const discountPercent = appliedCoupon ? appliedCoupon.discountPercent : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = subtotal >= 1500 ? 0 : 100;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    const newOrderNumber = `MNC-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      items: cartItems,
      subtotal,
      discount: discountAmount,
      deliveryFee,
      total,
      customerInfo: {
        name,
        phone,
        address,
        city,
        instructions
      },
      paymentMethod: 'Cash on Delivery',
      status: 'Pending',
      createdAt: 'Just now',
      estimatedDeliveryTime: '25-30 Mins'
    };

    onPlaceOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="glass-card bg-[#0B0F19] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl text-left">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0B0F19]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-[#FF6B00]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-black text-2xl text-white">Cash on Delivery Checkout</h2>
              <p className="text-xs text-gray-400">Fast delivery across Jail Road & Faisalabad</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
            
            <h3 className="font-heading font-extrabold text-base text-amber-300 flex items-center gap-2 border-b border-white/10 pb-2">
              <User className="w-4 h-4 text-[#FF6B00]" />
              1. Delivery Address & Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Usman Ali"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Mobile / WhatsApp (+92) *</label>
                <input
                  type="tel"
                  required
                  placeholder="0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-gray-300 block mb-1">Street Address / House No. *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House #14, St #2, near KIPS College, Jail Road"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">City</label>
                <input
                  type="text"
                  readOnly
                  value={city}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-amber-300 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Delivery Instructions (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Ring bell twice, leave with security guard..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            {/* Payment Method Badge */}
            <h3 className="font-heading font-extrabold text-base text-amber-300 flex items-center gap-2 border-b border-white/10 pb-2 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
              2. Payment Method
            </h3>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-[#FF6B00]/10 border border-amber-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💵</span>
                <div>
                  <p className="font-bold text-white text-sm">Cash on Delivery (COD)</p>
                  <p className="text-gray-400 text-[11px]">Pay with cash when your food arrives hot & fresh</p>
                </div>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-500/40">
                ACTIVE
              </span>
            </div>

            {/* Order Summary Breakdown */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
              <p className="font-bold text-white mb-2">Order Items ({cartItems.length})</p>
              {cartItems.map((ci) => (
                <div key={ci.id} className="flex justify-between text-gray-300">
                  <span className="truncate max-w-[240px]">{ci.quantity}x {ci.menuItem.name}</span>
                  <span className="font-bold text-white">Rs. {ci.itemTotal}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-white/10 flex justify-between font-extrabold text-sm text-white">
                <span>Total Amount Payable:</span>
                <span className="text-[#FF6B00] text-lg">Rs. {total}</span>
              </div>
            </div>

          </form>

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-white/10 bg-[#070A12] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl bg-white/5 text-gray-300 font-bold text-xs hover:bg-white/10"
          >
            Back
          </button>

          <button
            type="submit"
            form="checkout-form"
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FF8500] to-[#FFB703] text-black font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl glow-orange flex items-center justify-center gap-2"
          >
            <span>Place Order (Rs. {total})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
