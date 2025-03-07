import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                            <Link to="/createuser" className="text-purple-800 font-medium hover:bg-green-100 px-3 py-2 rounded-md transition-colors">
                                Sign Up
                            </Link>
                        </div>

                        <div className="flex md:hidden items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-purple-800 hover:bg-green-100 p-2 rounded-md"
                            >
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden bg-pink-100">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link to="/" className="text-purple-800 font-medium block hover:bg-green-100 px-3 py-2 rounded-md">
                                Home
                            </Link>
                            <Link to="/blogs" className="text-purple-800 font-medium block hover:bg-green-100 px-3 py-2 rounded-md">
                                Blogs
                            </Link>
                            <Link to="/addblog" className="text-purple-800 font-medium block hover:bg-green-100 px-3 py-2 rounded-md">
                                Add Blog
                            </Link>
                            <Link to="/createuser" className="text-purple-800 font-medium block hover:bg-green-100 px-3 py-2 rounded-md">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-indigo-600 mb-4">
                        Welcome to the Blog API
                    </h1>
                    <p className="text-xl text-indigo-600 max-w-2xl mx-auto mb-8">
                        Explore the blogs or create a new one! Our platform allows you to share your thoughts and read what others have to say.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <Link to="/blogs">
                            <button className="bg-green-100 text-purple-800 font-bold py-3 px-6 rounded-lg hover:shadow-md transform hover:-translate-y-1 transition-all duration-200">
                                Browse Blogs
                            </button>
                        </Link>
                        <Link to="/addblog">
                            <button className="bg-green-100 text-purple-800 font-bold py-3 px-6 rounded-lg hover:shadow-md transform hover:-translate-y-1 transition-all duration-200">
                                Create Blog
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;