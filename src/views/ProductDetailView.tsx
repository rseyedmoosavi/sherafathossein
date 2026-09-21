import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ArrowRight, 
  Star, 
  ShoppingBag, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  User, 
  MessageSquarePlus,
  Share2,
  Check
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    setCurrentPage, 
    addToCart, 
    addProductReview,
    showToast 
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [selectedWeight, setSelectedWeight] = useState(
    product ? (product.weightOptions[0]?.weight || '۱۰۰ گرم') : '۱۰۰ گرم'
  );
  const [quantity, setQuantity] = useState(1);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Sync SEO Title dynamically for this spice
  useEffect(() => {
    if (product) {
      document.title = `${product.name} (${selectedWeight}) | ادویه طاقچه`;
    }
  }, [product, selectedWeight]);

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500">محصول مورد نظر یافت نشد.</p>
        <button
          onClick={() => setCurrentPage('products')}
          className="mt-4 px-4 py-2 bg-amber-800 text-white rounded-xl text-xs font-bold"
        >
          بازگشت به فروشگاه
        </button>
      </div>
    );
  }

  // Price calculation
  const currentOption = product.weightOptions.find(w => w.weight === selectedWeight) || product.weightOptions[0];
  const multiplier = currentOption ? currentOption.priceMultiplier : 1;
  const unitPrice = Math.round(product.price * multiplier);
  const originalUnitPrice = product.originalPrice ? Math.round(product.originalPrice * multiplier) : undefined;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showToast('لطفاً متن نظر خود را بنویسید', 'error');
      return;
    }
    addProductReview(product.id, {
      userName: reviewName.trim() || 'مشتری گرامی',
      rating: reviewRating,
      comment: reviewComment.trim(),
    });
    setReviewComment('');
    setReviewName('');
    setShowReviewForm(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('لینک صفحه محصول کپی شد!', 'success');
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300 pb-16">
      
      {/* Back Button and Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <button
          onClick={() => setCurrentPage('products')}
          className="flex items-center gap-1.5 font-bold text-stone-700 hover:text-amber-800 transition"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به فهرست محصولات</span>
        </button>

        <div className="flex items-center gap-2">
          <span>{product.categoryTitle}</span>
          <span>/</span>
          <span className="text-stone-800 font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main Detail Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Product Imagery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.isOrganic && (
              <span className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                ۱۰۰٪ ارگانیک
              </span>
            )}
            <button
              onClick={handleShare}
              title="اشتراک‌گذاری محصول"
              className="absolute top-4 left-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-700 backdrop-blur-xs shadow-xs transition"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <div className="absolute bottom-4 right-4 bg-stone-900/80 text-white backdrop-blur-xs text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>مبدا کشت: {product.origin}</span>
            </div>
          </div>

          {/* Quick Sensory Indicators */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold text-stone-800">شدت عطر و بو:</span>
              </div>
              <div className="flex gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx <= product.aromaIntensity ? 'bg-amber-500' : 'bg-amber-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-700" />
                <span className="text-xs font-bold text-stone-800">درجه تندی:</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx <= product.spiciness ? 'bg-rose-600' : 'bg-rose-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Purchase Actions & Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Title & Reviews */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800">{product.categoryTitle}</span>
                <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-sans font-bold text-stone-800 text-xs">{product.rating}</span>
                  <span className="text-stone-400 text-[11px]">({product.reviewCount} نظر مشتریان)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
                {product.name}
              </h1>
              <p className="text-stone-400 font-mono text-xs mt-0.5">
                {product.englishName}
              </p>
            </div>

            {/* Description */}
            <p className="text-stone-600 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Dishes match tags */}
            {product.bestUsedFor.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-bold text-stone-700 block">
                  بهترین مکمل برای غذاهای:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.bestUsedFor.map((dish, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-2.5 py-1 rounded-xl bg-stone-100 text-stone-700 border border-stone-200"
                    >
                      🍳 {dish}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Weight Option Selector */}
            <div className="space-y-2 pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800">وزن و اندازه بسته:</span>
                <span className="text-amber-800 font-medium">بسته‌بندی زیپ‌کیپ وکیوم متالایز</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.weightOptions.map((opt) => (
                  <button
                    key={opt.weight}
                    type="button"
                    onClick={() => setSelectedWeight(opt.weight)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                      selectedWeight === opt.weight
                        ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {opt.weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Price section */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 block">قیمت بسته ({selectedWeight}):</span>
                {originalUnitPrice && (
                  <span className="text-xs text-stone-400 line-through font-sans">
                    {(originalUnitPrice * quantity).toLocaleString('fa-IR')} تومان
                  </span>
                )}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-stone-900 font-sans">
                    {totalPrice.toLocaleString('fa-IR')}
                  </span>
                  <span className="text-xs text-stone-500 font-bold">تومان</span>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center border border-stone-200 rounded-2xl bg-stone-50 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white text-stone-700 hover:bg-stone-100 font-bold flex items-center justify-center shadow-xs"
                >
                  -
                </button>
                <span className="w-10 text-center font-sans font-bold text-sm text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-white text-stone-700 hover:bg-stone-100 font-bold flex items-center justify-center shadow-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-98'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>به سبد اضافه شد!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>افزودن به سبد خرید</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                style={{ backgroundColor: 'var(--color-primary)' }}
                className="py-3.5 px-6 rounded-2xl text-white font-bold text-sm hover:opacity-90 active:scale-98 transition shadow-md whitespace-nowrap"
              >
                خرید فوری و تسویه
              </button>
            </div>

            {/* Guarantees */}
            <div className="pt-3 grid grid-cols-3 gap-2 text-[11px] text-stone-500 text-center border-t border-stone-100">
              <span className="flex items-center justify-center gap-1">
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                تحویل با پست پیشتاز
              </span>
              <span className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                تضمین تازگی و خلوص
              </span>
              <span className="flex items-center justify-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
                ۷ روز مهلت عودت
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Customer Reviews & Rating System */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
              <span>نظرات و تجربیات خریداران</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {product.reviewCount} نظر
              </span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              نظرات واقعی خریداران این ادویه در سراسر کشور
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-700" />
            <span>ثبت نظر و امتیاز شما</span>
          </button>
        </div>

        {/* Review Submission Form */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <h4 className="text-sm font-bold text-stone-800">دیدگاه خود را درباره این محصول بنویسید:</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-stone-600 block mb-1">نام شما (اختیاری):</label>
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="مثال: سارا محمدی"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div>
                <label className="text-xs text-stone-600 block mb-1">امتیاز به کیفیت و عطر ادویه:</label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          star <= reviewRating 
                            ? 'fill-amber-400 text-amber-400' 
                            : 'text-stone-300'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-stone-700 mr-2">
                    {reviewRating} از ۵ ستاره
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs text-stone-600 block mb-1">متن نظر شما:</label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={3}
                placeholder="تجربه شما در استفاده از این ادویه، عطر، کیفیت بسته‌بندی یا طعم غذا..."
                className="w-full p-3 text-xs rounded-xl bg-white border border-stone-200 focus:outline-hidden focus:border-amber-600"
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-200 transition"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-800 text-white text-xs font-bold hover:bg-amber-900 transition"
              >
                ارسال دیدگاه
              </button>
            </div>
          </form>
        )}

        {/* Existing Reviews List */}
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">
                      {rev.userName.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-stone-800">{rev.userName}</span>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        خریدار تاییدشده
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-stone-400 font-sans">{rev.date}</span>
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pr-9">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-stone-400 text-xs">
            هنوز نظری برای این محصول ثبت نشده است. اولین نفری باشید که دیدگاه خود را به اشتراک می‌گذارد!
          </div>
        )}
      </div>

    </div>
  );
};
