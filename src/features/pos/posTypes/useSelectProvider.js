import { useQuery } from '@tanstack/react-query';
import { getPosTypeApi } from '../../../services/apiPos';

export function useSelectProvider() {
  const {
    isLoading,
    data: providers,
    error,
  } = useQuery({
    queryKey: ['provider'],
    queryFn: getPosTypeApi,
  });

  return { isLoading, providers, error };
}
