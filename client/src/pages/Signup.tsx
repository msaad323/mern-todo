import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type SignUpForm = {
  fullName: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:3000/api/v1/auth/register',
        formData,
        { withCredentials: true }
      );
      if (res.status === 201 || res.status === 200) {
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white border border-slate-200 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-slate-800">Create an account</h2>
        <p className="text-sm text-slate-500 text-center">Sign up to get started</p>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-600">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-cyan-600 cursor-pointer text-white rounded-md hover:bg-cyan-500 transition shadow-sm"
          >
            Sign Up
          </button>
        </form>
        <div className="text-sm text-center text-slate-500">
          Already have an account? <Link to="/login" className="text-cyan-600 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
