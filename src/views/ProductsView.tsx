import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Check, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';
import { SpiceCategory } from '../types';

export const ProductsView: React.FC = () => {
  const { 
    products, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    onlyOrganic,
    setOnlyOrganic,
    onlyInStock,
    setOnlyInStock
  } = useStore();

  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'rating'>('bestseller');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const categories: { id: SpiceCategory; label: string }[] = [
    { id: 'all', label: 'همه ادویه‌ها' },
    { id: 'saffron', label: 'زعفران و هل' },
    { id: 'blends', label: 'ادویه‌های ترکیبی خورشتی' },
    { id: 'peppers', label: 'پاپریکا و فلفل‌ها' },
    { id: 'seeds', label: 'چوب دارچین و دانه‌ها' },
    { id: 'herbs', label: 'سبزیجات و گیاهان دارویی' },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Organic filter
      if (onlyOrganic && !p.isOrganic) {
        return false;
      }
      // In stock filter
      if (onlyInStock && p.stock <= 0) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchEn = p.englishName.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        const matchUses = p.bestUsedFor.some(u => u.toLowerCase().includes(query));
        const matchOrigin = p.origin.toLowerCase().includes(query);
        if (!matchName && !matchEn && !matchDesc && !matchUses && !matchOrigin) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default bestseller
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return b.reviewCount - a.reviewCount;
    });
  }, [products, selectedCategory, onlyOrganic, onlyInStock, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setOnlyOrganic(false);
    setOnlyInStock(false);
    setSortBy('bestseller');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Top Banner & Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>خرید آنلاین ادویه تازه و دستچین</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
            فهرست کامل ادویه‌ها و چاشنی‌ها
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            تمامی ادویه‌ها با تاریخ آسیاب روز، در بسته‌بندی نفوذناپذیر ارسال می‌گردند.
          </p>
        </div>

        {/* Search input in catalog */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو بر اساس نام، طعم یا کاربرد..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-2xl bg-stone-100 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-amber-800 text-white shadow-sm'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Control Bar: Filters & Sort */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Toggle checkboxes */}
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyOrganic}
              onChange={(e) => setOnlyOrganic(e.target.checked)}
              className="rounded-md border-stone-300 text-amber-700 focus:ring-amber-500 w-4 h-4"
            />
            <span className="text-stone-700 font-medium">فقط محصولات ارگانیک</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="rounded-md border-stone-300 text-amber-700 focus:ring-amber-500 w-4 h-4"
            />
            <span className="text-stone-700 font-medium">فقط کالاهای موجود</span>
          </label>

          {(searchQuery || selectedCategory !== 'all' || onlyOrganic || onlyInStock) && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium mr-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>حذف فیلترها</span>
            </button>
          )}
        </div>

        {/* Sort selector & count */}
        <div className="flex items-center gap-3 mr-auto">
          <span className="text-xs text-stone-500">
            نمایش <b className="font-sans text-stone-800">{filteredProducts.length}</b> ادویه
          </span>

          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">مرتب‌سازی:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 text-xs font-medium text-stone-800 focus:outline-hidden focus:border-amber-600"
            >
              <option value="bestseller">محبوب‌ترین و پرفروش</option>
              <option value="price-asc">ارزان‌ترین قیمت</option>
              <option value="price-desc">گران‌ترین قیمت</option>
              <option value="rating">بیشترین امتیاز کاربران</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <h3 className="text-lg font-bold text-stone-900">محصولی با این مشخصات یافت نشد</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            لطفاً عبارت جستجو را تغییر دهید یا فیلترهای دسته‌بندی و ارگانیک را پاک کنید.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition"
          >
            مشاهده تمامی محصولات
          </button>
        </div>
      )}
    </div>
  );
};
