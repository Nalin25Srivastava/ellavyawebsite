import React, { useState, useEffect } from 'react';
/* Removed static imports for allProducts and categories */
import ProductCard from '../components/products/ProductCard';
import ProductDetailsModal from '../components/products/ProductDetailsModal';
import CategorySidebar from '../components/products/CategorySidebar';
import './Products.css';

/**
 * Products Page Component
 * 
 * Fetches and displays a filterable grid of products from the backend API.
 */
const Products = () => {
  /* State for data fetched from API */
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  /* State for UI logic */
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Get API URL from environment variables */
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  /**
   * Fetch categories and products from the backend on mount
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        /* Fetch categories and products in parallel */
        const [catRes, prodRes] = await Promise.all([
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/products`)
        ]);

        if (!catRes.ok || !prodRes.ok) throw new Error('Failed to fetch data');

        const [catData, prodData] = await Promise.all([
          catRes.json(),
          prodRes.json()
        ]);

        setCategories(catData);
        setAllProducts(prodData);
        setFilteredProducts(prodData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  /**
   * Toggles a category filter on or off.
   */
  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  /**
   * Resets all filters.
   */
  const clearFilters = () => {
    setSelectedCategories([]);
  };

  /**
   * Effect hook to filter products locally whenever selectedCategories or allProducts changes.
   */
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => selectedCategories.includes(p.category)));
    }
  }, [selectedCategories, allProducts]);

  /* Render loading or error states if necessary */
  if (loading) {
    return (
      <div className="products-page">
        <div className="products-loading" style={{ padding: '2rem', textAlign: 'center' }}>Loading collection...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="products-page">
        <div className="products-error" style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-container">
        {/* Navigation and Filter Sidebar */}
        <CategorySidebar 
          categories={categories}
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
          onClearFilters={clearFilters}
        />

        {/* Main Content Area: Header and Results Grid */}
        <main className="products-main">
          {/* Section Header */}
          <div className="products-header">
            <h1>Our Collection</h1>
            <p>Showing {filteredProducts.length} premium products</p>
          </div>

          {/* Product Cards Grid */}
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                categories={categories} 
                onClick={setSelectedProduct}
              />
            ))}
          </div>
          
          {/* Empty State: Shown when no products match the selected filters */}
          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No products found in this selection.</p>
              <button onClick={clearFilters} className="back-btn">Back to All Products</button>
            </div>
          )}
        </main>
      </div>

      {/* Product Detail Overlay (Modal) */}
      <ProductDetailsModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        categories={categories}
      />
    </div>
  );
};

export default Products;


