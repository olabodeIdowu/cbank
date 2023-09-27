import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { forgotPasswordApi } from '../../services/apiAuth';

export function useForgotPassword() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: forgotPassword } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      toast.success('Password reset token sent successfully');
      queryClient.removeQueries();
      navigate('/reset-password');
    },
  });

  return { isLoading, forgotPassword };
}
