import { useQuery } from '@tanstack/react-query';
import { getAllPosRequestApi } from '../../../services/apiPos';

export function usePosRequest() {
  const {
    isLoading,
    data: posRequest,
    error,
  } = useQuery({
    queryKey: ['posRequest'],
    queryFn: getAllPosRequestApi,
  });

  return { isLoading, posRequest, error };
}
