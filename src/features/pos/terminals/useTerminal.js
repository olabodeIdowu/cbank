import { useQuery } from '@tanstack/react-query';
import { getAllTerminalApi } from '../../../services/apiPos';

export function useTerminal() {
  const {
    isLoading,
    data: terminal,
    error,
  } = useQuery({
    queryKey: ['terminal'],
    queryFn: getAllTerminalApi,
  });

  return { isLoading, terminal, error };
}
