import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PhotoIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { patternsApi } from '../utils/api';
import toast from 'react-hot-toast';

interface PatternFormData {
  title: string;
  description: string;
  difficulty: string;
  category: string;
  yarn_weight: string;
  needle_size: string;
  estimated_time: string;
}

const CreatePattern = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [patternFile, setPatternFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<PatternFormData>();
  
  const difficulties = [
    { value: 'beginner', label: '초급' },
    { value: 'intermediate', label: '중급' },
    { value: 'advanced', label: '고급' },
  ];
  
  const categories = [
    { value: 'hat', label: '모자' },
    { value: 'scarf', label: '목도리' },
    { value: 'sweater', label: '스웨터' },
    { value: 'blanket', label: '담요' },
    { value: 'accessories', label: '액세서리' },
  ];
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handlePatternFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPatternFile(file);
    }
  };
  
  const onSubmit = async (data: PatternFormData) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('difficulty', data.difficulty);
      formData.append('category', data.category);
      formData.append('yarn_weight', data.yarn_weight);
      formData.append('needle_size', data.needle_size);
      formData.append('estimated_time', data.estimated_time);
      formData.append('author_id', '1'); // 임시 사용자 ID
      
      if (imageFile) {
        formData.append('image', imageFile);
      }
      if (patternFile) {
        formData.append('pattern_file', patternFile);
      }
      
      const response = await patternsApi.createPattern(formData);
      toast.success('패턴이 성공적으로 업로드되었습니다!');
      navigate(`/patterns/${response.data.id}`);
    } catch (error) {
      toast.error('패턴 업로드에 실패했습니다.');
      console.error('Error creating pattern:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">새 패턴 업로드</h1>
        <p className="text-gray-600 mt-2">나만의 뜨개질 패턴을 공유해보세요</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            제목 *
          </label>
          <input
            type="text"
            {...register('title', { required: '제목을 입력해주세요' })}
            className="input"
            placeholder="예: 따뜻한 겨울 목도리"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        
        {/* 설명 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            설명 *
          </label>
          <textarea
            {...register('description', { required: '설명을 입력해주세요' })}
            rows={4}
            className="input"
            placeholder="패턴에 대한 자세한 설명을 입력해주세요..."
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>
        
        {/* 난이도와 카테고리 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              난이도 *
            </label>
            <select
              {...register('difficulty', { required: '난이도를 선택해주세요' })}
              className="input"
            >
              <option value="">난이도 선택</option>
              {difficulties.map(difficulty => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>
            {errors.difficulty && (
              <p className="text-red-600 text-sm mt-1">{errors.difficulty.message}</p>
            )}
          </div>
          
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
        </div>
        
        {/* 재료 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              실 굵기
            </label>
            <input
              type="text"
              {...register('yarn_weight')}
              className="input"
              placeholder="예: DK, 중간 굵기"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              바늘 사이즈
            </label>
            <input
              type="text"
              {...register('needle_size')}
              className="input"
              placeholder="예: 4.5mm, US 7"
            />
          </div>
        </div>
        
        {/* 예상 소요 시간 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            예상 소요 시간
          </label>
          <input
            type="text"
            {...register('estimated_time')}
            className="input"
            placeholder="예: 2-3시간, 1주일"
          />
        </div>
        
        {/* 이미지 업로드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            패턴 이미지
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-32 w-32 object-cover rounded-lg"
                  />
                </div>
              ) : (
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              )}
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                  <span>이미지 업로드</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">또는 드래그 앤 드롭</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
        
        {/* 패턴 파일 업로드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            패턴 파일 (선택사항)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
            <div className="space-y-1 text-center">
              <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                  <span>파일 업로드</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handlePatternFileChange}
                  />
                </label>
                <p className="pl-1">또는 드래그 앤 드롭</p>
              </div>
              <p className="text-xs text-gray-500">
                {patternFile ? patternFile.name : 'PDF, DOC, TXT 파일'}
              </p>
            </div>
          </div>
        </div>
        
        {/* 제출 버튼 */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/patterns')}
            className="btn btn-secondary btn-md"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-md"
          >
            {loading ? '업로드 중...' : '패턴 업로드'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePattern;
