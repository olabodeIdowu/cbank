import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTerminalApi } from '../../../services/apiPos';
import { toast } from 'react-hot-toast';

export function useEditTerminal() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editTerminal } = useMutation({
    mutationFn: updateTerminalApi,
    onSuccess: () => {
      toast.success('Terminal successfully edited');
      queryClient.invalidateQueries({ queryKey: ['terminal'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editTerminal };
}
