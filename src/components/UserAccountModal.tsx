import React, { useState } from 'react';
import { X, User, Heart, ShoppingBag, MapPin, Search, Star, Trash2 } from 'lucide-react';
import { MenuItem, Order } from '../types';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: MenuItem[];
  onRemoveWishlist: (itemId: string) => void;
  orders: Order[];
  onOpenTrackOrder: (orderNum: string) => void;
  onAddToCart: (item: MenuItem) => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveWishlist,
  orders,
  onOpenTrackOrder,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'wishlist' | 'orders' | 'profile'>('orders');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="glass-card bg-[#0B0F19] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl text-left">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0B0F19]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FFB703] p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#0B0F19] rounded-[14px] flex items-center justify-center text-white font-black text-lg">
                U
              </div>
            </div>
            <div>
              <h2 className="font-heading font-black text-2xl text-white">Guest Foodie Account</h2>
              <p className="text-xs text-amber-300">Munch & Crunch Faisalabad VIP</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-6 gap-6 bg-white/5">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-[#FF6B00] text-[#FF6B00]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'wishlist'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlistItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-[#FFB703] text-[#FFB703]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-8">No order history found yet.</p>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-heading font-black text-amber-300 text-sm">{ord.orderNumber}</span>
                        <p className="text-gray-400 text-[10px]">{ord.createdAt}</p>
                      </div>
                      <span className="bg-[#FF6B00]/20 text-[#FF6B00] px-2.5 py-1 rounded-full font-bold text-[10px] border border-[#FF6B00]/30">
                        {ord.status}
                      </span>
                    </div>

                    <div className="text-xs text-gray-300 border-t border-b border-white/5 py-2 space-y-1">
                      {ord.items.map(it => (
                        <div key={it.id} className="flex justify-between">
                          <span className="truncate max-w-[240px]">{it.quantity}x {it.menuItem.name}</span>
                          <span className="font-bold text-white">Rs. {it.itemTotal}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Total: Rs. {ord.total}</span>
                      <button
                        onClick={() => {
                          onOpenTrackOrder(ord.orderNumber);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#FF6B00] hover:text-black text-amber-300 text-[11px] font-bold transition-all flex items-center gap-1"
                      >
                        <Search className="w-3 h-3" />
                        <span>Track Live Status</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishlistItems.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-8 col-span-2">Your wishlist is empty.</p>
              ) : (
                wishlistItems.map((item) => (
                  <div key={item.id} className="glass-card p-3 rounded-2xl border border-white/10 flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-white truncate">{item.name}</p>
                      <p className="text-[#FF6B00] font-black">Rs. {item.price}</p>
                      <button
                        onClick={() => {
                          onAddToCart(item);
                          onClose();
                        }}
                        className="mt-1 text-[10px] bg-[#FF6B00] text-black px-2 py-0.5 rounded font-bold"
                      >
                        Add to Cart
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveWishlist(item.id)}
                      className="text-gray-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                <p className="font-bold text-white text-sm">Delivery Location Default</p>
                <p className="text-gray-300">Jail Road, near KIPS College, Faisalabad, Punjab</p>
                <p className="text-amber-300 font-semibold">📞 +92 305 4402222</p>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                <p className="font-bold text-white text-sm">Student Discount Status</p>
                <p className="text-emerald-400 font-bold">🟢 Eligible for KIPS20 Coupon Code (20% OFF)</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
