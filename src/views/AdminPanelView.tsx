import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { THEME_PALETTES } from '../data/initialData';
import { 
  Package, 
  ShoppingBag, 
  Palette, 
  Sliders, 
  Plus, 
  Trash2, 
  Check, 
  Clock, 
  Truck, 
  CheckCircle2, 
  Save, 
  Sparkles,
  Edit2
} from 'lucide-react';
import { SpiceCategory, OrderStatus, SpiceProduct } from '../types';

export const AdminPanelView: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus, 
    siteConfig, 
    updateSiteConfig, 
    setThemePalette,
    activePalette,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'theme' | 'template'>('products');

  // Product addition form state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    englishName: '',
    category: 'blends' as SpiceCategory,
    categoryTitle: 'ادویه‌های ترکیبی',
    price: 85000,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    description: '',
    origin: 'ایران',
    aromaIntensity: 4,
    spiciness: 1,
    stock: 50,
    isOrganic: true,
    isBestSeller: false,
    isSpecialOffer: false,
    bestUsedFor: ['انواع خورشت', 'مرینیت کباب'],
    weightOptions: [
      { weight: '۱۰۰ گرم', priceMultiplier: 1 },
      { weight: '۲۵۰ گرم', priceMultiplier: 2.2 },
      { weight: '۵۰۰ گرم', priceMultiplier: 4 },
    ],
  });

  // Template config form state
  const [templateForm, setTemplateForm] = useState({ ...siteConfig });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) {
      showToast('لطفاً نام محصول را وارد کنید', 'error');
      return;
    }

    const categoryTitles: Record<SpiceCategory, string> = {
      all: 'همه ادویه‌ها',
      blends: 'ادویه‌های ترکیبی',
      saffron: 'زعفران و هل',
      peppers: 'فلفل‌ها و پاپریکا',
      seeds: 'چوب و دانه‌ها',
      herbs: 'سبزیجات و گیاهان دارویی',
    };

    addProduct({
      ...newProduct,
      categoryTitle: categoryTitles[newProduct.category] || 'ادویه',
    });

    setShowAddProductModal(false);
    setNewProduct({
      name: '',
      englishName: '',
      category: 'blends',
      categoryTitle: 'ادویه‌های ترکیبی',
      price: 85000,
      originalPrice: 95000,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      description: '',
      origin: 'ایران',
      aromaIntensity: 4,
      spiciness: 1,
      stock: 50,
      isOrganic: true,
      isBestSeller: false,
      isSpecialOffer: false,
      bestUsedFor: ['انواع خورشت'],
      weightOptions: [
        { weight: '۱۰۰ گرم', priceMultiplier: 1 },
        { weight: '۲۵0 گرم', priceMultiplier: 2.2 },
      ],
    });
  };

  const handleSaveTemplateConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(templateForm);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* Admin Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>مدیریت فروشگاه و ظاهر سایت</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            پنل مدیریت اختصاصی {siteConfig.siteName}
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            مدیریت آسان موجودی ادویه‌ها، سفارشات مشتریان، رنگ‌بندی قالب و متون پویا
          </p>
        </div>

        {/* Stats summary */}
        <div className="flex items-center gap-3">
          <div className="bg-stone-800 px-4 py-2 rounded-2xl text-center border border-stone-700">
            <span className="text-[11px] text-stone-400 block">تعداد محصولات</span>
            <span className="text-base font-black font-sans text-amber-400">{products.length}</span>
          </div>
          <div className="bg-stone-800 px-4 py-2 rounded-2xl text-center border border-stone-700">
            <span className="text-[11px] text-stone-400 block">کل سفارشات</span>
            <span className="text-base font-black font-sans text-emerald-400">{orders.length}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'products'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>مدیریت محصولات ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>مدیریت سفارشات ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('theme')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'theme'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>تغییر رنگ‌بندی پوسته</span>
        </button>

        <button
          onClick={() => setActiveTab('template')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'template'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>ویرایش داینامیک متون قالب</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-stone-900">فهرست ادویه‌جات فعال فروشگاه</h2>
            <button
              onClick={() => setShowAddProductModal(true)}
              style={{ backgroundColor: 'var(--color-primary)' }}
              className="px-4 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن ادویه جدید</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold">
                  <tr>
                    <th className="p-4">تصویر و نام ادویه</th>
                    <th className="p-4">دسته‌بندی</th>
                    <th className="p-4">قیمت پایه (تومان)</th>
                    <th className="p-4">موجودی انبار</th>
                    <th className="p-4">وضعیت</th>
                    <th className="p-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-stone-50/70 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                          />
                          <div>
                            <span className="font-bold text-stone-900 text-sm block line-clamp-1">{prod.name}</span>
                            <span className="text-[11px] text-stone-400 font-mono">{prod.origin}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-stone-600 font-medium">
                        {prod.categoryTitle}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={prod.price}
                            onChange={(e) => updateProduct(prod.id, { price: Number(e.target.value) })}
                            className="w-24 px-2 py-1 bg-stone-50 border border-stone-200 rounded-lg text-xs font-sans font-bold"
                          />
                          <span className="text-[10px] text-stone-400">ت</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          value={prod.stock}
                          onChange={(e) => updateProduct(prod.id, { stock: Number(e.target.value) })}
                          className="w-16 px-2 py-1 bg-stone-50 border border-stone-200 rounded-lg text-xs font-sans font-bold"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {prod.isOrganic && (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] px-2 py-0.5 rounded-full font-bold">
                              ارگانیک
                            </span>
                          )}
                          {prod.isBestSeller && (
                            <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] px-2 py-0.5 rounded-full font-bold">
                              پرفروش
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-2 text-stone-400 hover:text-rose-600 rounded-lg transition"
                          title="حذف ادویه"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-lg font-black text-stone-900">مدیریت سفارشات دریافتی</h2>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{order.id}</span>
                      <span className="font-mono text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        {order.trackingCode}
                      </span>
                    </div>
                    <span className="text-xs text-stone-400 font-sans">{order.date}</span>
                  </div>

                  {/* Change Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500 font-medium">تغییر وضعیت:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-800 focus:outline-hidden focus:border-amber-600"
                    >
                      <option value="processing">در حال آسیاب و آماده‌سازی</option>
                      <option value="shipped">تحویل به پست پیشتاز</option>
                      <option value="delivered">تحویل شده به مشتری</option>
                      <option value="cancelled">لغو شده</option>
                    </select>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-600">
                  <div>
                    <span className="text-stone-400 block">مشخصات خریدار:</span>
                    <strong className="text-stone-900 text-sm">{order.customerName}</strong> ({order.phone})
                    <p className="mt-1 text-stone-600 leading-relaxed">{order.address}</p>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-1">اقلام خریداری‌شده:</span>
                    <div className="space-y-1">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between bg-stone-50 p-1.5 rounded-lg">
                          <span>{it.productName} ({it.selectedWeight}) × {it.quantity}</span>
                          <span className="font-sans font-bold">{(it.unitPrice * it.quantity).toLocaleString('fa-IR')} ت</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 text-left font-black text-amber-800 text-sm font-sans">
                      مبلغ کل: {order.total.toLocaleString('fa-IR')} تومان
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: THEME COLOR PALETTE CUSTOMIZATION */}
      {activeTab === 'theme' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-black text-stone-900">شخصی‌سازی پالت رنگی فروشگاه</h2>
            <p className="text-xs text-stone-500 mt-1">
              با انتخاب هریک از پالت‌های زیر، رنگ دکمه‌ها، سربرگ‌ها، آیکون‌ها و استایل کلی فروشگاه به صورت لحظه‌ای تغییر می‌کند.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {THEME_PALETTES.map((palette) => (
              <div
                key={palette.id}
                onClick={() => setThemePalette(palette.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  siteConfig.selectedPaletteId === palette.id
                    ? 'border-amber-600 bg-amber-50/40 shadow-md'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-stone-900">{palette.name}</span>
                  {siteConfig.selectedPaletteId === palette.id && (
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">
                      ✓
                    </span>
                  )}
                </div>

                {/* Color swatches */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-xl shadow-xs border border-white"
                    style={{ backgroundColor: palette.primary }}
                    title="رنگ اصلی"
                  />
                  <div
                    className="w-10 h-10 rounded-xl shadow-xs border border-white"
                    style={{ backgroundColor: palette.accent }}
                    title="رنگ فرعی و هایلایت"
                  />
                  <div
                    className="w-10 h-10 rounded-xl shadow-xs border border-stone-200"
                    style={{ backgroundColor: palette.primaryLight }}
                    title="رنگ زمینه روشن"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
            <span className="font-bold text-stone-800 block">راهنما:</span>
            <p>
              پالت فعال فعلی: <strong>{activePalette.name}</strong>. این انتخاب به طور خودکار در مرورگر کاربران ماندگار است.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: DYNAMIC TEMPLATE CONTENT EDITING */}
      {activeTab === 'template' && (
        <form onSubmit={handleSaveTemplateConfig} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-black text-stone-900">ویرایش تمامی بخش‌های قالب به صورت داینامیک</h2>
            <p className="text-xs text-stone-500 mt-1">تغییر عنوان فروشگاه، شعار، بنر اطلاع‌رسانی بالای سایت، متون هدر، سقف ارسال رایگان و اطلاعات تماس.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">نام فروشگاه (Brand Name):</label>
              <input
                type="text"
                value={templateForm.siteName}
                onChange={(e) => setTemplateForm({ ...templateForm, siteName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">شعار فروشگاه:</label>
              <input
                type="text"
                value={templateForm.siteSlogan}
                onChange={(e) => setTemplateForm({ ...templateForm, siteSlogan: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-stone-700 block mb-1">متن نوار اعلامیه بالای صفحه (Announcement Bar):</label>
              <input
                type="text"
                value={templateForm.announcementText}
                onChange={(e) => setTemplateForm({ ...templateForm, announcementText: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-stone-700 block mb-1">تیتر اصلی هدر صفحه نخست (Hero Headline):</label>
              <input
                type="text"
                value={templateForm.heroHeadline}
                onChange={(e) => setTemplateForm({ ...templateForm, heroHeadline: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-stone-700 block mb-1">زیرتیتر توضیحات هدر (Hero Subheadline):</label>
              <textarea
                rows={2}
                value={templateForm.heroSubheadline}
                onChange={(e) => setTemplateForm({ ...templateForm, heroSubheadline: e.target.value })}
                className="w-full p-3 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">سقف ارسال رایگان (تومان):</label>
              <input
                type="number"
                value={templateForm.freeShippingThreshold}
                onChange={(e) => setTemplateForm({ ...templateForm, freeShippingThreshold: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 font-sans"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">هزینه ارسال استاندارد پست (تومان):</label>
              <input
                type="number"
                value={templateForm.standardShippingFee}
                onChange={(e) => setTemplateForm({ ...templateForm, standardShippingFee: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 font-sans"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">شماره تلفن ثابت پشتیبانی:</label>
              <input
                type="text"
                value={templateForm.phone}
                onChange={(e) => setTemplateForm({ ...templateForm, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 font-sans"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">شماره واتساپ:</label>
              <input
                type="text"
                value={templateForm.whatsapp}
                onChange={(e) => setTemplateForm({ ...templateForm, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 font-sans"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-stone-700 block mb-1">نشانی پستی درج شده در پاورقی:</label>
              <input
                type="text"
                value={templateForm.address}
                onChange={(e) => setTemplateForm({ ...templateForm, address: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              style={{ backgroundColor: 'var(--color-primary)' }}
              className="px-6 py-3 rounded-2xl text-white font-bold text-xs sm:text-sm hover:opacity-90 transition shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره کلیه تنظیمات قالب</span>
            </button>
          </div>
        </form>
      )}

      {/* MODAL: ADD NEW SPICE PRODUCT */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-black text-base text-stone-900">افزودن محصول جدید به فروشگاه</h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-stone-400 hover:text-stone-700 text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">نام فارسی ادویه:</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="مثال: زنجبیل اعلای شیراز"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">نام انگلیسی (لاتین):</label>
                  <input
                    type="text"
                    value={newProduct.englishName}
                    onChange={(e) => setNewProduct({ ...newProduct, englishName: e.target.value })}
                    placeholder="Ginger Root"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-amber-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">دسته‌بندی ادویه:</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as SpiceCategory })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-amber-600"
                  >
                    <option value="blends">ادویه‌های ترکیبی خورشتی</option>
                    <option value="saffron">زعفران و هل اعلا</option>
                    <option value="peppers">پاپریکا و فلفل‌ها</option>
                    <option value="seeds">چوب دارچین و دانه‌ها</option>
                    <option value="herbs">سبزیجات و گیاهان دارویی</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">قیمت پایه (تومان):</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-amber-600 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">لینک تصویر محصول (URL):</label>
                <input
                  type="url"
                  required
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-amber-600 font-mono text-left"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">توضیحات و خواص ادویه:</label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="عطر، طعم، روش آسیاب و کیفیت محصول..."
                  className="w-full p-3 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-amber-600 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">مبدا جغرافیایی ادویه:</label>
                  <input
                    type="text"
                    value={newProduct.origin}
                    onChange={(e) => setNewProduct({ ...newProduct, origin: e.target.value })}
                    placeholder="مثال: هند، قائنات، شیراز"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">موجودی انبار:</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-amber-600 font-sans"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={newProduct.isOrganic}
                    onChange={(e) => setNewProduct({ ...newProduct, isOrganic: e.target.checked })}
                    className="rounded-sm text-amber-700"
                  />
                  <span>۱۰۰٪ ارگانیک</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={newProduct.isBestSeller}
                    onChange={(e) => setNewProduct({ ...newProduct, isBestSeller: e.target.checked })}
                    className="rounded-sm text-amber-700"
                  />
                  <span>برچسب پرفروش</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                  className="px-5 py-2 rounded-xl text-white font-bold text-xs shadow-md hover:opacity-90 transition"
                >
                  افزودن و انتشار در سایت
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
