import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePosTypeApi } from '../../../services/apiPos';
import { toast } from 'react-hot-toast';

export function useEditPosType() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editPosType } = useMutation({
    mutationFn: updatePosTypeApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success('Pos Type successfully edited');
      queryClient.invalidateQueries({ queryKey: ['pos_type'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editPosType };
}
