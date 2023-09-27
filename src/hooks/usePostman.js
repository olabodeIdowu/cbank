import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getLogin } from '../services/apiPostman';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

export default function usePostman() {
  const [results, setResults] = useState();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationKey: ['user'],
    mutationFn: getLogin,
    onSuccess: (data) => {
      toast.success('login successfully');
      console.log(data.data);
      setResults(() => data.data);
      queryClient.setQueryData(['user']);
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Provided email or password are incorrect', err.message);
    },
  });

  return { isLoading, mutate, results };
}
