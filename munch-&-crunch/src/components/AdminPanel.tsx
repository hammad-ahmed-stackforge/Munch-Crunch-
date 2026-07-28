import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  Lock, 
  DollarSign, 
  ShoppingBag, 
  Calendar, 
  Utensils, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  Download, 
  Eye, 
  Star, 
  Search, 
  Database,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MenuItem, Order, Reservation, Review, DealItem, CategoryType, OrderStatus } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onAddMenuItem: (item: MenuItem) => void;
  onUpdateMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (id: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  reservations: Reservation[];
  onUpdateReservationStatus: (resId: string, newStatus: 'Pending' | 'Confirmed' | 'Declined' | 'Completed') => void;
  reviews: Review[];
  deals: DealItem[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  menuItems,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
  orders,
  onUpdateOrderStatus,
  reservations,
  onUpdateReservationStatus,
  reviews,
  deals
}) => {
  if (!isOpen) return null;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin View Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'orders' | 'reservations' | 'reviews' | 'sql'>('dashboard');

  // Menu Form Modal State
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState<CategoryType>('Pizza');
  const [itemPrice, setItemPrice] = useState<number>(1000);
  const [itemOriginalPrice, setItemOriginalPrice] = useState<number>(1200);
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [itemBadge, setItemBadge] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'admin123' || pinInput === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect PIN code. Try: admin123');
    }
  };

  // Open Edit Form
  const openEditModal = (item?: MenuItem) => {
    if (item) {
      setIsEditingItem(true);
      setEditingItemId(item.id);
      setItemName(item.name);
      setItemCategory(item.category);
      setItemPrice(item.price);
      setItemOriginalPrice(item.originalPrice || item.price);
      setItemDescription(item.description);
      setItemImage(item.image);
      setItemBadge(item.discountBadge || '');
    } else {
      setIsEditingItem(true);
      setEditingItemId(null);
      setItemName('');
      setItemCategory('Burger');
      setItemPrice(500);
      setItemOriginalPrice(600);
      setItemDescription('');
      setItemImage('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80');
      setItemBadge('NEW');
    }
  };

  const handleSaveMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !itemDescription) return;

    if (editingItemId) {
      // Edit
      const updated: MenuItem = {
        id: editingItemId,
        name: itemName,
        category: itemCategory,
        price: Number(itemPrice),
        originalPrice: Number(itemOriginalPrice),
        discountBadge: itemBadge || undefined,
        description: itemDescription,
        image: itemImage || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        rating: 5.0,
        reviewsCount: 1,
        preparationTime: '15 mins'
      };
      onUpdateMenuItem(updated);
    } else {
      // Add
      const newItem: MenuItem = {
        id: `m-${Date.now()}`,
        name: itemName,
        category: itemCategory,
        price: Number(itemPrice),
        originalPrice: Number(itemOriginalPrice),
        discountBadge: itemBadge || 'NEW',
        description: itemDescription,
        image: itemImage || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        rating: 5.0,
        reviewsCount: 1,
        preparationTime: '15-20 mins'
      };
      onAddMenuItem(newItem);
    }

    setIsEditingItem(false);
  };

  // Generate MySQL Schema script download
  const downloadMySQLSchema = () => {
    const sqlContent = `-- MySQL Database Schema for Munch & Crunch Restaurant
-- Generated for cPanel / LAMP Host Deployment

CREATE DATABASE IF NOT EXISTS munch_and_crunch;
USE munch_and_crunch;

-- Table: products
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount_badge VARCHAR(50),
    image TEXT,
    rating DECIMAL(3,2) DEFAULT 4.9,
    reviews_count INT DEFAULT 1,
    is_spicy TINYINT(1) DEFAULT 0,
    is_popular TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: orders
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) DEFAULT 'Faisalabad',
    subtotal DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0.00,
    delivery_fee DECIMAL(10,2) DEFAULT 100.00,
    total DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'Cash on Delivery',
    status ENUM('Pending', 'Preparing', 'Quality Check', 'Out for Delivery', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: reservations
CREATE TABLE IF NOT EXISTS reservations (
    id VARCHAR(50) PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    guests INT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    occasion VARCHAR(100),
    special_request TEXT,
    status ENUM('Pending', 'Confirmed', 'Declined', 'Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: reviews
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(50) PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    comment TEXT NOT NULL,
    is_verified TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Products
INSERT INTO products (id, name, category, description, price, original_price, discount_badge, image) VALUES
('p1', 'Munch Deluxe Supreme Pizza', 'Pizza', 'Signature loaded pizza with smoked chicken tikka, spicy fajita, sausages, jalapeños.', 1450.00, 1750.00, '17% OFF', 'https://images.unsplash.com/photo-1513104890138-7c749659a591'),
('z1', 'Ultimate Crunchy Zinger Burger', 'Zinger', 'Extra crisp double fried chicken thigh fillet with signature spicy sauce.', 520.00, 620.00, 'BESTSELLER', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd');
`;

    const blob = new Blob([sqlContent], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'munch_and_crunch_database_schema.sql';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Calculate live stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="glass-card bg-[#0B0F19] border border-amber-500/30 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl text-left">
        
        {/* Admin Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#070A12]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <ShieldCheck className="w-6 h-6 text-[#FF6B00]" />
            </div>
            <div>
              <h2 className="font-heading font-black text-2xl text-white">Admin Control Panel</h2>
              <p className="text-xs text-amber-400 font-semibold">Munch & Crunch Faisalabad System</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Login Guard */}
        {!isAuthenticated ? (
          <div className="p-8 max-w-sm mx-auto text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[#FF6B00] flex items-center justify-center mx-auto text-2xl">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="font-heading font-black text-2xl text-white">Admin Verification</h3>
            <p className="text-xs text-gray-400">Enter Admin PIN password to manage orders, menu, and table bookings.</p>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                required
                placeholder="Enter PIN (admin123)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-center text-sm font-bold tracking-widest focus:outline-none focus:border-[#FF6B00]"
              />
              {authError && <p className="text-xs text-red-400 font-bold">{authError}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FFB703] text-black font-extrabold text-xs shadow-lg hover:brightness-110"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Top Navigation Tabs */}
            <div className="flex flex-wrap border-b border-white/10 px-6 gap-2 sm:gap-4 bg-white/5 py-2">
              {[
                { id: 'dashboard', label: 'Dashboard Stats', icon: <DollarSign className="w-4 h-4" /> },
                { id: 'orders', label: `Live Orders (${orders.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
                { id: 'menu', label: `Menu Items (${menuItems.length})`, icon: <Utensils className="w-4 h-4" /> },
                { id: 'reservations', label: `Reservations (${reservations.length})`, icon: <Calendar className="w-4 h-4" /> },
                { id: 'sql', label: 'MySQL DB Export', icon: <Database className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-[#FF6B00] text-black font-extrabold shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Dashboard View */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
                      <p className="text-xs text-gray-400 font-bold uppercase">Total Revenue</p>
                      <p className="font-heading font-black text-2xl text-[#FF6B00]">Rs. {totalRevenue}</p>
                      <p className="text-[10px] text-emerald-400">Cash on Delivery Orders</p>
                    </div>

                    <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
                      <p className="text-xs text-gray-400 font-bold uppercase">Orders Today</p>
                      <p className="font-heading font-black text-2xl text-amber-300">{orders.length}</p>
                      <p className="text-[10px] text-gray-400">Live Active Orders</p>
                    </div>

                    <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
                      <p className="text-xs text-gray-400 font-bold uppercase">Active Reservations</p>
                      <p className="font-heading font-black text-2xl text-amber-300">{reservations.length}</p>
                      <p className="text-[10px] text-gray-400">Table Bookings</p>
                    </div>

                    <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
                      <p className="text-xs text-gray-400 font-bold uppercase">Menu Dishes</p>
                      <p className="font-heading font-black text-2xl text-white">{menuItems.length}</p>
                      <p className="text-[10px] text-gray-400">Active Dishes on Website</p>
                    </div>
                  </div>

                  {/* Recent Orders Overview Table */}
                  <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
                    <h3 className="font-heading font-extrabold text-lg text-white">Recent Customer Orders</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-gray-400 border-b border-white/10">
                            <th className="pb-2">Order #</th>
                            <th className="pb-2">Customer</th>
                            <th className="pb-2">Address</th>
                            <th className="pb-2">Amount</th>
                            <th className="pb-2">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {orders.map((o) => (
                            <tr key={o.id} className="text-gray-300">
                              <td className="py-2.5 font-bold text-amber-300">{o.orderNumber}</td>
                              <td className="py-2.5">{o.customerInfo.name}<br /><span className="text-[10px] text-gray-500">{o.customerInfo.phone}</span></td>
                              <td className="py-2.5 max-w-[200px] truncate">{o.customerInfo.address}</td>
                              <td className="py-2.5 font-bold text-white">Rs. {o.total}</td>
                              <td className="py-2.5">
                                <span className="bg-[#FF6B00]/20 text-[#FF6B00] px-2 py-0.5 rounded text-[10px] font-bold">
                                  {o.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Management Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <h3 className="font-heading font-black text-xl text-white">Manage Orders & Kitchen Status</h3>
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div key={ord.id} className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="font-heading font-black text-amber-300 text-base">{ord.orderNumber}</span>
                            <p className="text-xs text-gray-400">{ord.customerInfo.name} ({ord.customerInfo.phone})</p>
                          </div>
                          
                          {/* Order Status Changer Dropdown */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 font-bold">Status:</span>
                            <select
                              value={ord.status}
                              onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="px-3 py-1.5 rounded-xl bg-[#0B0F19] border border-amber-500/40 text-amber-300 text-xs font-bold focus:outline-none"
                            >
                              {['Pending', 'Preparing', 'Quality Check', 'Out for Delivery', 'Delivered', 'Cancelled'].map((st) => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <p className="text-xs text-gray-300 bg-white/5 p-2.5 rounded-xl">
                          📍 {ord.customerInfo.address}, {ord.customerInfo.city}
                        </p>

                        <div className="text-xs text-gray-300 space-y-1">
                          {ord.items.map(it => (
                            <div key={it.id} className="flex justify-between">
                              <span>{it.quantity}x {it.menuItem.name}</span>
                              <span className="font-bold text-white">Rs. {it.itemTotal}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-white/5 text-xs font-bold">
                          <span>Total Amount: Rs. {ord.total}</span>
                          <span className="text-emerald-400">Payment: Cash on Delivery</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Menu Management Tab */}
              {activeTab === 'menu' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-black text-xl text-white">Menu & Products Manager</h3>
                    <button
                      onClick={() => openEditModal()}
                      className="px-4 py-2 rounded-xl bg-[#FF6B00] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Dish</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems.map((item) => (
                      <div key={item.id} className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col justify-between space-y-3">
                        <div className="flex items-start gap-3">
                          <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] text-amber-400 font-bold uppercase">{item.category}</span>
                            <h4 className="font-extrabold text-white text-sm truncate">{item.name}</h4>
                            <p className="text-xs font-black text-[#FF6B00]">Rs. {item.price}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg bg-white/10 text-amber-300 hover:bg-amber-500 hover:text-black transition-all"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteMenuItem(item.id)}
                            className="p-1.5 rounded-lg bg-white/10 text-gray-400 hover:bg-red-500 hover:text-white transition-all"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reservations Tab */}
              {activeTab === 'reservations' && (
                <div className="space-y-4">
                  <h3 className="font-heading font-black text-xl text-white">Manage Table Reservations</h3>
                  <div className="space-y-3">
                    {reservations.map((res) => (
                      <div key={res.id} className="glass-card p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div>
                          <p className="font-bold text-white text-sm">{res.customerName} ({res.phone})</p>
                          <p className="text-gray-400">{res.date} at {res.time} • {res.guests} Guests</p>
                          {res.specialRequest && <p className="text-amber-300 italic">"{res.specialRequest}"</p>}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 font-bold">Status:</span>
                          <select
                            value={res.status}
                            onChange={(e) => onUpdateReservationStatus(res.id, e.target.value as any)}
                            className="px-3 py-1.5 rounded-xl bg-[#0B0F19] border border-amber-500/40 text-amber-300 text-xs font-bold"
                          >
                            {['Pending', 'Confirmed', 'Declined', 'Completed'].map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MySQL Script Download Tab */}
              {activeTab === 'sql' && (
                <div className="space-y-4">
                  <h3 className="font-heading font-black text-xl text-white">PHP 8 & MySQL Database Setup</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Download complete, production-ready SQL tables script to host Munch & Crunch on cPanel or standard MySQL database servers.
                  </p>

                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Database className="w-6 h-6 text-[#FF6B00]" />
                        <div>
                          <h4 className="font-bold text-white text-sm">munch_and_crunch.sql</h4>
                          <p className="text-[11px] text-gray-400">Includes products, orders, reservations, and reviews tables</p>
                        </div>
                      </div>

                      <button
                        onClick={downloadMySQLSchema}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FFB703] text-black font-extrabold text-xs shadow-lg hover:brightness-110 flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download .SQL Script</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Product Add/Edit Modal */}
      {isEditingItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card bg-[#0B0F19] border border-white/10 rounded-3xl p-6 max-w-md w-full space-y-4 text-left">
            <h3 className="font-heading font-black text-xl text-white">
              {editingItemId ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h3>

            <form onSubmit={handleSaveMenuItem} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-300 block mb-1">Item Name</label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-300 block mb-1">Category</label>
                  <select
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value as CategoryType)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-white/10 text-white"
                  >
                    {['Pizza', 'Burger', 'Zinger', 'Fries', 'Wraps', 'BBQ', 'Shawarma', 'Drinks', 'Desserts'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-300 block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. HOT, 20% OFF"
                    value={itemBadge}
                    onChange={(e) => setItemBadge(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-300 block mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    required
                    value={itemPrice}
                    onChange={(e) => setItemPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-300 block mb-1">Original Price (Rs.)</label>
                  <input
                    type="number"
                    value={itemOriginalPrice}
                    onChange={(e) => setItemOriginalPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-300 block mb-1">Image URL</label>
                <input
                  type="text"
                  value={itemImage}
                  onChange={(e) => setItemImage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="font-bold text-gray-300 block mb-1">Description</label>
                <textarea
                  required
                  rows={2}
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingItem(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 text-gray-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#FF6B00] text-black font-extrabold"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
