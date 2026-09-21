import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { siteConfig, showToast } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      showToast('لطفاً پیام خود را وارد نمایید.', 'error');
      return;
    }
    setIsSent(true);
    showToast('پیام شما با موفقیت دریافت شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.', 'success');
    setName('');
    setPhone('');
    setMessage('');
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-300 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold text-amber-700">همواره در کنار شما هستیم</span>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900">ارتباط با کارشناسان ادویه طاقچه</h1>
        <p className="text-xs sm:text-sm text-stone-500">
          برای مشاوره تخصصی انتخاب ادویه، سفارشات عمده رستورانی، یا پیگیری بسته‌های پستی با ما تماس بگیرید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Information & Channels */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-base font-black text-stone-900 pb-3 border-b border-stone-100">
              پل‌های ارتباطی مستقیم
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-stone-600">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 block font-medium">تلفن مستقیم سفارشات و پشتیبانی:</span>
                  <span className="font-sans font-black text-stone-900 text-sm mt-0.5 block">{siteConfig.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 block font-medium">واتساپ و ایتا جهت پشتیبانی آنلاین:</span>
                  <span className="font-sans font-black text-stone-900 text-sm mt-0.5 block">{siteConfig.whatsapp}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 block font-medium">پست الکترونیک (ایمیل):</span>
                  <span className="font-sans text-stone-900 text-sm mt-0.5 block">{siteConfig.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 block font-medium">نشانی دفتر مرکزی و انبار آسیاب:</span>
                  <span className="text-stone-800 text-xs leading-relaxed mt-0.5 block">{siteConfig.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 block font-medium">ساعات پاسخگویی تلفنی:</span>
                  <span className="text-stone-800 text-xs mt-0.5 block">شنبه تا چهارشنبه ۹ صبح تا ۱۸ عصر | پنج‌شنبه‌ها ۹ تا ۱۴</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900">
            سفارشات عمده بالای ۲۰ کیلوگرم برای رستوران‌ها و کترینگ‌ها شامل تخفیف‌های ویژه آسیاب روز است.
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-black text-stone-900">ارسال پیام یا انتقاد و پیشنهاد</h2>
            <p className="text-xs text-stone-500 mt-1">پیام شما مستقیماً توسط مدیر کیفی طاقچه بررسی می‌گردد.</p>
          </div>

          {isSent ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-sm text-emerald-950">پیام شما دریافت شد</h3>
              <p className="text-xs text-emerald-800">با تشکر از توجه شما، به زودی با شما تماس خواهیم گرفت.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">نام شما:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: نرگس فراهانی"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">شماره تماس یا ایمیل:</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا ایمیل"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 font-sans"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">متن پیام یا سوال شما:</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="سوال خود در مورد ادویه‌ها، بسته‌بندی یا همکاری را بنویسید..."
                  className="w-full p-3 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: 'var(--color-primary)' }}
                className="w-full py-3 rounded-xl text-white font-bold text-xs sm:text-sm hover:opacity-90 transition shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>ارسال پیام به پشتیبانی</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
