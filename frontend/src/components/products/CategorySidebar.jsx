import React from 'react';
import { LayoutGrid, ListFilter, X } from 'lucide-react';
import './CategorySidebar.css';

/**
 * CategorySidebar Component
 * 
 * Provides a side navigation for filtering products by category.
 * Includes a quick 'All Products' reset and individual category toggles.
 */
const CategorySidebar = ({ categories, selectedCategories, onToggleCategory, onClearFilters }) => {
  return (
    <aside className="products-sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <ListFilter className="filter-icon" />
        <h2>Categories</h2>
      </div>
      
      {/* List of Filtes (Buttons) */}
      <div className="category-list">
        {/* 'All Products' Button - Active when no specific categories are selected */}
        <button 
          className={`category-item all-btn ${selectedCategories.length === 0 ? 'active' : ''}`}
          onClick={onClearFilters}
        >
          <LayoutGrid size={20} />
          <span>All Products</span>
        </button>
        
        {/* Dynamically render each category from the data source */}
        {categories.map(cat => (
          <button 
            key={cat.id}
            className={`category-item ${selectedCategories.includes(cat.id) ? 'active' : ''}`}
            onClick={() => onToggleCategory(cat.id)}
          >
            {/* Category Icon and Info */}
            <span className="cat-icon">{cat.icon}</span>
            <div className="cat-info">
              <span className="cat-name">{cat.name}</span>
              <span className="cat-desc">{cat.description}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Conditional 'Clear' button shown only when one or more filters are active */}
      {selectedCategories.length > 0 && (
        <button className="clear-filter-btn" onClick={onClearFilters}>
          <X size={16} /> Hide Filters
        </button>
      )}
    </aside>
  );
};

export default CategorySidebar;

