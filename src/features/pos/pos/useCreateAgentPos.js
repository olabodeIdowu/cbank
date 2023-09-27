import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAgentPosApi } from '../../../services/apiPos';
import { toast } from 'react-hot-toast';

export function useCreateAgentPos() {
  const queryClient = useQueryClient();
  const { isLoading: isCreatingAgent, mutate: createAgentPos } = useMutation({
    mutationFn: createAgentPosApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pos'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreatingAgent, createAgentPos };
}
