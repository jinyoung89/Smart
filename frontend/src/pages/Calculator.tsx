import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CalculatorIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { YarnCalculationRequest, YarnCalculation } from '../types';
import { calculatorApi } from '../utils/api';
import toast from 'react-hot-toast';

const Calculator = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<YarnCalculation | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<YarnCalculationRequest>();
  
  const patternTypes = [
    { value: 'hat', label: '모자' },
    { value: 'scarf', label: '목도리' },
    { value: 'sweater', label: '스웨터' },
    { value: 'blanket', label: '담요' },
  ];
  
  const sizes = [
    { value: 'baby', label: '아기용' },
    { value: 'child', label: '아동용' },
    { value: 'adult', label: '성인용' },
    { value: 'short', label: '짧은' },
    { value: 'medium', label: '중간' },
    { value: 'long', label: '긴' },
    { value: 'throw', label: '무릎담요' },
    { value: 'full', label: '풀사이즈' },
  ];
  
  const yarnWeights = [
    { value: 'lace', label: '레이스 (0-1번)' },
    { value: 'fingering', label: '핑거링 (1-2번)' },
    { value: 'dk', label: 'DK (3번)' },
    { value: 'worsted', label: '워스티드 (4번)' },
    { value: 'chunky', label: '청키 (5-6번)' },
  ];
  
  const onSubmit = async (data: YarnCalculationRequest) => {
    try {
      setLoading(true);
      const response = await calculatorApi.calculateYarn(data);
      setResult(response.data);
      toast.success('계산이 완료되었습니다!');
    } catch (error) {
      toast.error('계산에 실패했습니다.');
      console.error('Error calculating yarn:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <CalculatorIcon className="h-8 w-8 mr-3 text-primary-600" />
          재료 계산기
        </h1>
        <p className="text-gray-600 mt-2">뜨개질 프로젝트에 필요한 실의 양을 계산해보세요</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">프로젝트 정보 입력</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Pattern Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                패턴 종류 *
              </label>
              <select
                {...register('pattern_type', { required: '패턴 종류를 선택해주세요' })}
                className="input"
              >
                <option value="">선택해주세요</option>
                {patternTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.pattern_type && (
                <p className="text-red-600 text-sm mt-1">{errors.pattern_type.message}</p>
              )}
            </div>
            
            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                크기 *
              </label>
              <select
                {...register('size', { required: '크기를 선택해주세요' })}
                className="input"
              >
                <option value="">선택해주세요</option>
                {sizes.map(size => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
              {errors.size && (
                <p className="text-red-600 text-sm mt-1">{errors.size.message}</p>
              )}
            </div>
            
            {/* Yarn Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                실 굵기 *
              </label>
              <select
                {...register('yarn_weight', { required: '실 굵기를 선택해주세요' })}
                className="input"
              >
                <option value="">선택해주세요</option>
                {yarnWeights.map(weight => (
                  <option key={weight.value} value={weight.value}>
                    {weight.label}
                  </option>
                ))}
              </select>
              {errors.yarn_weight && (
                <p className="text-red-600 text-sm mt-1">{errors.yarn_weight.message}</p>
              )}
            </div>
            
            {/* Gauge (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                게이지 (선택사항)
              </label>
              <input
                type="number"
                {...register('gauge')}
                className="input"
                placeholder="1인치당 코 수 (기본값: 4)"
                min="1"
                max="20"
              />
              <p className="text-xs text-gray-500 mt-1">
                1인치(2.54cm)당 코의 개수를 입력해주세요
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg w-full"
            >
              {loading ? '계산 중...' : '계산하기'}
            </button>
          </form>
        </div>
        
        {/* Result */}
        <div className="space-y-6">
          {result ? (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">계산 결과</h2>
              
              <div className="space-y-4">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary-900 mb-2">필요한 실의 양</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-primary-700">무게</p>
                      <p className="text-2xl font-bold text-primary-900">
                        {result.estimated_grams}g
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-primary-700">길이</p>
                      <p className="text-2xl font-bold text-primary-900">
                        {result.estimated_meters}m
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yarn-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yarn-900 mb-2">권장 구매량</h3>
                  <p className="text-3xl font-bold text-yarn-900">
                    {result.recommended_skeins}개
                  </p>
                  <p className="text-sm text-yarn-700 mt-1">
                    50g 기준 실뭉치 개수
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">프로젝트 정보</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>패턴: {result.pattern_type}</p>
                    <p>크기: {result.size}</p>
                    <p>실 굵기: {result.yarn_weight}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <CalculatorIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                계산 결과가 여기에 표시됩니다
              </h3>
              <p className="text-gray-600">
                좌측 폼을 작성하고 계산하기 버튼을 눌러주세요
              </p>
            </div>
          )}
          
          {/* Tips */}
          <div className="card">
            <div className="flex items-start space-x-3">
              <InformationCircleIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">💡 계산 팁</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 여유분을 고려해 10-20% 더 구매하는 것을 권장합니다</li>
                  <li>• 같은 색상의 실은 한 번에 구매하는 것이 좋습니다</li>
                  <li>• 게이지 샘플을 먼저 떠서 정확한 게이지를 확인하세요</li>
                  <li>• 복잡한 패턴일수록 더 많은 실이 필요할 수 있습니다</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
