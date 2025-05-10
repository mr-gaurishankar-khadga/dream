import { useState } from 'react';

const ProductsTab = ({ profileData, onAddProduct, onDeleteProduct, showMessage }) => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    link: '',
    image: null
  });
  
  // Handle product form changes
  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      setNewProduct(prev => ({ ...prev, image: files[0] }));
    } else {
      setNewProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  // Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price || !newProduct.link) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }
    
    try {
      await onAddProduct(newProduct);
      setNewProduct({ title: '', price: '', link: '', image: null });
      showMessage('Product added successfully');
    } catch (err) {
      showMessage('Failed to add product', 'error');
    }
  };

  return (
    <div className="ep-tab-content">
      <div className="ep-products-list">
        {profileData.products.map(product => (
          <div key={product._id} className="ep-product-item">
            <div className="ep-product-image-small">
              <img 
                src={product.imageUrl ? 
                  // Make sure we use the full URL if it's a relative path
                  (product.imageUrl.startsWith('http') ? 
                    product.imageUrl : 
                    `http://localhost:5000${product.imageUrl}`
                  ) : 
                  // Fallback to a default image
                  '/placeholder-product.jpg'
                } 
                alt={product.title} 
                onError={(e) => {
                  // If image fails to load, show a fallback
                  e.target.onerror = null;
                  e.target.src = '/placeholder-product.jpg';
                }}
              />
            </div>
            <div className="ep-product-info">
              <h4>{product.title}</h4>
              <p>${product.price.toFixed(2)}</p>
            </div>
            <button 
              className="ep-delete-button"
              onClick={() => {
                if (window.confirm(`Delete ${product.title}?`)) {
                  onDeleteProduct(product._id);
                }
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleAddProduct} className="ep-add-form">
        <div className="managelabel-1">
          <label>Product Image</label>
          <label>Product Title</label>
        </div>

        <div className="ep-form-group">
          <input 
            type="file" 
            name="image" 
            onChange={handleProductChange} 
            accept="image/*" 
          />

          <input 
            type="text" 
            name="title" 
            value={newProduct.title} 
            onChange={handleProductChange} 
            placeholder="Product name" 
            required
          />
        </div>
        
        <div className="managelabel-2">
          <label>Product Price</label>
          <label>Affiliate Link</label>
        </div>

        <div className="ep-form-group">
          <input 
            type="text" 
            name="price" 
            value={newProduct.price} 
            onChange={handleProductChange} 
            step="0.01" 
            min="0" 
            placeholder="0.00" 
            required
          />

          <input 
            type="url" 
            name="link" 
            value={newProduct.link} 
            onChange={handleProductChange} 
            placeholder="https://..." 
            required
          />
        </div>
        
        <button type="submit" className="ep-add-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductsTab;