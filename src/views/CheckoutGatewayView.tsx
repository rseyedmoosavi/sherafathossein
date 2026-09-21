import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Clock, 
  RotateCcw,
  Sparkles,
  FileText
} from 'lucide-react';
import { Order } from '../types';

export const CheckoutGatewayView: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    discountAmount, 
    shippingFee, 
    finalTotal, 
    userProfile, 
    updateUserProfile, 
    createOrder, 
    setCurrentPage,
    showToast 
  } = useStore();

  // Step state: 'shipping' | 'gateway' | 'success'
  const [step, setStep] = useState<'shipping' | 'gateway' | 'success'>('shipping');

  // Shipping form fields
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    phone: userProfile.phone || '',
    city: userProfile.city || 'تهران',
    address: userProfile.address || '',
    postalCode: userProfile.postalCode || '',
    notes: '',
    gateway: 'saman', // 'saman' | 'shaparak' | 'zarinpal'
  });

  // Gateway Simulation Fields
  const [cardNumber, setCardNumber] = useState('6037-9918-2451-8790');
  const [cvv2, setCvv2] = useState('742');
  const [expMonth, setExpMonth] = useState('۰۸');
  const [expYear, setExpYear] = useState('۰۶');
  const [otpCode, setOtpCode] = useState('');
  const [countdown, setCountdown] = useState(120);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Confirmed Order
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Countdown timer for OTP
  useEffect(() => {
    let timer: any;
    if (step === 'gateway' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500">سبد خرید شما خالی است.</p>
        <button
          onClick={() => setCurrentPage('products')}
          className="mt-4 px-5 py-2.5 bg-amber-800 text-white rounded-xl text-xs font-bold"
        >
          رفتن به فروشگاه
        </button>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      showToast('لطفاً نام، تلفن و نشانی تحویل را کامل وارد کنید.', 'error');
      return;
    }
    // Update profile
    updateUserProfile({
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      postalCode: formData.postalCode,
    });
    // Move to simulated gateway
    setStep('gateway');
    setCountdown(120);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestOtp = () => {
    setCountdown(120);
    const randOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(randOtp);
    showToast(`رمز پویا پیامک شد: ${randOtp}`, 'info');
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);

      const gatewayNames: Record<string, string> = {
        saman: 'درگاه پرداخت بانک سامان (کیش)',
        shaparak: 'درگاه سراسری شاپرک (سداد)',
        zarinpal: 'درگاه پرداخت اینترنتی زرین‌پال',
      };

      const order = createOrder({
        customerName: formData.name,
        phone: formData.phone,
        address: `${formData.city}، ${formData.address}`,
        postalCode: formData.postalCode,
        items: cart.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          selectedWeight: item.selectedWeight,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          image: item.product.image,
        })),
        subtotal: cartSubtotal,
        discount: discountAmount,
        shippingFee: shippingFee,
        total: finalTotal,
        paymentMethod: 'online',
        paymentGateway: gatewayNames[formData.gateway] || 'درگاه امن شاپرک',
      });

      setConfirmedOrder(order);
      setStep('success');
      showToast('پرداخت با موفقیت انجام شد و سفارش ثبت گردید.', 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300 pb-20">
      
      {/* Progress Steps Header */}
      <div className="flex items-center justify-center gap-3 text-xs font-bold text-stone-500">
        <div className={`flex items-center gap-1.5 ${step === 'shipping' ? 'text-amber-800' : 'text-emerald-700'}`}>
          <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center font-sans border border-current">
            ۱
          </span>
          <span>اطلاعات ارسال</span>
        </div>
        <span className="w-12 h-0.5 bg-stone-200" />
        <div className={`flex items-center gap-1.5 ${step === 'gateway' ? 'text-amber-800' : step === 'success' ? 'text-emerald-700' : 'text-stone-400'}`}>
          <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center font-sans border border-current">
            ۲
          </span>
          <span>درگاه پرداخت آنلاین</span>
        </div>
        <span className="w-12 h-0.5 bg-stone-200" />
        <div className={`flex items-center gap-1.5 ${step === 'success' ? 'text-emerald-700' : 'text-stone-400'}`}>
          <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center font-sans border border-current">
            ۳
          </span>
          <span>رسید و فاکتور نهایی</span>
        </div>
      </div>

      {/* STEP 1: Shipping Address Form */}
      {step === 'shipping' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <form onSubmit={handleShippingSubmit} className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-stone-900">مشخصات تحویل‌گیرنده و نشانی</h2>
              <p className="text-xs text-stone-500 mt-1">بسته‌ها در بسته‌بندی محرمانه و ضدبو از طریق پست پیشتاز ارسال می‌گردند.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">نام و نام خانوادگی:</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: علی محمدی"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">شماره تماس (جهت هماهنگی پست):</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 font-sans"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">شهر و استان:</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="مثال: تهران"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">کد پستی ۱۰ رقمی:</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="مثال: ۱۵۵۸۹۶۳۱۴۱"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">نشانی دقیق پستی (خیابان، کوچه، پلاک، واحد):</label>
              <textarea
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="آدرس دقیق خود را وارد نمایید..."
                className="w-full p-3 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 leading-relaxed"
              />
            </div>

            {/* Gateway selection */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <label className="text-xs font-bold text-stone-800 block">انتخاب درگاه پرداخت آنلاین:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'saman', name: 'سامان کیش', desc: 'کارت‌های شتابی' },
                  { id: 'shaparak', name: 'سداد بانک ملی', desc: 'شاپرک رسمی' },
                  { id: 'zarinpal', name: 'زرین‌پال', desc: 'پرداخت سریع' },
                ].map((gw) => (
                  <label
                    key={gw.id}
                    className={`flex flex-col p-3 rounded-xl border cursor-pointer transition ${
                      formData.gateway === gw.id
                        ? 'border-amber-600 bg-amber-50/70 text-amber-950 font-bold'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{gw.name}</span>
                      <input
                        type="radio"
                        name="gateway"
                        value={gw.id}
                        checked={formData.gateway === gw.id}
                        onChange={() => setFormData({ ...formData, gateway: gw.id })}
                        className="text-amber-700"
                      />
                    </div>
                    <span className="text-[10px] text-stone-500 font-normal mt-1">{gw.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              style={{ backgroundColor: 'var(--color-primary)' }}
              className="w-full py-3.5 rounded-2xl text-white font-bold text-sm shadow-md hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <span>اتصال به درگاه پرداخت آنلاین</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </form>

          {/* Mini Summary */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100">اقلام سفارش</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedWeight}`} className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-stone-800 block line-clamp-1">{item.product.name}</span>
                    <span className="text-stone-400 text-[10px]">{item.selectedWeight} × {item.quantity}</span>
                  </div>
                  <span className="font-sans font-bold text-stone-800">
                    {(item.unitPrice * item.quantity).toLocaleString('fa-IR')} ت
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>جمع کالاها:</span>
                <span className="font-sans font-bold text-stone-800">{cartSubtotal.toLocaleString('fa-IR')} ت</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>تخفیف:</span>
                  <span className="font-sans font-bold">-{discountAmount.toLocaleString('fa-IR')} ت</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ارسال پیشتاز:</span>
                <span className="font-sans font-bold">{shippingFee === 0 ? 'رایگان' : `${shippingFee.toLocaleString('fa-IR')} ت`}</span>
              </div>
              <div className="pt-2 border-t border-stone-100 flex justify-between font-black text-sm text-stone-900">
                <span>مبلغ نهایی:</span>
                <span className="font-sans text-amber-800">{finalTotal.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Simulated Shaparak Online Payment Gateway */}
      {step === 'gateway' && (
        <div className="max-w-xl mx-auto bg-stone-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-stone-700">
          {/* Shaparak Header */}
          <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 font-black flex items-center justify-center text-sm">
                ش
              </div>
              <div>
                <span className="text-xs font-bold text-white block">شاپرک | پرداخت الکترونیک</span>
                <span className="text-[10px] text-stone-400">شبکه الکترونیکی پرداخت کارت بانکی</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-stone-800 px-3 py-1 rounded-xl text-amber-400 text-xs font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>

          {/* Amount Badge */}
          <div className="p-6 bg-gradient-to-b from-stone-800 to-stone-900 border-b border-stone-800 text-center space-y-1">
            <span className="text-xs text-stone-400">پذیرنده: فروشگاه اینترنتی ادویه طاقچه</span>
            <div className="text-2xl font-black text-amber-400 font-sans">
              {finalTotal.toLocaleString('fa-IR')} <span className="text-sm font-normal text-stone-300">تومان</span>
            </div>
          </div>

          {/* Payment Card Form */}
          <div className="p-6 space-y-4 text-xs">
            <div>
              <label className="text-stone-300 block mb-1">شماره کارت ۱۶ رقمی:</label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-stone-800/80 border border-stone-700 rounded-xl px-4 py-2.5 text-sm font-mono text-stone-100 tracking-wider focus:border-amber-500 focus:outline-hidden"
                />
                <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-stone-300 block mb-1">کد CVV2:</label>
                <input
                  type="password"
                  maxLength={4}
                  value={cvv2}
                  onChange={(e) => setCvv2(e.target.value)}
                  className="w-full bg-stone-800/80 border border-stone-700 rounded-xl px-4 py-2.5 text-sm font-mono text-stone-100 focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-stone-300 block mb-1">تاریخ انقضا (ماه / سال):</label>
                <div className="flex gap-2 font-mono">
                  <input
                    type="text"
                    maxLength={2}
                    value={expMonth}
                    onChange={(e) => setExpMonth(e.target.value)}
                    placeholder="ماه"
                    className="w-1/2 bg-stone-800/80 border border-stone-700 rounded-xl px-2 py-2.5 text-center text-sm text-stone-100 focus:border-amber-500 focus:outline-hidden"
                  />
                  <input
                    type="text"
                    maxLength={2}
                    value={expYear}
                    onChange={(e) => setExpYear(e.target.value)}
                    placeholder="سال"
                    className="w-1/2 bg-stone-800/80 border border-stone-700 rounded-xl px-2 py-2.5 text-center text-sm text-stone-100 focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Password (OTP) */}
            <div>
              <label className="text-stone-300 block mb-1">رمز پویا (پیامک شده):</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="رمز یکبار مصرف"
                  className="flex-1 bg-stone-800/80 border border-stone-700 rounded-xl px-4 py-2.5 text-sm font-mono text-stone-100 focus:border-amber-500 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl transition text-xs whitespace-nowrap"
                >
                  دریافت رمز پویا
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={handleProcessPayment}
                disabled={isProcessingPayment}
                className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg"
              >
                {isProcessingPayment ? (
                  <span>در حال ارتباط با بانک شاپرک...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>پرداخت امن و ثبت نهایی</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="px-4 py-3.5 bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold rounded-xl text-xs transition"
              >
                انصراف
              </button>
            </div>

            <p className="text-[10px] text-stone-500 text-center pt-2">
              🔒 این صفحه شبیه‌ساز رسمی پروتکل شاپرک برای تست خرید در محیط وب و PWA است.
            </p>
          </div>
        </div>
      )}

      {/* STEP 3: Order Confirmation & Receipt */}
      {step === 'success' && confirmedOrder && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl space-y-6 text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-2">
              پرداخت موفق و تایید شده
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              سفارش شما با موفقیت ثبت گردید!
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              ادویه‌های شما در نوبت آسیاب تازه و بسته‌بندی متالایز قرار گرفت.
            </p>
          </div>

          {/* Receipt Card */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-right space-y-3 text-xs">
            <div className="flex justify-between pb-2 border-b border-stone-200/80">
              <span className="text-stone-500">شماره رهگیری سفارش:</span>
              <span className="font-mono font-black text-stone-900 text-sm">{confirmedOrder.trackingCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">تاریخ و زمان پرداخت:</span>
              <span className="font-sans text-stone-800 font-bold">{confirmedOrder.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">درگاه پرداخت:</span>
              <span className="text-stone-800">{confirmedOrder.paymentGateway}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">مبلغ پرداخت‌شده:</span>
              <span className="font-sans font-black text-amber-800 text-sm">
                {confirmedOrder.total.toLocaleString('fa-IR')} تومان
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-200/80">
              <span className="text-stone-500">تحویل‌گیرنده:</span>
              <span className="text-stone-800 font-bold">{confirmedOrder.customerName} ({confirmedOrder.phone})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">نشانی پستی:</span>
              <span className="text-stone-800 max-w-xs truncate">{confirmedOrder.address}</span>
            </div>
          </div>

          {/* Navigation CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                setCurrentPage('orders');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ backgroundColor: 'var(--color-primary)' }}
              className="flex-1 py-3 px-4 rounded-xl text-white font-bold text-xs sm:text-sm hover:opacity-90 transition shadow-md flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>مشاهده و پیگیری در بخش سفارشات</span>
            </button>

            <button
              onClick={() => {
                setCurrentPage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition"
            >
              ادامه خرید از فروشگاه
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
