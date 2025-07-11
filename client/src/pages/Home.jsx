import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { postService, categoryService } from '../services/api';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch posts
  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await postService.getAllPosts(page, 12, selectedCategory);
      if (response.success) {
        setPosts(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Search posts
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        setLoading(true);
        const response = await postService.searchPosts(searchQuery);
        if (response.success) {
          setPosts(response.data);
          setPagination(response.pagination);
          setSearchParams({ search: searchQuery });
        }
      } catch (error) {
        console.error('Error searching posts:', error);
        toast.error('Failed to search posts');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle category filter
  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
    setCurrentPage(1);
    setSearchQuery('');
    setSearchParams(categoryId === selectedCategory ? {} : { category: categoryId });
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchPosts(page);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setSearchParams({});
    setCurrentPage(1);
    fetchPosts(1);
  };

  useEffect(() => {
    fetchPosts(currentPage);
    fetchCategories();
  }, [selectedCategory, currentPage]);

  if (loading && posts.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to MERN Blog</h1>
        <p className="text-xl mb-8 text-primary-100">
          Discover amazing stories, share your thoughts, and connect with writers
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full rounded-r-none"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary rounded-l-none px-6"
            >
              Search
            </button>
          </div>
        </form>

        {isAuthenticated && (
          <div className="mt-8">
            <Link
              to="/create-post"
              className="btn btn-primary btn-lg inline-flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Post</span>
            </Link>
          </div>
        )}
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={resetFilters}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryFilter(category._id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category._id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedCategory === category._id ? category.color : undefined,
                  color: selectedCategory === category._id ? 'white' : undefined,
                }}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Posts'}
          </h2>
          {posts.length > 0 && (
            <p className="text-gray-600">
              Showing {posts.length} of {pagination.totalPosts || 0} posts
            </p>
          )}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="btn btn-outline btn-sm disabled:opacity-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`btn btn-sm ${
                      page === currentPage
                        ? 'btn-primary'
                        : 'btn-outline'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="btn btn-outline btn-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'No posts found' : 'No posts yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? 'Try adjusting your search terms or browse all posts.'
                : 'Be the first to create a post!'}
            </p>
            {isAuthenticated && !searchQuery && (
              <Link to="/create-post" className="btn btn-primary">
                Create Your First Post
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 