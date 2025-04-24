import React, { useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'https://mortgage-b.origin.com.mm/auth/login',
                { email, password },
                {
                    withCredentials: true, // Important for cookies or auth headers
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // ✅ Handle successful login
            console.log('Login success:', response.data);

            // Optionally store token
            // localStorage.setItem('token', response.data.token);
        } catch (err) {
            console.error('Login failed:', err);
            setError(
                err.response?.data?.message || 'Login failed. Please check your credentials.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6"
            >
                <h2 className="text-2xl font-bold text-center">Login</h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
