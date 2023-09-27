import { useQuery } from '@tanstack/react-query';
import { getAllPosTypeApi } from '../../../services/apiPos';

export function usePosType() {
  const {
    isLoading,
    data: posType,
    error,
  } = useQuery({
    queryKey: ['pos_type'],
    queryFn: getAllPosTypeApi,
  });

  return { isLoading, posType, error };
}
