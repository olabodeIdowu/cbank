// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../context/AuthContext';
// import { toast } from 'react-hot-toast';

// export function useResetToken() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const { resetToken: resetTokenApi } = useAuthContext();

//   const { mutate: resetToken, isLoading } = useMutation({
//     mutationFn: resetTokenApi,
//     onSuccess: () => {
//       toast.success('Token successfully sent!');
//       queryClient.removeQueries();
//       navigate('/reset-password', { replace: true });
//     },
//     onError: (err) => {
//       toast.error(`Token failed ${err.message}`);
//     },
//   });

//   return { resetToken, isLoading };
// }
