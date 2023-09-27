import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateManyPosRequestApi } from '../../../services/apiPos';
import { toast } from 'react-hot-toast';

export function useEditManyPosRequest() {
  const queryClient = useQueryClient();
  const { isLoading: isEditingMany, mutate: editManyPosRequest } = useMutation({
    mutationFn: updateManyPosRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posRequest'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditingMany, editManyPosRequest };
}
