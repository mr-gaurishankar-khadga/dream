// src/LinktreeLayout.jsx
import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import ProfileSection from './ProfileSection';
import EditSection from './EditSection';
import './LinktreeLayout.css';

// Choose the appropriate backend based on device
const dndBackend = isMobile ? TouchBackend : HTML5Backend;

function LinktreeLayout() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    fetchProfileData();
  }, [token]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      
      // Check if we have a token
      const authToken = localStorage.getItem('token');
      
      let endpoint = '/api/profile/me';
      let options = {};
      
      if (authToken) {
        // If we have a token, use the authenticated endpoint with the token
        options = {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        };
      } else {
        // If no token, try to get a demo profile (modify this to match your backend)
        // You could use a default username or a "demo" endpoint
        endpoint = '/api/profile/demo'; // Change this to a default username that exists in your system
      }
      
      const response = await fetch(`http://localhost:5000${endpoint}`, options);
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      
      const data = await response.json();
      setProfileData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile data. Please try again later.');
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setProfileData(data);
      return data;
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const updateSocialLinksOrder = async (reorderedLinks) => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch('http://localhost:5000/api/social-links/reorder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ links: reorderedLinks }),
      });

      if (!response.ok) {
        throw new Error('Failed to update social links order');
      }

      const updatedLinks = await response.json();
      setProfileData(prev => ({
        ...prev,
        socialLinks: updatedLinks
      }));
      return updatedLinks;
    } catch (err) {
      console.error('Error updating social links order:', err);
      throw err;
    }
  };

  const addSocialLink = async (newLink) => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch('http://localhost:5000/api/social-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(newLink),
      });

      if (!response.ok) {
        throw new Error('Failed to add social link');
      }

      const updatedLinks = await response.json();
      setProfileData(prev => ({
        ...prev,
        socialLinks: updatedLinks
      }));
      return updatedLinks;
    } catch (err) {
      console.error('Error adding social link:', err);
      throw err;
    }
  };

  const updateSocialLink = async (id, updatedLink) => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`http://localhost:5000/api/social-links/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(updatedLink),
      });

      if (!response.ok) {
        throw new Error('Failed to update social link');
      }

      const updatedLinkData = await response.json();
      
      setProfileData(prev => ({
        ...prev,
        socialLinks: prev.socialLinks.map(link => 
          link._id === id ? updatedLinkData : link
        )
      }));
      
      return updatedLinkData;
    } catch (err) {
      console.error('Error updating social link:', err);
      throw err;
    }
  };

  const deleteSocialLink = async (id) => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`http://localhost:5000/api/social-links/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete social link');
      }

      setProfileData(prev => ({
        ...prev,
        socialLinks: prev.socialLinks.filter(link => link._id !== id)
      }));
      
      return true;
    } catch (err) {
      console.error('Error deleting social link:', err);
      throw err;
    }
  };

  const uploadProfileImage = async (imageFile) => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('Authentication required');
      }
      
      const formData = new FormData();
      formData.append('profileImage', imageFile);

      const response = await fetch('http://localhost:5000/api/profile/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile image');
      }

      const data = await response.json();
      
      setProfileData(prev => ({
        ...prev,
        profileImage: data.imageUrl
      }));
      
      return data;
    } catch (err) {
      console.error('Error uploading profile image:', err);
      throw err;
    }
  };

  const addProduct = async (productData) => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('Authentication required');
      }
      
      const formData = new FormData();
      
      if (productData.image) {
        formData.append('image', productData.image);
      }
      
      formData.append('title', productData.title);
      formData.append('price', productData.price);
      formData.append('link', productData.link);

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const updatedProducts = await response.json();
      
      setProfileData(prev => ({
        ...prev,
        products: updatedProducts
      }));
      
      return updatedProducts;
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('Authentication required');
      }
      
      const formData = new FormData();
      
      if (productData.image) {
        formData.append('image', productData.image);
      }
      
      formData.append('title', productData.title);
      formData.append('price', productData.price);
      formData.append('link', productData.link);

      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      
      setProfileData(prev => ({
        ...prev,
        products: prev.products.map(product => 
          product._id === id ? updatedProduct : product
        )
      }));
      
      return updatedProduct;
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProfileData(prev => ({
        ...prev,
        products: prev.products.filter(product => product._id !== id)
      }));
      
      return true;
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };
  
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setIsLoggedIn(true);
      
      // Refetch profile data with the new token
      await fetchProfileData();
      
      return data;
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };
  
  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setIsLoggedIn(true);
      
      // Refetch profile data with the new token
      await fetchProfileData();
      
      return data;
    } catch (err) {
      console.error('Registration error:', err);
      throw err;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false);
    setProfileData(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
        {!isLoggedIn && (
          <div className="auth-options">
            <button onClick={() => window.location.href = '/login'}>Login</button>
            <button onClick={() => window.location.href = '/register'}>Register</button>
          </div>
        )}
      </div>
    );
  }











  return (
    <DndProvider backend={dndBackend}>
      <div className="app-containerr">
        <div className="content-containerr">
          {/* Profile Section */}
          <ProfileSection 
            profileData={profileData}
            isLoggedIn={isLoggedIn}
            onReorderLinks={updateSocialLinksOrder}
            onUpdateProfile={updateProfile}
            onUploadProfileImage={uploadProfileImage}
            onAddSocialLink={addSocialLink}
            onUpdateSocialLink={updateSocialLink}
            onDeleteSocialLink={deleteSocialLink}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
          />  
          
          {/* Edit Section - only show if user is logged in */}
          {/* {isLoggedIn && profileData && ( */}
            <EditSection 
              profileData={profileData}
              onUpdateProfile={updateProfile}
              onUploadProfileImage={uploadProfileImage}
              onAddSocialLink={addSocialLink}
              onUpdateSocialLink={updateSocialLink}
              onDeleteSocialLink={deleteSocialLink}
              onAddProduct={addProduct}
              onUpdateProduct={updateProduct}
              onDeleteProduct={deleteProduct}
            />
          {/* )} */}
        </div>
      </div>
    </DndProvider>
  );
}

export default LinktreeLayout;