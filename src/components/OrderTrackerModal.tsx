import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, ChefHat, Bike, PackageCheck, Phone, ShieldCheck } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  activeOrderNumber?: string;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  orders,
  activeOrderNumber
}) => {
  if (!isOpen) return null;

  const [searchNum, setSearchNum] = useState(activeOrderNumber || (orders[0]?.orderNumber || ''));

  const matchedOrder = orders.find(
    o => o.orderNumber.toLowerCase() === searchNum.trim().toLowerCase()
  ) || orders[0];

  const statuses: OrderStatus[] = [
    'Pending',
    'Preparing',
    'Quality Check',
    'Out for Delivery',
    'Delivered'
  ];

  const getStatusIndex = (st: OrderStatus) => {
    if (st === 'Cancelled') return -1;
    return statuses.indexOf(st);
  };

  const currentIndex = matchedOrder ? getStatusIndex(matchedOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="glass-card bg-[#0B0F19] border border-white/10 rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl text-left">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0B0F19]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-[#FF6B00]">
              <Bike className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h2 className="font-heading font-black text-2xl text-white">Live Order Tracker</h2>
              <p className="text-xs text-gray-400">Track kitchen status & rider location in real-time</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Search Order Number */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. MNC-8492)..."
              value={searchNum}
              onChange={(e) => setSearchNum(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          {matchedOrder ? (
            <div className="space-y-6">
              
              {/* Order Metadata Card */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <p className="text-gray-400">Order Reference</p>
                  <p className="font-heading font-black text-amber-300 text-lg">{matchedOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400">Estimated Delivery</p>
                  <p className="font-bold text-white text-sm flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#FF6B00]" /> {matchedOrder.estimatedDeliveryTime}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Payment</p>
                  <p className="font-bold text-emerald-400 text-sm">COD (Rs. {matchedOrder.total})</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="py-2">
                <p className="text-xs font-bold text-gray-300 mb-4">Kitchen & Delivery Timeline</p>
                <div className="relative pl-6 border-l-2 border-white/10 space-y-6">
                  {statuses.map((st, idx) => {
                    const isDone = idx <= currentIndex;
                    const isCurrent = idx === currentIndex;

                    return (
                      <div key={st} className="relative flex items-center gap-3">
                        <div
                          className={`absolute -left-[31px] w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] ${
                            isDone
                              ? 'bg-[#FF6B00] border-[#FF6B00] text-black font-extrabold'
                              : 'bg-[#0B0F19] border-gray-600 text-gray-500'
                          }`}
                        >
                          {isDone ? '✓' : idx + 1}
                        </div>

                        <div>
                          <p className={`text-xs font-extrabold ${isCurrent ? 'text-amber-300 font-black text-sm' : isDone ? 'text-white' : 'text-gray-500'}`}>
                            {st}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {st === 'Pending' && 'Order received at Munch & Crunch Jail Road'}
                            {st === 'Preparing' && 'Master chef preparing crispy chicken & dough'}
                            {st === 'Quality Check' && 'Strict temperature check & thermal wrapping'}
                            {st === 'Out for Delivery' && 'Rider on the way to your destination'}
                            {st === 'Delivered' && 'Order successfully delivered! Enjoy your meal.'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
                <p className="font-bold text-white mb-1">Items Ordered:</p>
                {matchedOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between text-gray-300">
                    <span>{it.quantity}x {it.menuItem.name}</span>
                    <span className="font-bold text-white">Rs. {it.itemTotal}</span>
                  </div>
                ))}
              </div>

              {/* Delivery Address & Hotline Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-xs text-gray-300">
                  <p className="text-gray-400">Delivering To:</p>
                  <p className="font-bold text-white">{matchedOrder.customerInfo.address}</p>
                </div>

                <a
                  href="tel:+923054402222"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600/30 text-emerald-400 text-xs font-bold border border-emerald-500/40 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Kitchen Hotline</span>
                </a>
              </div>

            </div>
          ) : (
            <p className="text-center text-xs text-gray-400 py-8">
              No order found with number "{searchNum}". Please verify your order receipt.
            </p>
          )}

        </div>

      </div>
    </div>
  );
};
