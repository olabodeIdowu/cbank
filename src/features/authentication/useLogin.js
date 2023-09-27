// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../context/AuthContext';
// import { toast } from 'react-hot-toast';
// // import { useState } from 'react';

// export function useLogin() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const { loginUser } = useAuthContext();

//   const { mutate: login, isLoading } = useMutation({
//     mutationFn: loginUser,
//     onSuccess: (user) => {
//       console.log(user);
//       toast.success('Successfully logged in');
//       queryClient.setQueryData(['user']);
//       navigate('/dashboard', { replace: true });
//     },
//     onError: (err) => {
//       console.log('ERROR', err);
//       toast.error(err.message);
//     },
//   });

//   return { login, isLoading };
// }
