import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Search, 
  ArrowLeft, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

export const OrdersView: React.FC = () => {
  const { orders, setCurrentPage } = useStore();
  const [searchTracking, setSearchTracking] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (!searchTracking.trim()) return true;
    const query = searchTracking.trim().toLowerCase();
    return o.trackingCode.toLowerCase().includes(query) || o.id.toLowerCase().includes(query);
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'processing':
        return (
          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-700 animate-spin" />
            در حال آسیاب و آماده‌سازی
          </span>
        );
      case 'shipped':
        return (
          <span className="bg-blue-100 text-blue-900 border border-blue-300 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-blue-700" />
            تحویل به پست پیشتاز
          </span>
        );
      case 'delivered':
        return (
          <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            تحویل مشتری شد
          </span>
        );
      case 'cancelled':
        return (
          <span className="bg-rose-100 text-rose-900 border border-rose-300 text-xs px-2.5 py-1 rounded-full font-bold">
            لغو شده
          </span>
        );
      default:
        return (
          <span className="bg-stone-100 text-stone-700 text-xs px-2.5 py-1 rounded-full font-bold">
            در انتظار بررسی
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* Title & Tracker Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
            سفارشات و پیگیری مرسوله‌ها
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            وضعیت لحظه‌ای بسته‌بندی، ارسال پستی و تاریخچه خریدهای پیشین شما
          </p>
        </div>

        {/* Tracking Code Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTracking}
            onChange={(e) => setSearchTracking(e.target.value)}
            placeholder="جستجوی شماره رهگیری (مثلاً TQ-)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl bg-stone-100 border border-stone-200 focus:bg-white focus:outline-hidden focus:border-amber-600 font-mono text-left"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-4 hover:border-amber-300 transition"
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{order.id}</span>
                      <span className="text-stone-300">•</span>
                      <span className="font-mono text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        رهگیری: {order.trackingCode}
                      </span>
                    </div>
                    <span className="text-xs text-stone-400 font-sans">{order.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(order.status)}
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition"
                  >
                    جزئیات فاکتور
                  </button>
                </div>
              </div>

              {/* Items preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200/60"
                  >
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-xs text-stone-900 block truncate">
                        {item.productName}
                      </span>
                      <span className="text-[11px] text-stone-500 block">
                        {item.selectedWeight} × {item.quantity} عدد
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom totals */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2 border-t border-stone-100">
                <div>
                  تحویل‌گیرنده: <strong className="text-stone-800">{order.customerName}</strong> | نشانی: <span className="text-stone-600">{order.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>مبلغ پرداختی:</span>
                  <span className="font-black font-sans text-sm text-stone-900">
                    {order.total.toLocaleString('fa-IR')}
                  </span>
                  <span className="text-[10px]">تومان</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto text-xl font-bold">
            📦
          </div>
          <h3 className="text-base font-bold text-stone-800">هیچ سفارشی یافت نشد</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            شما هنوز سفارشی ثبت نکرده‌اید یا شماره رهگیری وارد شده با سفارشات تطابق ندارد.
          </p>
          <button
            onClick={() => setCurrentPage('products')}
            style={{ backgroundColor: 'var(--color-primary)' }}
            className="px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-xs hover:opacity-90 transition"
          >
            مشاهده فروشگاه و خرید ادویه
          </button>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-stone-900">فاکتور سفارش {selectedOrder.id}</span>
                <span className="font-mono text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                  {selectedOrder.trackingCode}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-stone-400 hover:text-stone-700 text-xs font-bold px-2 py-1 rounded-lg"
              >
                بستن ✕
              </button>
            </div>

            {/* Status info */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 block">وضعیت سفارش:</span>
                <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
              </div>
              <div className="text-left text-xs text-stone-500 font-sans">
                {selectedOrder.date}
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-700 block">اقلام خریداری شده:</span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs p-2 bg-stone-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <img src={item.image} alt={item.productName} className="w-8 h-8 rounded-md object-cover" />
                      <div>
                        <span className="font-bold text-stone-800 block line-clamp-1">{item.productName}</span>
                        <span className="text-[10px] text-stone-500">{item.selectedWeight} × {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-sans font-bold text-stone-900">
                      {(item.unitPrice * item.quantity).toLocaleString('fa-IR')} ت
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>جمع اقلام:</span>
                <span className="font-sans font-bold">{selectedOrder.subtotal.toLocaleString('fa-IR')} تومان</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>تخفیف:</span>
                  <span className="font-sans font-bold">-{selectedOrder.discount.toLocaleString('fa-IR')} تومان</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>هزینه پست پیشتاز:</span>
                <span className="font-sans font-bold">{selectedOrder.shippingFee === 0 ? 'رایگان' : `${selectedOrder.shippingFee.toLocaleString('fa-IR')} تومان`}</span>
              </div>
              <div className="pt-2 border-t border-stone-100 flex justify-between font-black text-sm text-stone-900">
                <span>مبلغ پرداختی کل:</span>
                <span className="font-sans text-amber-800">{selectedOrder.total.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition"
            >
              بستن پنجره
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
