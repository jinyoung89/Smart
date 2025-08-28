import { Link } from 'react-router-dom';
import { CalendarIcon, UserIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Pattern } from '../types';

interface PatternCardProps {
  pattern: Pattern;
}

const PatternCard = ({ pattern }: PatternCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'badge-success';
      case 'intermediate':
        return 'badge-warning';
      case 'advanced':
        return 'badge-danger';
      default:
        return 'badge-secondary';
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
  
  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      hat: '모자',
      scarf: '목도리',
      sweater: '스웨터',
      blanket: '담요',
      accessories: '액세서리',
    };
    return categoryMap[category] || category;
  };
  
  return (
    <Link to={`/patterns/${pattern.id}`} className="block group">
      <div className="card hover:shadow-lg transition-shadow duration-200">
        {/* Image */}
        <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
          {pattern.image_url ? (
            <img
              src={`http://localhost:8000${pattern.image_url}`}
              alt={pattern.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
              🧶
            </div>
          )}
        </div>
        
        {/* Content */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {pattern.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {pattern.description}
          </p>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`badge ${getDifficultyColor(pattern.difficulty)}`}>
              {getDifficultyLabel(pattern.difficulty)}
            </span>
            <span className="badge badge-secondary">
              {getCategoryLabel(pattern.category)}
            </span>
          </div>
          
          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <UserIcon className="h-4 w-4" />
              <span>{pattern.author.username}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date(pattern.created_at).toLocaleDateString('ko-KR')}</span>
            </div>
          </div>
          
          {/* Additional Info */}
          {(pattern.yarn_weight || pattern.needle_size || pattern.estimated_time) && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                {pattern.yarn_weight && (
                  <span>실 굵기: {pattern.yarn_weight}</span>
                )}
                {pattern.needle_size && (
                  <span>바늘: {pattern.needle_size}</span>
                )}
                {pattern.estimated_time && (
                  <span className="flex items-center space-x-1">
                    <ClockIcon className="h-3 w-3" />
                    <span>{pattern.estimated_time}</span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PatternCard;
