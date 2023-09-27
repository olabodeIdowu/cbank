import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { resetPasswordApi } from '../../services/apiAuth';

export function useResetPassword() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: resetPassword } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success('Password reset token sent successfully');
      queryClient.removeQueries();
      navigate('/dashboard');
    },
  });

  return { isLoading, resetPassword };
}
