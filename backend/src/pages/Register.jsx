import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import loginImage from '../assets/login.png';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authAPI.register({ name, email, phone, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
      toast.success('Account created successfully! 🎉');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
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
              <h1 className="text-5xl font-bold text-gray-900">Join Us</h1>
              <p className="text-gray-500 mt-3">Create your account to get started</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-growly focus:outline-none transition text-gray-700 text-lg bg-transparent"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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

              <div className="mb-6">
                <input
                  type="tel"
                  className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-growly focus:outline-none transition text-gray-700 text-lg bg-transparent"
                  placeholder="Phone Number (Optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="mb-8">
                <input
                  type="password"
                  className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-growly focus:outline-none transition text-gray-700 text-lg bg-transparent"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-growly text-white py-3 rounded-full font-semibold text-lg hover:bg-growly-dark transition-all disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-growly font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          {/* Right Side - Illustration */}
          <div className="hidden md:block">
            <img 
              src={loginImage}
              alt="Register Illustration"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
