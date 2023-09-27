import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAccountApi } from '../../services/apiAccount';
import { toast } from 'react-hot-toast';

export function useUpdateAccount() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editAccount } = useMutation({
    mutationFn: updateAccountApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success('Account successfully edited');
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editAccount };
}
