import { useQuery } from '@tanstack/react-query';
import { getPosAvailableTerminalApi } from '../../../services/apiPos';

export function usePosAvailbleTerminals() {
  const {
    isLoading: isAvailable,
    data: available_pos_terminal,
    error,
  } = useQuery({
    queryKey: ['available_pos_terminal'],
    queryFn: getPosAvailableTerminalApi,
  });

  return { isAvailable, available_pos_terminal, error };
}
