import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { HeroSlider } from '../components/HeroSlider';
import { 
  ArrowLeft, 
  Flame, 
  Award, 
  ShieldCheck, 
  Utensils, 
  Coffee 
} from 'lucide-react';
import { SpiceCategory } from '../types';

export const HomeView: React.FC = () => {
  const { 
    siteConfig, 
    products, 
    setCurrentPage, 
    setSelectedCategory,
    showToast 
  } = useStore();

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const specialOffers = products.filter(p => p.isSpecialOffer).slice(0, 4);

  const categories: { id: SpiceCategory; title: string; desc: string; icon: string; image: string }[] = [
    {
      id: 'saffron',
      title: 'زعفران و هل اعلا',
      desc: 'سرگل ممتاز قائنات و هل اکبر بنفش معطر',
      icon: '✨',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'blends',
      title: 'ادویه‌های ترکیبی خورشتی',
      desc: 'فرمولاسیون ۲۴ قلم قورمه‌سبزی، کاری و ماسالا',
      icon: '🍲',
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'peppers',
      title: 'پاپریکا و فلفل‌های دودی',
      desc: 'رنگ آتشین، عطر چوب بلوط و تندی ملایم',
      icon: '🌶️',
      image: 'https://images.unsplash.com/photo-1583064313642-a7c14d498576?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'seeds',
      title: 'چوب دارچین و دانه‌ها',
      desc: 'دارچین لوله‌ای سیلان، بادیان ختایی و زنجبیل',
      icon: '🪵',
      image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'herbs',
      title: 'گیاهان دارویی و چاشنی',
      desc: 'گلپر کوهی ساوه، سماق تبریز و لیموعمانی',
      icon: '🌿',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleCategorySelect = (catId: SpiceCategory) => {
    setSelectedCategory(catId);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-12 animate-in fade-in duration-300">
      
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Spice Categories Showcase */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-amber-700 tracking-wider">دسته‌بندی‌های تخصصی</span>
            <h2 className="text-2xl font-black text-stone-900 mt-1">تنوع بی‌نظیر عطر و چاشنی</h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentPage('products');
            }}
            className="text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-xs hover:shadow-lg hover:border-amber-400 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 text-xl p-1.5 bg-white/90 backdrop-blur-xs rounded-xl shadow-xs">
                  {cat.icon}
                </div>
              </div>
              <div className="p-3 text-right">
                <h3 className="font-bold text-sm text-stone-900 group-hover:text-amber-700 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">محبوب‌ترین ادویه‌های طاقچه</h2>
              <p className="text-xs text-stone-500">انتخاب اول سرآشپزها و همراهان همیشگی ما</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentPage('products');
            }}
            className="text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900"
          >
            مشاهده کل کاتالوگ ←
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Special Offer Banner with Discount Code */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-900 via-orange-950 to-stone-950 text-white p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-right">
            <span className="inline-block bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              پیشنهاد شگفت‌انگیز پاییزه
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              ۲۰٪ تخفیف روی اولین خرید شما از طاقچه!
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/90 max-w-xl">
              کد تخفیف <strong className="font-mono bg-white/20 px-2 py-0.5 rounded-md text-white font-bold">TAQCHEH20</strong> را در مرحله تسویه‌حساب وارد کنید تا از ۲۰ درصد تخفیف ویژه بهره‌مند شوید.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                navigator.clipboard?.writeText('TAQCHEH20');
                showToast('کد تخفیف TAQCHEH20 کپی شد!', 'success');
              }}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-xs sm:text-sm font-bold text-white transition backdrop-blur-xs"
            >
              کپی کد تخفیف
            </button>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCurrentPage('products');
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition shadow-md"
            >
              خرید فوری
            </button>
          </div>
        </div>
      </section>

      {/* Special Offers Grid */}
      {specialOffers.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-700">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">تخفیف‌های زمان‌دار</h2>
                <p className="text-xs text-stone-500">فرصت محدود برای خرید زعفران و چاشنی با قیمت مزارع</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialOffers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Culinary Secrets & Recipe Cards */}
      <section className="bg-amber-50/50 rounded-3xl p-6 sm:p-10 border border-amber-100 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-700">رازهای آشپزی ایرانی با ادویه</span>
          <h2 className="text-2xl font-black text-stone-900">چگونه عطر ادویه را شکوفا کنیم؟</h2>
          <p className="text-xs text-stone-600">سه نکته طلایی برای رسیدن به عطری ماندگار در غذاهای مجلسی</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Utensils className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">تفت ملایم با روغن گرم (Blooming)</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              ادویه‌های پودری مثل زردچوبه و پاپریکا را در ۳۰ ثانیه آخر تفت پیاز به روغن اضافه کنید تا ترکیبات آروماتیک آزاد شوند و نسوزند.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Coffee className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">دم کردن زعفران با شوک یخ</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              زعفران ساییده‌شده با قند را روی دو تکه یخ بگذارید تا در دمای اتاق آب شود؛ این روش بالاترین درجه رنگ‌دهی کروسین را ایجاد می‌کند.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">نگهداری در ظروف تیره و دور از گرما</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              هرگز قوطی ادویه را بالای اجاق گاز قرار ندهید؛ حرارت و رطوبت بخار قابلمه اسانس‌های فرار ادویه را به سرعت از بین می‌برد.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
