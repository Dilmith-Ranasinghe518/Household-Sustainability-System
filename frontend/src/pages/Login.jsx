import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(formData.email, formData.password);
        setIsLoading(false);

        if (result.success) {
            if (result.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } else {
            setError(result.error || 'Login failed');
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to your account to continue"
            linkText="Don't have an account?"
            linkPath="/register"
            linkActionText="Sign up"
        >
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-forest-dark">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-text-muted" size={20} />
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-white text-text-main text-base transition-all focus:outline-none focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-forest-dark">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-text-muted" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="w-full pl-12 pr-12 py-3.5 border border-border rounded-xl bg-white text-text-main text-base transition-all focus:outline-none focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main bg-transparent border-none cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-8 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-text-main">
                        <input type="checkbox" className="w-4 h-4 rounded border-border text-primary-teal focus:ring-primary-teal" /> Remember me
                    </label>
                    <a href="#" className="text-primary-teal font-medium hover:underline">Forgot password?</a>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-forest-dark text-white font-semibold rounded-xl text-base transition-all hover:bg-deep-eco hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
        </AuthLayout>
    );
};

export default Login;
