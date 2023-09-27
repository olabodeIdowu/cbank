import { useQuery } from '@tanstack/react-query';
import { getAllPosApi } from '../../../services/apiPos';

export function usePos() {
  const {
    isLoading,
    data: pos,
    error,
  } = useQuery({
    queryKey: ['pos'],
    queryFn: getAllPosApi,
  });

  return { isLoading, pos, error };
}
