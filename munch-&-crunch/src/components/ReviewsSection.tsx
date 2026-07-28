import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, Quote, User, Sparkles } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [itemOrdered, setItemOrdered] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !comment) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      authorName,
      rating,
      comment,
      date: 'Just now',
      isVerifiedBuyer: true,
      itemOrdered: itemOrdered || undefined
    };

    onAddReview(newReview);
    setAuthorName('');
    setComment('');
    setItemOrdered('');
    setModalOpen(false);
  };

  return (
    <section id="reviews" className="py-20 bg-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>4.9 Star Google Rating</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            What Foodies Say <span className="text-gradient">About Us</span>
          </h2>
          <p className="mt-3 text-gray-300 text-base sm:text-lg">
            Real feedback from student groups, families, and fast food lovers in Faisalabad.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FFB703] text-black font-extrabold text-xs shadow-lg hover:brightness-110 transition-all inline-flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Google-Style Review</span>
            </button>
          </div>
        </div>

        {/* Google Style Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-amber-500/40 transition-all relative flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 pointer-events-none" />

              <div className="space-y-4">
                {/* User Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FFB703] p-0.5 flex items-center justify-center">
                      <div className="w-full h-full bg-[#0B0F19] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {rev.authorName.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-heading font-extrabold text-white text-base">{rev.authorName}</p>
                        {rev.isVerifiedBuyer && (
                          <CheckCircle2 className="w-4 h-4 text-blue-400" title="Verified Customer" />
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400">{rev.date}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Tag for Item Ordered */}
              {rev.itemOrdered && (
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Ordered:</span>
                  <span className="text-amber-300 font-semibold">{rev.itemOrdered}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card bg-[#0B0F19] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4">
            <h3 className="font-heading font-black text-2xl text-white">Share Your Experience</h3>
            <p className="text-xs text-gray-400">Your review helps foodies in Faisalabad discover Munch & Crunch.</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Raza"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Dish Ordered (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Crunchy Zinger Burger"
                  value={itemOrdered}
                  onChange={(e) => setItemOrdered(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-2 rounded-xl border text-sm ${
                        star <= rating ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-white/5 border-white/10 text-gray-500'
                      }`}
                    >
                      ★ {star}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Your Feedback</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the taste, crunch, or atmosphere..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-white/5 text-gray-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#FF6B00] text-black font-extrabold text-xs"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
