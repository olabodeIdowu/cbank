import { useMutation, useQueryClient } from '@tanstack/react-query';
import { detachPosFromAccountApi } from '../../../services/apiPos';
import { toast } from 'react-hot-toast';

export function useEditPos() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editPos } = useMutation({
    mutationFn: detachPosFromAccountApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success('Pos successfully edited');
      queryClient.invalidateQueries({ queryKey: ['pos'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editPos };
}
