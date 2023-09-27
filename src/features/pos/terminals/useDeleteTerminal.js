import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTerminalApi } from '../../../services/apiPos';

import { toast } from 'react-hot-toast';

export function useDeleteTerminal() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteTerminal } = useMutation({
    mutationFn: deleteTerminalApi,
    onSuccess: () => {
      toast.success('Terminal successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['terminal'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteTerminal };
}
