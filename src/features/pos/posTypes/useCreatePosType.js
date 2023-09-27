import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPosTypeApi } from '../../../services/apiPos';

import { toast } from 'react-hot-toast';

export function useCreatePosType() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createPosType } = useMutation({
    mutationFn: createPosTypeApi,
    onSuccess: () => {
      toast.success('New Pos Type successfully created');
      queryClient.invalidateQueries({ queryKey: ['pos_type'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createPosType };
}
