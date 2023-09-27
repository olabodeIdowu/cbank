import { useQuery } from '@tanstack/react-query';
import { getPosApi } from '../../../services/apiPos';

export function useSelectPos() {
  const {
    isLoading: isSelecting,
    data: pos_pos,
    error,
  } = useQuery({
    queryKey: ['pos_pos'],
    queryFn: getPosApi,
  });

  return { isSelecting, pos_pos, error };
}
