import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePosRequestApi } from '../../../services/apiPos';

import { toast } from 'react-hot-toast';

export function useDeletePosRequest() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deletePosRequest } = useMutation({
    mutationFn: deletePosRequestApi,
    onSuccess: () => {
      toast.success('Pos Request successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['PosRequest'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePosRequest };
}
