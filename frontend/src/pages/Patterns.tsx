import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Pattern } from '../types';
import { patternsApi } from '../utils/api';
import PatternCard from '../components/PatternCard';
import toast from 'react-hot-toast';

const Patterns = () => {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: '',
    category: '',
  });
  
  const difficulties = [
    { value: '', label: '모든 난이도' },
    { value: 'beginner', label: '초급' },
    { value: 'intermediate', label: '중급' },
    { value: 'advanced', label: '고급' },
  ];
  
  const categories = [
    { value: '', label: '모든 카테고리' },
    { value: 'hat', label: '모자' },
    { value: 'scarf', label: '목도리' },
    { value: 'sweater', label: '스웨터' },
    { value: 'blanket', label: '담요' },
    { value: 'accessories', label: '액세서리' },
  ];
  
  useEffect(() => {
    fetchPatterns();
  }, [filters]);
  
  const fetchPatterns = async () => {
    try {
      setLoading(true);
      const response = await patternsApi.getPatterns({
        difficulty: filters.difficulty || undefined,
        category: filters.category || undefined,
      });
      setPatterns(response.data);
    } catch (error) {
      toast.error('패턴을 불러오는데 실패했습니다.');
      console.error('Error fetching patterns:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">뜨개질 패턴</h1>
          <p className="text-gray-600 mt-2">다양한 뜨개질 패턴을 찾아보세요</p>
        </div>
        <Link
          to="/patterns/create"
          className="btn btn-primary btn-md inline-flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          패턴 업로드
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center space-x-4">
          <FunnelIcon className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">필터:</span>
          
          <select
            value={filters.difficulty}
            onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
            className="input w-auto min-w-[120px]"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty.value} value={difficulty.value}>
                {difficulty.label}
              </option>
            ))}
          </select>
          
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="input w-auto min-w-[120px]"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Patterns Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-12"></div>
              </div>
            </div>
          ))}
        </div>
      ) : patterns.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🧶</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            패턴이 없습니다
          </h3>
          <p className="text-gray-600 mb-6">
            첫 번째 패턴을 업로드해보세요!
          </p>
          <Link to="/patterns/create" className="btn btn-primary btn-md">
            패턴 업로드하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patterns.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Patterns;
