// src/components/auth/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, User, Lock, Check, AlertCircle } from 'lucide-react';
import './Register.css'
const Register = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const navigate = useNavigate();

  const { email, username, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Check username availability when username changes
    if (e.target.name === 'username' && e.target.value.length >= 3) {
      checkUsernameAvailability(e.target.value);
    }
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch(`http://localhost:5000/api/check-username/${username}`);
      const data = await response.json();
      setUsernameAvailable(data.available);
    } catch (err) {
      console.error('Error checking username:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form data
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!usernameAvailable) {
      setError('Username is already taken');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          username,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store token and user data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update auth state
      setAuth({
        isAuthenticated: true,
        user: data.user,
        token: data.token
      });

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-register-container">
      <div className="auth-register-card">
        <div className="auth-register-header">
          <h1 className="auth-register-title">Create Account</h1>
          <p className="auth-register-subtitle">Join us today and start your journey</p>
        </div>
        
        {error && <div className="auth-register-error">{error}</div>}
        
        <form className="auth-register-form" onSubmit={handleSubmit}>
          <div className="auth-register-input-group">
            <div className="auth-register-input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="auth-register-input"
                placeholder="Enter your email"
                required
              />
              <div className="auth-register-input-icon">
                <Mail size={20} />
              </div>
            </div>
          </div>
          
          <div className="auth-register-input-group">
            <div className="auth-register-input-wrapper">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                className="auth-register-input"
                placeholder="Choose a username"
                minLength="3"
                required
              />
              <div className="auth-register-input-icon">
                <User size={20} />
              </div>
            </div>
            {username.length >= 3 && usernameAvailable !== null && (
              <small style={{ 
                color: usernameAvailable ? '#4CD964' : '#FF3B30',
                fontSize: '0.75rem',
                marginTop: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                {usernameAvailable ? (
                  <>
                    <Check size={14} /> Username is available
                  </>
                ) : (
                  <>
                    <AlertCircle size={14} /> Username is already taken
                  </>
                )}
              </small>
            )}
          </div>
          
          <div className="auth-register-input-group">
            <div className="auth-register-input-wrapper">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="auth-register-input"
                placeholder="Create a password"
                minLength="6"
                required
              />
              <div className="auth-register-input-icon">
                <Lock size={20} />
              </div>
            </div>
          </div>
          
          <div className="auth-register-input-group">
            <div className="auth-register-input-wrapper">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="auth-register-input"
                placeholder="Confirm your password"
                minLength="6"
                required
              />
              <div className="auth-register-input-icon">
                <Lock size={20} />
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="auth-register-button"
            disabled={loading || (username.length >= 3 && !usernameAvailable)}
          >
            {loading ? 'Creating Account...' : 'Register Now'}
          </button>
        </form>
        
        <div className="auth-register-links">
          <Link to="/login" className="auth-register-signin-link">
            Already have an account? <span>Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;