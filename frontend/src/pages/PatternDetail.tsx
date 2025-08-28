import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowDownTrayIcon, UserIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Pattern } from '../types';
import { patternsApi } from '../utils/api';
import toast from 'react-hot-toast';

const PatternDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      fetchPattern(parseInt(id));
    }
  }, [id]);
  
  const fetchPattern = async (patternId: number) => {
    try {
      setLoading(true);
      const response = await patternsApi.getPattern(patternId);
      setPattern(response.data);
    } catch (error) {
      toast.error('패턴을 불러오는데 실패했습니다.');
      console.error('Error fetching pattern:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '초급';
      case 'intermediate':
        return '중급';
      case 'advanced':
        return '고급';
      default:
        return difficulty;
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!pattern) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">🧶</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">패턴을 찾을 수 없습니다</h2>
        <p className="text-gray-600 mb-6">요청하신 패턴이 존재하지 않거나 삭제되었습니다.</p>
        <Link to="/patterns" className="btn btn-primary btn-md">
          패턴 목록으로 돌아가기
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/patterns"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        패턴 목록으로 돌아가기
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {pattern.image_url ? (
            <img
              src={`http://localhost:8000${pattern.image_url}`}
              alt={pattern.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-8xl">
              🧶
            </div>
          )}
        </div>
        
        {/* Pattern Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{pattern.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <UserIcon className="h-4 w-4" />
                <span>{pattern.author.full_name || pattern.author.username}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" />
                <span>{new Date(pattern.created_at).toLocaleDateString('ko-KR')}</span>
              </div>
            </div>
          </div>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(pattern.difficulty)}`}>
              {getDifficultyLabel(pattern.difficulty)}
            </span>
            <span className="badge badge-secondary">{pattern.category}</span>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">설명</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{pattern.description}</p>
          </div>
          
          {/* Pattern Details */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">패턴 정보</h3>
            <div className="grid grid-cols-1 gap-3">
              {pattern.yarn_weight && (
                <div className="flex justify-between">
                  <span className="text-gray-600">실 굵기:</span>
                  <span className="font-medium">{pattern.yarn_weight}</span>
                </div>
              )}
              {pattern.needle_size && (
                <div className="flex justify-between">
                  <span className="text-gray-600">바늘 사이즈:</span>
                  <span className="font-medium">{pattern.needle_size}</span>
                </div>
              )}
              {pattern.estimated_time && (
                <div className="flex justify-between">
                  <span className="text-gray-600">예상 소요 시간:</span>
                  <span className="font-medium flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {pattern.estimated_time}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Download Button */}
          {pattern.pattern_file_url && (
            <div>
              <a
                href={`http://localhost:8000${pattern.pattern_file_url}`}
                download
                className="btn btn-primary btn-lg w-full inline-flex items-center justify-center"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                패턴 파일 다운로드
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatternDetail;
