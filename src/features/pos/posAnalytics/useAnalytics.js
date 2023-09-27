import { useQuery } from '@tanstack/react-query';
import { getPosAnalyticsApi } from '../../../services/apiPos';

export function useAnalytics() {
  const {
    isLoading,
    data: analytics,
    error,
  } = useQuery({
    queryKey: ['pos_analytics'],
    queryFn: getPosAnalyticsApi,
  });

  return { isLoading, analytics, error };
}
