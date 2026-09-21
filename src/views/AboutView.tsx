import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Award, HeartHandshake, Sparkles, MapPin } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { siteConfig, setCurrentPage } = useStore();

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-300 pb-16">
      
      {/* Hero Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80"
            alt="درباره طاقچه"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-amber-400 font-bold text-xs tracking-wider">داستان شکل‌گیری {siteConfig.siteName}</span>
          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            ما عاشقان عطر، اصالت و طعم ناب مزارع کهن هستیم
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {siteConfig.siteSlogan}. از خاکی‌ترین مزارع زعفران قائنات تا باغ‌های مرتفع دارچین سیلان، هدف ما ارائه خالص‌ترین چاشنی‌های غذایی بدون کوچک‌ترین ناخالصی است.
          </p>
        </div>
      </div>

      {/* Philosophy & Mission */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-black text-stone-900">چرا ادویه طاقچه متولد شد؟</h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            بازار ادویه متاسفانه پر از آردهای رنگ‌شده، نشاسته و اسانس‌های صنعتی است. در ادویه طاقچه، تعهد ما بر این است که کلیه دانه‌های معطر جلوی چشمان مشتری یا با آسیاب‌های حرارت‌پایین (Cold Grinding) خرد شوند تا اسانس‌های روغنی فرار درون دانه نسوزند و عطر زنده آن تا آخرین قطره درون سفره‌های شما باقی بماند.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-stone-900">تضمین ۱۰۰٪ خلوص</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              عدم استفاده از هرگونه رنگ مصنوعی، نمک اضافه، نشاسته یا نگهدارنده‌های شیمیایی در تمام محصولات.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-stone-900">آسیاب تازه به سفارش</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              ادویه‌های شما مدت‌ها در انبار خاک نمی‌خورند؛ آن‌ها هفتگی در دسته‌های کوچک آسیاب و بسته‌بندی می‌شوند.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-stone-900">خرید مستقیم از کشاورز</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              حمایت از کشاورزان بومی قائنات، گلپایگان و مزارع پایدار هندوستان با حذف دلالان واسطه.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-8 bg-amber-100/50 rounded-3xl border border-amber-200 space-y-4">
        <h3 className="text-lg font-black text-stone-900">طعم تفاوت را در دست‌پخت خود تجربه کنید</h3>
        <p className="text-xs text-stone-600 max-w-md mx-auto">
          یک‌بار استفاده از دارچین سیلان یا زعفران سرگل طاقچه، تعریف شما از عطر غذا را برای همیشه تغییر خواهد داد.
        </p>
        <button
          onClick={() => setCurrentPage('products')}
          style={{ backgroundColor: 'var(--color-primary)' }}
          className="px-6 py-3 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-90 transition"
        >
          ورود به فروشگاه ادویه‌ها
        </button>
      </div>

    </div>
  );
};
