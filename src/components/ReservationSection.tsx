import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, CheckCircle2, Sparkles, User, MessageSquare } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationSectionProps {
  onAddReservation: (res: Reservation) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ onAddReservation }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [specialRequest, setSpecialRequest] = useState('');

  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !date) return;

    const newRes: Reservation = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      phone,
      guests,
      date,
      time,
      occasion,
      specialRequest,
      status: 'Confirmed',
      createdAt: 'Just now'
    };

    onAddReservation(newRes);
    setConfirmedReservation(newRes);

    // Reset Form
    setCustomerName('');
    setPhone('');
    setSpecialRequest('');
  };

  return (
    <section id="reservation" className="py-24 bg-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Reservation Context */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#FF6B00]" />
              <span>VIP Dining Experience</span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Reserve Your <span className="text-gradient">Table</span> Online
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Planning a birthday party, family dinner, or KIPS student reunion? Book your booth in advance and skip the waiting queue.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-[#FF6B00] border border-amber-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Opening Hours</h4>
                  <p className="text-xs text-gray-400">Monday – Sunday: 11:00 AM – 10:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-[#FFB703] border border-amber-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Direct Reservation Hotline</h4>
                  <p className="text-xs text-amber-300 font-semibold">+92 305 4402222</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
              
              <h3 className="font-heading font-black text-2xl text-white mb-6 text-left">
                Book Table Details
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                
                {/* Row 1: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Usman Ali"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">Phone / WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Guests, Date, Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">Number of Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B0F19] border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((num) => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">Time Slot</label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B0F19] border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                      >
                        {['11:30 AM', '12:30 PM', '02:00 PM', '04:00 PM', '06:00 PM', '07:30 PM', '08:30 PM', '09:30 PM'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">Special Occasion or Request</label>
                  <input
                    type="text"
                    placeholder="e.g. Birthday decor request, high chairs needed..."
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FF8500] to-[#FFB703] text-black font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl glow-orange"
                >
                  Confirm Table Reservation
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {confirmedReservation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card bg-[#0B0F19] border border-amber-500/40 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-heading font-black text-2xl text-white">Table Reserved!</h3>
            <p className="text-xs text-gray-300">
              Your table booking has been received. We look forward to welcoming you at Munch & Crunch Jail Road!
            </p>

            <div className="bg-white/5 p-4 rounded-2xl text-left text-xs space-y-2 border border-white/10">
              <div className="flex justify-between text-gray-400">
                <span>Ref ID:</span>
                <span className="font-extrabold text-amber-300">{confirmedReservation.id}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Guest Name:</span>
                <span className="text-white font-bold">{confirmedReservation.customerName}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Date & Time:</span>
                <span className="text-white font-bold">{confirmedReservation.date} at {confirmedReservation.time}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Guests:</span>
                <span className="text-white font-bold">{confirmedReservation.guests} Persons</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmedReservation(null)}
              className="w-full py-3 rounded-xl bg-[#FF6B00] text-black font-extrabold text-xs"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
