import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMerchantPosApi } from '../../../services/apiPos';

import { toast } from 'react-hot-toast';

export function useCreateMerchantPos() {
  const queryClient = useQueryClient();
  const { isLoading: isCreatingMerchant, mutate: createMerchantPos } =
    useMutation({
      mutationFn: createMerchantPosApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['pos'] });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isCreatingMerchant, createMerchantPos };
}
