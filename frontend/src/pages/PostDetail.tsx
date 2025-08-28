import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Post } from '../types';
import { postsApi } from '../utils/api';
import toast from 'react-hot-toast';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id));
    }
  }, [id]);
  
  const fetchPost = async (postId: number) => {
    try {
      setLoading(true);
      const response = await postsApi.getPost(postId);
      setPost(response.data);
    } catch (error) {
      toast.error('게시글을 불러오는데 실패했습니다.');
      console.error('Error fetching post:', error);
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
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="card">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">게시글을 찾을 수 없습니다</h2>
        <p className="text-gray-600 mb-6">요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
        <Link to="/community" className="btn btn-primary btn-md">
          커뮤니티로 돌아가기
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/community"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        커뮤니티로 돌아가기
      </Link>
      
      <article className="card">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
              {getCategoryLabel(post.category)}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold text-sm">
                  {post.author.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <UserIcon className="h-4 w-4" />
                  <span className="font-medium">{post.author.username}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{new Date(post.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {post.content}
          </div>
        </div>
      </article>
      
      {/* Comments Section (Placeholder) */}
      <div className="mt-8 card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">댓글</h3>
        <div className="text-center py-8 text-gray-500">
          <p>댓글 기능은 곧 추가될 예정입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
