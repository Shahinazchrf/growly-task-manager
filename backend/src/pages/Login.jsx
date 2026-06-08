import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import loginImage from '../assets/login.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authAPI.login({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
      toast.success(`Welcome back, ${data.name}! ✨`);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-5xl w-full mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Form */}
          <div>
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-gray-900">Holla,</h1>
              <h1 className="text-5xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-500 mt-3">Hey, welcome back to your special place</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="email"
                  className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-growly focus:outline-none transition text-gray-700 text-lg bg-transparent"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-growly focus:outline-none transition text-gray-700 text-lg bg-transparent"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between mb-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-growly border-gray-300 rounded focus:ring-growly"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-gray-500">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-growly hover:underline text-sm">
                  Forgotten Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-growly text-white py-3 rounded-full font-semibold text-lg hover:bg-growly-dark transition-all disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-growly font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Right Side - Illustration */}
          <div className="hidden md:block">
            <img 
              src={loginImage}
              alt="Login Illustration"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
