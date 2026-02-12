import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        const result = await register(formData.username, formData.email, formData.password, formData.role);
        setIsLoading(false);

        if (result.success) {
            if (result.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } else {
            setError(result.error || 'Registration failed');
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join the Sustaincity community today"
            linkText="Already have an account?"
            linkPath="/login"
            linkActionText="Sign in"
        >
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-forest-dark">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 text-text-muted" size={20} />
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-white text-text-main text-base transition-all focus:outline-none focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10"
                        />
                    </div>
                </div>

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
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            minLength={6}
                            className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-white text-text-main text-base transition-all focus:outline-none focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-forest-dark">Account Type</label>
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 text-text-muted" size={20} />
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-white text-text-main text-base transition-all focus:outline-none focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10 appearance-none"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-forest-dark">Confirm Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-text-muted" size={20} />
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                            minLength={6}
                            className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-white text-text-main text-base transition-all focus:outline-none focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-forest-dark text-white font-semibold rounded-xl text-base transition-all hover:bg-deep-eco hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
        </AuthLayout>
    );
};

export default Register;
