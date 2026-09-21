import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If already installed in standalone mode, hide
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        id="pwa-install-nav-btn"
        onClick={handleInstallClick}
        title="نصب نسخه پیشرو وب (PWA) روی گوشی یا دسکتاپ"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium rounded-full bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 transition-colors shadow-xs"
      >
        <Smartphone className="w-4 h-4 text-amber-700 shrink-0" />
        <span>نصب اپلیکیشن</span>
        <Download className="w-3.5 h-3.5 text-amber-700 shrink-0" />
      </button>

      {/* Installation Guide Dialog for iOS and browsers where prompt was already handled */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-stone-200 text-right">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
                  ط
                </div>
                <h3 className="text-base font-bold text-stone-900">نصب اپلیکیشن طاقچه (PWA)</h3>
              </div>
              <button 
                onClick={() => setShowGuide(false)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm text-stone-600 leading-relaxed">
              <p className="font-medium text-stone-800">
                این وب‌سایت کاملاً به صورت <strong>PWA (Progressive Web App)</strong> طراحی شده و بدون اشغال حافظه گوشی و بدون نیاز به کافه‌بازار یا گوگل‌پلی مستقیماً روی دستگاه شما نصب می‌شود:
              </p>

              {isIOS ? (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-2 text-xs md:text-sm text-amber-900">
                  <p className="font-semibold text-amber-950">راهنمای آیفون / آیپد (iOS Safari):</p>
                  <p>۱. دکمه <strong>اشتراک‌گذاری (Share)</strong> در پایین یا بالای مرورگر سافاری را لمس کنید.</p>
                  <p>۲. در لیست گزینه‌ها به سمت پایین بروید و روی <strong>Add to Home Screen (افزودن به صفحه اصلی)</strong> ضربه بزنید.</p>
                  <p>۳. دکمه <strong>Add</strong> را تایید کنید.</p>
                </div>
              ) : (
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs md:text-sm text-stone-700">
                  <p className="font-semibold text-stone-900">راهنمای اندروید و کروم:</p>
                  <p>۱. منوی سه‌نقطه بالای مرورگر کروم را لمس کنید.</p>
                  <p>۲. گزینه <strong>«افزودن به صفحه اصلی» (Add to Home screen)</strong> یا <strong>«نصب برنامه» (Install App)</strong> را انتخاب کنید.</p>
                </div>
              )}

              <div className="pt-2 flex items-center gap-2 text-xs text-emerald-700">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>دسترسی سریع‌تر، بارگذاری آفلاین و کارکرد مشابه یک برنامه بومی</span>
              </div>
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="mt-5 w-full rounded-xl bg-stone-900 text-white py-2.5 text-sm font-semibold hover:bg-stone-800 transition shadow-sm"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </>
  );
};
