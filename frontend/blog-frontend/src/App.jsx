import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateUserPage from './pages/CreateUserPage';
import AddBlogPage from './pages/AddBlogPage';
import BlogsPage from './pages/BlogsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createuser" element={<CreateUserPage />} />
        <Route path="/addblog" element={<AddBlogPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
