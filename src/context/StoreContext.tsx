import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  SpiceProduct, 
  CartItem, 
  Order, 
  UserProfile, 
  SiteConfig, 
  PageView, 
  SpiceCategory,
  ThemePalette
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  DEFAULT_SITE_CONFIG, 
  THEME_PALETTES, 
  INITIAL_USER_PROFILE 
} from '../data/initialData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  // Navigation
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedProductId: string | null;
  navigateToProductDetail: (productId: string) => void;

  // Products
  products: SpiceProduct[];
  setProducts: React.Dispatch<React.SetStateAction<SpiceProduct[]>>;
  addProduct: (product: Omit<SpiceProduct, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => void;
  updateProduct: (id: string, updated: Partial<SpiceProduct>) => void;
  deleteProduct: (id: string) => void;
  addProductReview: (productId: string, review: { userName: string; rating: number; comment: string }) => void;

  // Filters & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: SpiceCategory;
  setSelectedCategory: (cat: SpiceCategory) => void;
  onlyOrganic: boolean;
  setOnlyOrganic: (val: boolean) => void;
  onlyInStock: boolean;
  setOnlyInStock: (val: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: SpiceProduct, weight: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, weight: string, delta: number) => void;
  removeFromCart: (productId: string, weight: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  discountAmount: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  shippingFee: number;
  finalTotal: number;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'trackingCode' | 'date' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Site Config & Theme
  siteConfig: SiteConfig;
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
  activePalette: ThemePalette;
  setThemePalette: (paletteId: string) => void;

  // Modals & Notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  showTechModal: boolean;
  setShowTechModal: (show: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'taqcheh_products_v1',
  CART: 'taqcheh_cart_v1',
  ORDERS: 'taqcheh_orders_v1',
  USER: 'taqcheh_user_v1',
  CONFIG: 'taqcheh_config_v1',
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Products
  const [products, setProducts] = useState<SpiceProduct[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return cached ? JSON.parse(cached) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SpiceCategory>('all');
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.CART);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (cached) return JSON.parse(cached);
      // Sample seed order so the orders view is alive immediately
      return [
        {
          id: 'ORD-1092',
          trackingCode: 'TQ-94821',
          date: '۱۴۰۳/۰۶/۱۹ - ۱۴:۳۰',
          customerName: 'علی محمدی',
          phone: '۰۹۱۲۳۴۵۶۷۸۹',
          address: 'تهران، خیابان سهروردی شمالی، کوچه آزادی، پلاک ۱۲، واحد ۴',
          postalCode: '۱۵۵۸۹۶۳۱۴۱',
          items: [
            {
              productId: 'sp-1',
              productName: 'زعفران سرگل ممتاز قائنات',
              selectedWeight: '۲.۵ گرم (نیم مثقال)',
              unitPrice: 380000 * 2.3,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
            },
            {
              productId: 'sp-3',
              productName: 'ادویه ۲۴ قلم قرمه‌سبزی اعلا',
              selectedWeight: '۱۰۰ گرم',
              unitPrice: 95000,
              quantity: 2,
              image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
            },
          ],
          subtotal: 1064000,
          discount: 50000,
          shippingFee: 0,
          total: 1014000,
          paymentMethod: 'online',
          paymentGateway: 'درگاه امن شاپرک (بانک سامان)',
          status: 'shipped',
        },
      ];
    } catch {
      return [];
    }
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.USER);
      return cached ? JSON.parse(cached) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  // Site Configuration
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return cached ? { ...DEFAULT_SITE_CONFIG, ...JSON.parse(cached) } : DEFAULT_SITE_CONFIG;
    } catch {
      return DEFAULT_SITE_CONFIG;
    }
  });

  // Modals & Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showTechModal, setShowTechModal] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userProfile));
    } catch {
      // ignore
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(siteConfig));
    } catch {
      // ignore
    }
  }, [siteConfig]);

  // Apply Theme CSS variables dynamically
  const activePalette = THEME_PALETTES.find(p => p.id === siteConfig.selectedPaletteId) || THEME_PALETTES[0];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', activePalette.primary);
    root.style.setProperty('--color-primary-hover', activePalette.primaryHover);
    root.style.setProperty('--color-primary-light', activePalette.primaryLight);
    root.style.setProperty('--color-accent', activePalette.accent);
    root.style.setProperty('--color-accent-hover', activePalette.accentHover);
  }, [activePalette]);

  // Toast notification helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Navigation helpers
  const navigateToProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: SpiceProduct, weight: string, quantity = 1) => {
    const option = product.weightOptions.find(w => w.weight === weight) || product.weightOptions[0];
    const unitPrice = Math.round(product.price * (option ? option.priceMultiplier : 1));

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedWeight === weight);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedWeight: weight, unitPrice, quantity }];
      }
    });

    showToast(`«${product.name} (${weight})» به سبد خرید اضافه شد`, 'success');
  };

  const updateCartQuantity = (productId: string, weight: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId && item.selectedWeight === weight) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string, weight: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedWeight === weight)));
    showToast('کالا از سبد خرید حذف شد', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponDiscountPercent(0);
  };

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discountAmount = Math.round(cartSubtotal * (couponDiscountPercent / 100));
  const shippingFee = cartSubtotal === 0 || cartSubtotal >= siteConfig.freeShippingThreshold 
    ? 0 
    : siteConfig.standardShippingFee;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'TAQCHEH20' || clean === 'ادویه۲۰') {
      setCouponCode(clean);
      setCouponDiscountPercent(20);
      showToast('کد تخفیف ۲۰٪ با موفقیت اعمال شد!', 'success');
      return true;
    } else if (clean === 'TAQCHEH10' || clean === 'نوروز') {
      setCouponCode(clean);
      setCouponDiscountPercent(10);
      showToast('کد تخفیف ۱۰٪ با موفقیت اعمال شد!', 'success');
      return true;
    } else {
      showToast('کد تخفیف وارد شده معتبر نیست (کد تست: TAQCHEH20)', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscountPercent(0);
    showToast('کد تخفیف حذف شد', 'info');
  };

  // Product reviews
  const addProductReview = (productId: string, review: { userName: string; rating: number; comment: string }) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newReview = {
          id: 'rev-' + Date.now(),
          userName: review.userName || 'مشتری گرامی',
          rating: review.rating,
          comment: review.comment,
          date: new Intl.DateTimeFormat('fa-IR').format(new Date()),
          verifiedPurchase: true,
        };
        const updatedReviews = [newReview, ...p.reviews];
        const newRating = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1));
        return {
          ...p,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: newRating,
        };
      }
      return p;
    }));
    showToast('نظر شما با موفقیت ثبت شد و پس از بررسی منتشر گردید.', 'success');
  };

  // Product management (Admin)
  const addProduct = (newProductData: Omit<SpiceProduct, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => {
    const newProduct: SpiceProduct = {
      ...newProductData,
      id: 'sp-' + Date.now(),
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`محصول جدید «${newProduct.name}» اضافه شد`, 'success');
  };

  const updateProduct = (id: string, updated: Partial<SpiceProduct>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    showToast('اطلاعات محصول با موفقیت به‌روز شد', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('محصول از فهرست فروشگاه حذف شد', 'info');
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'trackingCode' | 'date' | 'status'>): Order => {
    const randNum = Math.floor(10000 + Math.random() * 90000);
    const dateStr = new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date());

    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now().toString().slice(-4)}`,
      trackingCode: `TQ-${randNum}`,
      date: dateStr,
      status: 'processing',
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`وضعیت سفارش ${orderId} به‌روزرسانی شد`, 'info');
  };

  // User profile
  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
    showToast('اطلاعات حساب کاربری شما ذخیره شد', 'success');
  };

  // Site Config & Theme
  const updateSiteConfig = (cfg: Partial<SiteConfig>) => {
    setSiteConfig(prev => ({ ...prev, ...cfg }));
    showToast('تنظیمات قالب فروشگاه با موفقیت ذخیره شد', 'success');
  };

  const setThemePalette = (paletteId: string) => {
    setSiteConfig(prev => ({ ...prev, selectedPaletteId: paletteId }));
    showToast('پالت رنگی فروشگاه تغییر یافت', 'success');
  };

  return (
    <StoreContext.Provider value={{
      currentPage,
      setCurrentPage,
      selectedProductId,
      navigateToProductDetail,
      products,
      setProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      addProductReview,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      onlyOrganic,
      setOnlyOrganic,
      onlyInStock,
      setOnlyInStock,
      cart,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      cartTotalCount,
      cartSubtotal,
      discountAmount,
      couponCode,
      applyCoupon,
      removeCoupon,
      shippingFee,
      finalTotal,
      orders,
      createOrder,
      updateOrderStatus,
      userProfile,
      updateUserProfile,
      siteConfig,
      updateSiteConfig,
      activePalette,
      setThemePalette,
      toasts,
      showToast,
      removeToast,
      showTechModal,
      setShowTechModal,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
