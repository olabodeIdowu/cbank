import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSinglePosRequestApi } from '../../../services/apiPos';

import { toast } from 'react-hot-toast';

export function useEditSinglePosRequest() {
  const queryClient = useQueryClient();
  const { isLoading: isEditingSingle, mutate: editSinglePosRequest } =
    useMutation({
      mutationFn: updateSinglePosRequestApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posRequest'] });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isEditingSingle, editSinglePosRequest };
}
