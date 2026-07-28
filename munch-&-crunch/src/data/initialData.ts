import { MenuItem, DealItem, GalleryItem, Review, Coupon, Order, Reservation } from '../types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // PIZZA
  {
    id: 'p1',
    name: 'Munch Deluxe Supreme Pizza',
    category: 'Pizza',
    description: 'Signature loaded pizza with smoked chicken tikka, spicy fajita, sausages, jalapeños, black olives, bell peppers, and 100% mozzarella.',
    price: 1450,
    originalPrice: 1750,
    discountBadge: '17% OFF',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 210,
    isPopular: true,
    isSpicy: true,
    preparationTime: '18-22 min',
    calories: '850 kcal',
    sizes: [
      { id: 's1', name: 'Small (8")', additionalPrice: -450 },
      { id: 's2', name: 'Medium (11")', additionalPrice: 0 },
      { id: 's3', name: 'Large (14")', additionalPrice: 550 },
      { id: 's4', name: 'Monster XL (16")', additionalPrice: 950 }
    ],
    crusts: [
      { id: 'c1', name: 'Classic Pan Crust', additionalPrice: 0 },
      { id: 'c2', name: 'Cheese Stuffed Crust', additionalPrice: 200 },
      { id: 'c3', name: 'Kebab Crust', additionalPrice: 250 }
    ],
    addons: [
      { id: 'a1', name: 'Extra Mozzarella Cheese', additionalPrice: 150 },
      { id: 'a2', name: 'Garlic Mayo Dip', additionalPrice: 80 },
      { id: 'a3', name: 'Jalapeño Blast', additionalPrice: 70 }
    ]
  },
  {
    id: 'p2',
    name: 'Faisalabad Flame Fajita Pizza',
    category: 'Pizza',
    description: 'Spicy grilled fajita chicken, caramelized onions, green chilies, sweet corn, melted cheddar & mozzarella blend.',
    price: 1350,
    originalPrice: 1550,
    discountBadge: 'HOT',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 165,
    isSpicy: true,
    isPopular: true,
    preparationTime: '15-20 min',
    calories: '780 kcal',
    sizes: [
      { id: 's1', name: 'Small (8")', additionalPrice: -400 },
      { id: 's2', name: 'Medium (11")', additionalPrice: 0 },
      { id: 's3', name: 'Large (14")', additionalPrice: 500 }
    ],
    crusts: [
      { id: 'c1', name: 'Pan Crust', additionalPrice: 0 },
      { id: 'c2', name: 'Thin & Crispy', additionalPrice: 0 },
      { id: 'c3', name: 'Cheese Stuffed', additionalPrice: 200 }
    ]
  },
  {
    id: 'p3',
    name: 'Crown Crust Cheesy Crunch Pizza',
    category: 'Pizza',
    description: 'Royal crown crust stuffed with garlic cream cheese, topped with malai boti chicken, capsicum & white garlic sauce.',
    price: 1650,
    originalPrice: 1900,
    discountBadge: 'PREMIUM',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 98,
    isNew: true,
    preparationTime: '20-25 min',
    calories: '920 kcal',
    sizes: [
      { id: 's2', name: 'Medium (11")', additionalPrice: 0 },
      { id: 's3', name: 'Large (14")', additionalPrice: 600 }
    ]
  },

  // ZINGER & BURGERS
  {
    id: 'z1',
    name: 'Ultimate Crunchy Zinger Burger',
    category: 'Zinger',
    description: 'Extra crisp double-fried chicken thigh fillet, signature spicy secret sauce, crunchy iceberg lettuce, dynamic cheese slice on a toasted sesame bun.',
    price: 520,
    originalPrice: 620,
    discountBadge: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 420,
    isPopular: true,
    isSpicy: true,
    preparationTime: '10-12 min',
    calories: '650 kcal',
    addons: [
      { id: 'a1', name: 'Extra Cheese Slice', additionalPrice: 60 },
      { id: 'a2', name: 'Extra Crispy Bacon/Pepperoni', additionalPrice: 100 },
      { id: 'a3', name: 'Make it a Meal (Fries + Drink)', additionalPrice: 220 }
    ]
  },
  {
    id: 'z2',
    name: 'Monster Tower Zinger',
    category: 'Zinger',
    description: 'Double crunchy chicken fillets, hash brown patty, double cheese, jalapeños and chipotle mayo stack.',
    price: 780,
    originalPrice: 900,
    discountBadge: '13% OFF',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 230,
    isPopular: true,
    isSpicy: true,
    preparationTime: '12-15 min',
    calories: '950 kcal'
  },
  {
    id: 'b1',
    name: 'Smokey Smash Beef Burger',
    category: 'Burger',
    description: 'Dual smashed 100% prime beef patties, melted sharp cheddar, caramelized onions, pickles & smokey BBQ house glaze.',
    price: 690,
    originalPrice: 790,
    discountBadge: 'MUST TRY',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 180,
    preparationTime: '12-15 min',
    calories: '720 kcal'
  },
  {
    id: 'b2',
    name: 'Jalapeño Popper Grilled Burger',
    category: 'Burger',
    description: 'Flame-grilled chicken breast patty topped with molten jalapeño popper cream, crispy fried onions and siracha mayo.',
    price: 580,
    originalPrice: 650,
    discountBadge: 'SPICY',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 140,
    isSpicy: true,
    preparationTime: '10-14 min',
    calories: '610 kcal'
  },

  // FRIES
  {
    id: 'f1',
    name: 'Munch Loaded Animal Fries',
    category: 'Fries',
    description: 'Crispy skin-on fries loaded with diced zinger chicken, melted liquid cheese sauce, jalapeños, and signature secret gravy sauce.',
    price: 450,
    originalPrice: 520,
    discountBadge: 'FAN FAVORITE',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 310,
    isPopular: true,
    preparationTime: '8-10 min',
    calories: '540 kcal'
  },
  {
    id: 'f2',
    name: 'Peri Peri Garlic Crinkle Fries',
    category: 'Fries',
    description: 'Golden crinkle cut potato fries tossed in fiery Peri Peri seasoning served with garlic mayo dip.',
    price: 280,
    originalPrice: 320,
    discountBadge: 'CRISPY',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 190,
    preparationTime: '6-8 min',
    calories: '380 kcal'
  },

  // WRAPS & SHAWARMA
  {
    id: 'w1',
    name: 'Crispy Zinger Twister Wrap',
    category: 'Wraps',
    description: 'Crispy chicken zinger strips, diced tomatoes, shredded lettuce, cheese, and pepper mayo rolled in a toasted tortilla wrap.',
    price: 440,
    originalPrice: 500,
    discountBadge: 'DELICIOUS',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 220,
    isPopular: true,
    preparationTime: '8-10 min',
    calories: '490 kcal'
  },
  {
    id: 'sh1',
    name: 'Arabic Charcoal Chicken Shawarma',
    category: 'Shawarma',
    description: 'Shredded charcoal smoked chicken, pickle turnip, garlic toum sauce, fries wrapped in soft pita bread.',
    price: 290,
    originalPrice: 350,
    discountBadge: 'AUTHENTIC',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 280,
    preparationTime: '6-8 min',
    calories: '420 kcal'
  },

  // BBQ
  {
    id: 'bbq1',
    name: 'Smokey Chicken Malai Tikka Boti',
    category: 'BBQ',
    description: 'Tender boneless chicken marinated in cream, green herbs, white pepper, flame grilled over red coals. Served with mint chutney.',
    price: 750,
    originalPrice: 850,
    discountBadge: 'JUICY',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 145,
    preparationTime: '15-18 min',
    calories: '520 kcal'
  },

  // DRINKS & DESSERTS
  {
    id: 'd1',
    name: 'Chilled Choco Lava Cake',
    category: 'Desserts',
    description: 'Warm, rich chocolate sponge cake with molten Belgian chocolate center, served with a dusting of powdered sugar.',
    price: 320,
    originalPrice: 380,
    discountBadge: 'SWEET',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 175,
    preparationTime: '5-8 min',
    calories: '410 kcal'
  },
  {
    id: 'dr1',
    name: 'Electric Blue Lagoon Soda',
    category: 'Drinks',
    description: 'Refreshing fizzy blue curacao cooler with fresh mint leaves, lemon juice, and crushed ice.',
    price: 250,
    originalPrice: 290,
    discountBadge: 'REFRESHING',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 110,
    preparationTime: '3-5 min',
    calories: '180 kcal'
  }
];

export const INITIAL_DEALS: DealItem[] = [
  {
    id: 'deal1',
    name: 'Pizza Fiesta Deal',
    category: 'Pizza',
    description: '1 Medium Deluxe Pizza + 2 Crispy Zinger Burgers + 1 Large Animal Fries + 1.5L Soft Drink.',
    price: 2290,
    originalPrice: 2950,
    discountBadge: 'SAVE RS. 660',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    itemsList: ['1x Medium Special Pizza', '2x Crunchy Zinger Burgers', '1x Loaded Animal Fries', '1x 1.5L Chilled Beverage'],
    expiresIn: 'Hot Today'
  },
  {
    id: 'deal2',
    name: 'Zinger Crunchy Combo',
    category: 'Zinger',
    description: '1 Ultimate Zinger Burger + 1 Crispy Fried Chicken Piece + Peri Fries + Regular Soft Drink.',
    price: 790,
    originalPrice: 980,
    discountBadge: '20% OFF',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    itemsList: ['1x Crunchy Zinger Burger', '1x Hot & Crispy Fried Chicken', '1x Gourmet Fries', '1x Chilled Coke']
  },
  {
    id: 'deal3',
    name: 'Mega Family Bucket Deal',
    category: 'Family',
    description: '8 Pieces Hot & Crispy Fried Chicken + 2 Zingers + 2 Arabic Shawarmas + 2 Large Fries + 2.25L Soft Drink.',
    price: 3490,
    originalPrice: 4200,
    discountBadge: 'BEST VALUE',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    itemsList: ['8x Crispy Chicken Pieces', '2x Zinger Burgers', '2x Shawarma Rolls', '2x Jumbo Fries', '1x 2.25L Drink']
  },
  {
    id: 'deal4',
    name: 'KIPS Student Special Deal',
    category: 'Student',
    description: '1 Zinger Burger + 1 Regular Fries + 340ml Soft Drink (Show Student ID or Order Online).',
    price: 550,
    originalPrice: 700,
    discountBadge: 'STUDENT SAVER',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    itemsList: ['1x Crunchy Zinger', '1x Fresh Fries', '1x Cold Drink']
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Freshly Baked Deluxe Pizza',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    caption: 'Wood-fired oven fresh pizza loaded with melted mozzarella.'
  },
  {
    id: 'g2',
    title: 'Luxury Dark Ambiance Seating',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    caption: 'Warm ambient lighting and comfortable booths for family dining.'
  },
  {
    id: 'g3',
    title: 'Hygiene Certified Kitchen',
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80',
    caption: 'Master chefs preparing crispy bites under strict safety standard.'
  },
  {
    id: 'g4',
    title: 'Golden Crispy Zinger Burger',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    caption: 'Double fried crispy chicken fillet with house chipotle sauce.'
  },
  {
    id: 'g5',
    title: 'Happy KIPS Students & Families',
    category: 'Customers',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=80',
    caption: 'Memorable hangout moments at Jail Road Munch & Crunch.'
  },
  {
    id: 'g6',
    title: 'Animal Fries Loaded Bowl',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=1000&q=80',
    caption: 'Gourmet crinkle fries drenched in signature cheese lava sauce.'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    authorName: 'Usman Ali',
    rating: 5,
    comment: 'Hands down the best Zinger Burger in Faisalabad! The crunch is real and the place opposite Total Petroleum has great parking and dark luxury vibe.',
    date: 'Yesterday',
    isVerifiedBuyer: true,
    itemOrdered: 'Ultimate Crunchy Zinger Burger'
  },
  {
    id: 'r2',
    authorName: 'Ayesha Khan (KIPS College)',
    rating: 5,
    comment: 'We come here daily after classes! The Student Special Deal for Rs. 550 is an absolute lifesaver. Fast delivery to Jail Road area as well!',
    date: '3 days ago',
    isVerifiedBuyer: true,
    itemOrdered: 'KIPS Student Special Deal'
  },
  {
    id: 'r3',
    authorName: 'Hamza Sheikh',
    rating: 5,
    comment: 'The Munch Deluxe Supreme Pizza with Cheese Stuffed Crust is pure perfection. Generous toppings, hot & fresh, highly recommended!',
    date: '1 week ago',
    isVerifiedBuyer: true,
    itemOrdered: 'Munch Deluxe Supreme Pizza'
  },
  {
    id: 'r4',
    authorName: 'Zainab Fatima',
    rating: 5,
    comment: 'Beautiful atmosphere and super hygienic kitchen. The staff is polite, and table booking through their website was smooth!',
    date: '2 weeks ago',
    isVerifiedBuyer: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'KIPS20',
    discountPercent: 20,
    minAmount: 1000,
    description: '20% OFF for Students & College orders (Min Rs. 1000)'
  },
  {
    code: 'MUNCH100',
    discountPercent: 15,
    minAmount: 1500,
    description: 'Flat 15% OFF on Orders over Rs. 1500'
  },
  {
    code: 'WELCOME',
    discountPercent: 10,
    minAmount: 500,
    description: '10% Welcome discount on your first online order'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'MNC-8492',
    items: [
      {
        id: 'ci1',
        menuItem: INITIAL_MENU_ITEMS[0], // Pizza
        quantity: 1,
        itemPrice: 1450,
        itemTotal: 1450
      },
      {
        id: 'ci2',
        menuItem: INITIAL_MENU_ITEMS[3], // Zinger
        quantity: 2,
        itemPrice: 520,
        itemTotal: 1040
      }
    ],
    subtotal: 2490,
    discount: 200,
    deliveryFee: 100,
    total: 2390,
    customerInfo: {
      name: 'Bilal Ahmad',
      phone: '+92 301 5551234',
      address: 'House #42, Civil Lines near Jail Road',
      city: 'Faisalabad',
      instructions: 'Please bring extra garlic dip.'
    },
    paymentMethod: 'Cash on Delivery',
    status: 'Out for Delivery',
    createdAt: '25 mins ago',
    estimatedDeliveryTime: '10-15 mins'
  },
  {
    id: 'ord-1002',
    orderNumber: 'MNC-8493',
    items: [
      {
        id: 'ci3',
        menuItem: INITIAL_MENU_ITEMS[7], // Animal fries
        quantity: 2,
        itemPrice: 450,
        itemTotal: 900
      }
    ],
    subtotal: 900,
    discount: 0,
    deliveryFee: 100,
    total: 1000,
    customerInfo: {
      name: 'Sana Malik',
      phone: '+92 300 4448888',
      address: 'KIPS College Girls Branch, Jail Road',
      city: 'Faisalabad'
    },
    paymentMethod: 'Cash on Delivery',
    status: 'Preparing',
    createdAt: '10 mins ago',
    estimatedDeliveryTime: '20 mins'
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-101',
    customerName: 'Muhammad Tariq',
    phone: '+92 302 7771122',
    email: 'tariq@gmail.com',
    guests: 6,
    date: '2026-07-28',
    time: '20:00',
    occasion: 'Birthday Party',
    specialRequest: 'Corner luxury table with extra high chairs',
    status: 'Confirmed',
    createdAt: '1 hour ago'
  },
  {
    id: 'res-102',
    customerName: 'KIPS Faculty Team',
    phone: '+92 305 4402222',
    email: 'faculty@kips.edu.pk',
    guests: 10,
    date: '2026-07-29',
    time: '14:30',
    occasion: 'Get Together',
    specialRequest: 'Reserve central booth area',
    status: 'Pending',
    createdAt: '2 hours ago'
  }
];
