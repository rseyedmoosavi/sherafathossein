import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User, MapPin, Phone, Mail, Package, Check, Save } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { userProfile, updateUserProfile, orders, setCurrentPage, showToast } = useStore();
  const [formData, setFormData] = useState({ ...userProfile });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            style={{ backgroundColor: 'var(--color-primary)' }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-md"
          >
            {formData.name ? formData.name.charAt(0) : 'ک'}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900">
              {formData.name || 'حساب کاربری طاقچه'}
            </h1>
            <p className="text-xs text-stone-500 font-sans mt-0.5">
              {formData.phone || 'شماره تماس ثبت نشده'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('orders')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition"
        >
          <Package className="w-4 h-4 text-amber-700" />
          <span>سفارشات من ({orders.length})</span>
        </button>
      </div>

      {/* Profile Edit Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-black text-stone-900">اطلاعات هویتی و نشانی‌های ارسال</h2>
          <p className="text-xs text-stone-500 mt-1">این اطلاعات به طور خودکار در تسویه‌حساب خریدهای بعدی بارگذاری می‌شوند.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5 text-stone-400" />
                <span>نام و نام خانوادگی:</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5 mb-1">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>شماره تلفن همراه:</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 font-sans"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5 mb-1">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>پست الکترونیک (ایمیل):</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 font-sans"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>شهر:</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">کد پستی ۱۰ رقمی:</label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 font-sans"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">نشانی کامل پستی پیش‌فرض:</label>
            <textarea
              rows={3}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-3 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              style={{ backgroundColor: 'var(--color-primary)' }}
              className="px-6 py-3 rounded-2xl text-white font-bold text-xs sm:text-sm hover:opacity-90 transition shadow-md flex items-center gap-2"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>ذخیره شد!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>ذخیره تغییرات حساب کاربری</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
