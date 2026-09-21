import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Trash2, 
  ArrowLeft, 
  ShoppingBag, 
  Truck, 
  Tag, 
  ShieldCheck, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export const CartView: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    discountAmount, 
    shippingFee, 
    finalTotal, 
    couponCode, 
    applyCoupon, 
    removeCoupon,
    siteConfig, 
    setCurrentPage,
    navigateToProductDetail 
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  const remainingForFreeShipping = Math.max(0, siteConfig.freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / siteConfig.freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-24 h-24 rounded-3xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-stone-900">سبد خرید شما خالی است!</h2>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-md mx-auto">
          عطر خوش ادویه‌جات اصیل منتظر ورود به آشپزخانه شماست. می‌توانید از میان پرفروش‌ترین ادویه‌های طاقچه انتخاب کنید.
        </p>
        <button
          onClick={() => setCurrentPage('products')}
          style={{ backgroundColor: 'var(--color-primary)' }}
          className="px-6 py-3 rounded-2xl text-white font-bold text-sm shadow-md hover:opacity-90 transition"
        >
          مشاهده کاتالوگ ادویه‌ها
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900">سبد خرید شما</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            بررسی اقلام انتخابی، کدهای تخفیف و محاسبه هزینه ارسال
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          <span>خالی کردن سبد</span>
        </button>
      </div>

      {/* Free shipping banner */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 space-y-2">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-stone-800">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-amber-700" />
            {remainingForFreeShipping > 0 ? (
              <span>
                فقط <b className="font-sans text-amber-800">{remainingForFreeShipping.toLocaleString('fa-IR')} تومان</b> تا ارسال رایگان به سراسر ایران!
              </span>
            ) : (
              <span className="text-emerald-700 flex items-center gap-1">
                <Check className="w-4 h-4" />
                تبریک! سفارش شما شامل ارسال کاملاً رایگان با پست پیشتاز شد.
              </span>
            )}
          </span>
          <span className="text-xs font-sans text-stone-500">
            سقف رایگان: {siteConfig.freeShippingThreshold.toLocaleString('fa-IR')} ت
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-amber-200/70 overflow-hidden">
          <div 
            className="h-full bg-amber-600 rounded-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Layout: Items + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedWeight}`}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              {/* Product Info */}
              <div 
                onClick={() => navigateToProductDetail(item.product.id)}
                className="flex items-center gap-4 cursor-pointer group flex-1 w-full sm:w-auto"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border border-stone-200 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="space-y-1">
                  <span className="text-[11px] text-amber-800 font-semibold">{item.product.categoryTitle}</span>
                  <h3 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                    {item.product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200 font-semibold">
                      وزن بسته: {item.selectedWeight}
                    </span>
                    <span className="text-xs text-stone-400 font-sans">
                      فی: {item.unitPrice.toLocaleString('fa-IR')} ت
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity controls and Item Total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                {/* Stepper */}
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, -1)}
                    className="w-7 h-7 rounded-lg bg-white text-stone-700 hover:bg-stone-200 font-bold flex items-center justify-center text-sm shadow-2xs"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-sans font-bold text-xs text-stone-900">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, 1)}
                    className="w-7 h-7 rounded-lg bg-white text-stone-700 hover:bg-stone-200 font-bold flex items-center justify-center text-sm shadow-2xs"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal for this item */}
                <div className="text-left">
                  <span className="text-sm sm:text-base font-black text-stone-900 font-sans block">
                    {(item.unitPrice * item.quantity).toLocaleString('fa-IR')}
                  </span>
                  <span className="text-[10px] text-stone-400 font-bold">تومان</span>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                  className="p-2 text-stone-400 hover:text-rose-600 rounded-lg transition"
                  title="حذف کالا"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2 flex justify-between items-center text-xs">
            <button
              onClick={() => setCurrentPage('products')}
              className="text-amber-800 font-bold hover:underline flex items-center gap-1"
            >
              ← ادامه خرید و افزودن ادویه‌های دیگر
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-6">
          <h2 className="text-base font-black text-stone-900 pb-3 border-b border-stone-100">
            خلاصه فاکتور خرید
          </h2>

          {/* Coupon Code Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-700" />
              <span>کد تخفیف:</span>
            </label>

            {couponCode ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                <span className="font-bold">کد «{couponCode}» فعال شد</span>
                <button
                  onClick={removeCoupon}
                  className="text-rose-600 hover:underline font-bold text-[11px]"
                >
                  حذف
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="کد تخفیف (تست: TAQCHEH20)"
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-amber-600 uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition"
                >
                  اعمال
                </button>
              </form>
            )}
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-3 text-xs sm:text-sm text-stone-600 pt-2 border-t border-stone-100">
            <div className="flex justify-between">
              <span>قیمت کل اقلام:</span>
              <span className="font-sans font-bold text-stone-900">
                {cartSubtotal.toLocaleString('fa-IR')} تومان
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>تخفیف اعمال‌شده:</span>
                <span className="font-sans font-bold">
                  -{discountAmount.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>هزینه بسته‌بندی و ارسال:</span>
              <span className="font-sans font-bold">
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-bold">رایگان</span>
                ) : (
                  `${shippingFee.toLocaleString('fa-IR')} تومان`
                )}
              </span>
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline">
              <span className="text-sm font-black text-stone-900">مبلغ قابل پرداخت:</span>
              <div className="text-left">
                <span className="text-xl font-black text-stone-900 font-sans">
                  {finalTotal.toLocaleString('fa-IR')}
                </span>
                <span className="text-xs text-stone-500 font-bold mr-1">تومان</span>
              </div>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            id="proceed-to-checkout-btn"
            onClick={() => {
              setCurrentPage('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ backgroundColor: 'var(--color-primary)' }}
            className="w-full py-3.5 px-4 rounded-2xl text-white font-bold text-sm shadow-md hover:opacity-90 active:scale-98 transition flex items-center justify-center gap-2"
          >
            <span>ادامه فرایند خرید و درگاه پرداخت</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>پرداخت ۱۰۰٪ امن از طریق درگاه رسمی شاپرک</span>
          </div>
        </div>

      </div>

    </div>
  );
};
