import React from 'react';
import '../componentStyles/NoProducts.css';
import { SearchOff, ShoppingBagOutlined } from '@mui/icons-material';

function NoProduct({ keyword }) {
  return (
    <div className="no-products-content">
      <div className="no-products-animation">
        <div className="floating-icon">
          <SearchOff className="search-icon" />
        </div>
        <div className="empty-box">
          <ShoppingBagOutlined className="bag-icon" />
        </div>
      </div>
      
      <div className="no-products-text">
        <h3 className="no-products-title">
          Oops! Nothing Found
        </h3>
        <p className="no-products-message">
          {keyword 
            ? `We couldn't find any products matching "${keyword}". Try different keywords or explore our amazing collection!` 
            : "It seems like our shelves are empty. Check back soon for exciting new products!"
          }
        </p>
        
        <div className="suggestions">
          <h4>Try searching for:</h4>
          <div className="suggestion-tags">
            <span className="tag">Electronics</span>
            <span className="tag">Fashion</span>
            <span className="tag">Books</span>
            <span className="tag">Home & Garden</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoProduct;