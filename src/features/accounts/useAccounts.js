import { useQuery } from '@tanstack/react-query';
import { getAllAccountApi } from '../../services/apiAccount';

export function useAccounts() {
  const {
    isLoading,
    data: accounts,
    error,
  } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAllAccountApi,
  });

  return { isLoading, accounts, error };
}
