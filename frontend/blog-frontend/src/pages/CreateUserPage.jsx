import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CreateUserPage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/createuser', null, { params: formData });

            localStorage.setItem('username', formData.username);

            setMessage({ text: 'User created successfully! Redirecting to create blog...', type: 'success' });

            setFormData({ username: '', email: '', password: '' });

            setTimeout(() => {
                navigate('/addblog');
            }, 1500);
        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Something went wrong', type: 'error' });
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50">
            <nav className="bg-pink-200 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="text-purple-800 font-bold text-xl">
                                Blog API
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <Link to="/" className="text-purple-800 font-medium hover:bg-green-100 px-3 py-2 rounded-md transition-colors">
                                Home
                            </Link>
                            <Link to="/blogs" className="text-purple-800 font-medium hover:bg-green-100 px-3 py-2 rounded-md transition-colors">
                                Blogs
                            </Link>
                            <Link to="/addblog" className="text-purple-800 font-medium hover:bg-green-100 px-3 py-2 rounded-md transition-colors">
                                Add Blog
                            </Link>
                            <Link to="/createuser" className="text-purple-800 font-medium hover:bg-green-100 px-3 py-2 rounded-md transition-colors bg-green-100">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-md mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-pink-200 px-6 py-4">
                        <h1 className="text-2xl font-bold text-purple-800">Create User</h1>
                    </div>

                    <div className="p-6">
                        {message.text && (
                            <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-indigo-600 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    placeholder="Enter your username"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-indigo-600 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-indigo-600 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-green-100 text-purple-800 font-bold py-2 px-4 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Creating...' : 'Create User'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUserPage;