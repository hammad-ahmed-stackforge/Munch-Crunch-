import React, { useState } from 'react';
import { Camera, Maximize2, X, Sparkles } from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ galleryItems }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxImage, setActiveLightboxImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Food', 'Interior', 'Kitchen', 'Customers'];

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-4 h-4 text-[#FF6B00]" />
            <span>Behind The Scenes & Dishes</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Photo <span className="text-gradient">Gallery</span>
          </h2>
          <p className="mt-3 text-gray-300 text-base sm:text-lg">
            Take a visual tour of our mouthwatering dishes, cozy dark-theme dining ambiance, and high-tech kitchen.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#FFB703] text-black shadow-lg scale-105'
                  : 'bg-white/5 text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxImage(item)}
              className="relative rounded-3xl overflow-hidden glass-card border border-white/10 group cursor-pointer h-72 shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Lightbox Trigger Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                <div className="w-12 h-12 rounded-full bg-[#FF6B00] text-black flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Title */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="bg-[#FF6B00]/80 text-black text-[9px] font-black px-2 py-0.5 rounded uppercase">
                  {item.category}
                </span>
                <h3 className="font-heading font-extrabold text-base text-white mt-1">{item.title}</h3>
                <p className="text-gray-300 text-xs truncate">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setActiveLightboxImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full space-y-4 text-center">
            <img
              src={activeLightboxImage.image}
              alt={activeLightboxImage.title}
              className="max-h-[75vh] mx-auto rounded-3xl border border-white/20 shadow-2xl object-contain"
            />
            <div>
              <h3 className="font-heading font-black text-2xl text-white">{activeLightboxImage.title}</h3>
              <p className="text-amber-300 text-sm mt-1">{activeLightboxImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
