import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, ChatBubbleLeftRightIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { Post } from '../types';
import { postsApi } from '../utils/api';
import toast from 'react-hot-toast';

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const categories = [
    { value: '', label: '전체' },
    { value: 'tutorial', label: '튜토리얼' },
    { value: 'showcase', label: '작품 자랑' },
    { value: 'question', label: '질문' },
    { value: 'discussion', label: '자유 토론' },
  ];
  
  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);
  
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postsApi.getPosts({
        category: selectedCategory || undefined,
      });
      setPosts(response.data);
    } catch (error) {
      toast.error('게시글을 불러오는데 실패했습니다.');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tutorial':
        return 'bg-blue-100 text-blue-800';
      case 'showcase':
        return 'bg-purple-100 text-purple-800';
      case 'question':
        return 'bg-orange-100 text-orange-800';
      case 'discussion':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      tutorial: '튜토리얼',
      showcase: '작품 자랑',
      question: '질문',
      discussion: '자유 토론',
    };
    return categoryMap[category] || category;
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">커뮤니티</h1>
          <p className="text-gray-600 mt-2">뜨개질 애호가들과 소통해보세요</p>
        </div>
        <Link
          to="/posts/create"
          className="btn btn-primary btn-md inline-flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          글 작성
        </Link>
      </div>
      
      {/* Category Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Posts List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="card animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <ChatBubbleLeftRightIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            아직 게시글이 없습니다
          </h3>
          <p className="text-gray-600 mb-6">
            첫 번째 게시글을 작성해보세요!
          </p>
          <Link to="/posts/create" className="btn btn-primary btn-md">
            글 작성하기
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              className="block card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-lg">
                      {post.author.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {getCategoryLabel(post.category)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <UserIcon className="h-4 w-4" />
                      <span>{post.author.username}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
