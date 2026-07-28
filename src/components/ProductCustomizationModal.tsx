import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Check, Flame, ShieldAlert } from 'lucide-react';
import { MenuItem, CustomizationOption, CartItem } from '../types';

interface ProductCustomizationModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ProductCustomizationModal: React.FC<ProductCustomizationModalProps> = ({
  item,
  onClose,
  onAddToCart
}) => {
  if (!item) return null;

  const [selectedSize, setSelectedSize] = useState<CustomizationOption | undefined>(
    item.sizes && item.sizes.length > 0 ? item.sizes[1] || item.sizes[0] : undefined
  );

  const [selectedCrust, setSelectedCrust] = useState<CustomizationOption | undefined>(
    item.crusts && item.crusts.length > 0 ? item.crusts[0] : undefined
  );

  const [selectedAddons, setSelectedAddons] = useState<CustomizationOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  const toggleAddon = (addon: CustomizationOption) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Calculate total price
  const basePrice = item.price;
  const sizeDiff = selectedSize ? selectedSize.additionalPrice : 0;
  const crustDiff = selectedCrust ? selectedCrust.additionalPrice : 0;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.additionalPrice, 0);

  const singleItemPrice = Math.max(0, basePrice + sizeDiff + crustDiff + addonsTotal);
  const totalPrice = singleItemPrice * quantity;

  const handleConfirmAddToCart = () => {
    const newCartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      selectedSize,
      selectedCrust,
      selectedAddons,
      quantity,
      itemPrice: singleItemPrice,
      itemTotal: totalPrice,
      specialInstructions: instructions
    };

    onAddToCart(newCartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="glass-card bg-[#0B0F19]/95 border border-white/10 rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/50 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white backdrop-blur-md border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs text-[#FF6B00] font-bold uppercase tracking-wider">{item.category}</span>
            <h2 className="font-heading font-black text-2xl text-white">{item.name}</h2>
          </div>
        </div>

        {/* Customization Options Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-left">
          
          <p className="text-gray-300 text-xs leading-relaxed">
            {item.description}
          </p>

          {/* Sizes Selection */}
          {item.sizes && item.sizes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Select Size</span>
                <span className="text-[10px] text-amber-400 font-semibold">Required</span>
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {item.sizes.map((size) => {
                  const isSelected = selectedSize?.id === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-2xl border text-xs text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-white font-bold'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{size.name}</span>
                      <span className="text-amber-400 font-semibold">
                        {size.additionalPrice > 0 ? `+Rs. ${size.additionalPrice}` : size.additionalPrice < 0 ? `-Rs. ${Math.abs(size.additionalPrice)}` : 'Included'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Crust Selection */}
          {item.crusts && item.crusts.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Select Crust Style</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {item.crusts.map((crust) => {
                  const isSelected = selectedCrust?.id === crust.id;
                  return (
                    <button
                      key={crust.id}
                      type="button"
                      onClick={() => setSelectedCrust(crust)}
                      className={`p-3 rounded-2xl border text-xs text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-white font-bold'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{crust.name}</span>
                      <span className="text-amber-400 font-semibold">
                        {crust.additionalPrice > 0 ? `+Rs. ${crust.additionalPrice}` : 'Standard'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons & Sauces */}
          {item.addons && item.addons.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Extra Add-ons & Dips</h3>
              <div className="space-y-2">
                {item.addons.map((addon) => {
                  const isChecked = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`w-full p-3 rounded-2xl border text-xs transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#FFB703]/20 border-[#FFB703] text-white font-bold'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-[#FFB703] text-black border-[#FFB703]' : 'border-gray-500'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{addon.name}</span>
                      </div>
                      <span className="text-amber-400 font-semibold">+Rs. {addon.additionalPrice}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 block">
              Special Kitchen Request (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Extra spicy, no onions, sauce on side..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

        </div>

        {/* Modal Footer - Quantity & Add Button */}
        <div className="p-6 border-t border-white/10 bg-[#0B0F19] flex items-center justify-between gap-4">
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 rounded-xl hover:bg-white/10 text-gray-300"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-heading font-black text-white text-base min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 rounded-xl hover:bg-white/10 text-gray-300"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Action */}
          <button
            onClick={handleConfirmAddToCart}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FFB703] text-black font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Add to Order
            </span>
            <span className="font-heading font-black text-base">
              Rs. {totalPrice}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};
