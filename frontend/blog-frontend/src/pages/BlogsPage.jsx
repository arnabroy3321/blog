import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/blogs');
                setBlogs(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch blogs. Please try again later.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchBlogs();
    }, []);

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
                            <Link to="/blogs" className="text-purple-800 font-medium hover:bg-green-100 px-3 py-2 rounded-md transition-colors bg-green-100">
                                Blogs
                            </Link>
                            <Link to="/addblog" className="text-purple-800 font-medium hover:bg-green-100 px-3 py-2 rounded-md transition-colors">
                                Add Blog
                            </Link>
                            <Link to="/createuser" className="text-purple-800 font-medium hover:bg-green-100 px-3 py-2 rounded-md transition-colors">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-indigo-600 mb-4">All Blogs</h1>
                    <p className="text-indigo-600 max-w-2xl mx-auto">
                        Explore thoughts and stories from our community
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-pink-200 h-12 w-12"></div>
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-pink-200 rounded w-3/4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-pink-200 rounded"></div>
                                    <div className="h-4 bg-pink-200 rounded w-5/6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 text-red-800 p-4 rounded-md text-center">
                        {error}
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-indigo-600 mb-4">No blogs found</p>
                        <Link to="/addblog">
                            <button className="bg-green-100 text-purple-800 font-bold py-2 px-6 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors">
                                Create the first blog
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="mb-4">
                                        <p className="text-gray-800 mb-4 line-clamp-4">
                                            {blog.content}
                                        </p>
                                        <div className="h-px bg-pink-100 w-full my-4"></div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold">
                                                {blog.author?.username?.charAt(0) || 'U'}
                                            </div>
                                            <span className="ml-2 text-sm text-gray-600">
                                                {blog.author?.username || "Unknown author"}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex mt-4 pt-2 border-t border-pink-100">
                                        <button className="text-sm text-indigo-600 hover:text-indigo-800 mr-4">
                                            <span className="mr-1">❤️</span>
                                            {blog.likes?.length || 0} Likes
                                        </button>
                                        <button className="text-sm text-indigo-600 hover:text-indigo-800">
                                            <span className="mr-1">💬</span>
                                            {blog.comments?.length || 0} Comments
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && blogs.length > 0 && (
                    <div className="flex justify-center mt-10">
                        <Link to="/addblog">
                            <button className="bg-green-100 text-purple-800 font-bold py-2 px-6 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors">
                                Write a new blog
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogsPage;