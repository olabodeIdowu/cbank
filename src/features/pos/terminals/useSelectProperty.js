import { useQuery } from '@tanstack/react-query';
import { getTerminalApi } from '../../../services/apiPos';

export function useSelectProperty() {
  const {
    isLoading,
    data: property,
    error,
  } = useQuery({
    queryKey: ['property'],
    queryFn: getTerminalApi,
  });

  return { isLoading, property, error };
}
