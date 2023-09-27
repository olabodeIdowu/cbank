import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTerminalApi } from '../../../services/apiPos';

import { toast } from 'react-hot-toast';

export function useCreateTerminal() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createTerminal } = useMutation({
    mutationFn: createTerminalApi,
    onSuccess: () => {
      toast.success('New Terminal successfully created');
      queryClient.invalidateQueries({ queryKey: ['terminal'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createTerminal };
}
