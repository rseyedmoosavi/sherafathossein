/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutGatewayView } from './views/CheckoutGatewayView';
import { OrdersView } from './views/OrdersView';
import { ProfileView } from './views/ProfileView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AdminPanelView } from './views/AdminPanelView';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-center justify-between gap-3 text-xs font-semibold animate-in slide-in-from-bottom-4 duration-200 ${
            t.type === 'success'
              ? 'bg-emerald-900 text-white border-emerald-700'
              : t.type === 'error'
              ? 'bg-rose-900 text-white border-rose-700'
              : 'bg-stone-900 text-white border-stone-700'
          }`}
        >
          <div className="flex items-center gap-2">
            {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {t.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {t.type === 'info' && <Info className="w-4 h-4 text-amber-400 shrink-0" />}
            <span className="leading-relaxed">{t.message}</span>
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="p-1 text-stone-400 hover:text-white transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

const MainContent: React.FC = () => {
  const { currentPage } = useStore();

  const renderView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'products':
        return <ProductsView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutGatewayView />;
      case 'orders':
        return <OrdersView />;
      case 'profile':
        return <ProfileView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminPanelView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900 selection:bg-amber-800 selection:text-white">
      <OfflineIndicator />
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {renderView()}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
