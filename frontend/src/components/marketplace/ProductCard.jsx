import React from "react";
import { Link } from "react-router-dom";
import { CATEGORY_LABELS } from "../../utils/categoryLabels";
import placeholderImage from "../../assets/no-image.jpg";
import RequestButton from "./RequestButton";

const ProductCard = ({ product, onRequest }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-4 flex flex-col">

      <img
        src={product.imageUrl || placeholderImage}
        alt={product.title}
        className="h-48 w-full object-cover rounded-xl mb-4"
        onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
      />

      <h3 className="font-semibold text-lg">{product.title}</h3>

      <p className="text-sm text-text-muted mb-2">
        {CATEGORY_LABELS[product.category] || product.category}
      </p>

      <div className="flex justify-between items-center mt-auto">
        <span className="text-primary-teal font-bold text-lg">
          Rs. {product.price}
        </span>

        <Link to={`/marketplace/${product._id}`} className="px-4 py-2 bg-primary-teal text-white rounded-xl text-sm hover:bg-teal-700 text-center">
            View
        </Link>
        
        <RequestButton size="sm" onClick={() => onRequest(product._id)}/>
      </div>
    </div>
  );
};

export default ProductCard;