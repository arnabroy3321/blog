import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddBlogPage = () => {
    const [formData, setFormData] = useState({
        content: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const username = localStorage.getItem('username');

                if (!username) {
                    setMessage({
                        text: 'You must be logged in to create a blog post',
                        type: 'error'
                    });
                    setIsAuthenticated(false);
                    return;
                }

                const response = await axios.get(`http://localhost:5000/users/byUsername/${username}`);
                if (response.data) {
                    setCurrentUser(response.data);
                    setIsAuthenticated(true);
                } else {
                    setMessage({
                        text: 'User authentication failed. Please log in again.',
                        type: 'error'
                    });
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error verifying authentication:', error);
                setMessage({
                    text: 'Authentication error. Please log in again.',
                    type: 'error'
                });
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated || !currentUser) {
            setMessage({
                text: 'You must be logged in to create a blog post',
                type: 'error'
            });
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            return;
        }

        setIsLoading(true);

        try {
            const blogData = {
                ...formData,
                author: currentUser._id || currentUser.username
            };

            await axios.post('http://localhost:5000/addblog', null, { params: blogData });
            setMessage({ text: 'Blog added successfully!', type: 'success' });
            setFormData({ content: '' });

            setTimeout(() => {
                navigate('/blogs');
            }, 1500);
        } catch (error) {
            setMessage({
                text: error.response?.data?.message || 'Failed to add blog. Please try again.',
                type: 'error'
            });
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
                            <Link to="/addblog" className="text-purple-800 font-medium hover:bg-green-100 px-3 py-2 rounded-md transition-colors bg-green-100">
                                Add Blog
                            </Link>
                            <Link to="/createuser" className="text-purple-800 font-medium hover:bg-green-100 px-3 py-2 rounded-md transition-colors">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-2xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-pink-200 px-6 py-4">
                        <h1 className="text-2xl font-bold text-purple-800">Create New Blog Post</h1>
                    </div>

                    <div className="p-6">
                        {message.text && (
                            <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {message.text}
                            </div>
                        )}

                        {isAuthenticated && currentUser ? (
                            <div className="mb-4 p-3 rounded bg-blue-100 text-blue-800">
                                Posting as: <strong>{currentUser.username}</strong>
                            </div>
                        ) : (
                            <div className="mb-4 p-3 rounded bg-yellow-100 text-yellow-800">
                                Please log in to create a blog post
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-indigo-600 mb-1">
                                    Blog Content
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    placeholder="Share your thoughts..."
                                    onChange={handleChange}
                                    required
                                    rows={8}
                                    className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                                    disabled={!isAuthenticated}
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading || !isAuthenticated}
                                    className="w-full bg-green-100 text-purple-800 font-bold py-2 px-4 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Publishing...' : 'Publish Blog Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlogPage;