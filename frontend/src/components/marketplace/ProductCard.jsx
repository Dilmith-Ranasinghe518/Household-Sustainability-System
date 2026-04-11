import React from "react";
import { Link } from "react-router-dom";
import { LocateFixed } from "lucide-react";
import { CATEGORY_LABELS } from "../../utils/categoryLabels";
import placeholderImage from "../../assets/no-image.jpg";
import RequestButton from "./RequestButton";

const ProductCard = ({ product, onRequest }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.imageUrl || placeholderImage}
          alt={product.title}
          className="h-44 sm:h-48 w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-1">

        {/* Category badge */}
        <span className="self-start text-[11px] font-semibold uppercase tracking-wide text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
          {CATEGORY_LABELS[product.category] || product.category}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base leading-snug mt-1 line-clamp-2">
          {product.title}
        </h3>

        {/* Location */}
        {product.locationName && (
          <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
            <LocateFixed size={11} className="text-teal-400 shrink-0" />
            <span className="truncate">{product.locationName}</span>
          </p>
        )}

        {/* Price + Actions */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 gap-2">
          <span className="text-teal-600 font-bold text-lg leading-none">
            Rs. {product.price}
          </span>

          <div className="flex items-center gap-2">
            <Link
              to={`/marketplace/${product._id}`}
              className="px-3.5 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-200 transition-colors text-center whitespace-nowrap"
            >
              View
            </Link>

            <RequestButton size="sm" onClick={() => onRequest(product._id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;