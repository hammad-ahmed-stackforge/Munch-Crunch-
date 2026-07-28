export type CategoryType = 
  | 'All' 
  | 'Pizza' 
  | 'Burger' 
  | 'Zinger' 
  | 'Fries' 
  | 'Wraps' 
  | 'BBQ' 
  | 'Shawarma' 
  | 'Drinks' 
  | 'Desserts';

export interface CustomizationOption {
  id: string;
  name: string;
  additionalPrice: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  image: string;
  rating: number;
  reviewsCount: number;
  isSpicy?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  preparationTime: string;
  calories?: string;
  sizes?: CustomizationOption[];
  crusts?: CustomizationOption[];
  addons?: CustomizationOption[];
}

export interface CartItem {
  id: string; // unique cart item id
  menuItem: MenuItem;
  selectedSize?: CustomizationOption;
  selectedCrust?: CustomizationOption;
  selectedAddons?: CustomizationOption[];
  quantity: number;
  itemPrice: number;
  itemTotal: number;
  specialInstructions?: string;
}

export interface DealItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  discountBadge: string;
  image: string;
  itemsList: string[];
  expiresIn?: string;
}

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  guests: number;
  date: string;
  time: string;
  occasion?: string;
  specialRequest?: string;
  status: 'Pending' | 'Confirmed' | 'Declined' | 'Completed';
  createdAt: string;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Quality Check' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
    instructions?: string;
  };
  paymentMethod: 'Cash on Delivery';
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryTime: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorImage?: string;
  rating: number;
  comment: string;
  date: string;
  isVerifiedBuyer: boolean;
  itemOrdered?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Food' | 'Interior' | 'Kitchen' | 'Customers';
  image: string;
  caption: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minAmount: number;
  description: string;
}
