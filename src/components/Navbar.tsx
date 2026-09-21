import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PWAInstallButton } from './PWAInstallButton';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Settings, 
  Menu, 
  X, 
  Flame, 
  HelpCircle,
  PackageCheck
} from 'lucide-react';
import { PageView } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    cartTotalCount, 
    siteConfig, 
    searchQuery, 
    setSearchQuery,
    setShowTechModal,
    userProfile
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage('products');
  };

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'صفحه اصلی', page: 'home' },
    { label: 'فهرست ادویه‌ها', page: 'products' },
    { label: 'پیگیری سفارشات', page: 'orders' },
    { label: 'درباره طاقچه', page: 'about' },
    { label: 'ارتباط با ما', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Announcement Bar */}
      {siteConfig.announcementText && (
        <div className="bg-gradient-to-r from-amber-700 via-orange-800 to-amber-700 text-amber-50 text-xs py-1.5 px-4 text-center font-medium tracking-wide">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
            <span className="truncate">{siteConfig.announcementText}</span>
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 md:gap-6">
          
          {/* Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition"
              aria-label="منوی اصلی"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo and Brand */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div 
                style={{ backgroundColor: 'var(--color-primary)' }} 
                className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md text-amber-100 group-hover:scale-105 transition-transform"
              >
                <span className="font-black text-xl tracking-tighter">ط</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl text-stone-900 tracking-tight">
                    {siteConfig.siteName}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    ارگانیک
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 font-normal line-clamp-1 hidden sm:block">
                  {siteConfig.siteSlogan}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Search Box */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex flex-1 max-w-md relative mx-2"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="جستجوی ادویه، زعفران، هل، پاپریکا..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-stone-100/90 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-stone-400"
              />
              <button
                type="submit"
                aria-label="جستجو"
                className="absolute left-1 top-1/2 -translate-y-1/2 p-1.5 text-stone-400 hover:text-amber-700 transition"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* PWA Install Button */}
            <div className="hidden sm:block">
              <PWAInstallButton />
            </div>

            {/* Tech Stack Guidance Button */}
            <button
              onClick={() => setShowTechModal(true)}
              title="راهنمای معماری Vue.js و تکنولوژی‌ها"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition"
            >
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden xl:inline">راهنمای تکنولوژی</span>
            </button>

            {/* Admin Panel Button */}
            <button
              onClick={() => handleNavClick('admin')}
              title="پنل مدیریت فروشگاه و رنگ‌بندی"
              className={`p-2 rounded-xl transition ${
                currentPage === 'admin' 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Profile Button */}
            <button
              onClick={() => handleNavClick('profile')}
              title="پروفایل کاربری"
              className={`flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl transition ${
                currentPage === 'profile' 
                  ? 'bg-stone-200 text-stone-900' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-medium hidden lg:inline max-w-[80px] truncate">
                {userProfile.name ? userProfile.name.split(' ')[0] : 'کاربر'}
              </span>
            </button>

            {/* Cart Button */}
            <button
              id="header-cart-button"
              onClick={() => handleNavClick('cart')}
              className={`relative p-2.5 rounded-xl transition flex items-center gap-1.5 ${
                currentPage === 'cart'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-900 text-white hover:bg-stone-800 shadow-xs'
              }`}
              aria-label="سبد خرید"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs font-bold hidden sm:inline">سبد خرید</span>
              {cartTotalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs border-2 border-white">
                  {cartTotalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Row */}
        <nav className="hidden lg:flex items-center justify-between py-2 border-t border-stone-100 text-sm font-medium text-stone-600">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`transition-colors py-1 relative ${
                  currentPage === link.page 
                    ? 'text-amber-800 font-bold' 
                    : 'hover:text-stone-900'
                }`}
              >
                {link.label}
                {currentPage === link.page && (
                  <span 
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    className="absolute bottom-0 right-0 left-0 h-0.5 rounded-full" 
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              تضمین اصالت و برگشت وجه ۷ روزه
            </span>
            <span className="text-stone-300">|</span>
            <span>تلفن پشتیبانی: <b className="font-sans text-stone-700">{siteConfig.phone}</b></span>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="جستجوی ادویه، زعفران، هل..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-stone-100 border border-stone-200 focus:outline-hidden focus:border-amber-600"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Mobile Links */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`text-right p-2.5 rounded-xl text-sm font-medium transition ${
                  currentPage === link.page 
                    ? 'bg-amber-100 text-amber-900 font-bold' 
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500">نصب برنامه:</span>
              <PWAInstallButton />
            </div>
            <button
              onClick={() => {
                setShowTechModal(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-xs bg-emerald-50 text-emerald-800 rounded-xl font-semibold text-center border border-emerald-200"
            >
              راهنمای فنی پروژه (Vue.js و بهینه‌سازی SEO)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
