import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PostCreate } from '../types';
import { postsApi } from '../utils/api';
import toast from 'react-hot-toast';

interface PostFormData extends PostCreate {}

const CreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<PostFormData>();
  
  const categories = [
    { value: 'tutorial', label: '튜토리얼' },
    { value: 'showcase', label: '작품 자랑' },
    { value: 'question', label: '질문' },
    { value: 'discussion', label: '자유 토론' },
  ];
  
  const onSubmit = async (data: PostFormData) => {
    try {
      setLoading(true);
      
      const response = await postsApi.createPost({
        ...data,
        author_id: 1, // 임시 사용자 ID
      });
      
      toast.success('게시글이 성공적으로 작성되었습니다!');
      navigate(`/posts/${response.data.id}`);
    } catch (error) {
      toast.error('게시글 작성에 실패했습니다.');
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">새 글 작성</h1>
        <p className="text-gray-600 mt-2">커뮤니티에 글을 작성해보세요</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 카테고리 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            카테고리 *
          </label>
          <select
            {...register('category', { required: '카테고리를 선택해주세요' })}
            className="input"
          >
            <option value="">카테고리 선택</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>
        
        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            제목 *
          </label>
          <input
            type="text"
            {...register('title', { required: '제목을 입력해주세요' })}
            className="input"
            placeholder="게시글 제목을 입력해주세요"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        
        {/* 내용 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            내용 *
          </label>
          <textarea
            {...register('content', { required: '내용을 입력해주세요' })}
            rows={12}
            className="input"
            placeholder="게시글 내용을 입력해주세요..."
          />
          {errors.content && (
            <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>
        
        {/* 작성 가이드 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">✍️ 작성 가이드</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>튜토리얼:</strong> 뜨개질 기법이나 패턴 만드는 방법을 설명해주세요</li>
            <li>• <strong>작품 자랑:</strong> 완성한 뜨개질 작품을 자랑해주세요</li>
            <li>• <strong>질문:</strong> 뜨개질 관련 궁금한 점을 물어보세요</li>
            <li>• <strong>자유 토론:</strong> 뜨개질 관련 자유로운 이야기를 나눠보세요</li>
          </ul>
        </div>
        
        {/* 제출 버튼 */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/community')}
            className="btn btn-secondary btn-md"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-md"
          >
            {loading ? '작성 중...' : '게시글 작성'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
