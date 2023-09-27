import { useQuery } from '@tanstack/react-query';
import { getPosRequestApi } from '../../../services/apiPos';

export function useSelectPosRequest() {
  const {
    isLoading,
    data: pos__request,
    error,
  } = useQuery({
    queryKey: ['pos__request'],
    queryFn: getPosRequestApi,
  });

  return { isLoading, pos__request, error };
}
