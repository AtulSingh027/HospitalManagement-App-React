import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../Slicer/PostSlicer';
import { 
  Plus, X, Image, User, Type, 
  FileText, Search, MessageSquare,
  Filter, SortAsc
} from 'lucide-react';

export default function Feed() {
  const dispatch = useDispatch();
  const AllPosts = useSelector(state => state.posts);
  const AllDoctor = useSelector(state => state.doctors);

  const [formDisplay, setFormDisplay] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const postsPerPage = 4;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    poster: ''
  });

  // Loading simulation
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const postData = {
      ...formData,
      createdAt: new Date().toLocaleString()
    };
    dispatch(addPost(postData));
    setFormData({ title: '', content: '', author: '', poster: '' });
    setFormDisplay(false);
  }

  // Filter posts by search term
  const filteredPosts = AllPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch(sortBy) {
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  return (
    <div className="ml-64 mt-2 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Medical Feed</h1>
          <p className="text-gray-600">Share and discover medical insights</p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex space-x-4">
          <div className="bg-white rounded-lg shadow p-4 w-48">
            <div className="text-gray-600 mb-1">Total Posts</div>
            <div className="text-2xl font-bold text-blue-600">{AllPosts.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 w-48">
            <div className="text-gray-600 mb-1">Contributing Doctors</div>
            <div className="text-2xl font-bold text-green-600">{AllDoctor.length}</div>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <div className="flex space-x-4 items-center">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
            </select>
            
            <button
              onClick={() => setFormDisplay(!formDisplay)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {formDisplay ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {formDisplay ? 'Close Form' : 'Create Post'}
            </button>
          </div>
        </div>
      </div>

      {/* Create Post Form */}
      {formDisplay && (
        <div className="bg-white rounded-lg shadow-lg mb-8 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <Type className="w-5 h-5 mr-2 text-blue-500" />
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter post title"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <User className="w-5 h-5 mr-2 text-blue-500" />
                  Author
                </label>
                <select
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                >
                  <option value="">Select Author</option>
                  {AllDoctor.map((e) => (
                    <option key={e.id} value={e.name}>{e.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <FileText className="w-5 h-5 mr-2 text-blue-500" />
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your post content"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-32 resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <Image className="w-5 h-5 mr-2 text-blue-500" />
                Image URL
              </label>
              <input
                type="url"
                name="poster"
                value={formData.poster}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Publish Post
            </button>
          </form>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      ) : (
        <>
          {/* Posts Grid */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            {currentPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">{post.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                  </div>

                  {post.poster && (
                    <img 
                      src={post.poster} 
                      alt={post.title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>

                  <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                      Share
                    </button>
                    <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No posts found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-4 items-center">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}