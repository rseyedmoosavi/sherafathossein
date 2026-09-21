import React, { useState } from 'react';
import { SpiceProduct } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, ShoppingBag, MapPin, Sparkles, Check } from 'lucide-react';

interface ProductCardProps {
  product: SpiceProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateToProductDetail, addToCart } = useStore();
  const [selectedWeight, setSelectedWeight] = useState(
    product.weightOptions[0]?.weight || '۱۰۰ گرم'
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Compute price based on selected weight
  const currentOption = product.weightOptions.find(w => w.weight === selectedWeight) || product.weightOptions[0];
  const multiplier = currentOption ? currentOption.priceMultiplier : 1;
  const currentPrice = Math.round(product.price * multiplier);
  const currentOriginalPrice = product.originalPrice ? Math.round(product.originalPrice * multiplier) : undefined;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedWeight, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      onClick={() => navigateToProductDetail(product.id)}
      className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">
        {product.isBestSeller && (
          <span className="bg-amber-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            پرفروش
          </span>
        )}
        {product.isSpecialOffer && (
          <span className="bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            تخفیف ویژه
          </span>
        )}
      </div>

      {product.isOrganic && (
        <span className="absolute top-3 left-3 z-10 bg-emerald-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs shadow-xs">
          ۱۰۰٪ ارگانیک
        </span>
      )}

      {/* Image with container */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Origin tag */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-stone-900/70 text-stone-100 backdrop-blur-xs text-[11px] px-2 py-0.5 rounded-md font-medium">
          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
          <span>{product.origin}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="text-amber-800 font-medium">{product.categoryTitle}</span>
            <div className="flex items-center gap-1">
              <span className="font-sans font-bold text-stone-700">{product.rating}</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-stone-400 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-stone-900 text-base group-hover:text-amber-700 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-stone-400 text-xs font-mono tracking-tight line-clamp-1 mb-2">
            {product.englishName}
          </p>

          <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Weight Selector */}
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="pt-2 border-t border-stone-100"
        >
          <span className="text-[11px] text-stone-400 font-medium block mb-1.5">انتخاب وزن / بسته:</span>
          <div className="flex flex-wrap gap-1.5">
            {product.weightOptions.map((opt) => (
              <button
                key={opt.weight}
                type="button"
                onClick={() => setSelectedWeight(opt.weight)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition ${
                  selectedWeight === opt.weight
                    ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                {opt.weight}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Add to cart button */}
        <div className="pt-2 flex items-center justify-between mt-auto">
          <div>
            {currentOriginalPrice && (
              <span className="text-[11px] text-stone-400 line-through block font-sans">
                {currentOriginalPrice.toLocaleString('fa-IR')} تومان
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-stone-900 font-sans">
                {currentPrice.toLocaleString('fa-IR')}
              </span>
              <span className="text-xs text-stone-500 font-medium">تومان</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
              addedAnimation 
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-stone-900 text-white hover:bg-amber-700 active:scale-95 shadow-xs'
            }`}
            title="افزودن به سبد خرید"
            aria-label="افزودن به سبد"
          >
            {addedAnimation ? (
              <Check className="w-5 h-5 text-white animate-in zoom-in-50" />
            ) : (
              <ShoppingBag className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
