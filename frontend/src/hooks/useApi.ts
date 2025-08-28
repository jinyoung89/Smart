import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export const useApi = <T>(
  apiFunction: () => Promise<{ data: T }>,
  dependencies: any[] = [],
  options: UseApiOptions<T> = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction();
        setData(response.data);
        options.onSuccess?.(response.data);
      } catch (err) {
        setError(err);
        options.onError?.(err);
        toast.error('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, dependencies);
  
  const refetch = () => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction();
        setData(response.data);
        options.onSuccess?.(response.data);
      } catch (err) {
        setError(err);
        options.onError?.(err);
        toast.error('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  };
  
  return { data, loading, error, refetch };
};
