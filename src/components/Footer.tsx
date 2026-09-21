import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Headphones, 
  MapPin, 
  Phone, 
  Mail, 
  Heart,
  Sparkles
} from 'lucide-react';
import { PageView } from '../types';

export const Footer: React.FC = () => {
  const { siteConfig, setCurrentPage, setSelectedCategory } = useStore();

  const handleNav = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: any) => {
    setSelectedCategory(cat);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-8 border-t border-stone-800 mt-20">
      {/* 4 Feature Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-stone-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">۱۰۰٪ ارگانیک و اصیل</h4>
              <p className="text-xs text-stone-400">بدون ناخالصی و مواد افزودنی</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">ارسال سریع سراسری</h4>
              <p className="text-xs text-stone-400">بسته‌بندی وکیوم غیرقابل نفوذ</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">ضمانت بازگشت وجه</h4>
              <p className="text-xs text-stone-400">۷ روز ضمانت عدم رضایت از عطر</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">پشتیبانی همیشگی</h4>
              <p className="text-xs text-stone-400">مشاوره تخصصی انتخاب ادویه</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div 
                style={{ backgroundColor: 'var(--color-primary)' }}
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-lg"
              >
                ط
              </div>
              <span className="text-xl font-black text-white">{siteConfig.siteName}</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {siteConfig.siteSlogan}. ما با عشق، ادویه‌های خالص مزارع بکر ایران، هندوستان و سریلانکا را به آشپزخانه‌های شما می‌آوریم تا عطر اصالت در دست‌پخت شما جاری شود.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs bg-amber-900/40 text-amber-300 border border-amber-800/60 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                آسیاب تازه به سفارش شما
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-400 transition">
                  صفحه اصلی
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-amber-400 transition">
                  فروشگاه و تمام محصولات
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('orders')} className="hover:text-amber-400 transition">
                  پیگیری وضعیت سفارش‌ها
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-400 transition">
                  داستان ما و مزارع همکار
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-amber-400 transition">
                  تماس و پشتیبانی مشتریان
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="hover:text-amber-400 transition text-amber-500/80">
                  پنل مدیریت مدیر فروشگاه
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">دسته‌بندی ادویه‌ها</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleCategoryClick('saffron')} className="hover:text-amber-400 transition">
                  زعفران سرگل قائنات و هل اکبر
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('blends')} className="hover:text-amber-400 transition">
                  ادویه‌های ترکیبی خورشتی و پلویی
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('peppers')} className="hover:text-amber-400 transition">
                  پاپریکا دودی و فلفل‌های بومی
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('seeds')} className="hover:text-amber-400 transition">
                  چوب دارچین سیلان و دانه‌های معطر
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('herbs')} className="hover:text-amber-400 transition">
                  سبزیجات خشک کوهی و گلپر
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Electronic Badges */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">اطلاعات تماس و نشانی</h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-sans text-stone-200">{siteConfig.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-sans text-stone-200">{siteConfig.email}</span>
              </div>
            </div>

            {/* Simulated Trust Badges */}
            <div className="pt-3 flex items-center gap-2">
              <div className="p-2 bg-stone-800 rounded-xl border border-stone-700 text-center flex-1">
                <span className="text-[10px] text-stone-300 block font-bold">نماد الکترونیک</span>
                <span className="text-[9px] text-emerald-400">تایید شده ⭐⭐⭐</span>
              </div>
              <div className="p-2 bg-stone-800 rounded-xl border border-stone-700 text-center flex-1">
                <span className="text-[10px] text-stone-300 block font-bold">درگاه پرداخت شاپرک</span>
                <span className="text-[9px] text-amber-400">امن و تضمین‌شده</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <p className="flex items-center gap-1">
          تمامی حقوق مادی و معنوی برای <strong className="text-stone-300">{siteConfig.siteName}</strong> محفوظ است.
          طراحی شده با عشق <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> برای عاشقان عطر و طعم
        </p>
        <p className="font-sans text-stone-400">
          PWA & SEO Compliant • Fast Single-Page Application
        </p>
      </div>
    </footer>
  );
};
