import React, { useState, useEffect } from "react";
import api from "../services/api";
import { API_ENDPOINTS } from "../config/apiConfig";
import ProductCard from "../components/marketplace/ProductCard";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const uniqueCategories = [
        "All",
        ...new Set(products.map((p) => p.category))
    ];
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchProducts = async () => {
        try {
            const res = await api.get(API_ENDPOINTS.PRODUCTS.BASE);

            const availableProducts = res.data.products; 

            setProducts(availableProducts);
            setFilteredProducts(availableProducts);

        } catch (err) {
            console.error("Error fetching products:", err.response?.data || err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter logic
    useEffect(() => {
        let filtered = products;

        if (search) {
            filtered = filtered.filter((p) =>
                p.title?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category !== "All") {
            filtered = filtered.filter((p) => p.category === category);
        }

        setFilteredProducts(filtered);

    }, [search, category, products]);

    const handleRequestClick = (productId) => {
        setSelectedProductId(productId);
        setIsConfirmOpen(true);
    };

  const placeOrder = async () => {
    try {
        setLoading(true);

        const res = await api.post(API_ENDPOINTS.ORDERS.BASE, {
        productId: selectedProductId
        });

        toast.success(res.data.message);

        fetchProducts();

    } catch (err) {
        const errorMessage = err.response?.data?.message || "Something went wrong.";

        if (err.response?.status === 400) {
            toast.warning(errorMessage);
        } else {
            toast.error(errorMessage);
        }
    } finally {
        setLoading(false);
        setIsConfirmOpen(false);
        setSelectedProductId(null);
    }
  };

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Sustainable Marketplace</h1>
        <p className="text-text-muted">
            Give items a second life and find great deals in your community.
        </p>
      </div>

      {/* Search, Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 p-3 rounded-xl border border-border"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="p-3 rounded-xl border border-border" value={category} onChange={(e) => setCategory(e.target.value)}>
            {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                {cat.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                </option>
            ))}
        </select>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-text-muted">
          No available products found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} onRequest={handleRequestClick}/>
          ))}
        </div>
      )}
    
    <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={placeOrder}
        title="Confirm Product Request"
        message="This item will be reserved for you and the seller will be notified. Do you want to proceed?"
        confirmText="Yes, Request Item"
        cancelText="Cancel"
        type="info"
    />
    </div>
  );
};

export default Marketplace;