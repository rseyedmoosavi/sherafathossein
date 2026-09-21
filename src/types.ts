export type SpiceCategory = 
  | 'all'
  | 'blends'      // ادویه‌های ترکیبی و پلویی
  | 'saffron'     // زعفران، زرشک و هل
  | 'peppers'     // فلفل‌ها و پاپریکا
  | 'herbs'       // سبزیجات خشک و دمنوش‌ها
  | 'seeds';      // دانه‌ها و چوب‌های ادویه

export interface ProductReview {
  id: string;
  userName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface SpiceWeightOption {
  weight: string; // e.g. "50 گرم", "100 گرم", "250 گرم", "500 گرم"
  priceMultiplier: number;
}

export interface SpiceProduct {
  id: string;
  name: string;
  englishName: string;
  category: SpiceCategory;
  categoryTitle: string;
  price: number; // in Tomans for base weight (e.g. 100g)
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  origin: string; // e.g. "قائنات خراسان", "سیلان سریلانکا", "مالابار هند"
  aromaIntensity: number; // 1 to 5
  spiciness: number; // 0 to 5
  stock: number;
  isOrganic: boolean;
  isBestSeller?: boolean;
  isSpecialOffer?: boolean;
  bestUsedFor: string[]; // e.g. ["خورشت قیمه", "زرشک‌پلو", "مرغ مجلسی"]
  weightOptions: SpiceWeightOption[];
  reviews: ProductReview[];
}

export interface CartItem {
  product: SpiceProduct;
  selectedWeight: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  selectedWeight: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  trackingCode: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  postalCode: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'online' | 'cod';
  paymentGateway?: string;
  status: OrderStatus;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface ThemePalette {
  id: string;
  name: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  accent: string;
  accentHover: string;
}

export interface SiteConfig {
  siteName: string;
  siteSlogan: string;
  announcementText: string;
  heroHeadline: string;
  heroSubheadline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  freeShippingThreshold: number; // Tomans
  standardShippingFee: number;   // Tomans
  selectedPaletteId: string;
}

export type PageView = 
  | 'home'
  | 'products'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'orders'
  | 'profile'
  | 'about'
  | 'contact'
  | 'admin';
