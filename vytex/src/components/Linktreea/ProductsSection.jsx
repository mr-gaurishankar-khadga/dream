import { useState, useEffect } from 'react';
import './ProductsSection.css';

const ProductsSection = ({ 
  products, 
  accentColor,
  textColor,
  backgroundColor,
  secondaryColor
}) => {
  const [formattedProducts, setFormattedProducts] = useState([]);
  
  // Process products to ensure image URLs are correct
  useEffect(() => {
    if (!products || products.length === 0) return;
    
    const processed = products.map(product => {
      let imageUrl = '/placeholder-product.jpg';
      
      if (product.imageUrl) {
        // Handle absolute URLs
        if (product.imageUrl.startsWith('http')) {
          imageUrl = product.imageUrl;
        } 
        // Handle relative URLs with leading slash
        else if (product.imageUrl.startsWith('/')) {
          imageUrl = `${import.meta.env.VITE_BACKEND_URL}${product.imageUrl}`;

        } 
        // Handle relative URLs without leading slash
        else {
          imageUrl = `${import.meta.env.VITE_BACKEND_URL}/${product.imageUrl}`;

        }
      }
      
      return {
        ...product,
        formattedImageUrl: imageUrl
      };
    });
    
    setFormattedProducts(processed);
  }, [products]);
  
  // Display all products at once
  const displayProducts = formattedProducts;
  
  // Return early if no products
  if (!formattedProducts || formattedProducts.length === 0) {
    return (
      <div 
        className="enhanced-products-empty" 
        style={{ color: textColor }}
      >
        No products available
      </div>
    );
  }
  
  // Generate dynamic styles for components
  const dynamicStyles = {
    productCard: {
      backgroundColor: backgroundColor ? `${backgroundColor}99` : 'rgba(255, 255, 255, 0.95)',
      boxShadow: `0 8px 20px ${backgroundColor ? `${backgroundColor}30` : 'rgba(0, 0, 0, 0.08)'}`,
      border: `1px solid ${secondaryColor || 'rgba(240, 240, 240, 0.9)'}`
    },
    productTitle: {
      color: textColor || '#111'
    },
    productPrice: {
      color: textColor || '#111'
    },
    buyButton: {
      backgroundColor: accentColor || '#3b82f6',
      color: backgroundColor || '#ffffff'
    },
    seeAllButton: {
      backgroundColor: `${accentColor}22` || 'rgba(59, 130, 246, 0.13)',
      color: accentColor || '#3b82f6',
      borderColor: accentColor || '#3b82f6'
    },
    productCount: {
      color: textColor ? `${textColor}99` : 'rgba(0, 0, 0, 0.7)'
    }
  };
  
  return (
    <div className="enhanced-products-section">
      <div className="enhanced-products-grid">
        {displayProducts.map((product, index) => (
          <div 
            key={product._id || index} 
            className="enhanced-product-card"
            style={dynamicStyles.productCard}
          >
            <a href={product.link} className="enhanced-product-link" target="_blank" rel="noopener noreferrer">
              <div className="enhanced-product-image-container">
                <img 
                  src={product.formattedImageUrl}
                  alt={product.title} 
                  className="enhanced-product-image"
                  onError={(e) => {
                    console.log("Image failed to load:", e.target.src);
                    e.target.onerror = null;
                    e.target.src = '/placeholder-product.jpg';
                  }}
                />
              </div>
              <div className="enhanced-product-info">
                <h3 
                  className="enhanced-product-title"
                  style={dynamicStyles.productTitle}
                >
                  {product.title}
                </h3>
                <p 
                  className="enhanced-product-price"
                  style={dynamicStyles.productPrice}
                >
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <button 
                className="enhanced-buy-button"
                style={dynamicStyles.buyButton}
              >
                View Product
              </button>
            </a>
          </div>
        ))}
      </div>
      
      {formattedProducts.length > 0 && (
        <div className="enhanced-product-count-section">
          <span 
            className="enhanced-product-count"
            style={dynamicStyles.productCount}
          >
            {formattedProducts.length} Products
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductsSection;