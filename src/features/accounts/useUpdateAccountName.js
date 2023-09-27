import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAccountNameApi } from '../../services/apiAccount';
import { toast } from 'react-hot-toast';

export function useUpdateAccountName() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editAccountName } = useMutation({
    mutationFn: updateAccountNameApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success('Account Name successfully edited');
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editAccountName };
}
