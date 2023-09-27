import { useQuery } from '@tanstack/react-query';
import { getAllPosPaymentsApi } from '../../../services/apiPos';

export function usePosPayment() {
  const {
    isLoading,
    data: posPayment,
    error,
  } = useQuery({
    queryKey: ['posPayment'],
    queryFn: getAllPosPaymentsApi,
  });

  return { isLoading, posPayment, error };
}
