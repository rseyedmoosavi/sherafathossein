import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ArrowLeft, 
  Sparkles, 
  Flame, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Tag, 
  Clock
} from 'lucide-react';
import { SpiceCategory } from '../types';

interface SlideData {
  id: string;
  tabTitle: string;
  badgeIcon: React.ReactNode;
  badgeText: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCategory: SpiceCategory;
  secondaryCtaText?: string;
  secondaryCategory?: SpiceCategory;
  image: string;
  trustTag: string;
  discountBadge?: string;
  promoCode?: string;
}

const SLIDES: SlideData[] = [
  {
    id: 'saffron-slide',
    tabTitle: 'زعفران و هل',
    badgeIcon: <Sparkles className="w-4 h-4 text-amber-300" />,
    badgeText: 'دستچین سوپر نگین و هل اکبر',
    badgeColor: 'bg-amber-500/25 border-amber-400/50 text-amber-200',
    title: 'عطر مدهوش‌کننده زعفران اعلای قائنات و هل هندوستان',
    subtitle: 'آزمایش شده در آزمایشگاه تخصصی با بالاترین درجه رنگ‌دهی کروسین و عطر اصیل. تضمین بازگشت وجه در صورت عدم رضایت.',
    primaryCtaText: 'خرید زعفران و هل اعلا',
    primaryCategory: 'saffron',
    secondaryCtaText: 'مشاهده تمام محصولات',
    secondaryCategory: 'all',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=80',
    trustTag: 'درجه ممتاز صادراتی',
    discountBadge: 'تضمین اصالت ۱۰۰٪'
  },
  {
    id: 'blends-slide',
    tabTitle: 'ادویه‌های ترکیبی',
    badgeIcon: <Flame className="w-4 h-4 text-orange-400" />,
    badgeText: 'فرمول اختصاصی سرآشپزان سنتی',
    badgeColor: 'bg-orange-500/25 border-orange-400/50 text-orange-200',
    title: 'ادویه‌های ترکیبی ۲۴ قلم قورمه‌سبزی، قیمه و کاری اصیل',
    subtitle: 'راز لعاب و طعم جاافتاده خورشت‌های اصیل ایرانی؛ فرمول دقیق آسیاب شده در بسته‌بندی ضد نفوذ هوا بدون افزودنی یا نمک.',
    primaryCtaText: 'مشاهده ادویه‌های ترکیبی',
    primaryCategory: 'blends',
    secondaryCtaText: 'ادویه خورشتی مخصوص',
    secondaryCategory: 'blends',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1600&q=80',
    trustTag: 'بدون نمک و نشاسته افزوده',
    discountBadge: 'پرفروش‌ترین ماه'
  },
  {
    id: 'paprika-slide',
    tabTitle: 'فلفل و پاپریکا',
    badgeIcon: <Award className="w-4 h-4 text-rose-400" />,
    badgeText: 'دودی طبیعی با چوب بلوط',
    badgeColor: 'bg-rose-500/25 border-rose-400/50 text-rose-200',
    title: 'پاپریکای دودی اسپانیایی و فلفل‌های رنگین آتشین',
    subtitle: 'رنگ‌آمیزی چشم‌نواز و طعم گرم طبیعی برای انواع استیک، مرغ، پاستا و باربیکیو. تهیه شده از بهترین فلفل‌های شیرین و تند.',
    primaryCtaText: 'خرید انواع فلفل و پاپریکا',
    primaryCategory: 'peppers',
    secondaryCtaText: 'مشاهده فلفل‌های دودی',
    secondaryCategory: 'peppers',
    image: 'https://images.unsplash.com/photo-1583064313642-a7c14d498576?auto=format&fit=crop&w=1600&q=80',
    trustTag: 'رنگ ۱۰۰٪ طبیعی بدون اسانس',
    discountBadge: 'عطر چوب بلوط'
  },
  {
    id: 'cinnamon-seeds-slide',
    tabTitle: 'دارچین و دانه‌ها',
    badgeIcon: <Sparkles className="w-4 h-4 text-amber-300" />,
    badgeText: 'چوب‌های دارویی و دانه‌های دست‌نخورده',
    badgeColor: 'bg-amber-600/25 border-amber-500/50 text-amber-200',
    title: 'دارچین لوله‌ای سیلان، بادیان ختایی و زنجبیل تازه',
    subtitle: 'دارچین واقعی سیلان با لایه‌های نرم کاغذی و کومارین بسیار ناچیز. ایده‌آل برای انواع چای، دمنوش‌های سلامتی و شیرینی‌پزی سنتی.',
    primaryCtaText: 'خرید دانه‌ها و دارچین سیلان',
    primaryCategory: 'seeds',
    secondaryCtaText: 'گیاهان دارویی و چاشنی',
    secondaryCategory: 'herbs',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1600&q=80',
    trustTag: 'دارچین سیلان ارگانیک اصل',
    discountBadge: 'واردات مستقیم'
  },
  {
    id: 'offer-slide',
    tabTitle: 'تخفیف ویژه',
    badgeIcon: <Tag className="w-4 h-4 text-emerald-300" />,
    badgeText: 'جشنواره تخفیف ۲۰٪ اولین خرید',
    badgeColor: 'bg-emerald-500/25 border-emerald-400/50 text-emerald-200',
    title: '۲۰ درصد تخفیف شگفت‌انگیز برای همراهان جدید طاقچه',
    subtitle: 'با وارد کردن کد تخفیف TAQCHEH20 در سبد خرید از ۲۰٪ تخفیف بهره‌مند شوید. ارسال سریع در بسته‌بندی‌های متالایز چند لایه.',
    primaryCtaText: 'خرید با ۲۰٪ تخفیف',
    primaryCategory: 'all',
    secondaryCtaText: 'کپی کد TAQCHEH20',
    promoCode: 'TAQCHEH20',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1600&q=80',
    trustTag: 'کد تخفیف: TAQCHEH20',
    discountBadge: 'تخفیف ویژه ۲۰٪'
  }
];

export const HeroSlider: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, showToast } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_DURATION = 6000; // 6 seconds per slide
  const TICK_INTERVAL = 60; // 60ms for smooth progress bar

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Auto-play timer with smooth progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (100 / (SLIDE_DURATION / TICK_INTERVAL));
      });
    }, TICK_INTERVAL);

    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    // In RTL: swipe left means next, swipe right means previous
    if (distance > minSwipeDistance) {
      // Swiped Left
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      prevSlide(); // In RTL, right arrow goes backward in sequence
    } else if (e.key === 'ArrowLeft') {
      nextSlide(); // In RTL, left arrow moves forward in sequence
    }
  };

  const currentSlide = SLIDES[currentIndex];

  const handlePrimaryClick = (cat: SpiceCategory) => {
    setSelectedCategory(cat);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSecondaryClick = (slide: SlideData) => {
    if (slide.promoCode) {
      navigator.clipboard?.writeText(slide.promoCode);
      showToast(`کد تخفیف ${slide.promoCode} با موفقیت کپی شد!`, 'success');
      return;
    }
    if (slide.secondaryCategory) {
      setSelectedCategory(slide.secondaryCategory);
      setCurrentPage('products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero-slider-section"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      aria-label="اسلایدر ویژه ادویه‌های طاقچه"
      className="relative rounded-3xl overflow-hidden bg-stone-950 text-white min-h-[480px] md:min-h-[540px] flex items-center shadow-2xl focus:outline-none select-none"
    >
      {/* Background Images with smooth fade transition */}
      {SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-center filter saturate-125 transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              style={{ opacity: 0.38 }}
            />
            {/* Rich multi-stop gradient for readable high-contrast typography */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-950/40" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-stone-950/70" />
          </div>
        );
      })}

      {/* Slide Content */}
      <div className="relative z-10 max-w-3xl px-6 sm:px-12 py-12 md:py-16 pb-20 sm:pb-24 space-y-6">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md transition-all duration-300 ${currentSlide.badgeColor}`}>
            {currentSlide.badgeIcon}
            <span>{currentSlide.badgeText}</span>
          </div>

          {currentSlide.discountBadge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/90 text-white text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentSlide.discountBadge}</span>
            </span>
          )}

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-stone-400 bg-stone-900/80 px-2.5 py-1 rounded-lg border border-stone-800">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{currentSlide.trustTag}</span>
          </span>
        </div>

        {/* Slide Title */}
        <h1 
          key={`title-${currentIndex}`}
          className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight sm:leading-tight tracking-tight drop-shadow-md animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          {currentSlide.title}
        </h1>

        {/* Slide Subtitle */}
        <p 
          key={`sub-${currentIndex}`}
          className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl font-normal drop-shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-500"
        >
          {currentSlide.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3.5">
          <button
            id={`hero-slide-primary-btn-${currentIndex}`}
            onClick={() => handlePrimaryClick(currentSlide.primaryCategory)}
            style={{ backgroundColor: 'var(--color-primary, #b45309)' }}
            className="px-6 py-3.5 rounded-2xl text-white font-bold text-sm sm:text-base hover:brightness-110 active:scale-95 transition-all shadow-xl flex items-center gap-2 cursor-pointer group"
          >
            <span>{currentSlide.primaryCtaText}</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>

          {currentSlide.secondaryCtaText && (
            <button
              id={`hero-slide-secondary-btn-${currentIndex}`}
              onClick={() => handleSecondaryClick(currentSlide)}
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              {currentSlide.promoCode ? (
                <span className="flex items-center gap-1.5">
                  <span>{currentSlide.secondaryCtaText}</span>
                  <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded text-xs font-bold text-amber-200">
                    {currentSlide.promoCode}
                  </span>
                </span>
              ) : (
                currentSlide.secondaryCtaText
              )}
            </button>
          )}
        </div>

        {/* Trust Badges Strip */}
        <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-stone-300">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ارسال ۲۴ ساعته سراسر کشور</span>
          </div>
          <span className="text-stone-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>آسیاب بدون ناخالصی و نمک</span>
          </div>
          <span className="text-stone-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>بسته‌بندی متالایز ضد رطوبت و بو</span>
          </div>
        </div>
      </div>

      {/* Slider Navigation Arrows (RTL aware: Right is Prev, Left is Next) */}
      <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <button
          id="hero-slider-prev-btn"
          onClick={prevSlide}
          aria-label="اسلاید قبلی"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-900/70 hover:bg-amber-600 border border-white/15 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg active:scale-90 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          id="hero-slider-next-btn"
          onClick={nextSlide}
          aria-label="اسلاید بعدی"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-900/70 hover:bg-amber-600 border border-white/15 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg active:scale-90 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Names Navigation Bar (Names only, no circular dots) */}
      <div className="absolute bottom-4 sm:bottom-5 left-4 right-4 sm:left-6 sm:right-6 z-20 flex items-center justify-center">
        <div className="flex items-center gap-1 sm:gap-2 bg-stone-950/80 backdrop-blur-md p-1.5 rounded-2xl border border-stone-800/80 max-w-full overflow-x-auto scrollbar-none shadow-xl">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={`tab-${slide.id}`}
                id={`hero-slide-tab-${idx}`}
                onClick={() => goToSlide(idx)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {slide.tabTitle}
              </button>
            );
          })}
        </div>
      </div>

      {/* Top / Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
};
